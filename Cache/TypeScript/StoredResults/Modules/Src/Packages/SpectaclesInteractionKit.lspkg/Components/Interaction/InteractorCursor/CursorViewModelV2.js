"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorViewModel = void 0;
const InteractionManager_1 = require("../../../Core/InteractionManager/InteractionManager");
const Interactor_1 = require("../../../Core/Interactor/Interactor");
const WorldCameraFinderProvider_1 = require("../../../Providers/CameraProvider/WorldCameraFinderProvider");
const ColliderUtils_1 = require("../../../Utils/ColliderUtils");
const Event_1 = require("../../../Utils/Event");
const LensConfig_1 = require("../../../Utils/LensConfig");
const mathUtils_1 = require("../../../Utils/mathUtils");
const OneEuroFilter_1 = require("../../../Utils/OneEuroFilter");
const SceneObjectUtils_1 = require("../../../Utils/SceneObjectUtils");
const springAnimate_1 = require("../../../Utils/springAnimate");
const StateMachine_1 = require("../../../Utils/StateMachine");
const ScrollBar_1 = require("../../UI/ScrollBar/ScrollBar");
const ScrollView_1 = require("../../UI/ScrollView/ScrollView");
const Interactable_1 = require("../Interactable/Interactable");
const InteractableManipulation_1 = require("../InteractableManipulation/InteractableManipulation");
const InteractionPlane_1 = require("../InteractionPlane/InteractionPlane");
const CONE_RADIUS = 220.0;
const INTERACTABLE_FADE_HOTSPOT_RADIUS = 20.0;
const PLANE_FADE_HOTSPOT_RADIUS = 0.0;
const ALPHA_FADE_DISTANCE = 100.0;
const HIDE_ALPHA_THRESHOLD = 0.05;
const MIN_LENGTH_SQUARED_THRESHOLD = 1e-6;
const SCORE_DIVISOR_EPSILON = 1e-3;
const GEOMETRY_EPSILON = 1e-4;
const DOMINANCE_RADIUS = 1.0;
const DOMINANCE_FADE_WIDTH = 20.0;
const PLANE_SLOW_ZONE_DISTANCE = 10.0;
const PLANE_BLEND_ZONE_WIDTH = 5.0;
const PROXIMITY_HOT_ZONE_FACTOR = 2.0;
const PROXIMITY_NEAR_ZONE_FACTOR = 1.0;
const SMALL_SPHERE_RADIUS_THRESHOLD = 2.0;
const REFERENCE_SCALE = 0.6;
const REFERENCE_DISTANCE_CM = 100;
const SCALING_FACTOR = REFERENCE_SCALE / REFERENCE_DISTANCE_CM;
const MIN_SCALE = 0.4;
const MAX_SCALE = 5.0;
const SCALE_COMPENSATION_STRENGTH = 0.5;
const CursorStates = {
    Hidden: "Hidden",
    Override: "Override",
    Hover: "Hover",
    Manipulating: "Manipulating",
    ScrollDrag: "ScrollDrag"
};
var DebugCalculationState;
(function (DebugCalculationState) {
    DebugCalculationState[DebugCalculationState["None"] = 0] = "None";
    DebugCalculationState[DebugCalculationState["Cheap"] = 1] = "Cheap";
    DebugCalculationState[DebugCalculationState["Blended"] = 2] = "Blended";
    DebugCalculationState[DebugCalculationState["Expensive"] = 3] = "Expensive"; // A precise, expensive getClosestPointOnColliderToPoint call
})(DebugCalculationState || (DebugCalculationState = {}));
class CursorInteractionContext {
    constructor() {
        this.snapDepthNextFrame = true;
        this.manipulationInteractable = null;
        this.manipulationHitLocal = null;
        this.scrollingView = null;
        this.scrollHitLocal = null;
        this.scrollPlaneNormal = null;
    }
    get manipulatedInteractable() {
        return this.manipulationInteractable;
    }
    startManipulation(directHit) {
        const t = directHit.interactable.sceneObject.getTransform();
        this.manipulationInteractable = directHit.interactable;
        this.manipulationHitLocal = t.getWorldTransform().inverse().multiplyPoint(directHit.position);
    }
    endManipulation() {
        this.manipulationInteractable = null;
        this.manipulationHitLocal = null;
    }
    updateManipulation() {
        if (this.manipulationInteractable && this.manipulationHitLocal) {
            const t = this.manipulationInteractable.sceneObject.getTransform();
            return t.getWorldTransform().multiplyPoint(this.manipulationHitLocal);
        }
        return null;
    }
}
class CursorViewModel {
    get cursorPosition() {
        return this._cursorPosition;
    }
    constructor(interactor, parentSceneObject) {
        this.segmentLength = 500.0;
        this.lastHiddenTriggering = null;
        this.interactionManager = InteractionManager_1.InteractionManager.getInstance();
        this.camera = WorldCameraFinderProvider_1.default.getInstance();
        this.context = new CursorInteractionContext();
        this.cursorStateMachine = new StateMachine_1.default("CursorView");
        this.pendingScrollData = null;
        this.pendingManipulationHit = null;
        this.stickyTrigger = null;
        this.overlappingInteractables = new Map();
        this.overlappingPlanes = new Map();
        this.processingQueue = [];
        this.processingIndex = 0;
        this.wasHiddenLastFrame = true;
        this.wasTracked = false;
        this.wasOverride = false;
        this.weightedCursorPosSum = vec3.zero();
        this.weightedRayPosSum = vec3.zero();
        this._cursorPosition = vec3.zero();
        this.stableAnchorPoint = vec3.zero();
        this.cursorDepthSpring = springAnimate_1.SpringAnimate1D.snappy(0.35);
        this.cursorDepthSpringSlow = springAnimate_1.SpringAnimate1D.snappy(0.6);
        this.aimFilter = new OneEuroFilter_1.OneEuroFilterVec3({
            frequency: 60,
            dcutoff: 0.16,
            minCutoff: 9.67125,
            beta: 9.34
        });
        this.originFilter = new OneEuroFilter_1.OneEuroFilterVec3({
            frequency: 60,
            dcutoff: 0.16,
            minCutoff: 4.995,
            beta: 0.82
        });
        this.onCursorUpdateEvent = new Event_1.default();
        this.onCursorUpdate = this.onCursorUpdateEvent.publicApi();
        this.positionOverride = null;
        this.debugDrawEnabled = false;
        this.debugPlaneLines = [];
        this.debugColliderLines = [];
        this.fadeMultiplierSpring = springAnimate_1.SpringAnimate1D.smooth(0.2);
        this.fadeMultiplier = 1.0;
        this.fadeMultiplierTarget = 1.0;
        this.stickyBlendSpring = springAnimate_1.SpringAnimate1D.smooth(0.25);
        this.poseFilterFreezeCount = 0;
        this.interactor = interactor;
        this.segmentLength = interactor.maxRaycastDistance ?? this.segmentLength;
        this.coneObject = this.initializeConeCollider(parentSceneObject);
        this.coneCollider = this.coneObject.getComponent("Physics.ColliderComponent");
        this.interactorLabel = `${interactor.inputType}`;
        const calculateDistanceForScale = (scale) => {
            const idealScale = REFERENCE_SCALE + (scale - REFERENCE_SCALE) / SCALE_COMPENSATION_STRENGTH;
            return idealScale / SCALING_FACTOR;
        };
        const minDistance = calculateDistanceForScale(MIN_SCALE);
        const maxDistance = calculateDistanceForScale(MAX_SCALE);
        this.minDistanceSquared = minDistance * minDistance;
        this.maxDistanceSquared = maxDistance * maxDistance;
        this.setupStateMachine();
        this.cursorStateMachine.enterState(CursorStates.Hidden);
        const dispatcher = LensConfig_1.LensConfig.getInstance().updateDispatcher;
        const label = `${this.interactorLabel}`;
        this.updateEvent = dispatcher.createUpdateEvent(`CursorViewModelUpdate_${label}`, () => this.onUpdate());
        this.updateEvent.enabled = false;
    }
    /**
     * Dispose the internal UpdateDispatcher event.
     */
    destroy() {
        if (this.updateEvent) {
            LensConfig_1.LensConfig.getInstance().updateDispatcher.removeEvent(this.updateEvent);
        }
    }
    /**
     * Triggers a fade-in animation.
     */
    fadeIn(duration) {
        if (duration && duration > 0) {
            this.fadeMultiplierSpring.setDurationSmooth(duration, true);
        }
        this.fadeMultiplierTarget = 1.0;
    }
    /**
     * Triggers a fade-out animation.
     */
    fadeOut(duration) {
        if (duration && duration > 0) {
            this.fadeMultiplierSpring.setDurationSmooth(duration, true);
        }
        this.fadeMultiplierTarget = 0.0;
    }
    /**
     * Enable or disable the internal UpdateDispatcher event.
     */
    enableUpdateEvent(enabled) {
        if (this.updateEvent) {
            this.updateEvent.enabled = enabled;
        }
    }
    onUpdate() {
        this.fadeMultiplier = this.fadeMultiplierSpring.evaluate(this.fadeMultiplier, this.fadeMultiplierTarget);
        // Gather frame inputs and perform initial checks
        const isTracked = this.shouldShowCursor();
        const isTriggering = this.interactor.currentTrigger !== Interactor_1.InteractorTriggerType.None;
        if (!this.preUpdateChecks(isTracked, isTriggering)) {
            return;
        }
        // Get ray data and update the targeting cone
        const { segmentStart, segmentEnd, rayVector, rayDir, rayLength } = this.getUpdatedRayData();
        this.updateConeCollider(segmentStart, rayVector);
        // Update potential targets
        this.updateOverlappingPlanes(segmentStart, rayDir, rayLength);
        this.updateEligibilityCache();
        // If no targets are visible, hide the cursor
        if (!this.hasVisibleTargets()) {
            this.hideCursor(isTriggering);
            return;
        }
        // Update the state machine based on user actions and system state
        this.updateStateMachineSignals(isTriggering, isTracked);
        // Execute the logic for the current state
        this.executeCurrentStateLogic({ isTriggering, segmentStart, rayVector, rayDir, rayLength });
        // Render debug visuals
        if (this.debugDrawEnabled) {
            this.debugDraw(segmentStart, segmentEnd);
        }
    }
    preUpdateChecks(isTracked, isTriggering) {
        if (this.interactor.activeTargetingMode !== Interactor_1.TargetingMode.Indirect) {
            this.hideCursor(isTriggering);
            return false;
        }
        const inputType = this.interactor.inputType;
        let deviceAvailable = false;
        if ((inputType & Interactor_1.InteractorInputType.BothHands) !== 0) {
            deviceAvailable = this.interactor.isTracking();
        }
        else if ((inputType & Interactor_1.InteractorInputType.Mobile) !== 0) {
            deviceAvailable = this.interactor.isActive() && this.interactor.isTargeting();
        }
        else if ((inputType & Interactor_1.InteractorInputType.Mouse) !== 0) {
            deviceAvailable = this.interactor.isActive() && this.interactor.isTargeting();
        }
        else {
            deviceAvailable = this.interactor.isActive();
        }
        const shouldEnableCone = deviceAvailable && !isTriggering && isTracked;
        if (this.coneCollider.enabled !== shouldEnableCone) {
            this.coneCollider.enabled = shouldEnableCone;
        }
        if (this.debugDrawEnabled) {
            this.coneCollider.debugDrawEnabled = isTracked;
        }
        if (!isTracked && !this.positionOverride) {
            this.hideCursor(isTriggering);
            return false;
        }
        return true;
    }
    getUpdatedRayData() {
        const { segmentStart, segmentEnd } = this.getInteractionRay();
        const timeNow = getTime();
        let filteredStart = segmentStart;
        if (!this.arePoseFiltersFrozen()) {
            filteredStart = this.originFilter.filter(segmentStart, timeNow);
            const startSum = filteredStart.x + filteredStart.y + filteredStart.z;
            if (!isFinite(startSum)) {
                filteredStart = segmentStart;
                this.originFilter.reset();
            }
        }
        else {
            this.originFilter.reset();
        }
        const rawVector = segmentEnd.sub(segmentStart);
        const rayLength = rawVector.length;
        const rawDir = rayLength > MIN_LENGTH_SQUARED_THRESHOLD ? rawVector.uniformScale(1.0 / rayLength) : vec3.down();
        let filteredDir = rawDir;
        if (!this.arePoseFiltersFrozen()) {
            filteredDir = this.aimFilter.filter(rawDir, timeNow);
        }
        const sum = filteredDir.x + filteredDir.y + filteredDir.z;
        if (!isFinite(sum) || filteredDir.lengthSquared <= GEOMETRY_EPSILON) {
            filteredDir = rawDir;
            this.aimFilter.reset();
        }
        else {
            filteredDir = filteredDir.normalize();
        }
        const rayDir = filteredDir;
        const rayVector = rayDir.uniformScale(rayLength);
        const filteredEnd = filteredStart.add(rayVector);
        return { segmentStart: filteredStart, segmentEnd: filteredEnd, rayVector, rayDir, rayLength };
    }
    updateOverlappingPlanes(segmentStart, rayDir, rayLength) {
        const coneAngle = rayLength > GEOMETRY_EPSILON ? Math.atan(CONE_RADIUS / rayLength) : 0.0;
        const tanConeAngle = Math.tan(coneAngle);
        const allPlanes = this.interactionManager.getInteractionPlanes();
        const currentFramePlanes = new Map();
        for (const plane of allPlanes) {
            if (!this.isPlaneEligible(plane)) {
                continue;
            }
            if (this.isPlaneInCone(plane, segmentStart, rayDir, rayLength, tanConeAngle)) {
                const existing = this.overlappingPlanes.get(plane);
                if (existing) {
                    currentFramePlanes.set(plane, existing);
                }
                else {
                    currentFramePlanes.set(plane, {
                        score: 0,
                        targetT: 0,
                        radialDistance: Infinity,
                        positionalDistance: Infinity,
                        coneRadiusAtT: 0,
                        hotspotRadius: 0,
                        targetingVisual: Interactable_1.TargetingVisual.Cursor,
                        dominanceFactor: 0,
                        lastUpdated: 0
                    });
                }
            }
        }
        this.overlappingPlanes = currentFramePlanes;
    }
    hasVisibleTargets() {
        if (this.positionOverride) {
            return true;
        }
        if (this.stickyTrigger) {
            return true;
        }
        const isTriggering = this.interactor.currentTrigger !== Interactor_1.InteractorTriggerType.None;
        if (isTriggering) {
            return true;
        }
        if (this.overlappingInteractables.size + this.overlappingPlanes.size === 0) {
            return false;
        }
        for (const plane of this.overlappingPlanes.keys()) {
            if (this.isPlaneEligible(plane)) {
                return true;
            }
        }
        for (const data of this.overlappingInteractables.values()) {
            if (data.isEligibleThisFrame) {
                return true;
            }
        }
        return false;
    }
    updateStateMachineSignals(isTriggering, isTracked) {
        const isOverride = !!this.positionOverride;
        if (isOverride && !this.wasOverride) {
            this.cursorStateMachine.sendSignal("OverrideOn");
        }
        else if (!isOverride && this.wasOverride) {
            this.cursorStateMachine.sendSignal("OverrideOff");
        }
        this.wasOverride = isOverride;
        if (isTracked && !this.wasTracked) {
            this.cursorStateMachine.sendSignal("TrackGained");
        }
        else if (!isTracked && this.wasTracked) {
            this.cursorStateMachine.sendSignal("TrackLost");
        }
        this.wasTracked = isTracked;
        // Handle scroll state changes
        if (this.context.scrollingView && !this.context.scrollingView.isDragging) {
            this.cursorStateMachine.sendSignal("ScrollDragEnd");
        }
        // Handle trigger-down events (manipulation, scrolling, sticky trigger)
        if (isTriggering) {
            const currentInteractable = this.interactor.currentInteractable;
            const scrollViewCandidate = currentInteractable
                ? (0, SceneObjectUtils_1.findScriptComponentInSelfOrParents)(currentInteractable.sceneObject, ScrollView_1.ScrollView)
                : null;
            const directHitRecord = this.getDirectHit();
            if (scrollViewCandidate) {
                this.pendingScrollData = { sv: scrollViewCandidate, worldHit: this.interactor.targetHitPosition };
                this.cursorStateMachine.sendSignal("ScrollDragStart");
            }
            else if (directHitRecord) {
                const interactableManipulationComponent = directHitRecord.interactable.sceneObject.getComponent(InteractableManipulation_1.InteractableManipulation.getTypeName());
                const hasManipulation = interactableManipulationComponent !== null && interactableManipulationComponent.enabled;
                const isScrollBar = directHitRecord.interactable.sceneObject.getComponent(ScrollBar_1.ScrollBar.getTypeName()) !== null;
                if (hasManipulation || isScrollBar) {
                    this.pendingManipulationHit = directHitRecord;
                    this.cursorStateMachine.sendSignal("TriggerDownManipulate");
                }
                else if (!this.stickyTrigger) {
                    const so = directHitRecord.interactable.sceneObject;
                    const t = so.getTransform();
                    const worldHit = directHitRecord.position;
                    const baseStickyData = {
                        interactable: directHitRecord.interactable,
                        localHit: t.getWorldTransform().inverse().multiplyPoint(worldHit),
                        initialWorld: worldHit,
                        blend: 0,
                        hasBroken: false
                    };
                    const parentPlane = (0, SceneObjectUtils_1.findScriptComponentInSelfOrParents)(so, InteractionPlane_1.InteractionPlane);
                    if (this.isPlaneEnabled(parentPlane) && !directHitRecord.interactable.ignoreInteractionPlane) {
                        const { origin, n } = this.getPlaneWorldOriginAndAxes(parentPlane);
                        const toHit = worldHit.sub(origin);
                        const planePoint = worldHit.sub(n.uniformScale(toHit.dot(n)));
                        this.stickyTrigger = { ...baseStickyData, planePoint: planePoint, planeNormal: n };
                    }
                    else {
                        this.stickyTrigger = {
                            ...baseStickyData,
                            planePoint: worldHit,
                            planeNormal: this.camera.forward().normalize()
                        };
                    }
                    this.resetPoseFilters();
                    this.freezePoseFilters();
                }
            }
        }
        else {
            // Handle trigger-up event
            this.cursorStateMachine.sendSignal("TriggerUp");
            this.stickyTrigger = null;
            this.unfreezePoseFilters();
        }
    }
    executeCurrentStateLogic(frameData) {
        const { isTriggering, segmentStart, rayVector, rayDir, rayLength } = frameData;
        const currentStateName = this.cursorStateMachine.currentState?.name;
        if (this.debugDrawEnabled) {
            this.debugPlaneLines.length = 0;
            this.debugColliderLines.length = 0;
        }
        switch (currentStateName) {
            case CursorStates.Hidden:
                this.hideCursor(isTriggering);
                break;
            case CursorStates.Override:
                this.updateWithOverride(isTriggering);
                break;
            case CursorStates.Manipulating:
                this.handleManipulationState(isTriggering);
                break;
            case CursorStates.ScrollDrag:
                if (this.handleActiveScrollDrag(segmentStart, rayDir, isTriggering)) {
                    // Scroll handled the frame, nothing else to do.
                    return;
                }
            // Fall through to hover logic if scroll fails
            case CursorStates.Hover:
                // Sticky trigger takes priority over normal hover behavior
                if (this.handleStickyTriggerState(isTriggering, segmentStart, rayDir)) {
                    return;
                }
                this.handleHoverState(isTriggering, segmentStart, rayVector, rayDir, rayLength);
                break;
        }
    }
    handleHoverState(isTriggering, segmentStart, rayVector, rayDir, rayLength) {
        const directHitRecord = this.getDirectHit();
        if (directHitRecord) {
            this.runDirectHitInteraction(segmentStart, rayDir, directHitRecord, isTriggering);
        }
        else {
            this.runFallbackInteraction(segmentStart, rayVector, rayDir, rayLength, isTriggering);
        }
    }
    handleStickyTriggerState(isTriggering, segmentStart, rayDir) {
        const sticky = this.stickyTrigger;
        if (!sticky || !isTriggering) {
            return false;
        }
        const latchedWorld = sticky.initialWorld;
        const { planePoint, planeNormal } = sticky;
        let planeIntersect = sticky.lastIntersect ?? latchedWorld;
        const denom = rayDir.dot(planeNormal);
        if (Math.abs(denom) > GEOMETRY_EPSILON) {
            const t = planePoint.sub(segmentStart).dot(planeNormal) / denom;
            if (t >= 0) {
                planeIntersect = segmentStart.add(rayDir.uniformScale(t));
            }
        }
        sticky.lastIntersect = planeIntersect;
        // Break based on hover state (stop holding when not hovering the latched interactable)
        const isHovering = this.interactor.isHoveringCurrentInteractable;
        const isSameTarget = this.interactor.currentInteractable === sticky.interactable;
        const shouldBreak = isHovering === false || !isSameTarget;
        // Once broken, never target back toward 0 again
        const targetBlend = sticky.hasBroken ? 1 : shouldBreak ? 1 : 0;
        if (!sticky.hasBroken && shouldBreak) {
            sticky.hasBroken = true;
            this.stickyBlendSpring.reset();
            const previousOnSettled = this.stickyBlendSpring.onSettled;
            this.stickyBlendSpring.onSettled = () => {
                if (previousOnSettled)
                    previousOnSettled();
                this.unfreezePoseFilters();
                this.stickyBlendSpring.onSettled = null;
            };
        }
        sticky.blend = sticky.hasBroken ? this.stickyBlendSpring.evaluate(sticky.blend, targetBlend) : 0;
        const drawPos = sticky.hasBroken ? vec3.lerp(latchedWorld, planeIntersect, sticky.blend) : latchedWorld;
        this._cursorPosition = drawPos;
        this.stableAnchorPoint = drawPos;
        const visualInteractable = sticky.interactable;
        const targetingVisual = visualInteractable && !isNull(visualInteractable.sceneObject)
            ? this.getEffectiveTargetingVisual(visualInteractable)
            : Interactable_1.TargetingVisual.None;
        const cursorAlpha = targetingVisual === Interactable_1.TargetingVisual.Cursor ? 1.0 : 0.0;
        const rayAlpha = targetingVisual === Interactable_1.TargetingVisual.Ray ? 1.0 : 0.0;
        this.updateAndDrawCursor(cursorAlpha, rayAlpha, isTriggering);
        return true;
    }
    handleManipulationState(isTriggering) {
        const manipulatedPos = this.context.updateManipulation();
        if (manipulatedPos &&
            this.context.manipulatedInteractable &&
            !isNull(this.context.manipulatedInteractable.sceneObject)) {
            this._cursorPosition = manipulatedPos;
            this.stableAnchorPoint = manipulatedPos;
            const targetingVisual = this.getEffectiveTargetingVisual(this.context.manipulatedInteractable);
            const cursorAlpha = targetingVisual === Interactable_1.TargetingVisual.Cursor ? 1.0 : 0.0;
            const rayAlpha = targetingVisual === Interactable_1.TargetingVisual.Ray ? 1.0 : 0.0;
            this.updateAndDrawCursor(cursorAlpha, rayAlpha, isTriggering);
        }
    }
    setupStateMachine() {
        this.cursorStateMachine.addState({
            name: CursorStates.Hidden,
            transitions: [
                {
                    nextStateName: CursorStates.Override,
                    checkOnSignal: (signal) => signal === "OverrideOn"
                },
                {
                    nextStateName: CursorStates.Hover,
                    checkOnSignal: (signal) => signal === "TrackGained" && this.positionOverride === null
                }
            ]
        });
        // Override
        this.cursorStateMachine.addState({
            name: CursorStates.Override,
            transitions: [
                {
                    nextStateName: CursorStates.Hover,
                    checkOnSignal: (signal) => signal === "OverrideOff" && this.shouldShowCursor()
                },
                {
                    nextStateName: CursorStates.Hidden,
                    checkOnSignal: (signal) => signal === "OverrideOff" && !this.shouldShowCursor()
                }
            ]
        });
        // Hover
        this.cursorStateMachine.addState({
            name: CursorStates.Hover,
            transitions: [
                {
                    nextStateName: CursorStates.Hidden,
                    checkOnSignal: (signal) => signal === "TrackLost"
                },
                {
                    nextStateName: CursorStates.Override,
                    checkOnSignal: (signal) => signal === "OverrideOn"
                },
                {
                    nextStateName: CursorStates.ScrollDrag,
                    checkOnSignal: (signal) => signal === "ScrollDragStart",
                    onExecution: () => {
                        if (this.pendingScrollData) {
                            const { sv, worldHit } = this.pendingScrollData;
                            this.context.scrollingView = sv;
                            this.resetPoseFilters();
                            this.freezePoseFilters();
                            const scrollTransform = sv.getSceneObject().getTransform();
                            this.context.scrollHitLocal = scrollTransform.getWorldTransform().inverse().multiplyPoint(worldHit);
                            this.context.scrollPlaneNormal = scrollTransform.forward;
                            this.pendingScrollData = null;
                        }
                    }
                },
                {
                    nextStateName: CursorStates.Manipulating,
                    checkOnSignal: (signal) => signal === "TriggerDownManipulate",
                    onExecution: () => {
                        if (this.pendingManipulationHit) {
                            this.context.startManipulation(this.pendingManipulationHit);
                            this._cursorPosition = this.context.updateManipulation();
                            this.stableAnchorPoint = this._cursorPosition;
                            this.pendingManipulationHit = null;
                        }
                    }
                }
            ]
        });
        // Manipulating
        this.cursorStateMachine.addState({
            name: CursorStates.Manipulating,
            transitions: [
                {
                    nextStateName: CursorStates.Hover,
                    checkOnSignal: (signal) => signal === "TriggerUp",
                    onExecution: () => {
                        this.context.endManipulation();
                    }
                },
                {
                    nextStateName: CursorStates.Hidden,
                    checkOnSignal: (signal) => signal === "TrackLost",
                    onExecution: () => {
                        this.context.endManipulation();
                    }
                },
                {
                    nextStateName: CursorStates.Override,
                    checkOnSignal: (signal) => signal === "OverrideOn",
                    onExecution: () => {
                        this.context.endManipulation();
                    }
                }
            ]
        });
        // ScrollDrag
        this.cursorStateMachine.addState({
            name: CursorStates.ScrollDrag,
            onExit: () => {
                this.context.scrollingView = null;
                this.context.scrollHitLocal = null;
                this.context.scrollPlaneNormal = null;
                this.unfreezePoseFilters();
                this.resetPoseFilters();
            },
            transitions: [
                {
                    nextStateName: CursorStates.Hover,
                    checkOnSignal: (signal) => signal === "ScrollDragEnd"
                },
                {
                    nextStateName: CursorStates.Hidden,
                    checkOnSignal: (signal) => signal === "TrackLost"
                },
                {
                    nextStateName: CursorStates.Override,
                    checkOnSignal: (signal) => signal === "OverrideOn"
                }
            ]
        });
    }
    handleActiveScrollDrag(segmentStart, rayDir, isTriggering) {
        if (this.context.scrollingView && this.context.scrollHitLocal && this.context.scrollPlaneNormal) {
            const scrollTransform = this.context.scrollingView.getSceneObject().getTransform();
            const currentAnchorPoint = scrollTransform.getWorldTransform().multiplyPoint(this.context.scrollHitLocal);
            const denom = rayDir.dot(this.context.scrollPlaneNormal);
            if (Math.abs(denom) > GEOMETRY_EPSILON) {
                const t = currentAnchorPoint.sub(segmentStart).dot(this.context.scrollPlaneNormal) / denom;
                if (t >= 0) {
                    this._cursorPosition = segmentStart.add(rayDir.uniformScale(t));
                }
                else {
                    this._cursorPosition = currentAnchorPoint;
                }
            }
            else {
                this._cursorPosition = currentAnchorPoint;
            }
            this.stableAnchorPoint = this._cursorPosition;
            const visualInteractable = this.interactor.currentInteractable ??
                this.context.scrollingView.getSceneObject().getComponent(Interactable_1.Interactable.getTypeName());
            const targetingVisual = visualInteractable && !isNull(visualInteractable.sceneObject)
                ? this.getEffectiveTargetingVisual(visualInteractable)
                : Interactable_1.TargetingVisual.None;
            const cursorAlpha = targetingVisual === Interactable_1.TargetingVisual.Cursor ? 1.0 : 0.0;
            const rayAlpha = targetingVisual === Interactable_1.TargetingVisual.Ray ? 1.0 : 0.0;
            this.updateAndDrawCursor(cursorAlpha, rayAlpha, isTriggering);
            return true;
        }
        return false;
    }
    runDirectHitInteraction(rayOrigin, rayDir, directHitRecord, isTriggering) {
        this.handleDirectHit(rayOrigin, rayDir, directHitRecord);
        const targetingVisual = this.getEffectiveTargetingVisual(directHitRecord.interactable);
        const cursorAlpha = targetingVisual === Interactable_1.TargetingVisual.Cursor ? 1.0 : 0.0;
        const rayAlpha = targetingVisual === Interactable_1.TargetingVisual.Ray ? 1.0 : 0.0;
        this.updateAndDrawCursor(cursorAlpha, rayAlpha, isTriggering);
    }
    runFallbackInteraction(rayOrigin, rayVector, rayDir, rayLength, isTriggering) {
        if (this.overlappingInteractables.size + this.overlappingPlanes.size === 0) {
            this.updateAndDrawCursor(0.0, 0.0, isTriggering);
            return;
        }
        this.updateInteractableCacheBatch(rayOrigin, rayVector, rayDir, rayLength);
        const blendResult = this.blendCachedInteractables(rayOrigin, rayVector);
        const defaultPosition = rayOrigin.add(rayDir.uniformScale(REFERENCE_DISTANCE_CM));
        let finalCursorPosition = defaultPosition;
        let cursorAlpha = 0.0;
        let rayAlpha = 0.0;
        if (blendResult) {
            const rawTargetPosition = rayOrigin.add(rayVector.uniformScale(blendResult.targetT));
            const currentDepth = this.stableAnchorPoint.sub(rayOrigin).dot(rayDir);
            const targetDepth = rawTargetPosition.sub(rayOrigin).dot(rayDir);
            // If visuals are effectively hidden, snap immediately to avoid a visible lerp
            const overallAlphaNow = Math.max(blendResult.cursorAlpha, blendResult.rayAlpha);
            if (overallAlphaNow <= HIDE_ALPHA_THRESHOLD) {
                this.cursorDepthSpring.reset();
                this.context.snapDepthNextFrame = true;
            }
            let smoothedDepth;
            if (this.context.snapDepthNextFrame || this.wasHiddenLastFrame) {
                this.cursorDepthSpring.reset();
                smoothedDepth = targetDepth;
            }
            else {
                smoothedDepth = this.cursorDepthSpring.evaluate(currentDepth, targetDepth);
            }
            finalCursorPosition = rayOrigin.add(rayDir.uniformScale(smoothedDepth));
            cursorAlpha = blendResult.cursorAlpha;
            rayAlpha = blendResult.rayAlpha;
        }
        this._cursorPosition = finalCursorPosition;
        this.stableAnchorPoint = finalCursorPosition;
        this.updateAndDrawCursor(cursorAlpha, rayAlpha, isTriggering);
    }
    shouldShowCursor() {
        if (!this.interactor.enabled || !this.interactor.startPoint || !this.interactor.direction) {
            return false;
        }
        const isActiveAndTargeting = this.interactor.isActive() && this.interactor.isTargeting();
        const isVisibleTargetingMode = (this.interactor.activeTargetingMode & (Interactor_1.TargetingMode.Poke | Interactor_1.TargetingMode.Direct | Interactor_1.TargetingMode.None)) === 0;
        let isNotNearField = true;
        if ((this.interactor.inputType & Interactor_1.InteractorInputType.BothHands) !== 0) {
            isNotNearField = this.interactor.isFarField();
        }
        return isActiveAndTargeting && isVisibleTargetingMode && isNotNearField;
    }
    getDirectHit() {
        const interactable = this.interactor.currentInteractable;
        const hitPosition = this.interactor.targetHitPosition;
        if (interactable && hitPosition) {
            return { interactable, position: hitPosition };
        }
        return null;
    }
    handleDirectHit(rayOrigin, rayDir, directHitRecord) {
        const rawTargetPosition = directHitRecord.position;
        const currentDepth = this.stableAnchorPoint.sub(rayOrigin).dot(rayDir);
        const targetDepth = rawTargetPosition.sub(rayOrigin).dot(rayDir);
        let smoothedDepth;
        if (this.context.snapDepthNextFrame) {
            this.cursorDepthSpring.reset();
            this.cursorDepthSpringSlow.reset();
            smoothedDepth = targetDepth;
        }
        else {
            const parentPlane = (0, SceneObjectUtils_1.findScriptComponentInSelfOrParents)(directHitRecord.interactable.sceneObject, InteractionPlane_1.InteractionPlane);
            if (this.isPlaneEnabled(parentPlane) && !directHitRecord.interactable.ignoreInteractionPlane) {
                const snappyDepth = this.cursorDepthSpring.evaluate(currentDepth, targetDepth);
                const slowDepth = this.cursorDepthSpringSlow.evaluate(currentDepth, targetDepth);
                const { origin: planeOrigin, n: planeNormal } = this.getPlaneWorldOriginAndAxes(parentPlane);
                const vectorToCursor = this.stableAnchorPoint.sub(planeOrigin);
                const worldDistance = Math.abs(vectorToCursor.dot(planeNormal));
                const blendStartDistance = PLANE_SLOW_ZONE_DISTANCE + PLANE_BLEND_ZONE_WIDTH;
                const blendEndDistance = PLANE_SLOW_ZONE_DISTANCE;
                const blendFactor = (0, mathUtils_1.smoothstep)(blendStartDistance, blendEndDistance, worldDistance);
                smoothedDepth = snappyDepth * (1.0 - blendFactor) + slowDepth * blendFactor;
            }
            else {
                smoothedDepth = this.cursorDepthSpring.evaluate(currentDepth, targetDepth);
            }
        }
        const finalCursorPosition = rayOrigin.add(rayDir.uniformScale(smoothedDepth));
        this._cursorPosition = finalCursorPosition;
        this.stableAnchorPoint = finalCursorPosition;
    }
    updateAndDrawCursor(cursorAlpha, rayAlpha, isTriggering) {
        const overallAlpha = Math.max(cursorAlpha, rayAlpha);
        const willSnap = overallAlpha <= HIDE_ALPHA_THRESHOLD;
        this.context.snapDepthNextFrame = willSnap;
        this.stableAnchorPoint = this._cursorPosition;
        const scale = this.calculateCursorScale(this._cursorPosition);
        this.onCursorUpdateEvent.invoke({
            cursorEnabled: true,
            position: this._cursorPosition,
            scale: scale,
            cursorAlpha: cursorAlpha * this.fadeMultiplier,
            rayAlpha: rayAlpha * this.fadeMultiplier,
            isTriggering: isTriggering
        });
        this.lastHiddenTriggering = null;
        this.wasHiddenLastFrame = overallAlpha * this.fadeMultiplier <= HIDE_ALPHA_THRESHOLD;
    }
    setDebugDraw(enabled) {
        this.debugDrawEnabled = enabled;
        this.coneCollider.debugDrawEnabled = enabled;
    }
    debugDraw(segmentStart, segmentEnd) {
        const COLOR_RAY = new vec4(0.1, 0.7, 1.0, 1.0);
        const COLOR_CACHED = new vec4(0.85, 0.85, 0.85, 1.0);
        const COLOR_CHEAP = new vec4(0.2, 1.0, 0.2, 1.0);
        const COLOR_BLENDED = new vec4(1.0, 1.0, 0.2, 1.0);
        const COLOR_EXPENSIVE = new vec4(1.0, 0.2, 0.2, 1.0);
        const COLOR_BOUNDING_SPHERE = new vec4(0.6, 0.2, 1.0, 0.5);
        global.debugRenderSystem.drawLine(segmentStart, segmentEnd, COLOR_RAY);
        const currentTime = getTime();
        const staleThreshold = 1.0 / 55.0;
        const drawDebugForData = (data) => {
            if (data.score <= 0)
                return;
            if (!data.debugState || !data.debugClosestPointOnRay || !data.debugClosestPointOnCollider)
                return;
            let color = COLOR_CACHED;
            if (Math.abs(currentTime - data.lastUpdated) < staleThreshold) {
                switch (data.debugState) {
                    case DebugCalculationState.Cheap:
                        color = COLOR_CHEAP;
                        break;
                    case DebugCalculationState.Blended:
                        color = COLOR_BLENDED;
                        break;
                    case DebugCalculationState.Expensive:
                        color = COLOR_EXPENSIVE;
                        break;
                }
            }
            global.debugRenderSystem.drawLine(data.debugClosestPointOnRay, data.debugClosestPointOnCollider, color);
            global.debugRenderSystem.drawSphere(data.debugClosestPointOnCollider, 0.5, color);
        };
        for (const data of this.overlappingPlanes.values()) {
            drawDebugForData(data);
        }
        for (const data of this.overlappingInteractables.values()) {
            drawDebugForData(data);
        }
        for (const [interactable, data] of this.overlappingInteractables.entries()) {
            if (data.score <= 0)
                continue;
            for (const collider of interactable.colliders) {
                const bs = ColliderUtils_1.ColliderUtils.getColliderWorldBoundingSphere(collider);
                if (bs) {
                    global.debugRenderSystem.drawSphere(bs.center, bs.radius, COLOR_BOUNDING_SPHERE);
                }
            }
        }
    }
    freezePoseFilters() {
        this.poseFilterFreezeCount++;
        this.resetPoseFilters();
    }
    unfreezePoseFilters() {
        this.poseFilterFreezeCount = Math.max(0, this.poseFilterFreezeCount - 1);
    }
    arePoseFiltersFrozen() {
        return this.poseFilterFreezeCount > 0;
    }
    resetPoseFilters() {
        this.aimFilter.reset();
        this.originFilter.reset();
    }
    updateInteractableCacheBatch(segmentStart, segDir, segDirNorm, segLen) {
        const currentTime = getTime();
        for (const plane of this.overlappingPlanes.keys()) {
            if (!this.isPlaneEligible(plane)) {
                continue;
            }
            const newData = this.getTargetingDataForPlane(plane, segmentStart, segDirNorm, segLen);
            if (newData) {
                const cachedData = this.overlappingPlanes.get(plane);
                Object.assign(cachedData, newData);
                cachedData.lastUpdated = currentTime;
            }
        }
        const eligibleKeys = [];
        for (const [interactable, data] of this.overlappingInteractables.entries()) {
            if (data.isEligibleThisFrame) {
                eligibleKeys.push(interactable);
            }
            else {
                data.score = 0;
            }
        }
        const eligibleCount = eligibleKeys.length;
        if (eligibleCount === 0) {
            this.processingQueue = [];
            this.processingIndex = 0;
            return;
        }
        this.processingQueue = eligibleKeys;
        if (this.processingIndex >= this.processingQueue.length) {
            this.processingIndex = 0;
        }
        const chunkSize = Math.max(1, Math.floor(Math.sqrt(eligibleCount)));
        for (let i = 0; i < chunkSize; i++) {
            if (this.processingIndex >= this.processingQueue.length)
                break;
            const interactable = this.processingQueue[this.processingIndex];
            const cachedData = this.overlappingInteractables.get(interactable);
            const newData = this.getTargetingDataForInteractable(interactable, segmentStart, segDirNorm, segLen);
            if (cachedData) {
                Object.assign(cachedData, newData);
                cachedData.lastUpdated = currentTime;
            }
            this.processingIndex++;
        }
    }
    getTargetingDataForPlane(plane, segmentStart, segDirNorm, segLen) {
        if (segLen <= MIN_LENGTH_SQUARED_THRESHOLD) {
            return null;
        }
        const coneShape = this.coneCollider.shape;
        const baseRadius = coneShape.radius;
        const invSegLen = 1.0 / segLen;
        let targetT = 0, radialDistance = Infinity, coneRadiusAtT = 0, hotspotRadius = 0;
        let debugState, debugClosestPointOnRay, debugClosestPointOnCollider;
        {
            const { origin: po, n, r, u } = this.getPlaneWorldOriginAndAxes(plane);
            const denom = segDirNorm.dot(n);
            if (Math.abs(denom) <= GEOMETRY_EPSILON)
                return null;
            const tWorld = po.sub(segmentStart).dot(n) / denom;
            if (tWorld < 0 || tWorld > segLen)
                return null;
            const intersection = segmentStart.add(segDirNorm.uniformScale(tWorld));
            const d = intersection.sub(po);
            const planeXform = plane.getSceneObject().getTransform();
            const s = planeXform.getWorldScale();
            const halfWidth = Math.max(0, plane.planeSize.x * 0.5 * s.x);
            const halfHeight = Math.max(0, plane.planeSize.y * 0.5 * s.y);
            const clampedX = Math.max(-halfWidth, Math.min(halfWidth, d.dot(r)));
            const clampedY = Math.max(-halfHeight, Math.min(halfHeight, d.dot(u)));
            const clampedPoint = po.add(r.uniformScale(clampedX)).add(u.uniformScale(clampedY));
            if (this.debugDrawEnabled) {
                debugState = DebugCalculationState.Cheap;
                debugClosestPointOnRay = intersection;
                debugClosestPointOnCollider = clampedPoint;
            }
            targetT = tWorld * invSegLen;
            radialDistance = intersection.distance(clampedPoint);
            coneRadiusAtT = baseRadius * targetT;
            hotspotRadius = PLANE_FADE_HOTSPOT_RADIUS;
        }
        const radialWeight = 1.0;
        const score = radialWeight / (radialDistance + SCORE_DIVISOR_EPSILON);
        if (score <= 0)
            return null;
        const result = {
            score: score,
            targetT,
            radialDistance,
            positionalDistance: radialDistance,
            coneRadiusAtT,
            hotspotRadius,
            targetingVisual: plane.targetingVisual
        };
        if (this.debugDrawEnabled) {
            result.debugState = debugState;
            result.debugClosestPointOnRay = debugClosestPointOnRay;
            result.debugClosestPointOnCollider = debugClosestPointOnCollider;
        }
        return result;
    }
    getPlaneWorldOriginAndAxes(plane) {
        const planeXform = plane.getSceneObject().getTransform();
        const n = planeXform.forward;
        const r = planeXform.right;
        const u = planeXform.up;
        const s = planeXform.getWorldScale();
        const baseOrigin = planeXform.getWorldPosition();
        const offset = plane.offset;
        const worldOffset = r
            .uniformScale(offset.x * s.x)
            .add(u.uniformScale(offset.y * s.y))
            .add(n.uniformScale(offset.z * s.z));
        const origin = baseOrigin.add(worldOffset);
        return { origin, n, r, u };
    }
    getTargetingDataForInteractable(interactable, segmentStart, segDirNorm, segLen) {
        const coneShape = this.coneCollider.shape;
        const baseRadius = coneShape.radius;
        const invSegLen = 1.0 / segLen;
        if (segLen <= MIN_LENGTH_SQUARED_THRESHOLD) {
            const fallbackDistance = interactable.sceneObject.getTransform().getWorldPosition().distance(segmentStart);
            return {
                score: 1.0 / (fallbackDistance + SCORE_DIVISOR_EPSILON),
                targetT: 0.1, // Small but non-zero
                radialDistance: fallbackDistance,
                positionalDistance: fallbackDistance,
                coneRadiusAtT: baseRadius * 0.1,
                hotspotRadius: INTERACTABLE_FADE_HOTSPOT_RADIUS,
                targetingVisual: this.getEffectiveTargetingVisual(interactable)
            };
        }
        let targetT = 0, alphaDistance = Infinity, coneRadiusAtT = 0, hotspotRadius = 0;
        let debugState, debugClosestPointOnRay, debugClosestPointOnCollider;
        const primaryCollider = interactable.colliders[0];
        if (!primaryCollider) {
            const fallbackDistance = interactable.sceneObject.getTransform().getWorldPosition().distance(segmentStart);
            return {
                score: 1.0 / (fallbackDistance + SCORE_DIVISOR_EPSILON),
                targetT: Math.min(1.0, fallbackDistance / segLen),
                radialDistance: fallbackDistance,
                positionalDistance: fallbackDistance,
                coneRadiusAtT: baseRadius * Math.min(1.0, fallbackDistance / segLen),
                hotspotRadius: INTERACTABLE_FADE_HOTSPOT_RADIUS,
                targetingVisual: this.getEffectiveTargetingVisual(interactable)
            };
        }
        const worldSphere = ColliderUtils_1.ColliderUtils.getColliderWorldBoundingSphere(primaryCollider);
        if (!worldSphere) {
            const fallbackDistance = interactable.sceneObject.getTransform().getWorldPosition().distance(segmentStart);
            return {
                score: 1.0 / (fallbackDistance + SCORE_DIVISOR_EPSILON),
                targetT: Math.min(1.0, fallbackDistance / segLen),
                radialDistance: fallbackDistance,
                positionalDistance: fallbackDistance,
                coneRadiusAtT: baseRadius * Math.min(1.0, fallbackDistance / segLen),
                hotspotRadius: INTERACTABLE_FADE_HOTSPOT_RADIUS,
                targetingVisual: this.getEffectiveTargetingVisual(interactable)
            };
        }
        const planePoint = worldSphere.center;
        const cameraPos = this.camera.getWorldPosition();
        let planeNormal = cameraPos.sub(planePoint);
        if (planeNormal.lengthSquared <= GEOMETRY_EPSILON) {
            planeNormal = this.camera.forward();
        }
        else {
            planeNormal = planeNormal.normalize();
        }
        const toCenter = planePoint.sub(segmentStart);
        const denominator = planeNormal.dot(segDirNorm);
        let clampedTWorld;
        if (Math.abs(denominator) > GEOMETRY_EPSILON) {
            const numerator = planeNormal.dot(toCenter);
            const tWorld = numerator / denominator;
            clampedTWorld = Math.max(0, Math.min(segLen, tWorld));
        }
        else {
            const tAlongRay = toCenter.dot(segDirNorm);
            clampedTWorld = Math.max(0, Math.min(segLen, tAlongRay));
        }
        const closestPointOnRayVec = segmentStart.add(segDirNorm.uniformScale(clampedTWorld));
        if (this.debugDrawEnabled) {
            debugClosestPointOnRay = closestPointOnRayVec;
        }
        const distanceToCenterSq = closestPointOnRayVec.distanceSquared(worldSphere.center);
        const distanceToCenter = Math.sqrt(distanceToCenterSq);
        alphaDistance = Math.max(0, distanceToCenter - worldSphere.radius);
        let positionalDistance;
        targetT = clampedTWorld * invSegLen;
        coneRadiusAtT = baseRadius * targetT;
        hotspotRadius = INTERACTABLE_FADE_HOTSPOT_RADIUS;
        if (worldSphere.radius <= SMALL_SPHERE_RADIUS_THRESHOLD) {
            positionalDistance = distanceToCenter;
            if (this.debugDrawEnabled) {
                debugState = DebugCalculationState.Cheap;
                debugClosestPointOnCollider = worldSphere.center;
            }
        }
        else {
            const fastDistance = distanceToCenter - worldSphere.radius;
            const hotZoneStart = worldSphere.radius * PROXIMITY_HOT_ZONE_FACTOR;
            const hotZoneStartSq = hotZoneStart * hotZoneStart;
            if (distanceToCenterSq >
                hotZoneStartSq + 2 * hotZoneStart * worldSphere.radius + worldSphere.radius * worldSphere.radius) {
                positionalDistance = fastDistance;
                if (this.debugDrawEnabled) {
                    debugState = DebugCalculationState.Cheap;
                    if (distanceToCenter > GEOMETRY_EPSILON) {
                        const cheapClosestPoint = worldSphere.center.sub(worldSphere.center.sub(closestPointOnRayVec).normalize().uniformScale(worldSphere.radius));
                        debugClosestPointOnCollider = cheapClosestPoint;
                    }
                    else {
                        debugClosestPointOnCollider = worldSphere.center;
                    }
                }
            }
            else {
                const preciseClosestPoint = ColliderUtils_1.ColliderUtils.getClosestPointOnColliderToPoint(primaryCollider, closestPointOnRayVec);
                const projection = preciseClosestPoint.sub(segmentStart).dot(segDirNorm);
                const s = Math.max(0, Math.min(segLen, projection));
                const pointOnRay = segmentStart.add(segDirNorm.uniformScale(s));
                const preciseDistance = preciseClosestPoint.distance(pointOnRay);
                const nearZoneEnd = worldSphere.radius * PROXIMITY_NEAR_ZONE_FACTOR;
                if (fastDistance <= nearZoneEnd) {
                    positionalDistance = preciseDistance;
                    targetT = s * invSegLen;
                    coneRadiusAtT = baseRadius * targetT;
                    if (this.debugDrawEnabled) {
                        debugState = DebugCalculationState.Expensive;
                        debugClosestPointOnCollider = preciseClosestPoint;
                        debugClosestPointOnRay = pointOnRay;
                    }
                }
                else {
                    const denom = hotZoneStart - nearZoneEnd;
                    const blendAmount = denom > GEOMETRY_EPSILON ? Math.max(0, Math.min(1, (hotZoneStart - fastDistance) / denom)) : 1.0;
                    positionalDistance = MathUtils.lerp(fastDistance, preciseDistance, blendAmount);
                    const blendedTWorld = MathUtils.lerp(clampedTWorld, s, blendAmount);
                    targetT = blendedTWorld * invSegLen;
                    coneRadiusAtT = baseRadius * targetT;
                    if (this.debugDrawEnabled) {
                        debugState = DebugCalculationState.Blended;
                        const cheapClosestPoint = worldSphere.center.sub(worldSphere.center.sub(closestPointOnRayVec).normalize().uniformScale(worldSphere.radius));
                        debugClosestPointOnCollider = vec3.lerp(cheapClosestPoint, preciseClosestPoint, blendAmount);
                        debugClosestPointOnRay = vec3.lerp(closestPointOnRayVec, pointOnRay, blendAmount);
                    }
                }
            }
        }
        const baseScore = 1.0 / (positionalDistance + SCORE_DIVISOR_EPSILON);
        const linearBonus = Math.max(0, 1 - (coneRadiusAtT > 1e-4 ? Math.min(1, positionalDistance / coneRadiusAtT) : 0));
        const radialBonus = (0, mathUtils_1.smoothstep)(0.0, 1.0, linearBonus);
        const score = baseScore * (1.0 + radialBonus);
        const result = {
            score: score,
            targetT,
            radialDistance: alphaDistance,
            positionalDistance: positionalDistance,
            coneRadiusAtT,
            hotspotRadius,
            targetingVisual: this.getEffectiveTargetingVisual(interactable)
        };
        if (this.debugDrawEnabled) {
            result.debugState = debugState;
            result.debugClosestPointOnRay = debugClosestPointOnRay;
            result.debugClosestPointOnCollider = debugClosestPointOnCollider;
        }
        return result;
    }
    blendCachedInteractables(segmentStart, segDir) {
        const segLen = segDir.length;
        if (segLen <= MIN_LENGTH_SQUARED_THRESHOLD) {
            return null;
        }
        const invConeRadius = CONE_RADIUS > GEOMETRY_EPSILON ? 1.0 / CONE_RADIUS : 0;
        if (this.overlappingInteractables.size + this.overlappingPlanes.size === 0) {
            return null;
        }
        let maxDominanceFactor = 0.0;
        const calculateDominance = (data) => {
            if (data.score <= 0) {
                data.dominanceFactor = 0;
                return;
            }
            const scale = data.coneRadiusAtT * invConeRadius;
            const scaledDominanceRadius = DOMINANCE_RADIUS * scale;
            const scaledFadeWidth = DOMINANCE_FADE_WIDTH * scale;
            data.dominanceFactor = (0, mathUtils_1.smoothstep)(scaledDominanceRadius + scaledFadeWidth, scaledDominanceRadius, data.positionalDistance);
            maxDominanceFactor = Math.max(maxDominanceFactor, data.dominanceFactor);
        };
        for (const [plane, data] of this.overlappingPlanes.entries()) {
            if (!this.isPlaneEligible(plane)) {
                continue;
            }
            calculateDominance(data);
        }
        for (const [interactable, data] of this.overlappingInteractables.entries()) {
            if (!data.isEligibleThisFrame) {
                data.score = 0;
                continue;
            }
            data.targetingVisual = this.getEffectiveTargetingVisual(interactable);
            calculateDominance(data);
        }
        let totalPositioningScore = 0.0, blendedT = 0.0, overallAlphaMax = 0.0, alphaWeightedCursorScore = 0.0, alphaWeightedRayScore = 0.0;
        this.weightedCursorPosSum = vec3.zero();
        this.weightedRayPosSum = vec3.zero();
        const processBlendData = (data) => {
            if (data.targetingVisual === Interactable_1.TargetingVisual.None) {
                return;
            }
            const dominanceInfluence = 1.0 - maxDominanceFactor;
            const finalScore = data.score * (data.dominanceFactor > 0 ? 1.0 : dominanceInfluence);
            if (finalScore <= 0)
                return;
            totalPositioningScore += finalScore;
            blendedT += data.targetT * finalScore;
            const targetPos = segmentStart.add(segDir.uniformScale(data.targetT));
            if (data.targetingVisual === Interactable_1.TargetingVisual.Cursor) {
                this.weightedCursorPosSum = this.weightedCursorPosSum.add(targetPos.uniformScale(finalScore));
            }
            else if (data.targetingVisual === Interactable_1.TargetingVisual.Ray) {
                this.weightedRayPosSum = this.weightedRayPosSum.add(targetPos.uniformScale(finalScore));
            }
            const scale = data.coneRadiusAtT * invConeRadius;
            const fadeStart = data.hotspotRadius * scale;
            const fadeDistance = ALPHA_FADE_DISTANCE * scale;
            let individualAlpha = 0.0;
            if (fadeDistance > GEOMETRY_EPSILON) {
                individualAlpha = Math.max(0, Math.min(1, 1.0 - (data.radialDistance - fadeStart) / fadeDistance));
            }
            else if (data.radialDistance <= fadeStart) {
                individualAlpha = 1.0;
            }
            overallAlphaMax = Math.max(overallAlphaMax, individualAlpha);
            const alphaWeightedScore = finalScore * individualAlpha;
            if (data.targetingVisual === Interactable_1.TargetingVisual.Cursor) {
                alphaWeightedCursorScore += alphaWeightedScore;
            }
            else if (data.targetingVisual === Interactable_1.TargetingVisual.Ray) {
                alphaWeightedRayScore += alphaWeightedScore;
            }
        };
        for (const [plane, data] of this.overlappingPlanes.entries()) {
            if (!this.isPlaneEligible(plane)) {
                continue;
            }
            data.targetingVisual = plane.targetingVisual;
            processBlendData(data);
        }
        for (const [interactable, data] of this.overlappingInteractables.entries()) {
            if (!data.isEligibleThisFrame) {
                continue;
            }
            data.targetingVisual = this.getEffectiveTargetingVisual(interactable);
            processBlendData(data);
        }
        if (totalPositioningScore <= GEOMETRY_EPSILON) {
            return null;
        }
        const finalT = blendedT / totalPositioningScore;
        const overallAlpha = overallAlphaMax;
        const totalAlphaWeightedScore = alphaWeightedCursorScore + alphaWeightedRayScore;
        const rayInfluence = totalAlphaWeightedScore > GEOMETRY_EPSILON ? alphaWeightedRayScore / totalAlphaWeightedScore : 0.0;
        const finalRayAlpha = overallAlpha * rayInfluence;
        const finalCursorAlpha = overallAlpha * (1.0 - rayInfluence);
        return { targetT: finalT, cursorAlpha: finalCursorAlpha, rayAlpha: finalRayAlpha };
    }
    calculateCursorScale(cursorPosition) {
        const cameraPos = this.camera.getWorldPosition();
        const distanceSq = cursorPosition.distanceSquared(cameraPos);
        if (distanceSq <= this.minDistanceSquared)
            return MIN_SCALE;
        if (distanceSq >= this.maxDistanceSquared)
            return MAX_SCALE;
        const distance = Math.sqrt(distanceSq);
        const idealScale = distance * SCALING_FACTOR;
        const tunedScale = REFERENCE_SCALE + (idealScale - REFERENCE_SCALE) * SCALE_COMPENSATION_STRENGTH;
        return tunedScale;
    }
    getInteractionRay() {
        const segmentStart = this.interactor.startPoint;
        const length = this.interactor.maxRaycastDistance ?? this.segmentLength;
        const segmentEnd = segmentStart.add(this.interactor.direction.uniformScale(length));
        return { segmentStart, segmentEnd };
    }
    updateConeCollider(segmentStart, rayVector) {
        const desiredLength = this.interactor.maxRaycastDistance ?? this.segmentLength;
        const coneShape = this.coneCollider.shape;
        if (coneShape.length !== desiredLength) {
            coneShape.length = desiredLength;
            this.segmentLength = desiredLength;
        }
        const length = rayVector.length;
        let rayDir = vec3.down();
        if (length > MIN_LENGTH_SQUARED_THRESHOLD) {
            rayDir = rayVector.uniformScale(1.0 / length);
        }
        const coneXform = this.coneObject.getTransform();
        const centerPosition = segmentStart.add(rayDir.uniformScale(length * 0.5));
        coneXform.setWorldPosition(centerPosition);
        const rot = quat.rotationFromTo(vec3.down(), rayDir);
        coneXform.setWorldRotation(rot);
    }
    getEffectiveTargetingVisual(interactable) {
        const plane = (0, SceneObjectUtils_1.findScriptComponentInSelfOrParents)(interactable.sceneObject, InteractionPlane_1.InteractionPlane);
        if (!interactable.ignoreInteractionPlane && this.isPlaneEnabled(plane)) {
            return plane.targetingVisual;
        }
        return interactable.targetingVisual;
    }
    updateWithOverride(isTriggering) {
        this._cursorPosition = this.positionOverride;
        const scale = this.calculateCursorScale(this._cursorPosition);
        const shouldShow = this.shouldShowCursor();
        this.onCursorUpdateEvent.invoke({
            cursorEnabled: shouldShow,
            position: this.positionOverride,
            scale: scale,
            cursorAlpha: shouldShow ? 1.0 * this.fadeMultiplier : 0,
            rayAlpha: 0.0 * this.fadeMultiplier,
            isTriggering: isTriggering
        });
        this.lastHiddenTriggering = null;
    }
    hideCursor(isTriggering) {
        if (this.lastHiddenTriggering !== isTriggering) {
            this.context.snapDepthNextFrame = true;
            this.resetPoseFilters();
            this.cursorDepthSpring.reset();
            this.cursorDepthSpringSlow.reset();
            this.onCursorUpdateEvent.invoke({
                cursorEnabled: false,
                position: this._cursorPosition,
                scale: MIN_SCALE,
                cursorAlpha: 0.0,
                rayAlpha: 0.0,
                isTriggering: isTriggering
            });
            this.lastHiddenTriggering = isTriggering;
        }
    }
    initializeConeCollider(parent) {
        const coneObject = global.scene.createSceneObject("RayConeCollider");
        coneObject.setParent(parent);
        const coneCollider = coneObject.createComponent("Physics.ColliderComponent");
        const coneShape = Shape.createConeShape();
        coneShape.radius = CONE_RADIUS;
        coneShape.length = this.interactor.maxRaycastDistance ?? this.segmentLength;
        coneCollider.shape = coneShape;
        coneCollider.intangible = true;
        coneCollider.debugDrawEnabled = false;
        coneCollider.enabled = false;
        coneCollider.onOverlapEnter.add(this.onConeOverlapEnter.bind(this));
        coneCollider.onOverlapExit.add(this.onConeOverlapExit.bind(this));
        return coneObject;
    }
    onConeOverlapEnter(args) {
        const other = args.overlap.collider;
        if (!other)
            return;
        const interactable = this.interactionManager.getInteractableByCollider(other);
        if (interactable && !this.overlappingInteractables.has(interactable)) {
            this.overlappingInteractables.set(interactable, {
                score: 0,
                targetT: 0,
                radialDistance: Infinity,
                positionalDistance: Infinity,
                coneRadiusAtT: 0,
                hotspotRadius: 0,
                targetingVisual: Interactable_1.TargetingVisual.Cursor,
                dominanceFactor: 0,
                lastUpdated: 0
            });
            this.processingQueue.push(interactable);
        }
    }
    onConeOverlapExit(args) {
        const other = args.overlap.collider;
        if (!other)
            return;
        const interactable = this.interactionManager.getInteractableByCollider(other);
        if (interactable && this.overlappingInteractables.has(interactable)) {
            this.overlappingInteractables.delete(interactable);
        }
    }
    isPlaneInCone(plane, rayOrigin, rayDir, rayLength, tanConeAngle) {
        const { origin: planeCenter } = this.getPlaneWorldOriginAndAxes(plane);
        const planeXform = plane.getSceneObject().getTransform();
        const s = planeXform.getWorldScale();
        const halfWidth = Math.max(0, plane.planeSize.x * 0.5 * s.x);
        const halfHeight = Math.max(0, plane.planeSize.y * 0.5 * s.y);
        const planeRadiusSq = halfWidth * halfWidth + halfHeight * halfHeight;
        const planeRadius = Math.sqrt(planeRadiusSq);
        const vecToCenter = planeCenter.sub(rayOrigin);
        const toCenterDistSq = vecToCenter.lengthSquared;
        const maxDistance = rayLength + planeRadius;
        if (toCenterDistSq > maxDistance * maxDistance) {
            return false;
        }
        const distanceAlongAxis = vecToCenter.dot(rayDir);
        if (distanceAlongAxis > rayLength + planeRadius)
            return false;
        const coneRadiusAtPoint = distanceAlongAxis * tanConeAngle;
        const distanceToAxisSq = toCenterDistSq - distanceAlongAxis * distanceAlongAxis;
        const minSeparation = coneRadiusAtPoint + planeRadius;
        return distanceToAxisSq < minSeparation * minSeparation;
    }
    isPlaneEnabled(plane) {
        return !!(plane && plane.enabled && plane.sceneObject.isEnabledInHierarchy);
    }
    isPlaneEligible(plane) {
        return this.isPlaneEnabled(plane) && plane.targetingVisual !== Interactable_1.TargetingVisual.None;
    }
    isInteractableEligible(interactable) {
        if (!interactable ||
            isNull(interactable) ||
            !interactable.enabled ||
            !interactable.sceneObject.isEnabledInHierarchy) {
            return false;
        }
        const isIndirect = (interactable.targetingMode & Interactor_1.TargetingMode.Indirect) !== 0;
        if (!isIndirect) {
            return false;
        }
        const parentPlane = (0, SceneObjectUtils_1.findScriptComponentInSelfOrParents)(interactable.sceneObject, InteractionPlane_1.InteractionPlane);
        if (parentPlane) {
            if (!interactable.ignoreInteractionPlane && this.isPlaneEnabled(parentPlane)) {
                return false;
            }
        }
        const effectiveVisual = this.getEffectiveTargetingVisual(interactable);
        if (effectiveVisual === Interactable_1.TargetingVisual.None) {
            return false;
        }
        return true;
    }
    updateEligibilityCache() {
        for (const [interactable, data] of this.overlappingInteractables.entries()) {
            data.isEligibleThisFrame = this.isInteractableEligible(interactable);
        }
    }
}
exports.CursorViewModel = CursorViewModel;
//# sourceMappingURL=CursorViewModelV2.js.map