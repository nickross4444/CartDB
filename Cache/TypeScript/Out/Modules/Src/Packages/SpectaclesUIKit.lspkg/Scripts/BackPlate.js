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
exports.BackPlate = void 0;
var __selfType = requireType("./BackPlate");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Interactable_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable");
const InteractionPlane_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/InteractionPlane/InteractionPlane");
const UIKitUtilities_1 = require("./Utility/UIKitUtilities");
const RoundedRectangle_1 = require("./Visuals/RoundedRectangle/RoundedRectangle");
const BackPlateDepth = 1;
const BackPlateConstants = {
    nearFieldInteractionZoneDistance: 15
};
const BackPlateColors = {
    dark: {
        background: {
            type: "Linear",
            start: new vec2(-1.3, 1.25),
            end: new vec2(1.25, -1.3),
            stop0: {
                enabled: true,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.09, 1),
                percent: 0
            },
            stop1: {
                enabled: true,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.26, 1),
                percent: 1
            }
        }
    },
    default: {
        background: {
            type: "Radial",
            start: new vec2(-0.05, 0.5),
            end: new vec2(0.7, -0.8),
            stop0: {
                enabled: true,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.27, 1),
                percent: 0
            },
            stop1: {
                enabled: true,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.11, 1),
                percent: 1
            }
        }
    },
    simple: { background: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.17, 1) }
};
/**
 * The BackPlate component creates a customizable back plate with a rounded rectangle shape.
 * It supports different styles and sizes, and includes an interactable component for user interaction.
 * BackPlate can be used as a background for other UI elements.
 */
let BackPlate = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var BackPlate = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._style = this._style;
            this._enableInteractionPlane = this._enableInteractionPlane;
            this._interactionPlaneOffset = this._interactionPlaneOffset;
            this._interactionPlanePadding = this._interactionPlanePadding;
            this._targetingVisual = this._targetingVisual;
            this.colliderShape = Shape.createBoxShape();
            this.managedComponents = [];
            this._interactionPlaneTransform = null;
            this.initialized = false;
        }
        __initialize() {
            super.__initialize();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._style = this._style;
            this._enableInteractionPlane = this._enableInteractionPlane;
            this._interactionPlaneOffset = this._interactionPlaneOffset;
            this._interactionPlanePadding = this._interactionPlanePadding;
            this._targetingVisual = this._targetingVisual;
            this.colliderShape = Shape.createBoxShape();
            this.managedComponents = [];
            this._interactionPlaneTransform = null;
            this.initialized = false;
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
        get interactionPlane() {
            return this._interactionPlane;
        }
        set interactionPlane(interactionPlane) {
            this._interactionPlane = interactionPlane;
            this._interactionPlaneTransform = interactionPlane.getTransform();
        }
        /**
         * Sets the size of the back plate.
         * @param size The new size of the back plate.
         * The size is a vec2 representing the width and height of the back plate.
         * The collider shape is also updated to match the new size.
         */
        set size(size) {
            if (size === undefined) {
                return;
            }
            this._size = size;
            if (this.initialized) {
                this.roundedRectangle.size = size;
                this.colliderShape.size = new vec3(size.x, size.y, BackPlateDepth);
                this.collider.shape = this.colliderShape;
                this.updateInteractionPlane();
            }
        }
        /**
         * Gets the size of the back plate.
         * @returns The current size of the back plate.
         */
        get size() {
            return this._size;
        }
        get renderOrder() {
            return this._renderOrder;
        }
        set renderOrder(value) {
            if (value === undefined) {
                return;
            }
            this._renderOrder = value;
            if (this.initialized) {
                this.roundedRectangle.renderOrder = value;
            }
        }
        /**
         * Gets the interactable component of the back plate.
         * @returns The interactable component associated with the back plate.
         */
        get interactable() {
            return this._interactable;
        }
        /**
         * Sets the style of the back plate.
         * @param style The new style of the back plate.
         * The style can be "default", "dark", or "simple".
         */
        get style() {
            return this._style;
        }
        /**
         * Sets the style of the back plate.
         * The style determines the background gradient and color of the back plate.
         * - "default" has lighter gradient.
         * - "dark" has darker gradient.
         * - "simple" uses a solid color.
         * @param style The new style of the back plate.
         */
        set style(style) {
            if (style === undefined) {
                return;
            }
            this._style = style;
            if (this.initialized) {
                if (style !== "simple") {
                    this.roundedRectangle.gradient = true;
                    this.roundedRectangle.setBackgroundGradient(BackPlateColors[style].background);
                }
                else {
                    this.roundedRectangle.gradient = false;
                    this.roundedRectangle.backgroundColor = BackPlateColors.simple.background;
                }
            }
        }
        onAwake() {
            this.roundedRectangle = this.sceneObject.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
            this.managedComponents.push(this.roundedRectangle);
            this.createEvent("OnStartEvent").bind(this.initialize.bind(this));
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
                this.managedComponents.forEach((component) => {
                    if (!isNull(component) && component) {
                        component.destroy();
                    }
                });
                this.managedComponents = [];
            });
        }
        initialize() {
            this.roundedRectangle.initialize();
            this.roundedRectangle.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
            this.roundedRectangle.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
            this.roundedRectangle.renderOrder = this._renderOrder;
            this.collider = this.sceneObject.createComponent("ColliderComponent");
            this.managedComponents.push(this.collider);
            this.collider.fitVisual = false;
            this.collider.shape = this.colliderShape;
            // TODO: consider replacing with lighter weight solution
            this._interactable = this.sceneObject.createComponent(Interactable_1.Interactable.getTypeName());
            this.managedComponents.push(this._interactable);
            if (this._style !== "simple") {
                this.roundedRectangle.gradient = true;
                this.roundedRectangle.setBackgroundGradient(BackPlateColors[this._style].background);
            }
            else {
                this.roundedRectangle.gradient = false;
                this.roundedRectangle.backgroundColor = BackPlateColors.simple.background;
            }
            this.roundedRectangle.size = this._size;
            this.colliderShape.size = new vec3(this._size.x, this._size.y, BackPlateDepth);
            this.collider.shape = this.colliderShape;
            this._interactionPlane = this.sceneObject.createComponent(InteractionPlane_1.InteractionPlane.getTypeName());
            this.managedComponents.push(this._interactionPlane);
            this._interactionPlane.proximityDistance = BackPlateConstants.nearFieldInteractionZoneDistance;
            this._interactionPlane.targetingVisual = this._targetingVisual;
            this._interactionPlane.enabled = this._enableInteractionPlane;
            this._interactionPlaneTransform = this._interactionPlane.getTransform();
            this.updateInteractionPlane();
            this.initialized = true;
        }
        updateInteractionPlane() {
            if (!this._interactionPlane || !this._interactionPlaneTransform) {
                return;
            }
            const paddedSize = this.size.add(this._interactionPlanePadding);
            this._interactionPlane.planeSize = paddedSize;
            this._interactionPlane.offset = this._interactionPlaneOffset;
            this._interactionPlane.targetingVisual = this._targetingVisual;
        }
    };
    __setFunctionName(_classThis, "BackPlate");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BackPlate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BackPlate = _classThis;
})();
exports.BackPlate = BackPlate;
//# sourceMappingURL=BackPlate.js.map