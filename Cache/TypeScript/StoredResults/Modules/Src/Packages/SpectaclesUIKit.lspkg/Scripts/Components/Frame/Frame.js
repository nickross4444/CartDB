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
exports.Frame = exports.FrameAppearance = void 0;
var __selfType = requireType("./Frame");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Billboard_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Billboard/Billboard");
const Interactable_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable");
const InteractableManipulation_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/InteractableManipulation/InteractableManipulation");
const InteractionPlane_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/InteractionPlane/InteractionPlane");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const CursorControllerProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CursorControllerProvider/CursorControllerProvider");
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const mathUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/mathUtils");
const UIKitUtilities_1 = require("../../Utility/UIKitUtilities");
const RoundedRectangle_1 = require("../../Visuals/RoundedRectangle/RoundedRectangle");
const ButtonHandler_1 = require("./modules/ButtonHandler");
const CursorHandler_1 = require("./modules/CursorHandler");
const FrameInputHandler_1 = require("./modules/FrameInputHandler");
const HoverBehavior_1 = require("./modules/HoverBehavior");
const SmoothFollow_1 = require("./modules/SmoothFollow");
const SnappingHandler_1 = require("./modules/SnappingHandler");
const frameMaterial = requireAsset("../../../Materials/Frame.mat");
var FrameAppearance;
(function (FrameAppearance) {
    FrameAppearance["Large"] = "Large";
    FrameAppearance["Small"] = "Small";
})(FrameAppearance || (exports.FrameAppearance = FrameAppearance = {}));
const FrameConstants = {
    contentOffset: 0.001,
    opacityTweenDuration: 0.4,
    cursorHighlightAnimationDuration: 0.3,
    squeezeTweenDuration: 0.4,
    nearFieldInteractionZoneDistance: 15,
    containerGradientBright: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.25, 0.85),
    containerGradientDark: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.15, 0.85),
    containerGradientDarkest: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.2, 0.85),
    borderColor: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.7, 1),
    borderActiveColor: (0, UIKitUtilities_1.HSVtoRGB)(55, 0.5, 0.8, 1),
    highlightColorStop1: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.5, 1),
    highlightColorStop2: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.35, 1),
    highlightActiveColorStop1: (0, UIKitUtilities_1.HSVtoRGB)(50, 1, 0.7, 1),
    highlightActiveColorStop2: (0, UIKitUtilities_1.HSVtoRGB)(40, 1, 0.6, 1)
};
const DEBUG_DRAW = false;
const borderDebugColor = new vec4(0, 1, 1, 1);
const debugRed = new vec4(1, 0, 0, 1);
/**
 * @module Frame
 *
 * @description Frame component that provides a customizable UI frame with interaction capabilities.
 * It supports features like resizing, moving, billboarding, snapping, and interaction with buttons.
 * It can also follow the user's view and has options for hover behavior and interaction plane.
 */
