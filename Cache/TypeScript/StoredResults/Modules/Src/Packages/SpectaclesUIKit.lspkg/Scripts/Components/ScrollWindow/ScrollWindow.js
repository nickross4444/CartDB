"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollWindow = void 0;
var __selfType = requireType("./ScrollWindow");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Interactable_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable");
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider");
const SIK_1 = require("SpectaclesInteractionKit.lspkg/SIK");
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const ReplayEvent_1 = require("SpectaclesInteractionKit.lspkg/Utils/ReplayEvent");
const springAnimate_1 = require("SpectaclesInteractionKit.lspkg/Utils/springAnimate");
const Frustum_1 = require("../../Utility/Frustum");
const SceneUtilities_1 = require("../../Utility/SceneUtilities");
const UIKitUtilities_1 = require("../../Utility/UIKitUtilities");
// a small number
const EPSILON = 0.0025;
// time window for additive gestures
const GESTURE_ACCUMULATION_TIME_MS = 300;
// minimum velocity to be considered for spring
const SIGNIFICANT_VELOCITY_THRESHOLD = 0.1;
// how much to decay velocity when accumulating
const VELOCITY_DECAY_FACTOR = 0.7;
// how fast to fling
const FLING_MULTIPLIER = 1;
// how fast to slow
const FRICTION_FACTOR = 0.95;
// how much overshoot is allowed max
const MAX_OVERSHOOT_FACTOR = 0.45;
// Minimum velocity before lerping is applied
const MINIMUM_SCROLLING_VELOCITY = 0.15;
/**
 * A low-level scrolling interaction solution for Spectacles.
 *
 * Children of this Component's SceneObject will be masked into windowSize and scrollable by scrollDimensions
 */
