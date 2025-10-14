"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider");
const HandInputData_1 = require("SpectaclesInteractionKit.lspkg/Providers/HandInputData/HandInputData");
const color_1 = require("SpectaclesInteractionKit.lspkg/Utils/color");
const RoundedRectangle_1 = require("../../../Visuals/RoundedRectangle/RoundedRectangle");
const Frame_1 = require("../Frame");
const TAG = "SnappableBehavior";
const log = new NativeLogger_1.default(TAG);
const quatId = quat.quatIdentity();
// A variable for 'up' (but not exactly up) We can't have it be exactly up because when
// we do a cross to get our angles and our raycast result points straight up we cross two
// vectors that are the same and it won't give us a sane result
const NOT_QUITE_UP = new vec3(0.0000001, 0.9999999, 0.0000001).normalize();
/*
 * Class for the snapping behaviors for
 * Specifically implemented for 2D content... so far!
 *
 */
class SnappingHandler {
    /**
     * Returns true if the snapping handler is currently tweening to a new position or rotation.
     */
    get isTweening() {
        return this._isTweening;
    }
    /**
     * Returns true if the snapping handler is currently active, meaning it is ready to snap to a position.
     */
    get isActive() {
        return this._isActive;
    }
    /**
     * Returns true if the snapping handler is enabled and ready to snap.
     */
    get isEnabled() {
        return this._isEnabled;
    }
    get isScaling() {
        return this._isScaling;
    }
    constructor(options) {
        this.options = options;
        this.stickyZoneSize = 1;
        this.gutterSize = 4;
        this.snappableDebugDraw = false;
        this.frame = this.options.frame;
        this.content = this.frame.content;
        this.parent = this.content?.getParent() ?? null;
        this.parentTransform = this.parent?.getTransform() ?? null;
        this.parentParent = this.parent ? this.parent.getParent() : null;
        this.contentTransform = this.content?.getTransform() ?? null;
        this.contentPosition = this.contentTransform?.getWorldPosition() ?? null;
        this.interactable = this.options.interactable;
        this.animationCancelSet = new animate_1.CancelSet();
        this.camera = WorldCameraFinderProvider_1.default.getInstance().getComponent();
        this.itemSnapping = this.options.itemSnapping;
        this.useConstantBoundingBoxPadding = true;
        this.snapTo = null;
        this.snapPosition = vec3.zero();
        this.colliderTransform = null;
        this.colliderPosition = vec3.zero();
        this.colliderRotation = quat.quatIdentity();
        this.colliderScale = vec3.zero();
        this.itemSnappingRange = false;
        this.worldSnappingRange = false;
        this._isTweening = false;
        this._isActive = false;
        this._isEnabled = true;
        /**
         * Returns true if the snapping handler is currently scaling the frame.
         */
        this._isScaling = false;
        this.lastEvent = null;
        this.tryingSnap = false;
        this.unSubscribeList = [];
        this.handInputData = HandInputData_1.HandInputData.getInstance();
        this.rightHand = this.handInputData.getHand("right");
        this.leftHand = this.handInputData.getHand("left");
        this.worldQueryAsset = null;
        this.hitTestSession = null;
        this.useWorldQuery = false;
        this.queryBuffer = [];
        this.queryBufferMaxLength = 20;
        this.lastIndexTipPosition = vec3.zero();
        this.lastIndexForward = vec3.forward();
        this.missedCount = 0;
        this.hitTestSessionStarted = false;
        this.worldQueryTweenCancel = new animate_1.CancelSet();
        this.enableWorldSnapping = (enable) => {
            if (enable) {
                if (this.worldQueryAsset === null) {
                    // eslint-disable-next-line
                    this.worldQueryAsset = require("LensStudio:WorldQueryModule");
                    const sessionOptions = HitTestSessionOptions.create();
                    sessionOptions.filter = true;
                    this.hitTestSession = this.worldQueryAsset.createHitTestSessionWithOptions(sessionOptions);
                    // turn off until used
                    this.hitTestSession.stop();
                }
            }
            this.useWorldQuery = enable;
        };
        this.enableItemSnapping = (enable) => {
            this.itemSnapping = enable;
        };
        this.scaleConstantBoundingBox = () => {
            // the padding of the constant size added to the bounding box
            const boxPadding = 5;
            const boxDepth = Math.max(Math.min((Math.max(this.frame.totalSize.x, this.frame.totalSize.y), 40)), 1);
            this.boundingBoxTransform.setWorldScale(new vec3(this.frame.totalSize.x + boxPadding, this.frame.totalSize.y + boxPadding, boxDepth));
        };
        this.setActive = (val) => {
            this._isActive = val;
        };
        this.setTweening = (val) => {
            this._isTweening = val;
        };
        this.setScaling = (val) => {
            if (val === undefined) {
                return;
            }
            this._isScaling = val;
        };
        this.deParent = () => {
            if (this.parent?.getParent() !== this.parentParent) {
                this.parent?.setParentPreserveWorldTransform(this.parentParent);
            }
            if (!isNull(this.ghost) && this.ghost.getParent() !== this.parent && this.parent !== null) {
                this.ghost.setParentPreserveWorldTransform(this.parent);
                this.ghostParentsName = this.parent.name;
            }
        };
        this.abortTweening = () => {
            this.animationCancelSet.cancel();
            this.deParent();
            this.setTweening(false);
        };
        this.setAspectRatio = () => {
            if (isNull(this.ghost)) {
                log.e(`ERROR: ghost is null - parent: ${this.ghostParentsName}`);
                return;
            }
            if (isNull(this.ghostTransform)) {
                log.e(`ERROR: ghostTransform is null - parent: ${this.ghostParentsName}`);
                return;
            }
            this.ghostRoundedRectangle.size = new vec2(this.frame.totalSize.x, this.frame.totalSize.y);
        };
        this.abortSnapping = () => {
            this.setActive(false);
            if (!isNull(this.ghost)) {
                this.ghost.enabled = false;
            }
            this._isEnabled = false;
            this.itemSnappingRange = false;
            this.worldSnappingRange = false;
        };
        this.onTriggerStart = () => {
            if (this._isTweening) {
                this.abortTweening();
            }
            if (!this._isTweening && !this._isScaling && !this._isActive) {
                this.setAspectRatio();
                if (this.useWorldQuery) {
                    this.queryBuffer = [];
                    this.hitTestSession?.start();
                    this.hitTestSessionStarted = true;
                }
                this.setActive(true);
            }
        };
        this.onTriggerRelease = () => {
            if (this.useWorldQuery && this.hitTestSessionStarted) {
                this.hitTestSession?.stop();
                this.hitTestSessionStarted = false;
            }
            if (this._isActive && !this._isScaling && this._isEnabled) {
                this.setActive(false);
                if (!isNull(this.ghost))
                    this.ghost.enabled = false;
                if (this.itemSnappingRange && !this._isTweening && this.parent?.getParent() !== this.snapTo) {
                    this.setTweening(true);
                    this.itemSnappingRange = false;
                    this.parent?.setParentPreserveWorldTransform(this.snapTo);
                    const startPosition = this.parentTransform?.getLocalPosition() || vec3.zero();
                    (0, animate_1.default)({
                        cancelSet: this.animationCancelSet,
                        duration: 0.15,
                        start: 0,
                        end: 1,
                        ended: this.tweenCompleted,
                        update: (t) => {
                            this.parentTransform?.setLocalPosition((0, animate_1.mix)(startPosition, this.snapPosition, t));
                        }
                    });
                    const startRot = this.parentTransform?.getWorldRotation() || quat.quatIdentity();
                    const endRot = this.snapTo.getTransform().getWorldRotation();
                    (0, animate_1.default)({
                        cancelSet: this.animationCancelSet,
                        duration: 0.14,
                        start: 0,
                        end: 1,
                        update: (t) => {
                            this.parentTransform?.setWorldRotation((0, animate_1.mix)(startRot, endRot, t));
                        }
                    });
                }
                else if (this.parentTransform && this.worldSnappingRange && !this._isTweening) {
                    this.setTweening(true);
                    this.worldSnappingRange = false;
                    const startPosition = this.parentTransform?.getWorldPosition();
                    if (startPosition === undefined) {
                        return;
                    }
                    (0, animate_1.default)({
                        cancelSet: this.animationCancelSet,
                        duration: 0.15,
                        start: 0,
                        end: 1,
                        ended: this.tweenCompleted,
                        update: (t) => {
                            this.parentTransform?.setWorldPosition((0, animate_1.mix)(startPosition, this.colliderPosition, t));
                        }
                    });
                    const startRot = this.parentTransform.getWorldRotation();
                    const endRot = this.colliderRotation;
                    (0, animate_1.default)({
                        cancelSet: this.animationCancelSet,
                        duration: 0.14,
                        start: 0,
                        end: 1,
                        update: (t) => {
                            this.parentTransform?.setWorldRotation((0, animate_1.mix)(startRot, endRot, t));
                        }
                    });
                }
            }
        };
        this.queryWorld = () => {
            const rayLength = 300;
            const containerPosition = this.parentTransform.getWorldPosition();
            let indexTipPos, indexForward;
            let thisHand = this.rightHand;
            if (this.frame.currentInteractor.inputType === Interactor_1.InteractorInputType.RightHand) {
                thisHand = this.rightHand;
            }
            else if (this.frame.currentInteractor.inputType === Interactor_1.InteractorInputType.LeftHand) {
                thisHand = this.leftHand;
            }
            if (thisHand.isTracked() && thisHand.indexTip) {
                indexTipPos = thisHand.indexTip.position;
                this.lastIndexTipPosition = indexTipPos;
                indexForward = containerPosition.sub(indexTipPos).normalize();
                this.lastIndexForward = indexForward;
            }
            else {
                indexTipPos = this.lastIndexTipPosition;
                indexForward = this.lastIndexForward;
            }
            const endPos = indexTipPos.add(indexForward.uniformScale(rayLength));
            if (this.hitTestSessionStarted) {
                this.hitTestSession.hitTest(indexTipPos, endPos, (hitResult) => {
                    if (hitResult === null) {
                        // log.d("No Point of Collision")
                        this.missedCount += 1;
                        return;
                    }
                    else {
                        const hitPosition = hitResult.position;
                        const hitNormal = hitResult.normal;
                        const containerFromHit = containerPosition.distanceSquared(hitPosition);
                        if (containerFromHit > 2500) {
                            // more than 25 away from world mesh too far away
                            this.missedCount += 1;
                            return;
                        }
                        const indexDistance = indexTipPos.distance(hitPosition);
                        if (hitPosition === vec3.zero()) {
                            this.missedCount += 1;
                            return;
                        }
                        if (indexDistance < 20) {
                            // probably an error
                            this.missedCount += 1;
                            return;
                        }
                        this.queryBuffer.push({
                            distance: indexDistance,
                            hitPosition: hitPosition,
                            hitNormal: hitNormal
                        });
                        if (this.queryBuffer.length === this.queryBufferMaxLength) {
                            let sumPosition = vec3.zero();
                            let sumNormal = vec3.zero();
                            this.queryBuffer.forEach((queryObj, _i) => {
                                sumPosition = sumPosition.add(queryObj.hitPosition);
                                sumNormal = sumNormal.add(queryObj.hitNormal);
                            });
                            const avgPositon = sumPosition.uniformScale(1 / this.queryBuffer.length);
                            const avgNormal = sumNormal.uniformScale(1 / this.queryBuffer.length);
                            let toRotation;
                            if (avgNormal.y > 0.95) {
                                // log.d(`probably on the floor! or some`)
                                toRotation = quat.lookAt(avgNormal, this.camera.getTransform().back);
                            }
                            else {
                                // log.d(`probably on something else?`)
                                toRotation = quat.lookAt(avgNormal, NOT_QUITE_UP);
                            }
                            const ghostPos = this.ghostTransform.getWorldPosition();
                            const ghostRot = this.ghostTransform.getWorldRotation();
                            if (this.worldQueryTweenCancel)
                                this.worldQueryTweenCancel();
                            (0, animate_1.default)({
                                duration: 0.05,
                                cancelSet: this.worldQueryTweenCancel,
                                update: (t) => {
                                    this.ghostTransform.setWorldPosition(vec3.lerp(ghostPos, avgPositon, t));
                                    this.ghostTransform.setWorldRotation(quat.slerp(ghostRot, toRotation, t));
                                }
                            });
                            this.colliderPosition = avgPositon;
                            this.colliderRotation = toRotation;
                            this.colliderScale = new vec3(this.frame.totalSize.x, this.frame.totalSize.y, 1);
                            this.worldSnappingRange = true;
                            this.queryBuffer.shift();
                            this.missedCount = 0;
                        }
                        else {
                            this.worldSnappingRange = false;
                            this.missedCount = 0;
                        }
                    }
                });
            }
            if (this.missedCount >= 20)
                this.worldSnappingRange = false;
        };
        this.calculateItemSnapping = () => {
            if (!isNull(this.ghost) && this.ghost.getParent() !== this.snapTo && this.snapTo !== null) {
                this.ghost.setParentPreserveWorldTransform(this.snapTo);
                this.ghostParentsName = this.snapTo.name;
            }
            this.contentPosition = this.contentTransform.getWorldPosition().sub(this.colliderPosition);
            this.contentPosition = this.colliderRotation.multiplyVec3(this.contentPosition);
            const snapToScalar = this.snapTo.getTransform().getWorldScale();
            const thisWorldScale = this.frame.transform.getWorldScale();
            // prevent 0 division
            if (snapToScalar.x === 0)
                snapToScalar.x = 0.0001;
            if (snapToScalar.y === 0)
                snapToScalar.y = 0.0001;
            // assuming height of 1
            const halfFrameSize = {
                x: (this.frame.totalSize.x * 0.5 * thisWorldScale.x) / snapToScalar.x,
                y: (this.frame.totalSize.y * 0.5 * thisWorldScale.y) / snapToScalar.y
            };
            const halfColliderImageScale = {
                x: this.colliderScale.x * 0.5,
                y: this.colliderScale.y * 0.5
            };
            let xOffset = 0;
            let yOffset = 0;
            if (Math.abs(this.contentPosition.x) >= Math.abs(this.contentPosition.y)) {
                // snap to left or right
                xOffset = halfColliderImageScale.x + halfFrameSize.x + this.gutterSize / snapToScalar.x;
                if (this.contentPosition.x > 0) {
                    this.snapPosition.x = xOffset;
                }
                else {
                    this.snapPosition.x = -xOffset;
                }
                if (Math.abs(this.contentPosition.y) < this.stickyZoneSize) {
                    // in sticky center
                    this.snapPosition.y = 0;
                }
                else if (Math.abs(this.contentPosition.y + halfFrameSize.y - halfColliderImageScale.y) < this.stickyZoneSize) {
                    // at top
                    this.snapPosition.y = halfColliderImageScale.y - halfFrameSize.y;
                }
                else if (Math.abs(this.contentPosition.y - halfFrameSize.y + halfColliderImageScale.y) < this.stickyZoneSize) {
                    // at bottom
                    this.snapPosition.y = -halfColliderImageScale.y + halfFrameSize.y;
                }
                else {
                    // sliding
                    this.snapPosition.y = this.contentPosition.y;
                }
            }
            else {
                // snap to top or bottom
                yOffset = halfColliderImageScale.y + halfFrameSize.y + this.gutterSize / snapToScalar.y;
                if (this.contentPosition.y > 0) {
                    this.snapPosition.y = yOffset;
                }
                else {
                    this.snapPosition.y = -yOffset;
                }
                if (Math.abs(this.contentPosition.x) < this.stickyZoneSize) {
                    // in sticky center
                    this.snapPosition.x = 0;
                }
                else if (Math.abs(this.contentPosition.x + halfFrameSize.x - halfColliderImageScale.x) < this.stickyZoneSize) {
                    // at right
                    this.snapPosition.x = halfColliderImageScale.x - halfFrameSize.x;
                }
                else if (Math.abs(this.contentPosition.x - halfFrameSize.x + halfColliderImageScale.x) < this.stickyZoneSize) {
                    // at left
                    this.snapPosition.x = -halfColliderImageScale.x + halfFrameSize.x;
                }
                else {
                    // sliding
                    this.snapPosition.x = this.contentPosition.x;
                }
            }
            this.snapPosition.z = 0;
            // ghost temporarily parented to snapTo object
            if (!isNull(this.ghostTransform)) {
                this.ghostTransform.setLocalRotation(quatId);
                this.ghostTransform.setLocalPosition(this.snapPosition);
            }
            if (!isNull(this.ghost) && !this.ghost.enabled)
                this.ghost.enabled = true;
        };
        this.update = () => {
            if (this._isActive && !this._isScaling && this._isEnabled && !this.frame.following) {
                if (this.itemSnappingRange) {
                    this.calculateItemSnapping();
                }
                else if (this.useWorldQuery) {
                    this.queryWorld();
                }
                else if (!this.worldSnappingRange) {
                    // if not in snapping range
                    if (!this._isTweening && !isNull(this.content) && this.content.getParent() !== this.parent) {
                        this.deParent();
                    }
                    if (!isNull(this.ghost) && this.ghost.enabled)
                        this.ghost.enabled = false;
                }
                // confirm ghost
                if (this.worldSnappingRange) {
                    if (!isNull(this.ghost) && !this.ghost.enabled)
                        this.ghost.enabled = true;
                }
            }
            else {
                if (!isNull(this.ghost) && this.ghost.enabled)
                    this.ghost.enabled = false;
                if (!this._isTweening && !isNull(this.content) && this.content.getParent() !== this.parent) {
                    this.deParent();
                }
            }
            if (this.tryingSnap) {
                if (this.lastEvent)
                    this.onTriggerRelease();
                this.tryingSnap = false;
                this.lastEvent = null;
            }
            if (this.ghost.enabled) {
                this.ghostRoundedRectangle.borderColor = (0, color_1.withAlpha)(this.ghostRoundedRectangle.borderColor, 0.5 + Math.sin(getTime() * 5) * 0.1);
            }
            if (!this.worldSnappingRange && !this.itemSnappingRange) {
                if (!isNull(this.ghost) && this.ghost.enabled)
                    this.ghost.enabled = false;
                if (!isNull(this.ghost) && !isNull(this.ghostTransform)) {
                    this.ghostTransform.setWorldPosition(this.frame.transform.getWorldPosition());
                    this.ghostTransform.setWorldRotation(this.frame.transform.getWorldRotation());
                }
            }
        };
        this.checkItemOverlaps = (e) => {
            this.lastEvent = e;
            if (this._isActive &&
                !this._isScaling &&
                !this._isTweening &&
                !this.frame.following &&
                this.itemSnapping &&
                this._isEnabled) {
                let lastDistance = Infinity;
                for (let i = 0; i < e.currentOverlaps.length; i++) {
                    const overlap = e.currentOverlaps[i];
                    const colliderObject = overlap.collider.getSceneObject().getParent().getParent();
                    // getParent of boundingBox
                    const colliderFrameComponent = colliderObject.getComponent(Frame_1.Frame.getTypeName());
                    if (isNull(colliderFrameComponent)) {
                        continue;
                    }
                    if (colliderFrameComponent.isSnappingActive() || colliderFrameComponent.isSnappingTweening()) {
                        continue;
                    }
                    if (colliderObject === this.parent) {
                        continue;
                    }
                    this.colliderTransform = colliderObject.getTransform();
                    const thisColliderPosition = this.colliderTransform.getWorldPosition();
                    const thisDistance = thisColliderPosition.distanceSquared(this.contentTransform.getWorldPosition());
                    if (thisDistance < lastDistance) {
                        this.snapTo = colliderObject;
                        this.colliderPosition = thisColliderPosition;
                        this.colliderScale = new vec3(colliderFrameComponent.totalSize.x, colliderFrameComponent.totalSize.y, 1);
                        this.colliderRotation = this.colliderTransform.getWorldRotation();
                        this.colliderRotation.x *= -1;
                        this.colliderRotation.y *= -1;
                        this.colliderRotation.z *= -1;
                        this.itemSnappingRange = true;
                        lastDistance = thisDistance;
                    }
                }
            }
        };
        this.tryToSnap = () => {
            this.setActive(true);
            this.tryingSnap = true;
            if (this.lastEvent) {
                this.checkItemOverlaps(this.lastEvent);
            }
        };
        this.tweenCompleted = () => {
            // deparent when tween complete
            this.deParent();
            this.setTweening(false);
            this.options.onSnappingCompleteEvent.invoke();
        };
        this.onOverlapExit = (e) => {
            if (e.currentOverlaps.length === 0) {
                if (!isNull(this.ghost))
                    this.ghost.enabled = false;
                this.itemSnappingRange = false;
            }
        };
        if (options.worldSnapping) {
            this.enableWorldSnapping(true);
        }
        this.unSubscribeList.push(this.frame.onTranslationStart.add(this.onTriggerStart));
        this.unSubscribeList.push(this.frame.onTranslationEnd.add(this.onTriggerRelease));
        this.unSubscribeList.push(this.interactable.onTriggerCanceled.add(this.onTriggerRelease));
        this.ghost = global.scene.createSceneObject("Ghost");
        this.ghost.layer = this.frame.sceneObject.layer;
        this.ghostRoundedRectangle = this.ghost.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
        this.ghostTransform = this.ghost.getTransform();
        this.ghost.enabled = false;
        this.ghost.setParent(this.parent);
        this.ghostParentsName = this.parent.name;
        this.ghostTransform = this.ghost.getTransform();
        this.ghostRoundedRectangle.initialize();
        this.ghostRoundedRectangle.cornerRadius = this.frame.roundedRectangle.cornerRadius;
        this.ghostRoundedRectangle.gradient = true;
        this.ghostRoundedRectangle.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
        this.ghostRoundedRectangle.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
        this.ghostRoundedRectangle.renderMeshVisual.setRenderOrder(this.frame.renderOrder - 1);
        this.ghostRoundedRectangle.renderMeshVisual.mainPass.depthTest = false;
        this.ghostRoundedRectangle.setBackgroundGradient({
            type: "Rectangle",
            stop0: {
                enabled: true,
                color: new vec4(0.2, 0.2, 0.2, 0.1),
                percent: -6
            },
            stop1: {
                enabled: true,
                color: new vec4(0.5, 0.5, 0.5, 0.4),
                percent: 1
            },
            stop2: { enabled: false },
            stop3: { enabled: false },
            stop4: { enabled: false }
        });
        this.ghostRoundedRectangle.border = true;
        this.ghostRoundedRectangle.borderSize = 0.3;
        this.ghostRoundedRectangle.borderColor = new vec4(0.6, 0.6, 0.6, 0.6);
        this.boundingBox = global.scene.createSceneObject("boundingBox");
        this.boundingBox.layer = this.frame.sceneObject.layer;
        this.boundingBoxTransform = this.boundingBox.getTransform();
        this.boundingBox.setParent(this.content);
        this.boundingBox.layer = LayerSet.fromNumber(4);
        const boundingBoxFilter = Physics.Filter.create();
        boundingBoxFilter.onlyLayers = this.boundingBox.layer;
        const boundingBoxCollider = this.boundingBox.createComponent("ColliderComponent");
        const boxShape = Shape.createBoxShape();
        if (!this.useConstantBoundingBoxPadding) {
            // maximumDepthForBoundingBox
            const maxBoxDepth = 40;
            // amplifier for boxDepth
            const boxDepthScalar = 0.4;
            // amplifier for shapeSize
            const shapeScalar = 1.34;
            const boxSize = Math.max(this.frame.totalSize.x, this.frame.totalSize.y);
            const boxDepth = Math.max(Math.min(Math.max(boxSize, maxBoxDepth)), 1);
            this.boundingBoxTransform.setWorldScale(new vec3(this.frame.totalSize.x, this.frame.totalSize.y, boxDepth * boxDepthScalar));
            boxShape.size = vec3.one().uniformScale(shapeScalar);
        }
        else {
            boxShape.size = vec3.one();
        }
        boundingBoxCollider.shape = boxShape;
        boundingBoxCollider.filter = boundingBoxFilter;
        boundingBoxCollider.overlapFilter = boundingBoxFilter;
        boundingBoxCollider.debugDrawEnabled = this.snappableDebugDraw;
        const onOverlapEnterEvent = boundingBoxCollider.onOverlapEnter.add(this.checkItemOverlaps);
        const onOverlapStayEvent = boundingBoxCollider.onOverlapStay.add(this.checkItemOverlaps);
        const onOverlapExitEvent = boundingBoxCollider.onOverlapExit.add(this.onOverlapExit);
        this.unSubscribeList.push(() => {
            if (!isNull(boundingBoxCollider) && !isNull(onOverlapEnterEvent)) {
                boundingBoxCollider.onOverlapEnter.remove(onOverlapEnterEvent);
            }
        });
        this.unSubscribeList.push(() => {
            if (!isNull(boundingBoxCollider) && !isNull(onOverlapStayEvent)) {
                boundingBoxCollider.onOverlapStay.remove(onOverlapStayEvent);
            }
        });
        this.unSubscribeList.push(() => {
            if (!isNull(boundingBoxCollider) && !isNull(onOverlapExitEvent)) {
                boundingBoxCollider.onOverlapExit.remove(onOverlapExitEvent);
            }
        });
        if (this.useConstantBoundingBoxPadding) {
            this.unSubscribeList.push(this.options.onScalingUpdate.add(this.scaleConstantBoundingBox));
            this.scaleConstantBoundingBox();
        }
        this.unSubscribeList.push(this.options.onScalingUpdate.add(this.setAspectRatio));
        this.setAspectRatio();
    }
    destroy() {
        log.d("destroy");
        this.abortTweening();
        this.abortSnapping();
        this.unSubscribeList.forEach((sub) => {
            sub();
        });
        this.unSubscribeList = [];
    }
}
exports.default = SnappingHandler;
//# sourceMappingURL=SnappingHandler.js.map