let Frame = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Frame = _classThis = class extends _classSuper {
        constructor() {
            super();
            /**
             * When enabled, the frame automatically appears when hovered and hides when
             * not being interacted with. Disable to manually control frame visibility.
             */
            this.autoShowHide = this.autoShowHide;
            this._appearance = this._appearance;
            this._innerSize = this._innerSize;
            this._padding = this._padding;
            /**
             * Enables interactive scaling of the frame via corner handles.
             */
            this.allowScaling = this.allowScaling;
            /**
             * Automatically scales child content when the frame is resized to maintain proportions.
             */
            this.autoScaleContent = this.autoScaleContent;
            /**
             * When enabled, Z-axis scaling of content will match X-axis scaling during frame resizing.
             */
            this.relativeZ = this.relativeZ;
            /**
             * When enabled, allows interaction with content inside the frame and hides the frames's glow for visual
             * clarity.
             */
            this._onlyInteractOnBorder = this._onlyInteractOnBorder;
            /**
             * Enables moving the frame.
             */
            this.allowTranslation = this.allowTranslation;
            /**
             * When enabled, creates a transparent center in the frame, allowing content behind the frame to be visible.
             */
            this._cutOutCenter = this._cutOutCenter;
            this.minimumSize = this.minimumSize;
            /**
             * Maximum dimensions that the frame can be resized to. In local space centimeters.
             */
            this.maximumSize = this.maximumSize;
            this.useBillboarding = this.useBillboarding;
            /**
             * When enabled, the frame rotates around the X-axis to face the user, but only during movement/translation
             * unless xAlways is also enabled.
             */
            this.xOnTranslate = this.xOnTranslate;
            /**
             * When enabled, the frame continuously rotates around the X-axis to face the user, regardless of movement.
             */
            this.xAlways = this.xAlways;
            /**
             * A buffered degrees (both positive and negative) on the x-axis before the frame billboards to face the user.
             */
            this.xBufferDegrees = this.xBufferDegrees;
            /**
             * When enabled, the frame rotates around the Y-axis to face the user, but only during movement/translation
             * unless yAlways is also enabled.
             */
            this.yOnTranslate = this.yOnTranslate;
            /**
             * When enabled, the frame continuously rotates around the Y-axis to face the user, regardless of movement.
             */
            this.yAlways = this.yAlways;
            /**
             * A buffered degrees (both positive and negative) on the y-axis before the frame billboards to face the user.
             */
            this.yBufferDegrees = this.yBufferDegrees;
            this.useSnapping = this.useSnapping;
            /**
             * Enables snapping to other frames when moving.
             */
            this.itemSnapping = this.itemSnapping;
            /**
             * Enables snapping to physical surfaces in the real-world environment when moving.
             */
            this.worldSnapping = this.worldSnapping;
            this._showFollowButton = this._showFollowButton;
            /**
             * When enabled, creates a follow behavior that keeps the frame in front of the user's view.
             */
            this.useFollowBehavior = this.useFollowBehavior;
            /**
             * Controls whether the frame actively follows the user's view. Setting this defines the initial state.
             */
            this._following = this._following;
            this._showCloseButton = this._showCloseButton;
            this._enableInteractionPlane = this._enableInteractionPlane;
            this._interactionPlaneOffset = this._interactionPlaneOffset;
            this._interactionPlanePadding = this._interactionPlanePadding;
            /**
             * Sets the preferred targeting visual. (Requires the V2 Cursor to be enabled on InteractorCursors).
             * - 0: None
             * - 1: Cursor (default)
             * - 2: Ray
             */
            this._targetingVisual = this._targetingVisual;
            this._border = 4;
            this._ogBorder = this._border;
            this.collider = this.sceneObject.createComponent("ColliderComponent");
            this._interactable = this.sceneObject.createComponent(Interactable_1.Interactable.getTypeName());
            this._manipulate = this.sceneObject.createComponent(InteractableManipulation_1.InteractableManipulation.getTypeName());
            this.managedSceneObjects = [];
            this.managedComponents = [this.collider, this._interactable, this._manipulate];
            this._onSnappingCompleteEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onSnappingComplete event handler.
             */
            this.onSnappingComplete = this._onSnappingCompleteEvent.publicApi();
            /**
             * Reference to frame's default front follow behavior.
             */
            this.smoothFollow = null;
            /**
             * Event handler for frame scaling update.
             */
            this._onScalingUpdateEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onScalingUpdate event handler.
             */
            this.onScalingUpdate = this._onScalingUpdateEvent.publicApi();
            /**
             * Event handler for frame scaling started.
             */
            this._onScalingStartEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onScalingStart event handler.
             */
            this.onScalingStart = this._onScalingStartEvent.publicApi();
            /**
             * Event handler for frame scaling ended.
             */
            this._onScalingEndEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onScalingEnd event handler.
             */
            this.onScalingEnd = this._onScalingEndEvent.publicApi();
            this._onTranslationStartEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onTranslationStartEvent event handler.
             */
            this.onTranslationStart = this._onTranslationStartEvent.publicApi();
            this._onTranslationEndEvent = new Event_1.default();
            /**
             * Public api for adding functions to the _onTranslationEndEvent event handler.
             */
            this.onTranslationEnd = this._onTranslationEndEvent.publicApi();
            this._translatingLastFrame = false;
            this._onHoverEnterInnerInteractableEvent = new Event_1.default();
            this.onHoverEnterInnerInteractable = this._onHoverEnterInnerInteractableEvent.publicApi();
            this._onHoverExitInnerInteractableEvent = new Event_1.default();
            this.onHoverExitInnerInteractable = this._onHoverExitInnerInteractableEvent.publicApi();
            this._hoveringInnerInteractableLast = false;
            this._dragStart = vec3.zero();
            this._interactableHoverOpacity = 1;
            this._forceTranslate = false;
            this._scalingSizeStart = vec2.zero();
            this._forcePreserveScale = false;
            this._inputState = {
                hovered: false,
                hierarchyHovered: false,
                pinching: false,
                position: vec3.zero(),
                drag: vec3.zero(),
                innerInteractableActive: false
            };
            /**
             * Current interactor that is interacting with the frame.
             */
            this.currentInteractor = null;
            this._hoveringContentLast = false;
            this._opacity = 1;
            this._opacityCancel = new animate_1.CancelSet();
            this._cursorHighlightCancel = new animate_1.CancelSet();
            /**
             * Boolean tracking visibility of frame.
             */
            this._isVisible = true;
            this._initialized = false;
            this._onInitializedEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onInitializedEvent event handler.
             */
            this.onInitialized = this._onInitializedEvent.publicApi();
            this._onShowVisualEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onShowVisualEvent event handler.
             *
             * onShowVisual is invoked when the frame _starts_ to show its visuals.
             */
            this.onShowVisual = this._onShowVisualEvent.publicApi();
            this._onHideVisualEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onHideVisualEvent event handler.
             *
             * onHideVisual is invoked when the frame has _finished_ hiding its visuals.
             */
            this.onHideVisual = this._onHideVisualEvent.publicApi();
            this.unsubscribes = [];
            this.lastInnerSize = vec2.zero();
            this.originalInnerSize = vec2.zero();
            this._grabZones = [];
            this._grabZoneOnly = false;
            this.squeezeCancel = new animate_1.CancelSet();
            this.squeezeAmount = this.border * 0.15;
            this._interactionPlaneTransform = null;
            this.scaleFrame = (isTrueScaleUpdate = true) => {
                this.roundedRectangle.size = this.totalSize;
                this.updateInteractionPlane();
                this._buttonHandler.resize();
                // Determine if onScalingUpdate should be invoked before forcePreserveScale might be reset.
                const shouldInvokeScalingUpdate = !this._forcePreserveScale && isTrueScaleUpdate;
                let newZScale = 1;
                if (this.autoScaleContent) {
                    if (!this._forcePreserveScale) {
                        // Check if current size is constrained by min/max limits.
                        const factorX = this.innerSize.x / Math.max(this.originalInnerSize.x, 0.001);
                        const factorY = this.innerSize.y / Math.max(this.originalInnerSize.y, 0.001);
                        newZScale = this.relativeZ ? Math.min(factorX, factorY) : 1;
                        this.contentTransform.setLocalScale(new vec3(factorX, factorY, newZScale));
                    }
                    else {
                        // Update original with cloned cache to prevent reset on next scaling.
                        this.originalInnerSize = this.lastInnerSize.uniformScale(1);
                    }
                }
                this.colliderShape.size = new vec3(this.totalSize.x, this.totalSize.y, newZScale);
                this.collider.shape = this.colliderShape;
                this.roundedRectangle.renderMeshVisual.mainMaterial.mainPass.frustumCullMin =
                    this.colliderShape.size.uniformScale(-0.5);
                this.roundedRectangle.renderMeshVisual.mainMaterial.mainPass.frustumCullMax =
                    this.colliderShape.size.uniformScale(0.5);
                this.smoothFollow?.resize(this.totalSize.x);
                if (shouldInvokeScalingUpdate) {
                    this._onScalingUpdateEvent.invoke();
                }
                // // Reset forcePreserveScale after it has been used for decisions.
                if (this._forcePreserveScale) {
                    this._forcePreserveScale = false;
                }
            };
            /**
             * @param useFollow enable or disable the option to turn on the default follow behavior with the follow button
             */
            this.setUseFollow = (useFollow) => {
                this.useFollowBehavior = useFollow;
                if (useFollow && !this.smoothFollow) {
                    this.smoothFollow = new SmoothFollow_1.default({
                        frame: this
                    });
                }
            };
            /**
             * @param isFollowing enable or disable the following button and default behavior ( if it is enabled )
             */
            this.setFollowing = (following) => {
                this._following = following;
                if (this.following && this.billboardComponent !== null) {
                    this.billboardComponent.xAxisEnabled = (this.xOnTranslate && this.allowTranslation) || this.xAlways;
                    this.billboardComponent.yAxisEnabled = (this.yOnTranslate && this.allowTranslation) || this.yAlways;
                }
            };
            /**
             * @returns whether the snapping behavior is currently tweening
             */
            this.isSnappingTweening = () => {
                if (this.snappingHandler) {
                    return this.snappingHandler.isTweening;
                }
                return false;
            };
            /**
             * @returns whether the snapping behavior is checking for snappable elements
             */
            this.isSnappingActive = () => {
                if (this.snappingHandler) {
                    return this.snappingHandler.isActive;
                }
                return false;
            };
            this.createSnappableBehavior = () => {
                this.snappingHandler = new SnappingHandler_1.default({
                    frame: this,
                    interactable: this._interactable,
                    worldSnapping: this.worldSnapping,
                    itemSnapping: this.itemSnapping,
                    onSnappingCompleteEvent: this._onSnappingCompleteEvent,
                    onScalingUpdate: this.onScalingUpdate
                });
            };
            /**
             * tween to show visuals of frame and elements
             */
            this.showVisual = () => {
                // Enable on show.
                this.roundedRectangle.renderMeshVisual.enabled = true;
                this.tweenOpacity(this._opacity, 1);
                this._onShowVisualEvent.invoke();
            };
            /**
             * tween to hide visuals of frame and elements
             */
            this.hideVisual = () => {
                this.tweenOpacity(this._opacity, 0, () => {
                    // Disable on hide.
                    this.roundedRectangle.renderMeshVisual.enabled = false;
                    this._onHideVisualEvent.invoke();
                });
            };
            /**
             * tween from current opacity to target opacity, will cancel existing opacity tweens
             * @param currentOpacity
             * @param targetOpacity
             */
            this.tweenOpacity = (currentOpacity, targetOpacity, endCallback = () => { }) => {
                this._opacityCancel.cancel();
                (0, animate_1.default)({
                    duration: FrameConstants.opacityTweenDuration * Math.abs(targetOpacity - currentOpacity),
                    update: (t) => {
                        this.opacity = (0, mathUtils_1.lerp)(currentOpacity, targetOpacity, t);
                        this._buttonHandler.opacity = (0, mathUtils_1.lerp)(currentOpacity, targetOpacity, t);
                    },
                    ended: endCallback,
                    cancelSet: this._opacityCancel
                });
            };
            this.showCursorHighlight = () => {
                this._cursorHighlightCancel();
                const startingHighlight = this.shader.isHovered;
                (0, animate_1.default)({
                    duration: FrameConstants.cursorHighlightAnimationDuration * (1 - startingHighlight),
                    cancelSet: this._cursorHighlightCancel,
                    update: (t) => {
                        this.shader.isHovered = t;
                    }
                });
            };
            this.hideCursorHighlight = () => {
                this._cursorHighlightCancel();
                const startingHighlight = this.shader.isHovered;
                (0, animate_1.default)({
                    duration: FrameConstants.cursorHighlightAnimationDuration * startingHighlight,
                    cancelSet: this._cursorHighlightCancel,
                    update: (t) => {
                        this.shader.isHovered = startingHighlight - t * startingHighlight;
                    }
                });
            };
            this.tweenBorderSize = (targetBorder) => {
                const currentBorder = this._border;
                this.squeezeCancel();
                (0, animate_1.default)({
                    duration: FrameConstants.squeezeTweenDuration * Math.abs(targetBorder - currentBorder),
                    easing: "ease-out-back-cubic",
                    update: (t) => {
                        this._border = (0, mathUtils_1.lerp)(currentBorder, targetBorder, t);
                    },
                    cancelSet: this.squeezeCancel
                });
            };
        }
        __initialize() {
            super.__initialize();
            /**
             * When enabled, the frame automatically appears when hovered and hides when
             * not being interacted with. Disable to manually control frame visibility.
             */
            this.autoShowHide = this.autoShowHide;
            this._appearance = this._appearance;
            this._innerSize = this._innerSize;
            this._padding = this._padding;
            /**
             * Enables interactive scaling of the frame via corner handles.
             */
            this.allowScaling = this.allowScaling;
            /**
             * Automatically scales child content when the frame is resized to maintain proportions.
             */
            this.autoScaleContent = this.autoScaleContent;
            /**
             * When enabled, Z-axis scaling of content will match X-axis scaling during frame resizing.
             */
            this.relativeZ = this.relativeZ;
            /**
             * When enabled, allows interaction with content inside the frame and hides the frames's glow for visual
             * clarity.
             */
            this._onlyInteractOnBorder = this._onlyInteractOnBorder;
            /**
             * Enables moving the frame.
             */
            this.allowTranslation = this.allowTranslation;
            /**
             * When enabled, creates a transparent center in the frame, allowing content behind the frame to be visible.
             */
            this._cutOutCenter = this._cutOutCenter;
            this.minimumSize = this.minimumSize;
            /**
             * Maximum dimensions that the frame can be resized to. In local space centimeters.
             */
            this.maximumSize = this.maximumSize;
            this.useBillboarding = this.useBillboarding;
            /**
             * When enabled, the frame rotates around the X-axis to face the user, but only during movement/translation
             * unless xAlways is also enabled.
             */
            this.xOnTranslate = this.xOnTranslate;
            /**
             * When enabled, the frame continuously rotates around the X-axis to face the user, regardless of movement.
             */
            this.xAlways = this.xAlways;
            /**
             * A buffered degrees (both positive and negative) on the x-axis before the frame billboards to face the user.
             */
            this.xBufferDegrees = this.xBufferDegrees;
            /**
             * When enabled, the frame rotates around the Y-axis to face the user, but only during movement/translation
             * unless yAlways is also enabled.
             */
            this.yOnTranslate = this.yOnTranslate;
            /**
             * When enabled, the frame continuously rotates around the Y-axis to face the user, regardless of movement.
             */
            this.yAlways = this.yAlways;
            /**
             * A buffered degrees (both positive and negative) on the y-axis before the frame billboards to face the user.
             */
            this.yBufferDegrees = this.yBufferDegrees;
            this.useSnapping = this.useSnapping;
            /**
             * Enables snapping to other frames when moving.
             */
            this.itemSnapping = this.itemSnapping;
            /**
             * Enables snapping to physical surfaces in the real-world environment when moving.
             */
            this.worldSnapping = this.worldSnapping;
            this._showFollowButton = this._showFollowButton;
            /**
             * When enabled, creates a follow behavior that keeps the frame in front of the user's view.
             */
            this.useFollowBehavior = this.useFollowBehavior;
            /**
             * Controls whether the frame actively follows the user's view. Setting this defines the initial state.
             */
            this._following = this._following;
            this._showCloseButton = this._showCloseButton;
            this._enableInteractionPlane = this._enableInteractionPlane;
            this._interactionPlaneOffset = this._interactionPlaneOffset;
            this._interactionPlanePadding = this._interactionPlanePadding;
            /**
             * Sets the preferred targeting visual. (Requires the V2 Cursor to be enabled on InteractorCursors).
             * - 0: None
             * - 1: Cursor (default)
             * - 2: Ray
             */
            this._targetingVisual = this._targetingVisual;
            this._border = 4;
            this._ogBorder = this._border;
            this.collider = this.sceneObject.createComponent("ColliderComponent");
            this._interactable = this.sceneObject.createComponent(Interactable_1.Interactable.getTypeName());
            this._manipulate = this.sceneObject.createComponent(InteractableManipulation_1.InteractableManipulation.getTypeName());
            this.managedSceneObjects = [];
            this.managedComponents = [this.collider, this._interactable, this._manipulate];
            this._onSnappingCompleteEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onSnappingComplete event handler.
             */
            this.onSnappingComplete = this._onSnappingCompleteEvent.publicApi();
            /**
             * Reference to frame's default front follow behavior.
             */
            this.smoothFollow = null;
            /**
             * Event handler for frame scaling update.
             */
            this._onScalingUpdateEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onScalingUpdate event handler.
             */
            this.onScalingUpdate = this._onScalingUpdateEvent.publicApi();
            /**
             * Event handler for frame scaling started.
             */
            this._onScalingStartEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onScalingStart event handler.
             */
            this.onScalingStart = this._onScalingStartEvent.publicApi();
            /**
             * Event handler for frame scaling ended.
             */
            this._onScalingEndEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onScalingEnd event handler.
             */
            this.onScalingEnd = this._onScalingEndEvent.publicApi();
            this._onTranslationStartEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onTranslationStartEvent event handler.
             */
            this.onTranslationStart = this._onTranslationStartEvent.publicApi();
            this._onTranslationEndEvent = new Event_1.default();
            /**
             * Public api for adding functions to the _onTranslationEndEvent event handler.
             */
            this.onTranslationEnd = this._onTranslationEndEvent.publicApi();
            this._translatingLastFrame = false;
            this._onHoverEnterInnerInteractableEvent = new Event_1.default();
            this.onHoverEnterInnerInteractable = this._onHoverEnterInnerInteractableEvent.publicApi();
            this._onHoverExitInnerInteractableEvent = new Event_1.default();
            this.onHoverExitInnerInteractable = this._onHoverExitInnerInteractableEvent.publicApi();
            this._hoveringInnerInteractableLast = false;
            this._dragStart = vec3.zero();
            this._interactableHoverOpacity = 1;
            this._forceTranslate = false;
            this._scalingSizeStart = vec2.zero();
            this._forcePreserveScale = false;
            this._inputState = {
                hovered: false,
                hierarchyHovered: false,
                pinching: false,
                position: vec3.zero(),
                drag: vec3.zero(),
                innerInteractableActive: false
            };
            /**
             * Current interactor that is interacting with the frame.
             */
            this.currentInteractor = null;
            this._hoveringContentLast = false;
            this._opacity = 1;
            this._opacityCancel = new animate_1.CancelSet();
            this._cursorHighlightCancel = new animate_1.CancelSet();
            /**
             * Boolean tracking visibility of frame.
             */
            this._isVisible = true;
            this._initialized = false;
            this._onInitializedEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onInitializedEvent event handler.
             */
            this.onInitialized = this._onInitializedEvent.publicApi();
            this._onShowVisualEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onShowVisualEvent event handler.
             *
             * onShowVisual is invoked when the frame _starts_ to show its visuals.
             */
            this.onShowVisual = this._onShowVisualEvent.publicApi();
            this._onHideVisualEvent = new Event_1.default();
            /**
             * Public api for adding functions to the onHideVisualEvent event handler.
             *
             * onHideVisual is invoked when the frame has _finished_ hiding its visuals.
             */
            this.onHideVisual = this._onHideVisualEvent.publicApi();
            this.unsubscribes = [];
            this.lastInnerSize = vec2.zero();
            this.originalInnerSize = vec2.zero();
            this._grabZones = [];
            this._grabZoneOnly = false;
            this.squeezeCancel = new animate_1.CancelSet();
            this.squeezeAmount = this.border * 0.15;
            this._interactionPlaneTransform = null;
            this.scaleFrame = (isTrueScaleUpdate = true) => {
                this.roundedRectangle.size = this.totalSize;
                this.updateInteractionPlane();
                this._buttonHandler.resize();
                // Determine if onScalingUpdate should be invoked before forcePreserveScale might be reset.
                const shouldInvokeScalingUpdate = !this._forcePreserveScale && isTrueScaleUpdate;
                let newZScale = 1;
                if (this.autoScaleContent) {
                    if (!this._forcePreserveScale) {
                        // Check if current size is constrained by min/max limits.
                        const factorX = this.innerSize.x / Math.max(this.originalInnerSize.x, 0.001);
                        const factorY = this.innerSize.y / Math.max(this.originalInnerSize.y, 0.001);
                        newZScale = this.relativeZ ? Math.min(factorX, factorY) : 1;
                        this.contentTransform.setLocalScale(new vec3(factorX, factorY, newZScale));
                    }
                    else {
                        // Update original with cloned cache to prevent reset on next scaling.
                        this.originalInnerSize = this.lastInnerSize.uniformScale(1);
                    }
                }
                this.colliderShape.size = new vec3(this.totalSize.x, this.totalSize.y, newZScale);
                this.collider.shape = this.colliderShape;
                this.roundedRectangle.renderMeshVisual.mainMaterial.mainPass.frustumCullMin =
                    this.colliderShape.size.uniformScale(-0.5);
                this.roundedRectangle.renderMeshVisual.mainMaterial.mainPass.frustumCullMax =
                    this.colliderShape.size.uniformScale(0.5);
                this.smoothFollow?.resize(this.totalSize.x);
                if (shouldInvokeScalingUpdate) {
                    this._onScalingUpdateEvent.invoke();
                }
                // // Reset forcePreserveScale after it has been used for decisions.
                if (this._forcePreserveScale) {
                    this._forcePreserveScale = false;
                }
            };
            /**
             * @param useFollow enable or disable the option to turn on the default follow behavior with the follow button
             */
            this.setUseFollow = (useFollow) => {
                this.useFollowBehavior = useFollow;
                if (useFollow && !this.smoothFollow) {
                    this.smoothFollow = new SmoothFollow_1.default({
                        frame: this
                    });
                }
            };
            /**
             * @param isFollowing enable or disable the following button and default behavior ( if it is enabled )
             */
            this.setFollowing = (following) => {
                this._following = following;
                if (this.following && this.billboardComponent !== null) {
                    this.billboardComponent.xAxisEnabled = (this.xOnTranslate && this.allowTranslation) || this.xAlways;
                    this.billboardComponent.yAxisEnabled = (this.yOnTranslate && this.allowTranslation) || this.yAlways;
                }
            };
            /**
             * @returns whether the snapping behavior is currently tweening
             */
            this.isSnappingTweening = () => {
                if (this.snappingHandler) {
                    return this.snappingHandler.isTweening;
                }
                return false;
            };
            /**
             * @returns whether the snapping behavior is checking for snappable elements
             */
            this.isSnappingActive = () => {
                if (this.snappingHandler) {
                    return this.snappingHandler.isActive;
                }
                return false;
            };
            this.createSnappableBehavior = () => {
                this.snappingHandler = new SnappingHandler_1.default({
                    frame: this,
                    interactable: this._interactable,
                    worldSnapping: this.worldSnapping,
                    itemSnapping: this.itemSnapping,
                    onSnappingCompleteEvent: this._onSnappingCompleteEvent,
                    onScalingUpdate: this.onScalingUpdate
                });
            };
            /**
             * tween to show visuals of frame and elements
             */
            this.showVisual = () => {
                // Enable on show.
                this.roundedRectangle.renderMeshVisual.enabled = true;
                this.tweenOpacity(this._opacity, 1);
                this._onShowVisualEvent.invoke();
            };
            /**
             * tween to hide visuals of frame and elements
             */
            this.hideVisual = () => {
                this.tweenOpacity(this._opacity, 0, () => {
                    // Disable on hide.
                    this.roundedRectangle.renderMeshVisual.enabled = false;
                    this._onHideVisualEvent.invoke();
                });
            };
            /**
             * tween from current opacity to target opacity, will cancel existing opacity tweens
             * @param currentOpacity
             * @param targetOpacity
             */
            this.tweenOpacity = (currentOpacity, targetOpacity, endCallback = () => { }) => {
                this._opacityCancel.cancel();
                (0, animate_1.default)({
                    duration: FrameConstants.opacityTweenDuration * Math.abs(targetOpacity - currentOpacity),
                    update: (t) => {
                        this.opacity = (0, mathUtils_1.lerp)(currentOpacity, targetOpacity, t);
                        this._buttonHandler.opacity = (0, mathUtils_1.lerp)(currentOpacity, targetOpacity, t);
                    },
                    ended: endCallback,
                    cancelSet: this._opacityCancel
                });
            };
            this.showCursorHighlight = () => {
                this._cursorHighlightCancel();
                const startingHighlight = this.shader.isHovered;
                (0, animate_1.default)({
                    duration: FrameConstants.cursorHighlightAnimationDuration * (1 - startingHighlight),
                    cancelSet: this._cursorHighlightCancel,
                    update: (t) => {
                        this.shader.isHovered = t;
                    }
                });
            };
            this.hideCursorHighlight = () => {
                this._cursorHighlightCancel();
                const startingHighlight = this.shader.isHovered;
                (0, animate_1.default)({
                    duration: FrameConstants.cursorHighlightAnimationDuration * startingHighlight,
                    cancelSet: this._cursorHighlightCancel,
                    update: (t) => {
                        this.shader.isHovered = startingHighlight - t * startingHighlight;
                    }
                });
            };
            this.tweenBorderSize = (targetBorder) => {
                const currentBorder = this._border;
                this.squeezeCancel();
                (0, animate_1.default)({
                    duration: FrameConstants.squeezeTweenDuration * Math.abs(targetBorder - currentBorder),
                    easing: "ease-out-back-cubic",
                    update: (t) => {
                        this._border = (0, mathUtils_1.lerp)(currentBorder, targetBorder, t);
                    },
                    cancelSet: this.squeezeCancel
                });
            };
        }
        get appearance() {
            return this._appearance;
        }
        set appearance(appearance) {
            this._appearance = appearance;
            if (this.appearance === FrameAppearance.Large) {
                this.border = 4;
                this._roundedRectangle.cornerRadius = 2.25;
                this._roundedRectangle.borderSize = 0.25;
                this.shader.dotsHighlightStop1 = 0.15;
                this.shader.dotsScalar = 0.8;
                this._buttonHandler.resize();
            }
            else if (this.appearance === FrameAppearance.Small) {
                this.border = 2.5;
                this._roundedRectangle.cornerRadius = 1.4;
                this._roundedRectangle.borderSize = 0.125;
                this.shader.dotsHighlightStop1 = 0.12;
                this.shader.dotsScalar = 1.2;
                this._buttonHandler.resize();
            }
            this.scaleFrame(true);
        }
        /**
         * Size of the frames's inner content area.
         */
        get innerSize() {
            return this._innerSize;
        }
        set innerSize(size) {
            this._innerSize = size;
            this.scaleFrame(true);
        }
        /**
         * Extra padding that maintains a fixed size in centimeters regardless of frame scaling, useful for toolbars and
         * fixed-size UI elements
         */
        get padding() {
            return this._padding;
        }
        set padding(padding) {
            this._padding = padding;
            this.scaleFrame(true);
        }
        get cutOutCenter() {
            return this._cutOutCenter;
        }
        set cutOutCenter(cutOut) {
            this._cutOutCenter = cutOut;
            this.shader.cutOutCenter = this._cutOutCenter;
        }
        /**
         * Shows a button that allows users to toggle whether the frame follows their view as they move.
         */
        get showFollowButton() {
            return this._showFollowButton;
        }
        set showFollowButton(show) {
            this._showFollowButton = show;
            this._buttonHandler.enableFollowButton(this._showFollowButton);
        }
        get following() {
            return this._following;
        }
        /**
         * Shows a button that allows users to close or dismiss the frame.
         */
        get showCloseButton() {
            return this._showCloseButton;
        }
        set showCloseButton(show) {
            this._showCloseButton = show;
            this._buttonHandler.enableCloseButton(this._showCloseButton);
        }
        /**
         * Get the offset position for the interaction plane relative to the frame center.
         */
        get interactionPlaneOffset() {
            return this._interactionPlaneOffset;
        }
        /**
         * Set the offset position for the interaction plane relative to the frame center.
         * @param offset - The new offset.
         */
        set interactionPlaneOffset(offset) {
            this._interactionPlaneOffset = offset;
            this.updateInteractionPlane();
        }
        /**
         * Get the size of the padding around the InteractionPlane.
         */
        get interactionPlanePadding() {
            return this._interactionPlanePadding;
        }
        /**
         * Set the size of the padding around the InteractionPlane.
         * @param padding - The new padding.
         */
        set interactionPlanePadding(padding) {
            this._interactionPlanePadding = padding;
            this.updateInteractionPlane();
        }
        /**
         * Transform of top level frame object.
         */
        get transform() {
            return this._transform;
        }
        /**
         * Transform of content parent SceneObject.
         */
        get contentTransform() {
            return this._contentTransform;
        }
        get closeButton() {
            return this._buttonHandler.closeButton;
        }
        get followButton() {
            return this._buttonHandler.followButton;
        }
        /**
         * Width of the border around the frame.
         */
        get border() {
            return this._border;
        }
        set border(border) {
            this._border = border;
            this.shader.frameBorder = border;
            this._ogBorder = border;
            this.scaleFrame();
        }
        /**
         * Handles hover behavior for the frame.
         */
        get hoverBehavior() {
            return this._hoverBehavior;
        }
        /**
         * RoundedRectangle component for the frame, used for rendering the frame's visual.
         */
        get roundedRectangle() {
            return this._roundedRectangle;
        }
        /**
         * Billboard component for the frame, used for automatic rotation to face the camera/user.
         */
        get billboardComponent() {
            return this._billboardComponent;
        }
        /**
         * TotalSize is the total size of the frame including border and padding in local space centimeters.
         */
        get totalSize() {
            return new vec2(this.innerSize.x + this.border * 2 + this.padding.x, this.innerSize.y + this.border * 2 + this.padding.y);
        }
        get forceTranslate() {
            return this._forceTranslate;
        }
        set forceTranslate(forceTranslate) {
            this._forceTranslate = forceTranslate;
        }
        /**
         * Getter for the initial scaling size.
         */
        get scalingSizeStart() {
            return this._scalingSizeStart;
        }
        /**
         * Setter for the initial scaling size.
         */
        set scalingSizeStart(thisSize) {
            this._scalingSizeStart = thisSize;
        }
        set isVisible(isVisible) {
            this._isVisible = isVisible;
        }
        get isVisible() {
            return this._isVisible;
        }
        get interactionPlane() {
            return this._interactionPlane;
        }
        set interactionPlane(interactionPlane) {
            this._interactionPlane = interactionPlane;
            this._interactionPlaneTransform = interactionPlane.getTransform();
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(this.initialize.bind(this));
        }
        /**
         * Initializes the frame component, setting up its visual appearance, interaction capabilities,
         */
        initialize() {
            if (this._initialized)
                return;
            // Setup frame.
            this.frameObject = global.scene.createSceneObject("FrameObject");
            this.managedSceneObjects.push(this.frameObject);
            this.frameObject.layer = this.sceneObject.layer;
            this._roundedRectangle = this.frameObject.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
            this.managedComponents.push(this._roundedRectangle);
            this._roundedRectangle.material = frameMaterial.clone();
            this._roundedRectangle.initialize();
            this._roundedRectangle.gradient = true;
            this._roundedRectangle.setBackgroundGradient({
                type: "Linear",
                start: new vec2(-0.66, 1),
                end: new vec2(0.66, -1),
                stop0: {
                    enabled: true,
                    color: FrameConstants.containerGradientBright,
                    percent: 0
                },
                stop1: {
                    enabled: true,
                    color: FrameConstants.containerGradientDark,
                    percent: 0.3
                },
                stop2: {
                    enabled: true,
                    color: FrameConstants.containerGradientDark,
                    percent: 0.5
                },
                stop3: {
                    enabled: true,
                    color: FrameConstants.containerGradientDark,
                    percent: 0.7
                },
                stop4: {
                    enabled: true,
                    color: FrameConstants.containerGradientBright,
                    percent: 1
                }
            });
            this._roundedRectangle.size = this.innerSize;
            this._roundedRectangle.cornerRadius = 2.25;
            this._roundedRectangle.border = true;
            this._roundedRectangle.borderSize = 0.25;
            this._roundedRectangle.borderColor = FrameConstants.borderColor;
            this.shader = this._roundedRectangle.renderMeshVisual.mainMaterial.mainPass;
            this.shader.highlightColorStop1 = FrameConstants.highlightColorStop1;
            this.shader.highlightColorStop2 = FrameConstants.highlightColorStop2;
            this.shader.highlightActiveColorStop1 = FrameConstants.highlightActiveColorStop1;
            this.shader.highlightActiveColorStop2 = FrameConstants.highlightActiveColorStop2;
            this.shader.isActive = 0;
            this.shader.grabZonesCount = 0;
            this.shader.highlightSize = 40;
            this.shader.highlightStop1 = 0.2;
            this.shader.highlightStop2 = 0;
            this.shader.edgeHighlightStop1 = 0.4;
            this.shader.edgeHighlightStop2 = 0;
            this.shader.dotsHighlightStop1 = 0.15;
            this.shader.dotsHighlightStop2 = 0;
            this.shader.dotsScalar = 0.8;
            this.shader.blendMode = BlendMode.PremultipliedAlphaAuto;
            this.shader.colorMask = new vec4b(true, true, true, true);
            this.shader.twoSided = true;
            this.cutOutCenter = this._cutOutCenter;
            // Collider.
            this.colliderShape = Shape.createBoxShape();
            this.colliderShape.size = new vec3(this.innerSize.x, this.innerSize.y, 1);
            this.collider.shape = this.colliderShape;
            this.collider.fitVisual = false;
            // Parent object.
            this._transform = this.sceneObject.getTransform();
            // Setup content and reparent.
            this.content = global.scene.createSceneObject("content");
            this.managedSceneObjects.push(this.content);
            this.content.layer = this.sceneObject.layer;
            this._contentTransform = this.content.getTransform();
            this.sceneObject.children.forEach((child) => {
                child.setParent(this.content);
            });
            this.frameObject.setParent(this.sceneObject);
            this.content.setParent(this.sceneObject);
            this._buttonHandler = new ButtonHandler_1.default({
                frame: this,
                state: this._inputState
            });
            this.showCloseButton = this._showCloseButton;
            this.showFollowButton = this._showFollowButton;
            this._buttonHandler.followButton?.onTriggerUp.add(() => {
                this.setFollowing(!this.following);
            });
            this.cursorHandler = new CursorHandler_1.default({
                frame: this
            });
            this.inputHandler = new FrameInputHandler_1.default({
                frame: this,
                manipulate: this._manipulate,
                content: this.content,
                transform: this.transform,
                cursorHandler: this.cursorHandler,
                isInteractable: this._onlyInteractOnBorder,
                allowScaling: this.allowScaling,
                onScalingEndEvent: this._onScalingEndEvent,
                onScalingStartEvent: this._onScalingStartEvent
            });
            this.onlyInteractOnBorder = this._onlyInteractOnBorder;
            // Use the FrameInputHandler as the authoritative source on when translation starts.
            this.inputHandler.onTranslationStart.add(() => {
                this._onTranslationStartEvent.invoke();
                this.smoothFollow?.startDragging();
            });
            this.inputHandler.onTranslationEnd.add(() => {
                this._onTranslationEndEvent.invoke();
                this.smoothFollow?.finishDragging();
            });
            this._billboardComponent = this.useBillboarding ? this.sceneObject.createComponent(Billboard_1.Billboard.getTypeName()) : null;
            if (this.billboardComponent !== null) {
                this.managedComponents.push(this.billboardComponent);
                this.billboardComponent.xAxisEnabled = this.xAlways;
                this.billboardComponent.yAxisEnabled = this.yAlways;
                this.billboardComponent.axisBufferDegrees = new vec3(this.xBufferDegrees, this.yBufferDegrees, 0);
            }
            // Following logic.
            this.setFollowing(this.following);
            this._buttonHandler.followButton?.toggle(this.following);
            this.originalInnerSize = this.innerSize.uniformScale(1);
            this._interactionPlane = this.sceneObject.createComponent(InteractionPlane_1.InteractionPlane.getTypeName());
            this.managedComponents.push(this._interactionPlane);
            this._interactionPlane.proximityDistance = FrameConstants.nearFieldInteractionZoneDistance;
            this._interactionPlane.targetingVisual = this._targetingVisual;
            this._interactionPlane.enabled = this._enableInteractionPlane;
            this._interactionPlaneTransform = this._interactionPlane.getTransform();
            this.updateInteractionPlane();
            this.border = this._border;
            this.innerSize = this._innerSize;
            this.padding = this._padding;
            /**
             * @description Hover behavior for the frame, allowing it to respond to hover events for the frame, its content and ui.
             */
            this._hoverBehavior = new HoverBehavior_1.default(this._interactable);
            this.hideCursorHighlight();
            if (this.useSnapping) {
                this.createSnappableBehavior();
            }
            if (this.useFollowBehavior) {
                this.setUseFollow(true);
            }
            this.unsubscribes.push(this.hoverBehavior.onHoverStart.add((e) => {
                this.cursorHandler.setCursor(CursorControllerProvider_1.CursorControllerProvider.getInstance().getCursorByInteractor(e.interactor));
                if (this.autoShowHide)
                    this.showVisual();
                if (!this.grabZoneOnly)
                    this.showCursorHighlight();
                this._inputState.hovered = true;
                this._inputState.hierarchyHovered = true;
            }));
            this.unsubscribes.push(this.hoverBehavior.onHoverUpdate.add((e) => {
                const targetObject = e?.target.sceneObject;
                if (e.interactor.targetHitInfo) {
                    this.computeHitPosition(e.interactor);
                }
                const hoveringContentInteractable = targetObject !== this.sceneObject &&
                    targetObject !== this._buttonHandler.closeButton?.sceneObject &&
                    targetObject !== this._buttonHandler.followButton?.sceneObject;
                const isNearFieldMode = (e.interactor.inputType & Interactor_1.InteractorInputType.BothHands) !== 0 &&
                    !e.interactor.isFarField();
                // Start hovering grab zone.
                if (!hoveringContentInteractable &&
                    this.inputHandler.isInZone &&
                    !this.inputHandler.isInZoneLast &&
                    this.grabZoneOnly) {
                    this.showCursorHighlight();
                }
                // End hovering grab zone.
                if (!hoveringContentInteractable &&
                    !this.inputHandler.isInZone &&
                    !this.inputHandler.isInZoneLast &&
                    this.grabZoneOnly) {
                    this.hideCursorHighlight();
                }
                // Hovering over interactable container content ONLY.
                if (hoveringContentInteractable && !isNearFieldMode) {
                    if (!this._hoveringContentLast) {
                        this.hideCursorHighlight();
                    }
                }
                else {
                    if (this._hoveringContentLast) {
                        if (!this.grabZoneOnly || (this.grabZoneOnly && this.inputHandler.isInZone)) {
                            this.showCursorHighlight();
                        }
                    }
                }
                this._hoveringContentLast = hoveringContentInteractable;
                // Hover over interactable area ( non border container ) OR interactable container content.
                this._inputState.innerInteractableActive = targetObject !== this.sceneObject;
                this._onInitializedEvent.invoke();
            }));
            this.unsubscribes.push(this.hoverBehavior.onHoverEnd.add(() => {
                if (this.autoShowHide)
                    this.hideVisual();
                this.hideCursorHighlight();
                this._inputState.hovered = false;
                this._inputState.hierarchyHovered = false;
                this._inputState.innerInteractableActive = false;
            }));
            this.unsubscribes.push(this._interactable.onTriggerStart((e) => {
                const targetObject = e?.target.sceneObject;
                const hitLocal = this.computeHitPosition(e.interactor).localPosition;
                this._dragStart = new vec3(hitLocal.x, hitLocal.y, 0);
                if (targetObject === this.sceneObject) {
                    this._inputState.pinching = true;
                    this.currentInteractor = e.interactor;
                }
            }));
            this.unsubscribes.push(this._interactable.onTriggerUpdate((event) => {
                if (event.interactor.targetHitInfo && this.inputHandler.state.scaling) {
                    // On scaling drag.
                    const dragPos = this.computeHitPosition(event.interactor).localPosition;
                    const dragDelta = dragPos.sub(this._dragStart);
                    const sizeDelta = new vec2(dragDelta.x * Math.sign(this._dragStart.x) * 2, dragDelta.y * Math.sign(this._dragStart.y) * 2);
                    const dragScale = 1 + Math.max(sizeDelta.x / this.scalingSizeStart.x, sizeDelta.y / this.scalingSizeStart.y);
                    const minScale = Math.max(this.minimumSize.x / this.scalingSizeStart.x, this.minimumSize.y / this.scalingSizeStart.y);
                    const maxScale = Math.min(this.maximumSize.x / this.scalingSizeStart.x, this.maximumSize.y / this.scalingSizeStart.y);
                    this.innerSize = this.scalingSizeStart.uniformScale(MathUtils.clamp(dragScale, minScale, maxScale));
                }
            }));
            this.unsubscribes.push(this._interactable.onTriggerEnd(() => {
                this._inputState.pinching = false;
                this.currentInteractor = null;
            }));
            this.unsubscribes.push(this._interactable.onTriggerEndOutside(() => {
                this._inputState.pinching = false;
                this.currentInteractor = null;
            }));
            this.unsubscribes.push(this._interactable.onTriggerCanceled(() => {
                this._inputState.pinching = false;
                this.currentInteractor = null;
            }));
            if (this.autoShowHide)
                this.hideVisual();
            this._buttonHandler.renderOrder = this.renderOrder;
            this._interactable.targetingMode = Interactor_1.TargetingMode.All;
            this._interactable.allowMultipleInteractors = false;
            this._manipulate.setCanScale(false);
            this._manipulate.setCanRotate(false);
            this.appearance = this._appearance;
            this.createEvent("OnEnableEvent").bind(() => {
                this.managedComponents.forEach((component) => {
                    if (component) {
                        component.enabled = true;
                    }
                });
            });
            this.createEvent("OnDisableEvent").bind(() => {
                this.managedComponents.forEach((component) => {
                    if (component) {
                        component.enabled = false;
                    }
                });
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this._opacityCancel();
                this._cursorHighlightCancel();
                this.squeezeCancel();
                this.content.children.forEach((child) => {
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
            this.createEvent("UpdateEvent").bind(this.update.bind(this));
            this.createEvent("LateUpdateEvent").bind(this.lateUpdate.bind(this));
            this._initialized = true;
        }
        update() {
            this.inputHandler.update(this._inputState);
            this._inputState.innerInteractableActive ||= this.inputHandler.state.hoveringInteractable;
            if (this._inputState.innerInteractableActive && !this._hoveringInnerInteractableLast) {
                const currentOpacity = this._opacity;
                if (this.autoShowHide) {
                    this.tweenOpacity(currentOpacity, this._interactableHoverOpacity);
                }
                // Start hovering inner interactable.
                this._onHoverEnterInnerInteractableEvent.invoke();
            }
            else if (!this._inputState.innerInteractableActive && this._hoveringInnerInteractableLast) {
                const currentOpacity = this._opacity;
                if (this._inputState.hierarchyHovered) {
                    if (this.autoShowHide) {
                        this.tweenOpacity(currentOpacity, 1);
                    }
                }
                // Stop hovering inner interactable.
                this._onHoverExitInnerInteractableEvent.invoke();
            }
            this._hoveringInnerInteractableLast = this._inputState.innerInteractableActive;
            this.cursorHandler.update(this._inputState, this.inputHandler.state);
            if (this.inputHandler.state.scaling && !this.inputHandler.scalingLastFrame) {
                // First frame scaling.
                this.smoothFollow?.startDragging();
            }
            if (!this.inputHandler.state.scaling && this.inputHandler.scalingLastFrame) {
                // First frame NOT scaling.
                this.smoothFollow?.finishDragging();
            }
            if (this.inputHandler.state.translating) {
                this.snappingHandler?.update();
            }
            if (this.following) {
                this.smoothFollow?.onUpdate();
            }
            if (this.inputHandler.state.translating) {
                if (this.billboardComponent !== null) {
                    this.billboardComponent.xAxisEnabled =
                        (this.xOnTranslate && (this.allowTranslation || this.forceTranslate)) || this.xAlways;
                    this.billboardComponent.yAxisEnabled =
                        (this.yOnTranslate && (this.allowTranslation || this.forceTranslate)) || this.yAlways;
                    this.billboardComponent.axisBufferDegrees = new vec3(0, 0, 0);
                }
                if (!this._translatingLastFrame) {
                    // just started translating
                    this.tweenBorderSize(this._border - this.squeezeAmount);
                }
                this._translatingLastFrame = true;
            }
            else {
                if (this.billboardComponent !== null) {
                    this.billboardComponent.xAxisEnabled = this.xAlways;
                    this.billboardComponent.yAxisEnabled = this.yAlways;
                    this.billboardComponent.axisBufferDegrees = new vec3(this.xBufferDegrees, this.yBufferDegrees, 0);
                }
                if (this._translatingLastFrame) {
                    // just stopped translating
                    this.tweenBorderSize(this._ogBorder);
                }
                this._translatingLastFrame = false;
            }
            if (this._inputState.pinching) {
                this.shader.isActive = 1;
                this.roundedRectangle.borderColor = FrameConstants.borderActiveColor;
            }
            else {
                this.shader.isActive = 0;
                this.roundedRectangle.borderColor = FrameConstants.borderColor;
            }
            if (DEBUG_DRAW) {
                //
                // debug draw border size on bottom center
                global.debugRenderSystem.drawBox(this.transform.getWorldPosition().sub(new vec3(0, this.totalSize.y * 0.5 - this.border * 0.5, 0.1)), this.border, this.border, 0.1, borderDebugColor);
                // debug draw border size on bottom center
                global.debugRenderSystem.drawBox(this.transform.getWorldPosition().sub(new vec3(this.totalSize.x * 0.5 - this.border * 0.5, 0, 0.1)), this.border, this.border, 0.1, borderDebugColor);
                // grab zones debug draw
                for (const grabZone of this.grabZones) {
                    const worldPos = this.transform.getWorldPosition();
                    const bottomLeft = new vec3(grabZone.x, grabZone.y, 0).add(worldPos);
                    const topLeft = new vec3(grabZone.x, grabZone.w, 0).add(worldPos);
                    const topRight = new vec3(grabZone.z, grabZone.w, 0).add(worldPos);
                    const bottomRight = new vec3(grabZone.z, grabZone.y, 0).add(worldPos);
                    global.debugRenderSystem.drawLine(bottomLeft, topLeft, debugRed);
                    global.debugRenderSystem.drawLine(topLeft, topRight, debugRed);
                    global.debugRenderSystem.drawLine(topRight, bottomRight, debugRed);
                    global.debugRenderSystem.drawLine(bottomRight, bottomLeft, debugRed);
                }
            }
        }
        lateUpdate() {
            this.hoverBehavior.lateUpdate();
        }
        updateInteractionPlane() {
            if (!this._interactionPlane || !this._interactionPlaneTransform) {
                return;
            }
            const paddedSize = this.totalSize.add(this._interactionPlanePadding);
            this._interactionPlane.planeSize = paddedSize;
            this._interactionPlane.offset = this._interactionPlaneOffset;
            this._interactionPlane.targetingVisual = this._targetingVisual;
        }
        /**
         * Sets the buffer degrees for the billboard component. Will only be effective if Frame's billboarding is set to true, and xAlways and/or yAlways is set to true.
         * @param xBufferDegrees the buffer degrees for the x-axis
         * @param yBufferDegrees the buffer degrees for the y-axis
         */
        setBillboardBufferDegrees(xBufferDegrees, yBufferDegrees) {
            if (this.billboardComponent !== null) {
                this.xBufferDegrees = xBufferDegrees;
                this.yBufferDegrees = yBufferDegrees;
            }
        }
        /**
         * @returns current renderOrder for the renderMeshVisual of the frame itself
         */
        get renderOrder() {
            return this.roundedRectangle.renderMeshVisual.getRenderOrder();
        }
        /**
         * @param renderOrder sets renderOrder for the renderMeshVisual of the frame itself
         */
        set renderOrder(renderOrder) {
            this.roundedRectangle.renderMeshVisual.setRenderOrder(renderOrder);
            this._buttonHandler.renderOrder = renderOrder;
        }
        /**
         * @returns the current grab zones of the frame
         */
        get grabZones() {
            return this._grabZones;
        }
        /**
         * Sets the grab zones of the frame, which are used for interaction
         */
        set grabZones(grabZones) {
            this._grabZones = grabZones;
            this.shader.grabZonesCount = this.grabZones.length;
            this.shader.grabZones = this.grabZones;
        }
        /**
         * @returns whether the frame only allows interaction in the grab zones
         */
        get grabZoneOnly() {
            return this._grabZoneOnly;
        }
        /**
         * Sets whether the frame only allows interaction in the grab zones
         * @param only - if true, interaction is limited to the grab zones
         */
        set grabZoneOnly(only) {
            this._grabZoneOnly = only;
        }
        /**
         * gets the onlyInteractOnBorder setting
         */
        get onlyInteractOnBorder() {
            return this._onlyInteractOnBorder;
        }
        /**
         * sets the onlyInteractOnBorder setting
         * @param onlyInteractOnBorder - if true, interaction is limited to the border of the frame
         */
        set onlyInteractOnBorder(onlyInteractOnBorder) {
            this._onlyInteractOnBorder = onlyInteractOnBorder;
            this.inputHandler.isInteractable = onlyInteractOnBorder;
            this.shader.borderOnly = onlyInteractOnBorder ? 1 : 0;
        }
        computeHitPosition(interactor) {
            const position = interactor.planecastPoint;
            const invertedWorldTransform = this.transform.getInvertedWorldTransform();
            const objectSpaceHit = invertedWorldTransform.multiplyPoint(position);
            this._inputState.position = objectSpaceHit;
            const normalizedPosition = new vec2((objectSpaceHit.x / this.totalSize.x) * 2, (objectSpaceHit.y / this.totalSize.y) * 2);
            if (!this.inputHandler.state.scaling && !this.inputHandler.state.translating && !this._inputState.pinching)
                this.shader.cursorPosition = normalizedPosition;
            return {
                localPosition: objectSpaceHit,
                normalizedPosition: normalizedPosition
            };
        }
        /**
         * @param opacity sets opacity for all frame elements
         * Note this parameter is effected by calls to `showVisual` and `hideVisual`.
         */
        set opacity(opacity) {
            if (opacity > 0) {
                this.isVisible = true;
            }
            else {
                this.isVisible = false;
            }
            this._opacity = opacity;
            this.shader.opacityFactor = opacity;
            this._buttonHandler.opacity = opacity;
        }
        /**
         * @returns current opacity of frame elements
         */
        get opacity() {
            return this._opacity;
        }
    };
    __setFunctionName(_classThis, "Frame");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Frame = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Frame = _classThis;
})();
exports.Frame = Frame;
//# sourceMappingURL=Frame.js.map