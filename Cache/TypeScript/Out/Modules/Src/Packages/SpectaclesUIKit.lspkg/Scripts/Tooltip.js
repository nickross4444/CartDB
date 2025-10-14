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
exports.Tooltip = void 0;
var __selfType = requireType("./Tooltip");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const color_1 = require("SpectaclesInteractionKit.lspkg/Utils/color");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const RoundedRectangle_1 = require("./Visuals/RoundedRectangle/RoundedRectangle");
const TOOLTIP_FADE_DURATION = 0.333;
const TOOLTIP_PADDING = new vec2(0.66, 0.25);
const TOOLTIP_BACKING_GRADIENT = {
    enabled: true,
    type: "Rectangle",
    stop0: { enabled: true, percent: -1, color: new vec4(0.15, 0.15, 0.15, 1) },
    stop1: { enabled: true, percent: 1, color: new vec4(0.24, 0.24, 0.24, 1) }
};
const TOOLTIP_BORDER_GRADIENT = {
    enabled: true,
    type: "Linear",
    start: new vec2(1, 1),
    end: new vec2(-1, -1),
    stop0: { enabled: true, percent: -1, color: new vec4(0.05, 0.05, 0.05, 1) },
    stop1: { enabled: true, percent: 1, color: new vec4(0.4, 0.4, 0.4, 1) }
};
const TEXT_COLOR = new vec4(0.72, 0.72, 0.72, 1);
let Tooltip = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Tooltip = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._renderOrder = this._renderOrder;
            this._tip = this._tip;
            this.fadeCancelSet = new animate_1.CancelSet();
            this._size = vec2.zero();
            this.managedSceneObjects = [];
            this.managedComponents = [];
            this.isUpdatingBackingSize = false;
            this.onCompleteHandlers = [];
            this.initialized = false;
            this.onDestroyEvent = new Event_1.default();
            this.onDestroy = this.onDestroyEvent.publicApi();
            this.fadeAlpha = (alpha, onComplete = () => { }) => {
                const startingOpacity = this.backing.renderMeshVisual.mainPass.opacityFactor;
                const startingTextColor = this.textComponent.textFill.color;
                this.fadeCancelSet.cancel();
                (0, animate_1.default)({
                    duration: TOOLTIP_FADE_DURATION,
                    cancelSet: this.fadeCancelSet,
                    update: (t) => {
                        this.backing.renderMeshVisual.mainPass.opacityFactor = MathUtils.lerp(startingOpacity, alpha, t);
                        this.textComponent.textFill.color = vec4.lerp(startingTextColor, (0, color_1.withAlpha)(startingTextColor, alpha), t);
                    },
                    ended: () => {
                        // complete
                        onComplete();
                    }
                });
            };
        }
        __initialize() {
            super.__initialize();
            this._renderOrder = this._renderOrder;
            this._tip = this._tip;
            this.fadeCancelSet = new animate_1.CancelSet();
            this._size = vec2.zero();
            this.managedSceneObjects = [];
            this.managedComponents = [];
            this.isUpdatingBackingSize = false;
            this.onCompleteHandlers = [];
            this.initialized = false;
            this.onDestroyEvent = new Event_1.default();
            this.onDestroy = this.onDestroyEvent.publicApi();
            this.fadeAlpha = (alpha, onComplete = () => { }) => {
                const startingOpacity = this.backing.renderMeshVisual.mainPass.opacityFactor;
                const startingTextColor = this.textComponent.textFill.color;
                this.fadeCancelSet.cancel();
                (0, animate_1.default)({
                    duration: TOOLTIP_FADE_DURATION,
                    cancelSet: this.fadeCancelSet,
                    update: (t) => {
                        this.backing.renderMeshVisual.mainPass.opacityFactor = MathUtils.lerp(startingOpacity, alpha, t);
                        this.textComponent.textFill.color = vec4.lerp(startingTextColor, (0, color_1.withAlpha)(startingTextColor, alpha), t);
                    },
                    ended: () => {
                        // complete
                        onComplete();
                    }
                });
            };
        }
        /**
         * The current tooltip text.
         * @returns The tooltip string associated with this instance.
         */
        get tip() {
            return this._tip;
        }
        /**
         * The current tooltip text.
         * @param value - The new tooltip text to display.
         */
        set tip(value) {
            if (value === undefined) {
                return;
            }
            this._tip = value;
            if (this.textComponent) {
                if (this.textComponent.text !== this._tip) {
                    this.textComponent.text = this._tip;
                    this.updateBackingSize();
                }
            }
        }
        /**
         * The render order of the tooltip.
         */
        get renderOrder() {
            return this._renderOrder;
        }
        /**
         * The render order of the tooltip.
         */
        set renderOrder(value) {
            if (value === undefined) {
                return;
            }
            this._renderOrder = value;
            if (this.initialized) {
                this.backing.renderOrder = value;
                this.textComponent.renderOrder = value + 1;
            }
        }
        /**
         * Sets the tooltip's visibility state.
         *
         * @param isOn - If `true`, the tooltip will be shown; if `false`, it will be hidden.
         *
         * This method fades the tooltip's alpha to 1 (visible) or 0 (hidden) depending on the `isOn` parameter,
         * provided that both `backing` and `textComponent` are present.
         */
        setOn(isOn) {
            if (this.backing && this.textComponent) {
                this.fadeAlpha(isOn ? 1 : 0, () => { });
            }
        }
        updateBackingSize(onComplete) {
            if (onComplete) {
                this.onCompleteHandlers.push(onComplete);
            }
            if (this.isUpdatingBackingSize) {
                return;
            }
            this.isUpdatingBackingSize = true;
        }
        onAwake() {
            this.backing = this.sceneObject.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
            this.managedComponents.push(this.backing);
            this.backing.initialize();
            this.backing.gradient = true;
            this.backing.setBackgroundGradient(TOOLTIP_BACKING_GRADIENT);
            this.backing.border = true;
            this.backing.setBorderGradient(TOOLTIP_BORDER_GRADIENT);
            this.backing.borderSize = 0.05;
            this.backing.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
            this.backing.renderMeshVisual.mainMaterial.mainPass.depthTest = false;
            this.backing.renderMeshVisual.renderOrder = this._renderOrder;
            const textObject = global.scene.createSceneObject("TooltipText");
            this.managedSceneObjects.push(textObject);
            textObject.layer = this.sceneObject.layer;
            textObject.createComponent("Component.ScreenTransform");
            this.textComponent = textObject.createComponent("Component.Text");
            this.managedComponents.push(this.textComponent);
            this.textComponent.textFill.color = TEXT_COLOR;
            this.textComponent.renderOrder = this._renderOrder + 1;
            textObject.setParent(this.sceneObject);
            this.initialized = true;
            this.createEvent("OnStartEvent").bind(() => {
                this.textComponent.text = this._tip;
                this.backing.renderMeshVisual.mainPass.opacityFactor = 0;
                this.textComponent.textFill.color = (0, color_1.withAlpha)(this.textComponent.textFill.color, 0);
                this.updateBackingSize();
            });
            this.createEvent("LateUpdateEvent").bind(() => {
                if (this.isUpdatingBackingSize) {
                    this.calculateBackingSize();
                    this.isUpdatingBackingSize = false;
                    this.onCompleteHandlers.forEach((handler) => {
                        handler();
                    });
                    this.onCompleteHandlers = [];
                }
            });
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
                this.fadeCancelSet.cancel();
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
                this.onDestroyEvent.invoke();
            });
        }
        calculateBackingSize() {
            if (this.textComponent && this.backing) {
                const textBoundingBox = this.textComponent.getBoundingBox();
                const width = textBoundingBox.getSize().x;
                const height = textBoundingBox.getSize().y;
                this._size = new vec2(width + TOOLTIP_PADDING.x * 2, height + TOOLTIP_PADDING.y * 2);
                this.backing.size = this._size;
                this.backing.cornerRadius = 0.5;
                this.isUpdatingBackingSize = false;
            }
        }
    };
    __setFunctionName(_classThis, "Tooltip");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tooltip = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tooltip = _classThis;
})();
exports.Tooltip = Tooltip;
//# sourceMappingURL=Tooltip.js.map