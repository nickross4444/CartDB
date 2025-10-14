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
exports.ConfirmationSlider = void 0;
var __selfType = requireType("./ConfirmationSlider");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const UIKitUtilities_1 = require("../../Utility/UIKitUtilities");
const RoundedRectangle_1 = require("../../Visuals/RoundedRectangle/RoundedRectangle");
const RoundedRectangleVisual_1 = require("../../Visuals/RoundedRectangle/RoundedRectangleVisual");
const Element_1 = require("../Element");
const Slider_1 = require("./Slider");
const log = new NativeLogger_1.default("ConfirmationSlider");
const TRACKFILL_Z_OFFSET = 0.01;
const FillGradient = {
    stop0Color0: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.8, 1),
    stop0Color1: (0, UIKitUtilities_1.HSVtoRGB)(43, 0.59, 0.31, 1),
    stop1Color0: (0, UIKitUtilities_1.HSVtoRGB)(51, 0.49, 0.64, 1),
    stop1Color1: (0, UIKitUtilities_1.HSVtoRGB)(51, 0.49, 0.64, 1)
};
const FillParameters = {
    start: new vec2(-1, 0),
    end: new vec2(1, 0)
};
const SliderVisualParameters = {
    default: {
        isBaseGradient: true,
        baseGradient: {
            start: new vec2(0, 1),
            end: new vec2(0, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.12, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.17, 1)
            }
        },
        hasBorder: true,
        borderSize: 0.1,
        borderType: "Gradient",
        borderGradient: {
            start: new vec2(-0.9, 1),
            end: new vec2(0.9, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.28, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.17, 0)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.36, 1)
            }
        }
    }
};
const KnobVisualParameters = {
    default: {
        isBaseGradient: true,
        baseGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(51, 0.18, 0.15, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.6, 0.35, 1)
            }
        },
        hasBorder: true,
        borderType: "Gradient",
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.5, 0.46, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(51, 0.37, 0.13, 1)
            }
        }
    },
    hover: {
        baseGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.42, 0.23, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.58, 0.47, 1)
            }
        },
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.5, 0.5, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(51, 0.37, 0.15, 1)
            }
        }
    },
    triggered: {
        baseGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(43, 0.59, 0.29, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(45, 0.63, 0.68, 1)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(51, 0.44, 0.68, 1)
            }
        },
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.36, 0.94, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.16, 1)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.36, 0.94, 1)
            }
        }
    }
};
/**
 * Component for a confirmation slider that allows users to slide to confirm an action.
 * It provides visual feedback and triggers an event when the confirmation is successful.
 */