let ScrollWindow = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ScrollWindow = _classThis = class extends _classSuper {
        constructor() {
            super();
            // inputs
            this.vertical = this.vertical;
            this.horizontal = this.horizontal;
            this.windowSize = this.windowSize;
            this.scrollDimensions = this.scrollDimensions;
            this._scrollSnapping = this._scrollSnapping;
            this._snapRegion = this._snapRegion;
            this.edgeFade = this.edgeFade;
            this.initialized = false;
            this._scrollingPaused = false;
            // world camera
            this.camera = WorldCameraFinderProvider_1.default.getInstance();
            this.cameraComponent = this.camera.getComponent();
            this.mesh = requireAsset("../../../Meshes/Unit Plane.mesh");
            this.material = requireAsset("../../../Materials/ScrollWindowFadeMask.mat");
            this.managedSceneObjects = [];
            this.managedComponents = [];
            /**
             * frustum that handles helper viewport logic
             * use this to test if your content is visible
             */
            this.frustum = new Frustum_1.Frustum();
            // scroll logic
            this.startPosition = vec3.zero();
            this.interactorOffset = vec3.zero();
            this.interactorUpdated = false;
            /**
             * The currently active interactor controlling this scroll window
             */
            this.activeInteractor = null;
            /**
             * is currently dragging
             */
            this.isDragging = false;
            /**
             * is currently bouncing back
             */
            this.velocity = vec3.zero();
            this.accumulatedVelocity = vec3.zero();
            this.lastPosition = this.startPosition;
            this.lastGestureEndTime = 0;
            this.dragAmount = vec2.zero();
            this.onInitializedEvent = new ReplayEvent_1.default();
            this.scrollDragEvent = new Event_1.default();
            this.onScrollDimensionsUpdatedEvent = new Event_1.default();
            this.onScrollPositionUpdatedEvent = new Event_1.default();
            this.scrollTweenCancel = new animate_1.CancelSet();
            this.onInitialized = this.onInitializedEvent.publicApi();
            /**
             * use this event to execute logic on drag
             */
            this.onScrollDrag = this.scrollDragEvent.publicApi();
            /**
             * use this event to execute logic on scroll dimensions update
             */
            this.onScrollDimensionsUpdated = this.onScrollDimensionsUpdatedEvent.publicApi();
            /**
             * use this event to execute logic on scroll position update
             * - position is in local space
             */
            this.onScrollPositionUpdated = this.onScrollPositionUpdatedEvent.publicApi();
            /**
             * disable bounce back
             */
            this.hardStopAtEnds = false;
            /**
             * When an Interactor hovers the ScrollWindow within this boundary (using normalized positions from -1 to 1),
             * all child ColliderComponents will be enabled.
             *
             * For example, if we provide a Rect with Rect.create(-1, 1, -0.8, 1),
             * hovering the bottom 10% of the ScrollWindow will not enable the child ColliderComponents.
             */
            this.enableChildCollidersBoundary = Rect.create(-1, 1, -1, 1);
            /**
             * turn on top secret debug visuals
             */
            this.debugRender = false;
            this.colliderShape = Shape.createBoxShape();
            this.spring = new springAnimate_1.SpringAnimate(150, 21, 1);
            this.isSubscribedToEvents = false;
            this.eventUnsubscribes = [];
            /**
             *
             * @param size set masked window to this size in local space
             */
            this.setWindowSize = (size) => {
                this.windowSize = size;
                this.screenTransform.anchors.left = this.windowSize.x * -0.5;
                this.screenTransform.anchors.right = this.windowSize.x * 0.5;
                this.screenTransform.anchors.bottom = this.windowSize.y * -0.5;
                this.screenTransform.anchors.top = this.windowSize.y * 0.5;
                if (this.edgeFade) {
                    this.material.mainPass.windowSize = size;
                    this.material.mainPass.radius = this.maskingComponent.cornerRadius;
                }
                this.colliderShape.size = new vec3(this.windowSize.x, this.windowSize.y, 1);
                this.collider.shape = this.colliderShape;
            };
            /**
             *
             * @returns vec2 of this current window size
             */
            this.getWindowSize = () => this.windowSize;
            /**
             *
             * @param size set scrolling dimensions to this size in local space
             */
            this.setScrollDimensions = (size) => {
                this.scrollDimensions = size;
                this.setWindowSize(this.windowSize);
                this.onScrollDimensionsUpdatedEvent.invoke(this.scrollDimensions);
            };
            /**
             *
             * @returns vec2 of current scroll dimensions
             */
            this.getScrollDimensions = () => this.scrollDimensions;
            /**
             *
             * @param enable enable or disable black fade masked edge
             */
            this.enableEdgeFade = (enable) => {
                this.edgeFade = enable;
                if (enable && !this.rmv) {
                    this.createEdgeFade();
                }
                this.rmv.enabled = enable;
            };
            /**
             *
             * initializes script, runs once on creation
             */
            this.initialize = () => {
                if (this.initialized)
                    return;
                this.transform = this.sceneObject.getTransform();
                /**
                 * when you create this, does it overwrite existing local transform?
                 */
                this.screenTransform =
                    this.sceneObject.getComponent("ScreenTransform") || this.sceneObject.createComponent("ScreenTransform");
                /**
                 * like i gotta do this??
                 */
                this.screenTransform.position = this.transform.getLocalPosition();
                this.collider =
                    this.sceneObject.getComponent("ColliderComponent") || this.sceneObject.createComponent("ColliderComponent");
                this.managedComponents.push(this.collider);
                this.maskingComponent =
                    this.sceneObject.getComponent("MaskingComponent") || this.sceneObject.createComponent("MaskingComponent");
                this.managedComponents.push(this.maskingComponent);
                this._interactable =
                    this.sceneObject.getComponent(Interactable_1.Interactable.getTypeName()) ||
                        this.sceneObject.createComponent(Interactable_1.Interactable.getTypeName());
                this.managedComponents.push(this._interactable);
                this._interactable.isScrollable = true;
                if (this.edgeFade) {
                    this.createEdgeFade();
                }
                this.setWindowSize(this.windowSize);
                this.collider.shape = this.colliderShape;
                this.collider.fitVisual = false;
                this.collider.debugDrawEnabled = this.debugRender;
                this._interactable.enableInstantDrag = true;
                const currentChildren = [...this.sceneObject.children];
                this.scroller = global.scene.createSceneObject("Scroller");
                this.managedSceneObjects.push(this.scroller);
                this.scroller.layer = this.sceneObject.layer;
                this.scroller.setParent(this.sceneObject);
                this.scrollerTransform = this.scroller.getTransform();
                // move children under this.scroller
                for (let i = 0; i < currentChildren.length; i++) {
                    const thisChild = currentChildren[i];
                    thisChild.setParent(this.scroller);
                }
                this.subscribeToEvents(this.enabled);
                this.initialized = true;
                this.onInitializedEvent.invoke();
            };
            this.subscribeToEvents = (subscribe) => {
                const onHoverStart = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    const intersection = event.interactor.raycastPlaneIntersection(this._interactable);
                    if (intersection) {
                        const localIntersection = this.screenTransform.worldPointToLocalPoint(intersection);
                        if (localIntersection.x < this.enableChildCollidersBoundary.left ||
                            localIntersection.x > this.enableChildCollidersBoundary.right ||
                            localIntersection.y < this.enableChildCollidersBoundary.bottom ||
                            localIntersection.y > this.enableChildCollidersBoundary.top) {
                            event.stopPropagation();
                        }
                        else {
                            this.enableChildColliders(true);
                        }
                    }
                    else {
                        this.enableChildColliders(false);
                    }
                };
                const onHoverUpdate = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    const intersection = event.interactor.raycastPlaneIntersection(this._interactable);
                    if (intersection) {
                        const localIntersection = this.screenTransform.worldPointToLocalPoint(intersection);
                        if (localIntersection.x < this.enableChildCollidersBoundary.left ||
                            localIntersection.x > this.enableChildCollidersBoundary.right ||
                            localIntersection.y < this.enableChildCollidersBoundary.bottom ||
                            localIntersection.y > this.enableChildCollidersBoundary.top) {
                            event.stopPropagation();
                        }
                        else {
                            this.enableChildColliders(true);
                        }
                    }
                    else {
                        this.enableChildColliders(false);
                    }
                };
                const onHoverEnd = () => {
                    this.enableChildColliders(false);
                };
                const onTriggerStart = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    // If there's already an active interactor, cancel it first
                    if (this.activeInteractor && this.activeInteractor !== event.interactor) {
                        this.cancelCurrentInteractor();
                    }
                    // Set new active interactor
                    this.activeInteractor = event.interactor;
                    // Reset state for new interaction
                    this.startPosition = this.scrollerTransform.getLocalPosition();
                    this.lastPosition = this.startPosition;
                    this.interactorOffset = vec3.zero();
                    this.velocity = vec3.zero();
                    this.interactorUpdated = false;
                    this.dragAmount = vec2.zero();
                };
                const onTriggerCanceled = (event) => {
                    // Only process cancellation from the active interactor
                    if (this.activeInteractor !== event.interactor) {
                        return;
                    }
                    this.cancelCurrentInteractor();
                    // Apply any accumulated velocity from previous gestures if we have momentum
                    if (this.accumulatedVelocity.length > 0) {
                        // Use existing accumulated velocity for continued scrolling
                        this.spring.velocity = this.accumulatedVelocity.uniformScale(FLING_MULTIPLIER);
                    }
                    else {
                        // No accumulated velocity, stop completely
                        this.spring.velocity = vec3.zero();
                    }
                };
                const onDragUpdate = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    if (this.activeInteractor?.inputType !== event.interactor.inputType) {
                        return;
                    }
                    if (event.interactor) {
                        const interactedElement = (0, UIKitUtilities_1.getElement)(event.interactor.currentInteractable.sceneObject);
                        if (interactedElement && interactedElement.isDraggable && !interactedElement.inactive) {
                            return;
                        }
                        const raycastToWindow = event.interactor.raycastPlaneIntersection(this._interactable);
                        if (raycastToWindow) {
                            this.scrollTweenCancel();
                            const interactorPos = this.transform
                                .getInvertedWorldTransform()
                                .multiplyPoint(event.interactor.raycastPlaneIntersection(this._interactable));
                            if (!this.interactorUpdated) {
                                this.interactorOffset = interactorPos;
                                this.interactorUpdated = true;
                                this.isDragging = true;
                                this.cancelChildInteraction(event);
                            }
                            this.dragAmount = interactorPos.sub(this.interactorOffset);
                            let newPosition = this.startPosition.add(interactorPos.sub(this.interactorOffset));
                            newPosition.z = 0;
                            // Overscroll logic for rubber band effect
                            if (!this.hardStopAtEnds && this.isOutOfBounds(newPosition)) {
                                const clampedBounds = this.getClampedBounds(newPosition);
                                const overshootAmount = newPosition.sub(clampedBounds);
                                const overshootWithResistance = this.applyOverscrollResistance(overshootAmount);
                                newPosition = clampedBounds.add(overshootWithResistance);
                            }
                            this.updateScrollerPosition(newPosition);
                            this.scrollDragEvent.invoke({
                                startPosition: this.startPosition,
                                dragAmount: this.dragAmount
                            });
                            if (event.target.sceneObject === this.sceneObject || event.propagationPhase === "BubbleUp") {
                                const newVelocity = newPosition.sub(this.lastPosition);
                                newVelocity.z = 0;
                                if (Math.abs(newVelocity.x) > SIGNIFICANT_VELOCITY_THRESHOLD ||
                                    Math.abs(newVelocity.y) > SIGNIFICANT_VELOCITY_THRESHOLD) {
                                    this.velocity = newVelocity;
                                }
                                this.lastPosition = newPosition;
                            }
                        }
                        const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(event.interactor);
                        if (cursor) {
                            cursor.cursorPosition = event.interactor.planecastPoint;
                        }
                    }
                };
                const onDragEnd = (event) => {
                    if (this.activeInteractor !== event.interactor) {
                        return;
                    }
                    this.activeInteractor = null;
                    this.isDragging = false;
                    if (event.target.sceneObject !== this.sceneObject) {
                        const interactedElement = (0, UIKitUtilities_1.getElement)(event.target.sceneObject);
                        if (!interactedElement?.isDraggable) {
                            event.stopPropagation();
                        }
                    }
                    const currentTime = getTime() * 1000; // Convert to milliseconds
                    const timeSinceLastGesture = currentTime - this.lastGestureEndTime;
                    // Check if this gesture is within the accumulation time window
                    if (timeSinceLastGesture <= GESTURE_ACCUMULATION_TIME_MS) {
                        // Check if velocities are in the same direction
                        const currentDirection = {
                            x: Math.sign(this.velocity.x),
                            y: Math.sign(this.velocity.y)
                        };
                        const accumulatedDirection = {
                            x: Math.sign(this.accumulatedVelocity.x),
                            y: Math.sign(this.accumulatedVelocity.y)
                        };
                        // Only accumulate if directions match (or accumulated velocity is zero)
                        const shouldAccumulateX = this.accumulatedVelocity.x === 0 || currentDirection.x === accumulatedDirection.x;
                        const shouldAccumulateY = this.accumulatedVelocity.y === 0 || currentDirection.y === accumulatedDirection.y;
                        if (shouldAccumulateX || shouldAccumulateY) {
                            // Apply decay to previous accumulated velocity based on time
                            const timeFactor = 1 - timeSinceLastGesture / GESTURE_ACCUMULATION_TIME_MS;
                            const decayFactor = VELOCITY_DECAY_FACTOR * timeFactor;
                            // Accumulate velocities for matching directions
                            const newAccumulatedVelocity = vec3.zero();
                            if (shouldAccumulateX) {
                                newAccumulatedVelocity.x = this.accumulatedVelocity.x * decayFactor + this.velocity.x;
                            }
                            else {
                                newAccumulatedVelocity.x = this.velocity.x;
                            }
                            if (shouldAccumulateY) {
                                newAccumulatedVelocity.y = this.accumulatedVelocity.y * decayFactor + this.velocity.y;
                            }
                            else {
                                newAccumulatedVelocity.y = this.velocity.y;
                            }
                            this.accumulatedVelocity = newAccumulatedVelocity;
                        }
                        else {
                            // Direction changed, start fresh
                            this.accumulatedVelocity = this.velocity;
                        }
                    }
                    else {
                        // Too much time passed, start fresh
                        this.accumulatedVelocity = this.velocity;
                    }
                    // Apply the accumulated velocity to spring
                    this.spring.velocity = this.accumulatedVelocity.uniformScale(FLING_MULTIPLIER);
                    this.lastGestureEndTime = currentTime;
                    const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(event.interactor);
                    if (cursor) {
                        cursor.cursorPosition = null;
                    }
                };
                if (this.isSubscribedToEvents === subscribe)
                    return;
                this.isSubscribedToEvents = subscribe;
                if (subscribe) {
                    this.eventUnsubscribes = [
                        this._interactable.onHoverEnter.add(onHoverStart.bind(this)),
                        this._interactable.onHoverUpdate.add(onHoverUpdate.bind(this)),
                        this._interactable.onHoverExit.add(onHoverEnd.bind(this)),
                        this._interactable.onInteractorTriggerStart.add(onTriggerStart.bind(this)),
                        this._interactable.onTriggerCanceled.add(onTriggerCanceled.bind(this)),
                        this._interactable.onDragUpdate.add(onDragUpdate.bind(this)),
                        this._interactable.onDragEnd.add(onDragEnd.bind(this))
                    ];
                }
                else {
                    this.eventUnsubscribes.forEach((unsubscribe) => unsubscribe());
                    this.eventUnsubscribes = [];
                }
            };
            /**
             * helper function to tween scroll
             * @param position final position
             * @param time duration of tweened scroll in milliseconds
             */
            this.tweenTo = (position, time) => {
                this.scrollTweenCancel();
                this.spring.velocity = vec3.zero();
                const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
                const finalPosition = new vec3(position.x, position.y, scrollerLocalPosition.z);
                (0, animate_1.default)({
                    duration: time * 0.001,
                    update: (t) => {
                        this.updateScrollerPosition(vec3.lerp(scrollerLocalPosition, finalPosition, t));
                    },
                    cancelSet: this.scrollTweenCancel,
                    easing: "ease-in-out-quad"
                });
            };
            /**
             *
             * @returns current fling velocity
             */
            this.getVelocity = () => this.spring.velocity;
            this.setVelocity = (velocity) => {
                this.spring.velocity = new vec3(velocity.x, velocity.y, this.spring.velocityZ);
            };
            this.enableChildColliders = (enable) => {
                const childColliders = (0, SceneUtilities_1.findAllChildComponents)(this.sceneObject, "ColliderComponent");
                for (let i = 0; i < childColliders.length; i++) {
                    const collider = childColliders[i];
                    if (collider === this.collider)
                        continue;
                    collider.enabled = enable;
                }
            };
            this.cancelCurrentInteractor = () => {
                this.activeInteractor = null;
                this.isDragging = false;
                this.interactorUpdated = false;
                this.velocity = vec3.zero();
                this.dragAmount = vec2.zero();
                this.interactorOffset = vec3.zero();
                this.enableChildColliders(false);
                this.scrollTweenCancel();
                // Reset spring state to prevent overflow corruption during pause
                this.spring.velocity = vec3.zero();
                // If we're out of bounds, snap back to clamped position immediately
                if (!this.hardStopAtEnds) {
                    const currentPosition = this.scrollerTransform.getLocalPosition();
                    if (this.isOutOfBounds(currentPosition)) {
                        const clampedPosition = this.getClampedBounds(currentPosition);
                        this.updateScrollerPosition(clampedPosition);
                    }
                }
            };
            this.cancelChildInteraction = (e) => {
                const childInteractables = (0, SceneUtilities_1.findAllChildComponents)(this.sceneObject, Interactable_1.Interactable.getTypeName());
                for (let i = 0; i < childInteractables.length; i++) {
                    const interactable = childInteractables[i];
                    if (interactable === this._interactable)
                        continue;
                    interactable.triggerCanceled(e);
                }
            };
            this.createEdgeFade = () => {
                this.rmv = this.sceneObject.getComponent("RenderMeshVisual") || this.sceneObject.createComponent("RenderMeshVisual");
                this.managedComponents.push(this.rmv);
                this.rmv.mesh = this.mesh;
                this.material = this.material.clone();
                this.rmv.mainMaterial = this.material;
            };
            this.updateScrollerPosition = (newPosition) => {
                const currentPos = this.scrollerTransform.getLocalPosition();
                if (this.hardStopAtEnds) {
                    if (this.scrollDimensions.y !== -1 && (newPosition.y < this.topEdge || newPosition.y > this.bottomEdge)) {
                        newPosition.y = currentPos.y;
                    }
                    if (this.scrollDimensions.x !== -1 && (newPosition.x > this.leftEdge || newPosition.x < this.rightEdge)) {
                        newPosition.x = currentPos.x;
                    }
                }
                if (!this.horizontal)
                    newPosition.x = currentPos.x;
                if (!this.vertical)
                    newPosition.y = currentPos.y;
                this.scrollerTransform.setLocalPosition(newPosition);
                this.onScrollPositionUpdatedEvent.invoke(new vec2(newPosition.x, newPosition.y));
                return newPosition;
            };
            this.update = () => {
                const scale = this.transform.getWorldScale();
                // calculate frustum visible through scroll window
                this.frustum.setFromNearPlane(this.camera, this.cameraComponent.far, new vec2((this.screenTransform.anchors.right - this.screenTransform.anchors.left) * scale.x, (this.screenTransform.anchors.top - this.screenTransform.anchors.bottom) * scale.y), this.transform);
                if (this.debugRender) {
                    this.frustum.render();
                }
                /**
                 * If the scroll window is scrollingPaused, don't update the scroll position
                 * and do not update the scroller position or velocity
                 */
                if (this.scrollingPaused)
                    return;
                if ((this.horizontal && (this.scrollDimensions.x === -1 || this.scrollDimensions.x > this.windowSize.x)) ||
                    (this.vertical && (this.scrollDimensions.y === -1 || this.scrollDimensions.y > this.windowSize.y))) {
                    // overshoot logic
                    if (!this.isDragging && !this.hardStopAtEnds) {
                        let cScrollPosition = this.scrollerTransform.getLocalPosition();
                        const clamped = this.getClampedBounds(cScrollPosition);
                        const isOutOfBounds = this.isOutOfBounds(cScrollPosition);
                        if (isOutOfBounds) {
                            this.spring.evaluate(cScrollPosition, clamped, cScrollPosition);
                            const isNowInBounds = !this.isOutOfBounds(cScrollPosition);
                            if (isNowInBounds) {
                                this.updateScrollerPosition(clamped);
                                this.spring.velocity = vec3.zero();
                            }
                            else {
                                this.updateScrollerPosition(cScrollPosition);
                            }
                        }
                        else {
                            let scrollPositionUpdated = false;
                            if (this.horizontal) {
                                if (this.scrollSnapping && this.snapRegion.x > 0) {
                                    // Calculate current page index (handle negative positions correctly)
                                    const currentPageFloat = this.scrollPosition.x / this.snapRegion.x;
                                    let currentPageIndex = Math.round(currentPageFloat);
                                    if (this.spring.velocityX > 0) {
                                        currentPageIndex = Math.floor(currentPageFloat);
                                    }
                                    else if (this.spring.velocityX < 0) {
                                        currentPageIndex = Math.ceil(currentPageFloat);
                                    }
                                    // Calculate how far the current velocity can take us
                                    let targetPageIndex = currentPageIndex;
                                    if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY) {
                                        // Calculate maximum reachable distance with current velocity
                                        const initialVelocity = Math.abs(this.spring.velocityX);
                                        const totalReachableDistance = initialVelocity / (1 - FRICTION_FACTOR);
                                        // Determine how many pages we can reach
                                        const reachablePages = Math.floor(totalReachableDistance / this.snapRegion.x);
                                        // Set target based on velocity direction
                                        if (this.spring.velocityX > 0) {
                                            // Moving right - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex + Math.max(1, reachablePages);
                                        }
                                        else {
                                            // Moving left - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex - Math.max(1, reachablePages);
                                        }
                                    }
                                    else if (Math.abs(this.spring.velocityX) > 0) {
                                        // Low velocity - snap to nearest page
                                        if (this.spring.velocityX > 0) {
                                            targetPageIndex = Math.ceil(currentPageFloat);
                                        }
                                        else if (this.spring.velocityX < 0) {
                                            targetPageIndex = Math.floor(currentPageFloat);
                                        }
                                    }
                                    const targetPos = targetPageIndex * this.snapRegion.x;
                                    const distanceToTarget = targetPos - this.scrollPosition.x;
                                    const absDistanceToTarget = Math.abs(distanceToTarget);
                                    if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY &&
                                        absDistanceToTarget > this.snapRegion.x) {
                                        // Use proportional velocity reduction to prevent overshooting
                                        let adjustedVelocity = this.spring.velocityX * FRICTION_FACTOR;
                                        // If we're close to the target, reduce velocity more aggressively
                                        if (absDistanceToTarget < this.snapRegion.x) {
                                            const proximityFactor = absDistanceToTarget / this.snapRegion.x;
                                            adjustedVelocity *= proximityFactor;
                                        }
                                        // Ensure we don't overshoot the target
                                        if (Math.abs(adjustedVelocity) > absDistanceToTarget) {
                                            adjustedVelocity = Math.sign(distanceToTarget) * absDistanceToTarget;
                                        }
                                        this.spring.velocity = new vec3(adjustedVelocity, this.spring.velocityY, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(adjustedVelocity, 0, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityX) > 0 || absDistanceToTarget > 0) {
                                        // Low velocity or very close to target - tween for smooth finish
                                        // Stop current velocity to prevent conflicts
                                        this.spring.velocity = new vec3(0, this.spring.velocityY, this.spring.velocityZ);
                                        // Calculate appropriate tween duration based on remaining distance
                                        const baseDuration = 250; // Base duration in ms
                                        const maxDuration = 500; // Maximum duration
                                        const minDuration = 100; // Minimum duration
                                        const duration = MathUtils.clamp(baseDuration * (absDistanceToTarget / this.snapRegion.x), minDuration, maxDuration);
                                        // Tween to the exact target position
                                        this.tweenTo(new vec2(targetPos, this.scrollPosition.y), duration);
                                        scrollPositionUpdated = true;
                                    }
                                }
                                else {
                                    if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY) {
                                        const velX = this.spring.velocityX * FRICTION_FACTOR;
                                        this.spring.velocity = new vec3(velX, this.spring.velocityY, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(velX, 0, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityX) > 0) {
                                        this.spring.velocity = new vec3(0, this.spring.velocityY, this.spring.velocityZ);
                                        cScrollPosition = new vec3(clamped.x, cScrollPosition.y, cScrollPosition.z);
                                        scrollPositionUpdated = true;
                                    }
                                }
                            }
                            if (this.vertical) {
                                if (this.scrollSnapping && this.snapRegion.y > 0) {
                                    // Calculate current page index (handle negative positions correctly)
                                    const currentPageFloat = this.scrollPosition.y / this.snapRegion.y;
                                    let currentPageIndex = Math.round(currentPageFloat);
                                    if (this.spring.velocityY > 0) {
                                        currentPageIndex = Math.floor(currentPageFloat);
                                    }
                                    else if (this.spring.velocityY < 0) {
                                        currentPageIndex = Math.ceil(currentPageFloat);
                                    }
                                    // Calculate how far the current velocity can take us
                                    let targetPageIndex = currentPageIndex;
                                    if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY) {
                                        // Calculate maximum reachable distance with current velocity
                                        const initialVelocity = Math.abs(this.spring.velocityY);
                                        const totalReachableDistance = initialVelocity / (1 - FRICTION_FACTOR);
                                        // Determine how many pages we can reach
                                        const reachablePages = Math.floor(totalReachableDistance / this.snapRegion.y);
                                        // Set target based on velocity direction
                                        if (this.spring.velocityY > 0) {
                                            // Moving up - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex + Math.max(1, reachablePages);
                                        }
                                        else {
                                            // Moving down - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex - Math.max(1, reachablePages);
                                        }
                                    }
                                    else if (Math.abs(this.spring.velocityY) > 0) {
                                        // Low velocity - snap to nearest page
                                        if (this.spring.velocityY > 0) {
                                            targetPageIndex = Math.ceil(currentPageFloat);
                                        }
                                        else if (this.spring.velocityY < 0) {
                                            targetPageIndex = Math.floor(currentPageFloat);
                                        }
                                    }
                                    const targetPos = targetPageIndex * this.snapRegion.y;
                                    const distanceToTarget = targetPos - this.scrollPosition.y;
                                    const absDistanceToTarget = Math.abs(distanceToTarget);
                                    if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY &&
                                        absDistanceToTarget > this.snapRegion.y) {
                                        // Use proportional velocity reduction to prevent overshooting
                                        let adjustedVelocity = this.spring.velocityY * FRICTION_FACTOR;
                                        // If we're close to the target, reduce velocity more aggressively
                                        if (absDistanceToTarget < this.snapRegion.y) {
                                            const proximityFactor = absDistanceToTarget / this.snapRegion.y;
                                            adjustedVelocity *= proximityFactor;
                                        }
                                        // Ensure we don't overshoot the target
                                        if (Math.abs(adjustedVelocity) > absDistanceToTarget) {
                                            adjustedVelocity = Math.sign(distanceToTarget) * absDistanceToTarget;
                                        }
                                        this.spring.velocity = new vec3(this.spring.velocityX, adjustedVelocity, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(0, adjustedVelocity, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityY) > 0 || absDistanceToTarget > 0) {
                                        // Low velocity or very close to target - tween for smooth finish
                                        // Stop current velocity to prevent conflicts
                                        this.spring.velocity = new vec3(this.spring.velocityX, 0, this.spring.velocityZ);
                                        // Calculate appropriate tween duration based on remaining distance
                                        const baseDuration = 250; // Base duration in ms
                                        const maxDuration = 500; // Maximum duration
                                        const minDuration = 100; // Minimum duration
                                        const duration = MathUtils.clamp(baseDuration * (absDistanceToTarget / this.snapRegion.y), minDuration, maxDuration);
                                        // Tween to the exact target position
                                        this.tweenTo(new vec2(this.scrollPosition.x, targetPos), duration);
                                        scrollPositionUpdated = true;
                                    }
                                }
                                else {
                                    if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY) {
                                        const velY = this.spring.velocityY * FRICTION_FACTOR;
                                        this.spring.velocity = new vec3(this.spring.velocityX, velY, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(0, velY, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityY) > 0) {
                                        this.spring.velocity = new vec3(this.spring.velocityX, 0, this.spring.velocityZ);
                                        cScrollPosition = new vec3(cScrollPosition.x, clamped.y, cScrollPosition.z);
                                        scrollPositionUpdated = true;
                                    }
                                }
                            }
                            if (scrollPositionUpdated) {
                                this.updateScrollerPosition(cScrollPosition);
                            }
                        }
                    }
                }
            };
        }
        __initialize() {
            super.__initialize();
            // inputs
            this.vertical = this.vertical;
            this.horizontal = this.horizontal;
            this.windowSize = this.windowSize;
            this.scrollDimensions = this.scrollDimensions;
            this._scrollSnapping = this._scrollSnapping;
            this._snapRegion = this._snapRegion;
            this.edgeFade = this.edgeFade;
            this.initialized = false;
            this._scrollingPaused = false;
            // world camera
            this.camera = WorldCameraFinderProvider_1.default.getInstance();
            this.cameraComponent = this.camera.getComponent();
            this.mesh = requireAsset("../../../Meshes/Unit Plane.mesh");
            this.material = requireAsset("../../../Materials/ScrollWindowFadeMask.mat");
            this.managedSceneObjects = [];
            this.managedComponents = [];
            /**
             * frustum that handles helper viewport logic
             * use this to test if your content is visible
             */
            this.frustum = new Frustum_1.Frustum();
            // scroll logic
            this.startPosition = vec3.zero();
            this.interactorOffset = vec3.zero();
            this.interactorUpdated = false;
            /**
             * The currently active interactor controlling this scroll window
             */
            this.activeInteractor = null;
            /**
             * is currently dragging
             */
            this.isDragging = false;
            /**
             * is currently bouncing back
             */
            this.velocity = vec3.zero();
            this.accumulatedVelocity = vec3.zero();
            this.lastPosition = this.startPosition;
            this.lastGestureEndTime = 0;
            this.dragAmount = vec2.zero();
            this.onInitializedEvent = new ReplayEvent_1.default();
            this.scrollDragEvent = new Event_1.default();
            this.onScrollDimensionsUpdatedEvent = new Event_1.default();
            this.onScrollPositionUpdatedEvent = new Event_1.default();
            this.scrollTweenCancel = new animate_1.CancelSet();
            this.onInitialized = this.onInitializedEvent.publicApi();
            /**
             * use this event to execute logic on drag
             */
            this.onScrollDrag = this.scrollDragEvent.publicApi();
            /**
             * use this event to execute logic on scroll dimensions update
             */
            this.onScrollDimensionsUpdated = this.onScrollDimensionsUpdatedEvent.publicApi();
            /**
             * use this event to execute logic on scroll position update
             * - position is in local space
             */
            this.onScrollPositionUpdated = this.onScrollPositionUpdatedEvent.publicApi();
            /**
             * disable bounce back
             */
            this.hardStopAtEnds = false;
            /**
             * When an Interactor hovers the ScrollWindow within this boundary (using normalized positions from -1 to 1),
             * all child ColliderComponents will be enabled.
             *
             * For example, if we provide a Rect with Rect.create(-1, 1, -0.8, 1),
             * hovering the bottom 10% of the ScrollWindow will not enable the child ColliderComponents.
             */
            this.enableChildCollidersBoundary = Rect.create(-1, 1, -1, 1);
            /**
             * turn on top secret debug visuals
             */
            this.debugRender = false;
            this.colliderShape = Shape.createBoxShape();
            this.spring = new springAnimate_1.SpringAnimate(150, 21, 1);
            this.isSubscribedToEvents = false;
            this.eventUnsubscribes = [];
            /**
             *
             * @param size set masked window to this size in local space
             */
            this.setWindowSize = (size) => {
                this.windowSize = size;
                this.screenTransform.anchors.left = this.windowSize.x * -0.5;
                this.screenTransform.anchors.right = this.windowSize.x * 0.5;
                this.screenTransform.anchors.bottom = this.windowSize.y * -0.5;
                this.screenTransform.anchors.top = this.windowSize.y * 0.5;
                if (this.edgeFade) {
                    this.material.mainPass.windowSize = size;
                    this.material.mainPass.radius = this.maskingComponent.cornerRadius;
                }
                this.colliderShape.size = new vec3(this.windowSize.x, this.windowSize.y, 1);
                this.collider.shape = this.colliderShape;
            };
            /**
             *
             * @returns vec2 of this current window size
             */
            this.getWindowSize = () => this.windowSize;
            /**
             *
             * @param size set scrolling dimensions to this size in local space
             */
            this.setScrollDimensions = (size) => {
                this.scrollDimensions = size;
                this.setWindowSize(this.windowSize);
                this.onScrollDimensionsUpdatedEvent.invoke(this.scrollDimensions);
            };
            /**
             *
             * @returns vec2 of current scroll dimensions
             */
            this.getScrollDimensions = () => this.scrollDimensions;
            /**
             *
             * @param enable enable or disable black fade masked edge
             */
            this.enableEdgeFade = (enable) => {
                this.edgeFade = enable;
                if (enable && !this.rmv) {
                    this.createEdgeFade();
                }
                this.rmv.enabled = enable;
            };
            /**
             *
             * initializes script, runs once on creation
             */
            this.initialize = () => {
                if (this.initialized)
                    return;
                this.transform = this.sceneObject.getTransform();
                /**
                 * when you create this, does it overwrite existing local transform?
                 */
                this.screenTransform =
                    this.sceneObject.getComponent("ScreenTransform") || this.sceneObject.createComponent("ScreenTransform");
                /**
                 * like i gotta do this??
                 */
                this.screenTransform.position = this.transform.getLocalPosition();
                this.collider =
                    this.sceneObject.getComponent("ColliderComponent") || this.sceneObject.createComponent("ColliderComponent");
                this.managedComponents.push(this.collider);
                this.maskingComponent =
                    this.sceneObject.getComponent("MaskingComponent") || this.sceneObject.createComponent("MaskingComponent");
                this.managedComponents.push(this.maskingComponent);
                this._interactable =
                    this.sceneObject.getComponent(Interactable_1.Interactable.getTypeName()) ||
                        this.sceneObject.createComponent(Interactable_1.Interactable.getTypeName());
                this.managedComponents.push(this._interactable);
                this._interactable.isScrollable = true;
                if (this.edgeFade) {
                    this.createEdgeFade();
                }
                this.setWindowSize(this.windowSize);
                this.collider.shape = this.colliderShape;
                this.collider.fitVisual = false;
                this.collider.debugDrawEnabled = this.debugRender;
                this._interactable.enableInstantDrag = true;
                const currentChildren = [...this.sceneObject.children];
                this.scroller = global.scene.createSceneObject("Scroller");
                this.managedSceneObjects.push(this.scroller);
                this.scroller.layer = this.sceneObject.layer;
                this.scroller.setParent(this.sceneObject);
                this.scrollerTransform = this.scroller.getTransform();
                // move children under this.scroller
                for (let i = 0; i < currentChildren.length; i++) {
                    const thisChild = currentChildren[i];
                    thisChild.setParent(this.scroller);
                }
                this.subscribeToEvents(this.enabled);
                this.initialized = true;
                this.onInitializedEvent.invoke();
            };
            this.subscribeToEvents = (subscribe) => {
                const onHoverStart = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    const intersection = event.interactor.raycastPlaneIntersection(this._interactable);
                    if (intersection) {
                        const localIntersection = this.screenTransform.worldPointToLocalPoint(intersection);
                        if (localIntersection.x < this.enableChildCollidersBoundary.left ||
                            localIntersection.x > this.enableChildCollidersBoundary.right ||
                            localIntersection.y < this.enableChildCollidersBoundary.bottom ||
                            localIntersection.y > this.enableChildCollidersBoundary.top) {
                            event.stopPropagation();
                        }
                        else {
                            this.enableChildColliders(true);
                        }
                    }
                    else {
                        this.enableChildColliders(false);
                    }
                };
                const onHoverUpdate = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    const intersection = event.interactor.raycastPlaneIntersection(this._interactable);
                    if (intersection) {
                        const localIntersection = this.screenTransform.worldPointToLocalPoint(intersection);
                        if (localIntersection.x < this.enableChildCollidersBoundary.left ||
                            localIntersection.x > this.enableChildCollidersBoundary.right ||
                            localIntersection.y < this.enableChildCollidersBoundary.bottom ||
                            localIntersection.y > this.enableChildCollidersBoundary.top) {
                            event.stopPropagation();
                        }
                        else {
                            this.enableChildColliders(true);
                        }
                    }
                    else {
                        this.enableChildColliders(false);
                    }
                };
                const onHoverEnd = () => {
                    this.enableChildColliders(false);
                };
                const onTriggerStart = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    // If there's already an active interactor, cancel it first
                    if (this.activeInteractor && this.activeInteractor !== event.interactor) {
                        this.cancelCurrentInteractor();
                    }
                    // Set new active interactor
                    this.activeInteractor = event.interactor;
                    // Reset state for new interaction
                    this.startPosition = this.scrollerTransform.getLocalPosition();
                    this.lastPosition = this.startPosition;
                    this.interactorOffset = vec3.zero();
                    this.velocity = vec3.zero();
                    this.interactorUpdated = false;
                    this.dragAmount = vec2.zero();
                };
                const onTriggerCanceled = (event) => {
                    // Only process cancellation from the active interactor
                    if (this.activeInteractor !== event.interactor) {
                        return;
                    }
                    this.cancelCurrentInteractor();
                    // Apply any accumulated velocity from previous gestures if we have momentum
                    if (this.accumulatedVelocity.length > 0) {
                        // Use existing accumulated velocity for continued scrolling
                        this.spring.velocity = this.accumulatedVelocity.uniformScale(FLING_MULTIPLIER);
                    }
                    else {
                        // No accumulated velocity, stop completely
                        this.spring.velocity = vec3.zero();
                    }
                };
                const onDragUpdate = (event) => {
                    if (this.scrollingPaused) {
                        return;
                    }
                    if (this.activeInteractor?.inputType !== event.interactor.inputType) {
                        return;
                    }
                    if (event.interactor) {
                        const interactedElement = (0, UIKitUtilities_1.getElement)(event.interactor.currentInteractable.sceneObject);
                        if (interactedElement && interactedElement.isDraggable && !interactedElement.inactive) {
                            return;
                        }
                        const raycastToWindow = event.interactor.raycastPlaneIntersection(this._interactable);
                        if (raycastToWindow) {
                            this.scrollTweenCancel();
                            const interactorPos = this.transform
                                .getInvertedWorldTransform()
                                .multiplyPoint(event.interactor.raycastPlaneIntersection(this._interactable));
                            if (!this.interactorUpdated) {
                                this.interactorOffset = interactorPos;
                                this.interactorUpdated = true;
                                this.isDragging = true;
                                this.cancelChildInteraction(event);
                            }
                            this.dragAmount = interactorPos.sub(this.interactorOffset);
                            let newPosition = this.startPosition.add(interactorPos.sub(this.interactorOffset));
                            newPosition.z = 0;
                            // Overscroll logic for rubber band effect
                            if (!this.hardStopAtEnds && this.isOutOfBounds(newPosition)) {
                                const clampedBounds = this.getClampedBounds(newPosition);
                                const overshootAmount = newPosition.sub(clampedBounds);
                                const overshootWithResistance = this.applyOverscrollResistance(overshootAmount);
                                newPosition = clampedBounds.add(overshootWithResistance);
                            }
                            this.updateScrollerPosition(newPosition);
                            this.scrollDragEvent.invoke({
                                startPosition: this.startPosition,
                                dragAmount: this.dragAmount
                            });
                            if (event.target.sceneObject === this.sceneObject || event.propagationPhase === "BubbleUp") {
                                const newVelocity = newPosition.sub(this.lastPosition);
                                newVelocity.z = 0;
                                if (Math.abs(newVelocity.x) > SIGNIFICANT_VELOCITY_THRESHOLD ||
                                    Math.abs(newVelocity.y) > SIGNIFICANT_VELOCITY_THRESHOLD) {
                                    this.velocity = newVelocity;
                                }
                                this.lastPosition = newPosition;
                            }
                        }
                        const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(event.interactor);
                        if (cursor) {
                            cursor.cursorPosition = event.interactor.planecastPoint;
                        }
                    }
                };
                const onDragEnd = (event) => {
                    if (this.activeInteractor !== event.interactor) {
                        return;
                    }
                    this.activeInteractor = null;
                    this.isDragging = false;
                    if (event.target.sceneObject !== this.sceneObject) {
                        const interactedElement = (0, UIKitUtilities_1.getElement)(event.target.sceneObject);
                        if (!interactedElement?.isDraggable) {
                            event.stopPropagation();
                        }
                    }
                    const currentTime = getTime() * 1000; // Convert to milliseconds
                    const timeSinceLastGesture = currentTime - this.lastGestureEndTime;
                    // Check if this gesture is within the accumulation time window
                    if (timeSinceLastGesture <= GESTURE_ACCUMULATION_TIME_MS) {
                        // Check if velocities are in the same direction
                        const currentDirection = {
                            x: Math.sign(this.velocity.x),
                            y: Math.sign(this.velocity.y)
                        };
                        const accumulatedDirection = {
                            x: Math.sign(this.accumulatedVelocity.x),
                            y: Math.sign(this.accumulatedVelocity.y)
                        };
                        // Only accumulate if directions match (or accumulated velocity is zero)
                        const shouldAccumulateX = this.accumulatedVelocity.x === 0 || currentDirection.x === accumulatedDirection.x;
                        const shouldAccumulateY = this.accumulatedVelocity.y === 0 || currentDirection.y === accumulatedDirection.y;
                        if (shouldAccumulateX || shouldAccumulateY) {
                            // Apply decay to previous accumulated velocity based on time
                            const timeFactor = 1 - timeSinceLastGesture / GESTURE_ACCUMULATION_TIME_MS;
                            const decayFactor = VELOCITY_DECAY_FACTOR * timeFactor;
                            // Accumulate velocities for matching directions
                            const newAccumulatedVelocity = vec3.zero();
                            if (shouldAccumulateX) {
                                newAccumulatedVelocity.x = this.accumulatedVelocity.x * decayFactor + this.velocity.x;
                            }
                            else {
                                newAccumulatedVelocity.x = this.velocity.x;
                            }
                            if (shouldAccumulateY) {
                                newAccumulatedVelocity.y = this.accumulatedVelocity.y * decayFactor + this.velocity.y;
                            }
                            else {
                                newAccumulatedVelocity.y = this.velocity.y;
                            }
                            this.accumulatedVelocity = newAccumulatedVelocity;
                        }
                        else {
                            // Direction changed, start fresh
                            this.accumulatedVelocity = this.velocity;
                        }
                    }
                    else {
                        // Too much time passed, start fresh
                        this.accumulatedVelocity = this.velocity;
                    }
                    // Apply the accumulated velocity to spring
                    this.spring.velocity = this.accumulatedVelocity.uniformScale(FLING_MULTIPLIER);
                    this.lastGestureEndTime = currentTime;
                    const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(event.interactor);
                    if (cursor) {
                        cursor.cursorPosition = null;
                    }
                };
                if (this.isSubscribedToEvents === subscribe)
                    return;
                this.isSubscribedToEvents = subscribe;
                if (subscribe) {
                    this.eventUnsubscribes = [
                        this._interactable.onHoverEnter.add(onHoverStart.bind(this)),
                        this._interactable.onHoverUpdate.add(onHoverUpdate.bind(this)),
                        this._interactable.onHoverExit.add(onHoverEnd.bind(this)),
                        this._interactable.onInteractorTriggerStart.add(onTriggerStart.bind(this)),
                        this._interactable.onTriggerCanceled.add(onTriggerCanceled.bind(this)),
                        this._interactable.onDragUpdate.add(onDragUpdate.bind(this)),
                        this._interactable.onDragEnd.add(onDragEnd.bind(this))
                    ];
                }
                else {
                    this.eventUnsubscribes.forEach((unsubscribe) => unsubscribe());
                    this.eventUnsubscribes = [];
                }
            };
            /**
             * helper function to tween scroll
             * @param position final position
             * @param time duration of tweened scroll in milliseconds
             */
            this.tweenTo = (position, time) => {
                this.scrollTweenCancel();
                this.spring.velocity = vec3.zero();
                const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
                const finalPosition = new vec3(position.x, position.y, scrollerLocalPosition.z);
                (0, animate_1.default)({
                    duration: time * 0.001,
                    update: (t) => {
                        this.updateScrollerPosition(vec3.lerp(scrollerLocalPosition, finalPosition, t));
                    },
                    cancelSet: this.scrollTweenCancel,
                    easing: "ease-in-out-quad"
                });
            };
            /**
             *
             * @returns current fling velocity
             */
            this.getVelocity = () => this.spring.velocity;
            this.setVelocity = (velocity) => {
                this.spring.velocity = new vec3(velocity.x, velocity.y, this.spring.velocityZ);
            };
            this.enableChildColliders = (enable) => {
                const childColliders = (0, SceneUtilities_1.findAllChildComponents)(this.sceneObject, "ColliderComponent");
                for (let i = 0; i < childColliders.length; i++) {
                    const collider = childColliders[i];
                    if (collider === this.collider)
                        continue;
                    collider.enabled = enable;
                }
            };
            this.cancelCurrentInteractor = () => {
                this.activeInteractor = null;
                this.isDragging = false;
                this.interactorUpdated = false;
                this.velocity = vec3.zero();
                this.dragAmount = vec2.zero();
                this.interactorOffset = vec3.zero();
                this.enableChildColliders(false);
                this.scrollTweenCancel();
                // Reset spring state to prevent overflow corruption during pause
                this.spring.velocity = vec3.zero();
                // If we're out of bounds, snap back to clamped position immediately
                if (!this.hardStopAtEnds) {
                    const currentPosition = this.scrollerTransform.getLocalPosition();
                    if (this.isOutOfBounds(currentPosition)) {
                        const clampedPosition = this.getClampedBounds(currentPosition);
                        this.updateScrollerPosition(clampedPosition);
                    }
                }
            };
            this.cancelChildInteraction = (e) => {
                const childInteractables = (0, SceneUtilities_1.findAllChildComponents)(this.sceneObject, Interactable_1.Interactable.getTypeName());
                for (let i = 0; i < childInteractables.length; i++) {
                    const interactable = childInteractables[i];
                    if (interactable === this._interactable)
                        continue;
                    interactable.triggerCanceled(e);
                }
            };
            this.createEdgeFade = () => {
                this.rmv = this.sceneObject.getComponent("RenderMeshVisual") || this.sceneObject.createComponent("RenderMeshVisual");
                this.managedComponents.push(this.rmv);
                this.rmv.mesh = this.mesh;
                this.material = this.material.clone();
                this.rmv.mainMaterial = this.material;
            };
            this.updateScrollerPosition = (newPosition) => {
                const currentPos = this.scrollerTransform.getLocalPosition();
                if (this.hardStopAtEnds) {
                    if (this.scrollDimensions.y !== -1 && (newPosition.y < this.topEdge || newPosition.y > this.bottomEdge)) {
                        newPosition.y = currentPos.y;
                    }
                    if (this.scrollDimensions.x !== -1 && (newPosition.x > this.leftEdge || newPosition.x < this.rightEdge)) {
                        newPosition.x = currentPos.x;
                    }
                }
                if (!this.horizontal)
                    newPosition.x = currentPos.x;
                if (!this.vertical)
                    newPosition.y = currentPos.y;
                this.scrollerTransform.setLocalPosition(newPosition);
                this.onScrollPositionUpdatedEvent.invoke(new vec2(newPosition.x, newPosition.y));
                return newPosition;
            };
            this.update = () => {
                const scale = this.transform.getWorldScale();
                // calculate frustum visible through scroll window
                this.frustum.setFromNearPlane(this.camera, this.cameraComponent.far, new vec2((this.screenTransform.anchors.right - this.screenTransform.anchors.left) * scale.x, (this.screenTransform.anchors.top - this.screenTransform.anchors.bottom) * scale.y), this.transform);
                if (this.debugRender) {
                    this.frustum.render();
                }
                /**
                 * If the scroll window is scrollingPaused, don't update the scroll position
                 * and do not update the scroller position or velocity
                 */
                if (this.scrollingPaused)
                    return;
                if ((this.horizontal && (this.scrollDimensions.x === -1 || this.scrollDimensions.x > this.windowSize.x)) ||
                    (this.vertical && (this.scrollDimensions.y === -1 || this.scrollDimensions.y > this.windowSize.y))) {
                    // overshoot logic
                    if (!this.isDragging && !this.hardStopAtEnds) {
                        let cScrollPosition = this.scrollerTransform.getLocalPosition();
                        const clamped = this.getClampedBounds(cScrollPosition);
                        const isOutOfBounds = this.isOutOfBounds(cScrollPosition);
                        if (isOutOfBounds) {
                            this.spring.evaluate(cScrollPosition, clamped, cScrollPosition);
                            const isNowInBounds = !this.isOutOfBounds(cScrollPosition);
                            if (isNowInBounds) {
                                this.updateScrollerPosition(clamped);
                                this.spring.velocity = vec3.zero();
                            }
                            else {
                                this.updateScrollerPosition(cScrollPosition);
                            }
                        }
                        else {
                            let scrollPositionUpdated = false;
                            if (this.horizontal) {
                                if (this.scrollSnapping && this.snapRegion.x > 0) {
                                    // Calculate current page index (handle negative positions correctly)
                                    const currentPageFloat = this.scrollPosition.x / this.snapRegion.x;
                                    let currentPageIndex = Math.round(currentPageFloat);
                                    if (this.spring.velocityX > 0) {
                                        currentPageIndex = Math.floor(currentPageFloat);
                                    }
                                    else if (this.spring.velocityX < 0) {
                                        currentPageIndex = Math.ceil(currentPageFloat);
                                    }
                                    // Calculate how far the current velocity can take us
                                    let targetPageIndex = currentPageIndex;
                                    if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY) {
                                        // Calculate maximum reachable distance with current velocity
                                        const initialVelocity = Math.abs(this.spring.velocityX);
                                        const totalReachableDistance = initialVelocity / (1 - FRICTION_FACTOR);
                                        // Determine how many pages we can reach
                                        const reachablePages = Math.floor(totalReachableDistance / this.snapRegion.x);
                                        // Set target based on velocity direction
                                        if (this.spring.velocityX > 0) {
                                            // Moving right - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex + Math.max(1, reachablePages);
                                        }
                                        else {
                                            // Moving left - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex - Math.max(1, reachablePages);
                                        }
                                    }
                                    else if (Math.abs(this.spring.velocityX) > 0) {
                                        // Low velocity - snap to nearest page
                                        if (this.spring.velocityX > 0) {
                                            targetPageIndex = Math.ceil(currentPageFloat);
                                        }
                                        else if (this.spring.velocityX < 0) {
                                            targetPageIndex = Math.floor(currentPageFloat);
                                        }
                                    }
                                    const targetPos = targetPageIndex * this.snapRegion.x;
                                    const distanceToTarget = targetPos - this.scrollPosition.x;
                                    const absDistanceToTarget = Math.abs(distanceToTarget);
                                    if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY &&
                                        absDistanceToTarget > this.snapRegion.x) {
                                        // Use proportional velocity reduction to prevent overshooting
                                        let adjustedVelocity = this.spring.velocityX * FRICTION_FACTOR;
                                        // If we're close to the target, reduce velocity more aggressively
                                        if (absDistanceToTarget < this.snapRegion.x) {
                                            const proximityFactor = absDistanceToTarget / this.snapRegion.x;
                                            adjustedVelocity *= proximityFactor;
                                        }
                                        // Ensure we don't overshoot the target
                                        if (Math.abs(adjustedVelocity) > absDistanceToTarget) {
                                            adjustedVelocity = Math.sign(distanceToTarget) * absDistanceToTarget;
                                        }
                                        this.spring.velocity = new vec3(adjustedVelocity, this.spring.velocityY, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(adjustedVelocity, 0, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityX) > 0 || absDistanceToTarget > 0) {
                                        // Low velocity or very close to target - tween for smooth finish
                                        // Stop current velocity to prevent conflicts
                                        this.spring.velocity = new vec3(0, this.spring.velocityY, this.spring.velocityZ);
                                        // Calculate appropriate tween duration based on remaining distance
                                        const baseDuration = 250; // Base duration in ms
                                        const maxDuration = 500; // Maximum duration
                                        const minDuration = 100; // Minimum duration
                                        const duration = MathUtils.clamp(baseDuration * (absDistanceToTarget / this.snapRegion.x), minDuration, maxDuration);
                                        // Tween to the exact target position
                                        this.tweenTo(new vec2(targetPos, this.scrollPosition.y), duration);
                                        scrollPositionUpdated = true;
                                    }
                                }
                                else {
                                    if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY) {
                                        const velX = this.spring.velocityX * FRICTION_FACTOR;
                                        this.spring.velocity = new vec3(velX, this.spring.velocityY, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(velX, 0, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityX) > 0) {
                                        this.spring.velocity = new vec3(0, this.spring.velocityY, this.spring.velocityZ);
                                        cScrollPosition = new vec3(clamped.x, cScrollPosition.y, cScrollPosition.z);
                                        scrollPositionUpdated = true;
                                    }
                                }
                            }
                            if (this.vertical) {
                                if (this.scrollSnapping && this.snapRegion.y > 0) {
                                    // Calculate current page index (handle negative positions correctly)
                                    const currentPageFloat = this.scrollPosition.y / this.snapRegion.y;
                                    let currentPageIndex = Math.round(currentPageFloat);
                                    if (this.spring.velocityY > 0) {
                                        currentPageIndex = Math.floor(currentPageFloat);
                                    }
                                    else if (this.spring.velocityY < 0) {
                                        currentPageIndex = Math.ceil(currentPageFloat);
                                    }
                                    // Calculate how far the current velocity can take us
                                    let targetPageIndex = currentPageIndex;
                                    if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY) {
                                        // Calculate maximum reachable distance with current velocity
                                        const initialVelocity = Math.abs(this.spring.velocityY);
                                        const totalReachableDistance = initialVelocity / (1 - FRICTION_FACTOR);
                                        // Determine how many pages we can reach
                                        const reachablePages = Math.floor(totalReachableDistance / this.snapRegion.y);
                                        // Set target based on velocity direction
                                        if (this.spring.velocityY > 0) {
                                            // Moving up - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex + Math.max(1, reachablePages);
                                        }
                                        else {
                                            // Moving down - target the farthest reachable page in that direction
                                            targetPageIndex = currentPageIndex - Math.max(1, reachablePages);
                                        }
                                    }
                                    else if (Math.abs(this.spring.velocityY) > 0) {
                                        // Low velocity - snap to nearest page
                                        if (this.spring.velocityY > 0) {
                                            targetPageIndex = Math.ceil(currentPageFloat);
                                        }
                                        else if (this.spring.velocityY < 0) {
                                            targetPageIndex = Math.floor(currentPageFloat);
                                        }
                                    }
                                    const targetPos = targetPageIndex * this.snapRegion.y;
                                    const distanceToTarget = targetPos - this.scrollPosition.y;
                                    const absDistanceToTarget = Math.abs(distanceToTarget);
                                    if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY &&
                                        absDistanceToTarget > this.snapRegion.y) {
                                        // Use proportional velocity reduction to prevent overshooting
                                        let adjustedVelocity = this.spring.velocityY * FRICTION_FACTOR;
                                        // If we're close to the target, reduce velocity more aggressively
                                        if (absDistanceToTarget < this.snapRegion.y) {
                                            const proximityFactor = absDistanceToTarget / this.snapRegion.y;
                                            adjustedVelocity *= proximityFactor;
                                        }
                                        // Ensure we don't overshoot the target
                                        if (Math.abs(adjustedVelocity) > absDistanceToTarget) {
                                            adjustedVelocity = Math.sign(distanceToTarget) * absDistanceToTarget;
                                        }
                                        this.spring.velocity = new vec3(this.spring.velocityX, adjustedVelocity, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(0, adjustedVelocity, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityY) > 0 || absDistanceToTarget > 0) {
                                        // Low velocity or very close to target - tween for smooth finish
                                        // Stop current velocity to prevent conflicts
                                        this.spring.velocity = new vec3(this.spring.velocityX, 0, this.spring.velocityZ);
                                        // Calculate appropriate tween duration based on remaining distance
                                        const baseDuration = 250; // Base duration in ms
                                        const maxDuration = 500; // Maximum duration
                                        const minDuration = 100; // Minimum duration
                                        const duration = MathUtils.clamp(baseDuration * (absDistanceToTarget / this.snapRegion.y), minDuration, maxDuration);
                                        // Tween to the exact target position
                                        this.tweenTo(new vec2(this.scrollPosition.x, targetPos), duration);
                                        scrollPositionUpdated = true;
                                    }
                                }
                                else {
                                    if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY) {
                                        const velY = this.spring.velocityY * FRICTION_FACTOR;
                                        this.spring.velocity = new vec3(this.spring.velocityX, velY, this.spring.velocityZ);
                                        cScrollPosition = cScrollPosition.add(new vec3(0, velY, 0));
                                        scrollPositionUpdated = true;
                                    }
                                    else if (Math.abs(this.spring.velocityY) > 0) {
                                        this.spring.velocity = new vec3(this.spring.velocityX, 0, this.spring.velocityZ);
                                        cScrollPosition = new vec3(cScrollPosition.x, clamped.y, cScrollPosition.z);
                                        scrollPositionUpdated = true;
                                    }
                                }
                            }
                            if (scrollPositionUpdated) {
                                this.updateScrollerPosition(cScrollPosition);
                            }
                        }
                    }
                }
            };
        }
        get scrollingPaused() {
            return this._scrollingPaused;
        }
        set scrollingPaused(scrollingPaused) {
            // reset accumulated velocity
            if (this.initialized && scrollingPaused) {
                this.cancelCurrentInteractor();
                this.accumulatedVelocity = vec3.zero();
                this.lastGestureEndTime = 0;
            }
            this._scrollingPaused = scrollingPaused;
        }
        /**
         * get whether this scroll window is initialized
         */
        get isInitialized() {
            return this.initialized;
        }
        /**
         * get the number of children in the content of scroll window
         */
        get children() {
            return this.scroller.children;
        }
        /**
         * The Interactable component of this scroll window
         * @returns Interactable component
         */
        get interactable() {
            return this._interactable;
        }
        /**
         * Whether this scroll window is using snap scrolling
         * @return true if snap scrolling is enabled, false otherwise
         */
        get scrollSnapping() {
            return this._scrollSnapping;
        }
        /**
         * Whether this scroll window is using snap scrolling
         * @param value - true to enable snap scrolling, false to disable
         */
        set scrollSnapping(scrollSnapping) {
            if (scrollSnapping === undefined) {
                return;
            }
            this._scrollSnapping = scrollSnapping;
        }
        /**
         * The size of each snap segment in the scroll window
         * @returns vec2 of the size of each snap segment in local space.
         */
        get snapRegion() {
            return this._snapRegion;
        }
        /**
         * The size of each snap segment in the scroll window
         * @param snapRegion - The size of each snap segment in local space.
         */
        set snapRegion(snapRegion) {
            if (snapRegion === undefined) {
                return;
            }
            this._snapRegion = snapRegion;
        }
        /**
         * The scroll position in local space
         */
        get scrollPosition() {
            const currentPosition = vec2.zero();
            const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
            currentPosition.x = scrollerLocalPosition.x;
            currentPosition.y = scrollerLocalPosition.y;
            return currentPosition;
        }
        /**
         * The scroll position in local space
         */
        set scrollPosition(position) {
            if (position === undefined) {
                return;
            }
            this.scrollTweenCancel();
            const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
            this.updateScrollerPosition(new vec3(position.x, position.y, scrollerLocalPosition.z));
        }
        /**
         * The scroll position in normalized space
         * -1, 1 on the x (left to right)
         * -1, 1 on the y (bottom to top)
         */
        get scrollPositionNormalized() {
            const currentPosition = vec2.zero();
            const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
            currentPosition.x = scrollerLocalPosition.x / this.rightEdge;
            currentPosition.y = scrollerLocalPosition.y / this.topEdge;
            return currentPosition;
        }
        /**
         * The scroll position in normalized space
         * -1, 1 on the x (left to right)
         * -1, 1 on the y (bottom to top)
         */
        set scrollPositionNormalized(position) {
            if (position === undefined) {
                return;
            }
            this.scrollTweenCancel();
            const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
            scrollerLocalPosition.x = position.x * this.rightEdge;
            scrollerLocalPosition.y = position.y * this.topEdge;
            this.updateScrollerPosition(scrollerLocalPosition);
        }
        onAwake() {
            this.createEvent("OnEnableEvent").bind(() => {
                if (this.initialized) {
                    this.subscribeToEvents(true);
                    this.managedComponents.forEach((component) => {
                        if (component) {
                            component.enabled = true;
                        }
                    });
                }
            });
            this.createEvent("OnDisableEvent").bind(() => {
                if (this.initialized) {
                    this.subscribeToEvents(false);
                    this.managedComponents.forEach((component) => {
                        if (component) {
                            component.enabled = false;
                        }
                    });
                    this.enableChildColliders(true);
                }
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this.scrollTweenCancel();
                this.scroller.children.forEach((child) => {
                    child.setParent(this.sceneObject);
                });
                this.managedComponents.forEach((component) => {
                    if (!isNull(component) && component) {
                        component.destroy();
                    }
                });
                this.managedComponents = [];
                this.managedSceneObjects.forEach((sceneObject) => {
                    if (!isNull(sceneObject) && sceneObject) {
                        sceneObject.destroy();
                    }
                });
                this.managedSceneObjects = [];
            });
            this.createEvent("OnStartEvent").bind(this.initialize.bind(this));
            this.createEvent("LateUpdateEvent").bind(this.update.bind(this));
        }
        /*
         * adds object to this scroll window, sets parent to scroller
         */
        addObject(object) {
            object.setParent(this.scroller ?? this.sceneObject);
        }
        /**
         * get viewable window of local space at zero depth
         * -windowSize.x/2, windowSize.x/2 on the x (left to right)
         * -windowSize.y/2, windowSize.=/2 on the x (bottom to top)
         * @returns vec4 where x,y are bottom left corner, and z, w are top right corner
         */
        getVisibleWindow() {
            const visibleWindow = {
                bottomLeft: vec2.zero(),
                topRight: vec2.zero()
            };
            const scrollerLocalPosition = this.scrollerTransform.getLocalPosition();
            visibleWindow.bottomLeft.x = -scrollerLocalPosition.x - this.windowSize.x * 0.5;
            visibleWindow.bottomLeft.y = -scrollerLocalPosition.y - this.windowSize.y * 0.5;
            visibleWindow.topRight.x = -scrollerLocalPosition.x + this.windowSize.x * 0.5;
            visibleWindow.topRight.y = -scrollerLocalPosition.y + this.windowSize.y * 0.5;
            return visibleWindow;
        }
        /**
         * get viewable window of local space at zero depth
         * -1, 1 on the x (left to right)
         * -1, 1 on the x (bottom to top)
         * @returns vec4 where x,y are bottom left corner, and z, w are top right corner
         */
        getVisibleWindowNormalized() {
            const visibleWindow = this.getVisibleWindow();
            visibleWindow.bottomLeft.x /= this.scrollDimensions.x * 0.5;
            visibleWindow.bottomLeft.y /= this.scrollDimensions.y * 0.5;
            visibleWindow.topRight.x /= this.scrollDimensions.x * 0.5;
            visibleWindow.topRight.y /= this.scrollDimensions.y * 0.5;
            return visibleWindow;
        }
        get topEdge() {
            return this.scrollDimensions.y * -0.5 + this.windowSize.y * 0.5;
        }
        get bottomEdge() {
            return this.scrollDimensions.y * 0.5 - this.windowSize.y * 0.5;
        }
        get leftEdge() {
            return this.scrollDimensions.x * 0.5 - this.windowSize.x * 0.5;
        }
        get rightEdge() {
            return this.scrollDimensions.x * -0.5 + this.windowSize.x * 0.5;
        }
        getClampedBounds(scrollPos) {
            return new vec3(this.scrollDimensions.x > this.windowSize.x
                ? MathUtils.clamp(scrollPos.x, this.rightEdge, this.leftEdge)
                : scrollPos.x, this.scrollDimensions.y > this.windowSize.y
                ? MathUtils.clamp(scrollPos.y, this.topEdge, this.bottomEdge)
                : scrollPos.y, 0);
        }
        isOutOfBounds(scrollPos) {
            const clamped = this.getClampedBounds(scrollPos);
            return (Math.abs(scrollPos.x - clamped.x) > EPSILON ||
                Math.abs(scrollPos.y - clamped.y) > EPSILON ||
                Math.abs(scrollPos.z - clamped.z) > EPSILON);
        }
        applyOverscrollResistance(displacement) {
            const maxOverscroll = new vec2(this.windowSize.x * MAX_OVERSHOOT_FACTOR, this.windowSize.y * MAX_OVERSHOOT_FACTOR);
            const resistedX = (maxOverscroll.x * displacement.x) / (maxOverscroll.x + Math.abs(displacement.x));
            const resistedY = (maxOverscroll.y * displacement.y) / (maxOverscroll.y + Math.abs(displacement.y));
            return new vec3(resistedX, resistedY, 0);
        }
    };
    __setFunctionName(_classThis, "ScrollWindow");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ScrollWindow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ScrollWindow = _classThis;
})();
exports.ScrollWindow = ScrollWindow;
//# sourceMappingURL=ScrollWindow.js.map