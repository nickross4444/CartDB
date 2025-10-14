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
exports.ScrollBar = void 0;
var __selfType = requireType("./ScrollBar");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const color_1 = require("SpectaclesInteractionKit.lspkg/Utils/color");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const mathUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/mathUtils");
const Element_1 = require("./Components/Element");
const UIKitUtilities_1 = require("./Utility/UIKitUtilities");
const RoundedRectangle_1 = require("./Visuals/RoundedRectangle/RoundedRectangle");
const RoundedRectangleVisual_1 = require("./Visuals/RoundedRectangle/RoundedRectangleVisual");
var ScrollOrientation;
(function (ScrollOrientation) {
    ScrollOrientation["Horizontal"] = "Horizontal";
    ScrollOrientation["Vertical"] = "Vertical";
})(ScrollOrientation || (ScrollOrientation = {}));
const darkGray = new vec4(0.22, 0.22, 0.22, 1);
const mediumGray = new vec4(0.31, 0.31, 0.31, 1);
const lightGray = new vec4(0.4, 0.4, 0.4, 1);
const bgDarkGray = new vec4(0.15, 0.15, 0.15, 1);
const bgMediumGray = new vec4(0.2, 0.2, 0.2, 1);
const bgLightGray = new vec4(0.25, 0.25, 0.25, 1);
const SCROLL_BAR_BACKGROUND_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    start: new vec2(0, -1),
    end: new vec2(0, 1),
    stop0: { enabled: true, percent: -1, color: bgMediumGray },
    stop1: { enabled: true, percent: 2, color: bgDarkGray }
};
const SCROLL_BAR_BACKGROUND_HOVER_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    start: new vec2(0, -1),
    end: new vec2(0, 1),
    stop0: { enabled: true, percent: -1, color: bgLightGray },
    stop1: { enabled: true, percent: 2, color: bgMediumGray }
};
const SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    start: new vec2(0, -1),
    end: new vec2(0, 1),
    stop0: { enabled: true, percent: -1, color: (0, color_1.withAlpha)(bgMediumGray, 0) },
    stop1: { enabled: true, percent: 2, color: (0, color_1.withAlpha)(bgDarkGray, 0) }
};
const SCROLL_BAR_KNOB_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    stop0: { enabled: true, percent: -1, color: darkGray },
    stop1: { enabled: true, percent: -0.25, color: darkGray },
    stop2: { enabled: true, percent: 2, color: mediumGray }
};
const SCROLL_BAR_KNOB_HOVER_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    stop0: { enabled: true, percent: -1, color: mediumGray },
    stop1: { enabled: true, percent: -0.25, color: mediumGray },
    stop2: { enabled: true, percent: 2, color: lightGray }
};
const SCROLL_BAR_KNOB_INACTIVE_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    stop0: { enabled: true, percent: -1, color: (0, color_1.withAlpha)(darkGray, 0) },
    stop1: { enabled: true, percent: -0.25, color: (0, color_1.withAlpha)(darkGray, 0) },
    stop2: { enabled: true, percent: 2, color: (0, color_1.withAlpha)(mediumGray, 0) }
};
let ScrollBar = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ScrollBar = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.orientation = this.orientation;
            this.scrollWindow = this.scrollWindow;
            this.slider = this.slider;
            this.windowSize = 0;
            this.contentLength = 0;
            this.isDraggingSlider = false;
            this._previousState = Element_1.StateName.default;
            this._isEnabled = true;
            this._renderOrder = 0;
            this.initialized = false;
            this.sliderColorChangeCancel = new animate_1.CancelSet();
            this.unsubscribes = [];
            this.onVisibilityChangedEvent = new Event_1.default();
            this.onVisibilityChanged = this.onVisibilityChangedEvent.publicApi();
            this.setupGradientFades = () => {
                let sliderVisible = true;
                const visDuration = 0.3;
                const doAnimation = (fromKnob, fromBase, toKnob, toBase, onCompleted) => {
                    const trackGradient = this.trackVisual.defaultGradient;
                    const knobGradient = this.knobVisual.defaultGradient;
                    (0, animate_1.default)({
                        duration: visDuration,
                        cancelSet: this.sliderColorChangeCancel,
                        update: (t) => {
                            trackGradient.stop0.color = vec4.lerp(fromBase.stop0.color, toBase.stop0.color, t);
                            trackGradient.stop1.color = vec4.lerp(fromBase.stop1.color, toBase.stop1.color, t);
                            this.trackRoundedRectangle?.setBackgroundGradient(trackGradient);
                            knobGradient.stop0.color = vec4.lerp(fromKnob.stop0.color, toKnob.stop0.color, t);
                            knobGradient.stop1.color = vec4.lerp(fromKnob.stop1.color, toKnob.stop1.color, t);
                            knobGradient.stop2.color = vec4.lerp(fromKnob.stop2.color, toKnob.stop2.color, t);
                            this.knobRoundedRectangle?.setBackgroundGradient(knobGradient);
                        },
                        ended: () => {
                            onCompleted();
                        }
                    });
                };
                this.slider.onStateChanged.add((state) => {
                    if (state === Element_1.StateName.inactive) {
                        if (sliderVisible === true) {
                            // hide slider
                            sliderVisible = false;
                            const fromKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_INACTIVE_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => {
                                this.slider.sceneObject.enabled = false;
                            });
                        }
                    }
                    else if (this._previousState === Element_1.StateName.default && state === Element_1.StateName.hover) {
                        if (sliderVisible === true) {
                            const fromKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_HOVER_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_HOVER_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => { });
                        }
                    }
                    else if (this._previousState === Element_1.StateName.hover && state === Element_1.StateName.default) {
                        if (sliderVisible === true) {
                            const fromKnob = SCROLL_BAR_KNOB_HOVER_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_HOVER_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => { });
                        }
                    }
                    else if (this._previousState === Element_1.StateName.inactive && state === Element_1.StateName.default) {
                        if (sliderVisible === false) {
                            // show slider
                            sliderVisible = true;
                            const fromKnob = SCROLL_BAR_KNOB_INACTIVE_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => { });
                        }
                    }
                    this._previousState = state;
                });
            };
        }
        __initialize() {
            super.__initialize();
            this.orientation = this.orientation;
            this.scrollWindow = this.scrollWindow;
            this.slider = this.slider;
            this.windowSize = 0;
            this.contentLength = 0;
            this.isDraggingSlider = false;
            this._previousState = Element_1.StateName.default;
            this._isEnabled = true;
            this._renderOrder = 0;
            this.initialized = false;
            this.sliderColorChangeCancel = new animate_1.CancelSet();
            this.unsubscribes = [];
            this.onVisibilityChangedEvent = new Event_1.default();
            this.onVisibilityChanged = this.onVisibilityChangedEvent.publicApi();
            this.setupGradientFades = () => {
                let sliderVisible = true;
                const visDuration = 0.3;
                const doAnimation = (fromKnob, fromBase, toKnob, toBase, onCompleted) => {
                    const trackGradient = this.trackVisual.defaultGradient;
                    const knobGradient = this.knobVisual.defaultGradient;
                    (0, animate_1.default)({
                        duration: visDuration,
                        cancelSet: this.sliderColorChangeCancel,
                        update: (t) => {
                            trackGradient.stop0.color = vec4.lerp(fromBase.stop0.color, toBase.stop0.color, t);
                            trackGradient.stop1.color = vec4.lerp(fromBase.stop1.color, toBase.stop1.color, t);
                            this.trackRoundedRectangle?.setBackgroundGradient(trackGradient);
                            knobGradient.stop0.color = vec4.lerp(fromKnob.stop0.color, toKnob.stop0.color, t);
                            knobGradient.stop1.color = vec4.lerp(fromKnob.stop1.color, toKnob.stop1.color, t);
                            knobGradient.stop2.color = vec4.lerp(fromKnob.stop2.color, toKnob.stop2.color, t);
                            this.knobRoundedRectangle?.setBackgroundGradient(knobGradient);
                        },
                        ended: () => {
                            onCompleted();
                        }
                    });
                };
                this.slider.onStateChanged.add((state) => {
                    if (state === Element_1.StateName.inactive) {
                        if (sliderVisible === true) {
                            // hide slider
                            sliderVisible = false;
                            const fromKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_INACTIVE_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => {
                                this.slider.sceneObject.enabled = false;
                            });
                        }
                    }
                    else if (this._previousState === Element_1.StateName.default && state === Element_1.StateName.hover) {
                        if (sliderVisible === true) {
                            const fromKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_HOVER_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_HOVER_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => { });
                        }
                    }
                    else if (this._previousState === Element_1.StateName.hover && state === Element_1.StateName.default) {
                        if (sliderVisible === true) {
                            const fromKnob = SCROLL_BAR_KNOB_HOVER_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_HOVER_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => { });
                        }
                    }
                    else if (this._previousState === Element_1.StateName.inactive && state === Element_1.StateName.default) {
                        if (sliderVisible === false) {
                            // show slider
                            sliderVisible = true;
                            const fromKnob = SCROLL_BAR_KNOB_INACTIVE_GRADIENT;
                            const toKnob = SCROLL_BAR_KNOB_GRADIENT;
                            const fromBase = SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT;
                            const toBase = SCROLL_BAR_BACKGROUND_GRADIENT;
                            this.sliderColorChangeCancel();
                            doAnimation(fromKnob, fromBase, toKnob, toBase, () => { });
                        }
                    }
                    this._previousState = state;
                });
            };
        }
        get renderOrder() {
            return this._renderOrder;
        }
        set renderOrder(order) {
            if (order === undefined) {
                return;
            }
            this._renderOrder = order;
            if (this.initialized) {
                this.slider.renderOrder = order;
            }
        }
        /**
         * Gets the scene object associated with the knob visual of the scroll bar.
         *
         * @returns {SceneObject} The scene object representing the knob visual.
         */
        get knobObject() {
            return this.knobVisual.sceneObject;
        }
        /**
         * Gets the enabled state of the scrollbar.
         *
         * @returns {boolean} `true` if the scrollbar is enabled; otherwise, `false`.
         */
        get isEnabled() {
            return this._isEnabled;
        }
        /**
         * Sets the enabled state of the scrollbar.
         *
         * @param enabled - A boolean indicating whether the scrollbar should be enabled (`true`) or disabled (`false`).
         */
        set isEnabled(enabled) {
            if (enabled === undefined) {
                return;
            }
            this._isEnabled = enabled;
            if (this.initialized) {
                this.updateSliderVisibility();
            }
        }
        /**
         * Determines whether the scrollbar is visible.
         * The scrollbar is considered visible if it is enabled and the content length
         * of the scroll view exceeds the size of the visible window.
         *
         * @returns `true` if the scrollbar is enabled and the content length is greater
         *          than the window size; otherwise, `false`.
         */
        get isVisible() {
            return this._isEnabled && this.isScrollable;
        }
        get isScrollable() {
            return this.contentLength > this.windowSize;
        }
        onAwake() {
            this.setupVisuals();
            this.createEvent("OnStartEvent").bind(() => {
                this.scrollWindow.horizontal = this.orientation === ScrollOrientation.Horizontal;
                this.scrollWindow.vertical = this.orientation === ScrollOrientation.Vertical;
                this.windowSize =
                    this.orientation === ScrollOrientation.Horizontal
                        ? this.scrollWindow.getWindowSize().x
                        : this.scrollWindow.getWindowSize().y;
                this.contentLength =
                    this.orientation === ScrollOrientation.Horizontal
                        ? this.scrollWindow.getScrollDimensions().x
                        : this.scrollWindow.getScrollDimensions().y;
                this.trackVisual.cornerRadius =
                    this.orientation === ScrollOrientation.Horizontal ? this.slider.size.x * 0.5 : this.slider.size.y * 0.5;
                this.slider.visual = this.trackVisual;
                this.slider.knobVisual = this.knobVisual;
                this.slider.hasTrackVisual = false;
                this.trackRoundedRectangle = this.slider.visual.sceneObject.getComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
                this.knobRoundedRectangle = this.slider.knobVisual.sceneObject.getComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
                this.slider.onInitialized.add(() => {
                    this.slider.renderOrder = this._renderOrder;
                    this.setupScrollviewEventHandlers();
                    this.setupSliderEventHandlers();
                    this.updateSliderKnobSize();
                    this.setupGradientFades();
                    this.updateSliderVisibility();
                    this.slider.sceneObject.enabled = this.isVisible;
                    this.slider.currentValue = (0, mathUtils_1.clamp)((this.orientation === ScrollOrientation.Horizontal
                        ? this.scrollWindow.scrollPositionNormalized.x
                        : this.scrollWindow.scrollPositionNormalized.y) /
                        2 +
                        0.5, 0, 1);
                });
                this.createEvent("OnEnableEvent").bind(() => {
                    if (this.unsubscribes.length === 0) {
                        this.setupScrollviewEventHandlers();
                        this.setupSliderEventHandlers();
                    }
                });
                this.createEvent("OnDisableEvent").bind(() => {
                    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
                    this.unsubscribes = [];
                });
                this.createEvent("OnDestroyEvent").bind(() => {
                    this.sliderColorChangeCancel();
                    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
                    this.unsubscribes = [];
                });
                this.slider.createEvent("OnEnableEvent").bind(() => {
                    this.onVisibilityChangedEvent.invoke(true);
                });
                this.slider.createEvent("OnDisableEvent").bind(() => {
                    this.onVisibilityChangedEvent.invoke(false);
                });
                this.slider.createEvent("OnDestroyEvent").bind(() => {
                    this.sliderColorChangeCancel();
                    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
                    this.unsubscribes = [];
                });
                this.initialized = true;
            });
        }
        setupVisuals() {
            const trackParameters = {
                default: {
                    isBaseGradient: true,
                    hasBorder: false,
                    baseGradient: (0, UIKitUtilities_1.gradientParameterClone)(SCROLL_BAR_BACKGROUND_GRADIENT)
                }
            };
            this.trackVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({ sceneObject: this.slider.sceneObject, style: trackParameters });
            this.trackVisual.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
            this.trackVisual.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
            this.trackVisual.shouldColorChange = false;
            this.trackVisual.initialize();
            const knobParameters = {
                default: {
                    isBaseGradient: true,
                    hasBorder: false,
                    baseGradient: (0, UIKitUtilities_1.gradientParameterClone)(SCROLL_BAR_KNOB_GRADIENT)
                }
            };
            const knobObject = global.scene.createSceneObject("ScrollBarKnob");
            knobObject.setParent(this.slider.sceneObject);
            this.knobVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                sceneObject: knobObject,
                style: knobParameters
            });
            this.knobVisual.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
            this.knobVisual.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
            this.knobVisual.shouldColorChange = false;
            this.knobVisual.initialize();
        }
        setupScrollviewEventHandlers() {
            this.unsubscribes.push(this.scrollWindow.onScrollDimensionsUpdated.add(() => {
                this.contentLength =
                    this.orientation === ScrollOrientation.Horizontal
                        ? this.scrollWindow.getScrollDimensions().x
                        : this.scrollWindow.getScrollDimensions().y;
                this.updateSliderKnobSize();
                this.updateSliderVisibility();
            }));
            this.unsubscribes.push(this.scrollWindow.onScrollPositionUpdated.add(() => {
                if (!this.isDraggingSlider) {
                    this.slider.currentValue = (0, mathUtils_1.clamp)((this.orientation === ScrollOrientation.Horizontal
                        ? this.scrollWindow.scrollPositionNormalized.x
                        : this.scrollWindow.scrollPositionNormalized.y) /
                        2 +
                        0.5, 0, 1);
                }
            }));
        }
        setupSliderEventHandlers() {
            this.unsubscribes.push(this.slider.interactable.onTriggerStart.add(() => {
                this.isDraggingSlider = true;
            }));
            this.unsubscribes.push(this.slider.onFinished.add(() => {
                this.isDraggingSlider = false;
            }));
            this.unsubscribes.push(this.slider.interactable.onTriggerCanceled.add(() => {
                this.isDraggingSlider = false;
            }));
            this.unsubscribes.push(this.slider.onValueChange.add((value) => {
                if (this.isDraggingSlider) {
                    if (this.scrollWindow) {
                        this.scrollWindow.scrollPositionNormalized =
                            this.orientation === ScrollOrientation.Horizontal
                                ? new vec2(value * 2 - 1, 0)
                                : new vec2(0, value * 2 - 1);
                    }
                }
            }));
        }
        updateSliderKnobSize() {
            if (this.isScrollable) {
                if (this.slider) {
                    const width = this.slider.customKnobSize ? this.slider.knobSize.y : this.slider.size.y;
                    const length = this.slider.size.x * Math.min(this.windowSize / this.contentLength, 1);
                    this.slider.knobSize = new vec2(Math.max(length, width), width);
                    this.knobVisual.cornerRadius = width * 0.5;
                }
            }
        }
        updateSliderVisibility() {
            if (this.slider) {
                if (this.isVisible) {
                    this.slider.sceneObject.enabled = true;
                }
                this.slider.inactive = !this.isVisible;
            }
        }
    };
    __setFunctionName(_classThis, "ScrollBar");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ScrollBar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ScrollBar = _classThis;
})();
exports.ScrollBar = ScrollBar;
//# sourceMappingURL=ScrollBar.js.map