let ConfirmationSlider = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Slider_1.Slider;
    var ConfirmationSlider = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._confirmationThreshold = this._confirmationThreshold;
            this.onConfirmationEvent = new Event_1.default();
            /**
             * Event that is triggered when the slider is successfully confirmed.
             */
            this.onConfirmation = this.onConfirmationEvent.publicApi();
            this.onResetEvent = new Event_1.default();
            /**
             * Event that is triggered when the slider is reset to its initial state.
             */
            this.onReset = this.onResetEvent.publicApi();
            this.hasTrackVisual = true;
            this._knobSize = new vec2(3, 3);
            this.customKnobSize = false;
        }
        __initialize() {
            super.__initialize();
            this._confirmationThreshold = this._confirmationThreshold;
            this.onConfirmationEvent = new Event_1.default();
            /**
             * Event that is triggered when the slider is successfully confirmed.
             */
            this.onConfirmation = this.onConfirmationEvent.publicApi();
            this.onResetEvent = new Event_1.default();
            /**
             * Event that is triggered when the slider is reset to its initial state.
             */
            this.onReset = this.onResetEvent.publicApi();
            this.hasTrackVisual = true;
            this._knobSize = new vec2(3, 3);
            this.customKnobSize = false;
        }
        /**
         * Sets the value that the slider must reach on finished to trigger a confirmation.
         * @param value - A number between 0 and 1 representing the threshold.
         */
        set confirmationThreshold(value) {
            if (value === undefined) {
                return;
            }
            if (value < 0 || value > 1) {
                log.w("Confirmation threshold must be between 0 and 1.");
                return;
            }
            this._confirmationThreshold = value;
        }
        /**
         * Gets the current confirmation threshold.
         * @returns The confirmation threshold value (0 to 1).
         */
        get confirmationThreshold() {
            return this._confirmationThreshold;
        }
        onAwake() {
            super.onAwake();
        }
        createDefaultVisual() {
            if (!this._visual) {
                const defaultVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: this.sceneObject,
                    style: SliderVisualParameters
                });
                defaultVisual.renderMeshVisual.mainMaterial = requireAsset("../../../Materials/ConfirmationSlider.mat");
                defaultVisual.cornerRadius = this.size.y * 0.5;
                this._visual = defaultVisual;
            }
            if (!this._knobVisual) {
                const knobObject = global.scene.createSceneObject("SliderKnob");
                this.managedSceneObjects.add(knobObject);
                const defaultKnobVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: knobObject,
                    style: KnobVisualParameters
                });
                defaultKnobVisual.cornerRadius = (this.size.y - defaultKnobVisual.borderSize * 2) * 0.5;
                this._knobVisual = defaultKnobVisual;
                this._knobVisual.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
                this._knobSize = new vec2(this.size.y * 1.5, this.size.y);
                knobObject.setParent(this.sceneObject);
            }
            this.customFillObject = global.scene.createSceneObject("ConfirmationSliderFill");
            this.managedSceneObjects.add(this.customFillObject);
            this.customFillObject.layer = this.sceneObject.layer;
            this.customFillObject.setParent(this.sceneObject);
            this.customTrackFill = this.customFillObject.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
            this.managedComponents.add(this.customTrackFill);
            this.customTrackFill.initialize();
            this.customTrackFill.gradient = true;
            this.updateCustomFillSize();
            this.onKnobMoved.add(this.updateCustomFillSize.bind(this));
        }
        updateCustomFillSize() {
            const borderSize = this._visual.borderSize;
            const fillSize = this.customTrackFill.size.uniformScale(1);
            fillSize.y = this.size.y - borderSize * 2;
            fillSize.x = MathUtils.lerp(fillSize.y, this.size.x - borderSize * 2, this.knobValue);
            const xPos = MathUtils.lerp((this.size.x - borderSize * 2) * -0.5 + fillSize.y * 0.5, 0, this.knobValue);
            this.customFillObject.getTransform().setLocalPosition(new vec3(xPos, 0, TRACKFILL_Z_OFFSET));
            this.customTrackFill.cornerRadius = fillSize.y * 0.5;
            this.customTrackFill.size = fillSize;
            this.customTrackFill.setBackgroundGradient({
                ...FillParameters,
                stop0: {
                    percent: 0,
                    color: vec4.lerp(FillGradient.stop0Color0, FillGradient.stop0Color1, this.knobValue)
                },
                stop1: {
                    percent: 1,
                    color: vec4.lerp(FillGradient.stop1Color0, FillGradient.stop1Color1, this.knobValue)
                }
            });
        }
        onInteractableDragEnd(dragEvent) {
            super.onInteractableDragEnd(dragEvent);
            const shineFactor = this.visual.renderMeshVisual.mainPass.shineFactor;
            this.shineCancel?.cancel();
            (0, animate_1.default)({
                cancelSet: this.shineCancel,
                duration: 0.2,
                update: (t) => {
                    this.visual.renderMeshVisual.mainPass.shineFactor = MathUtils.lerp(shineFactor, 1, t);
                }
            });
            if (this.currentValue < this._confirmationThreshold) {
                this.updateCurrentValue(0, true);
                this.setState(Element_1.StateName.default);
            }
            else {
                this.interactable.enabled = false;
                (0, animate_1.default)({
                    duration: 0.3,
                    update: (t) => {
                        this._knobVisual.renderMeshVisual.mainPass.opacityFactor = 1 - t;
                    },
                    ended: () => {
                        this._knobVisual.sceneObject.enabled = false;
                    }
                });
                this.updateCurrentValue(1, true);
                this.onConfirmationEvent.invoke();
                this.setState(Element_1.StateName.toggledDefault);
            }
        }
        onInteractableDragStart(dragEvent) {
            super.onInteractableDragStart(dragEvent);
            const shineFactor = this.visual.renderMeshVisual.mainPass.shineFactor;
            this.shineCancel?.cancel();
            (0, animate_1.default)({
                cancelSet: this.shineCancel,
                duration: 0.2,
                update: (t) => {
                    this.visual.renderMeshVisual.mainPass.shineFactor = MathUtils.lerp(shineFactor, 0, t);
                }
            });
        }
        /**
         * Reset the confirmation slider to its initial state.
         */
        reset() {
            if (this._initialized) {
                this.interactable.enabled = true;
                this._knobVisual.sceneObject.enabled = true;
                this._knobVisual.renderMeshVisual.mainPass.opacityFactor = 1;
            }
            this.updateCurrentValue(0, false);
            this.onResetEvent.invoke();
        }
    };
    __setFunctionName(_classThis, "ConfirmationSlider");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConfirmationSlider = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConfirmationSlider = _classThis;
})();
exports.ConfirmationSlider = ConfirmationSlider;
//# sourceMappingURL=ConfirmationSlider.js.map