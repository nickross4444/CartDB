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
exports.Sphere = void 0;
var __selfType = requireType("./Sphere");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const UIKitUtilities_1 = require("../../../Utility/UIKitUtilities");
/**
 * The `Sphere` class represents a 3D sphere component in the scene. It extends the `BaseScriptComponent`
 * and provides functionality for rendering and customizing the sphere's appearance.
 *
 * @decorator `@component`
 */
let Sphere = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Sphere = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._renderOrder = this._renderOrder;
            this._radius = this._radius;
            this._backgroundColor = this._backgroundColor;
            this._icon = this._icon;
            this._initialized = false;
            this._transform = this.sceneObject.getTransform();
            this._zBackScale = 1.0;
        }
        __initialize() {
            super.__initialize();
            this._renderOrder = this._renderOrder;
            this._radius = this._radius;
            this._backgroundColor = this._backgroundColor;
            this._icon = this._icon;
            this._initialized = false;
            this._transform = this.sceneObject.getTransform();
            this._zBackScale = 1.0;
        }
        /**
         * Gets the `RenderMeshVisual` instance associated with this sphere.
         *
         * @returns {RenderMeshVisual} The `RenderMeshVisual` instance.
         */
        get renderMeshVisual() {
            return this._rmv;
        }
        /**
         * The render order of the Sphere.
         */
        get renderOrder() {
            return this._renderOrder;
        }
        /**
         * The render order of the Sphere.
         */
        set renderOrder(value) {
            if (value === undefined) {
                return;
            }
            this._renderOrder = value;
            if (this._initialized) {
                this._rmv.renderOrder = value;
            }
        }
        /**
         * Gets the radius of the sphere.
         *
         * @returns {number} The radius of the sphere in local space units.
         */
        get radius() {
            return this._radius;
        }
        /**
         * Sets the radius of the sphere by updating its transform's local scale.
         *
         * @param radius - A `number` object representing the new radius of the sphere
         */
        set radius(radius) {
            if (radius === undefined) {
                return;
            }
            this._radius = radius;
            const localScale = vec3.one().uniformScale(radius);
            this._transform.setLocalScale(localScale);
            if (this._initialized) {
                if (this.renderMeshVisual.mainMaterial) {
                    this.renderMeshVisual.mainPass.frustumCullMin = localScale.uniformScale(-0.5);
                    this.renderMeshVisual.mainPass.frustumCullMax = localScale.uniformScale(0.5);
                }
            }
        }
        /**
         * Gets the scale factor for the back of the sphere along the Z-axis.
         *
         * @returns {number} The scale factor for the back of the sphere.
         */
        get zBackScale() {
            return this._zBackScale;
        }
        /**
         * Sets the scale factor for the back of the sphere along the Z-axis.
         *
         * @param zBackScale - A number representing the scale factor for the back of the sphere.
         *                     A value closer to 0.0 makes the back of the sphere flatter,
         *                     while a value closer to 1.0 retains its original shape.
         */
        set zBackScale(zBackScale) {
            if (zBackScale === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._zBackScale, zBackScale)) {
                return;
            }
            this._zBackScale = zBackScale;
            if (this._initialized) {
                this._rmv.setBlendShapeWeight("Z depth", 1.0 - zBackScale);
            }
        }
        /**
         * Gets the background color of the sphere.
         *
         * @returns {vec4} The current background color as a vec4.
         */
        get backgroundColor() {
            return this._backgroundColor;
        }
        /**
         * Sets the background color of the sphere.
         *
         * @param value - A `vec4` representing the RGBA color to set as the background color.
         */
        set backgroundColor(value) {
            if (value === undefined) {
                return;
            }
            this._backgroundColor = value;
            if (this._initialized) {
                this._material.mainPass.baseColor = value;
            }
        }
        /**
         * Gets the icon texture of the sphere.
         *
         * @returns {Texture} The icon texture of the sphere, or undefined if there is none.
         */
        get icon() {
            return this._icon;
        }
        /**
         * Sets the icon texture of the sphere.
         *
         * @param icon - The icon texture to set.
         */
        set icon(icon) {
            this._icon = icon;
            if (this._initialized) {
                if (icon) {
                    this._material.mainPass.hasIcon = 1;
                    this._material.mainPass.icon = icon;
                }
                else {
                    this._material.mainPass.hasIcon = 0;
                }
            }
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(() => {
                this.initialize();
            });
            this.createEvent("OnEnableEvent").bind(() => {
                if (this._initialized) {
                    this._rmv.enabled = true;
                }
            });
            this.createEvent("OnDisableEvent").bind(() => {
                if (this._initialized) {
                    this._rmv.enabled = false;
                }
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this._rmv?.destroy();
                this._rmv = null;
            });
        }
        /**
         * Initializes the sphere component. This method sets up the mesh, material, size, and background color
         * for the sphere. It ensures that the initialization process is only performed once.
         */
        initialize() {
            if (this._initialized) {
                return;
            }
            // setup mesh
            this._rmv =
                this.sceneObject.getComponent("RenderMeshVisual") || this.sceneObject.createComponent("RenderMeshVisual");
            this._rmv.mesh = Sphere._mesh;
            if (!this._material)
                this._material = Sphere._materialAsset;
            this._material = this._material.clone();
            this._rmv.mainMaterial = this._material;
            this._rmv.mainPass.frustumCullMode = FrustumCullMode.UserDefinedAABB;
            this._rmv.renderOrder = this._renderOrder;
            // Initializing Size
            const localScale = vec3.one().uniformScale(this._radius);
            this._transform.setLocalScale(localScale);
            this._rmv.mainPass.frustumCullMin = localScale.uniformScale(-0.5);
            this._rmv.mainPass.frustumCullMax = localScale.uniformScale(0.5);
            this._rmv.setBlendShapeWeight("Z depth", 1.0 - this._zBackScale);
            // Initializing Background Color
            this._material.mainPass.baseColor = this._backgroundColor;
            // Initializing Icon
            if (this._icon) {
                this._material.mainPass.hasIcon = 1;
                this._material.mainPass.icon = this._icon;
            }
            else {
                this._material.mainPass.hasIcon = 0;
            }
            this._initialized = true;
        }
        resetTargetMaterials() {
            this._rmv.clearMaterials();
            this._rmv.addMaterial(this._material);
        }
    };
    __setFunctionName(_classThis, "Sphere");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Sphere = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis._mesh = requireAsset("../../../../Meshes/DefaultSphere.mesh");
    _classThis._materialAsset = requireAsset("../../../../Materials/DefaultSphereSimple.mat");
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Sphere = _classThis;
})();
exports.Sphere = Sphere;
//# sourceMappingURL=Sphere.js.map