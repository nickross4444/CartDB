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
exports.Capsule3D = void 0;
var __selfType = requireType("./Capsule3D");
function component(target) { target.getTypeName = function () { return __selfType; }; }
/**
 * The `Capsule` class represents a 3D capsule component in the scene. It extends the `BaseScriptComponent`
 * and provides functionality for rendering and customizing the capsule's appearance.
 *
 * @decorator `@component`
 */
let Capsule3D = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Capsule3D = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._depth = this._depth;
            this._backgroundColor = this._backgroundColor;
            this._initialized = false;
        }
        __initialize() {
            super.__initialize();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._depth = this._depth;
            this._backgroundColor = this._backgroundColor;
            this._initialized = false;
        }
        /**
         * Gets the `RenderMeshVisual` instance associated with this capsule.
         *
         * @returns {RenderMeshVisual} The `RenderMeshVisual` instance.
         */
        get renderMeshVisual() {
            return this._rmv;
        }
        /**
         * The render order of the Capsule 3D.
         */
        get renderOrder() {
            return this._renderOrder;
        }
        /**
         * The render order of the Capsule 3D.
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
         * Sets the depth of the capsule and updates its local scale accordingly.
         *
         * @param value - The new depth value to set for the capsule.
         */
        set depth(value) {
            if (value === undefined) {
                return;
            }
            this._depth = value;
            if (this._initialized) {
                const scaleVec = new vec3(this._size.x, this._size.y, this._depth);
                this._material.mainPass.size = scaleVec;
            }
        }
        /**
         * get the depth of the capsule and updates its local scale accordingly.
         *
         * @returns value - The new depth value to set for the capsule.
         */
        get depth() {
            return this._depth;
        }
        /**
         * Gets the size of the capsule as a 2D vector.
         *
         * @returns {vec2} The size of the capsule.
         */
        get size() {
            return this._size;
        }
        /**
         * Sets the size of the capsule by updating its width and height.
         * Adjusts the local scale of the capsule's transform to reflect the new size.
         *
         * @param value - A `vec2` object representing the new size of the capsule,
         *                where `x` is the width and `y` is the height.
         */
        set size(value) {
            if (value === undefined) {
                return;
            }
            this._size = value;
            if (this._initialized) {
                const scaleVec = new vec3(this._size.x, this._size.y, this._depth);
                this._material.mainPass.size = scaleVec;
                if (this.renderMeshVisual.mainMaterial) {
                    this.renderMeshVisual.mainPass.frustumCullMin = scaleVec.add(new vec3(1, 0, 0)).uniformScale(-0.5);
                    this.renderMeshVisual.mainPass.frustumCullMax = scaleVec.add(new vec3(1, 0, 0)).uniformScale(0.5);
                }
            }
        }
        /**
         * Gets the background color of the capsule.
         *
         * @returns {vec4} The current background color as a vec4.
         */
        get backgroundColor() {
            return this._backgroundColor;
        }
        /**
         * Sets the background color of the capsule.
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
         * Initializes the capsule component. This method sets up the mesh, material, size, and background color
         * for the capsule. It ensures that the initialization process is only performed once.
         */
        initialize() {
            if (this._initialized) {
                return;
            }
            // setup mesh
            this._rmv =
                this.sceneObject.getComponent("RenderMeshVisual") || this.sceneObject.createComponent("RenderMeshVisual");
            this._rmv.mesh = Capsule3D._mesh;
            if (!this._material)
                this._material = Capsule3D._materialAsset;
            this._material = this._material.clone();
            this._rmv.mainMaterial = this._material;
            this._rmv.mainPass.frustumCullMode = FrustumCullMode.UserDefinedAABB;
            this._rmv.renderOrder = this._renderOrder;
            // Initializing Size and Depth
            const scaleVec = new vec3(this._size.x, this._size.y, this._depth);
            this._material.mainPass.size = scaleVec;
            this._rmv.mainPass.frustumCullMin = scaleVec.add(new vec3(1, 0, 0)).uniformScale(-0.5);
            this._rmv.mainPass.frustumCullMax = scaleVec.add(new vec3(1, 0, 0)).uniformScale(0.5);
            // Initializing Background Color
            this._material.mainPass.baseColor = this._backgroundColor;
            this._initialized = true;
        }
        resetTargetMaterials() {
            this._rmv.clearMaterials();
            this._rmv.addMaterial(this._material);
        }
    };
    __setFunctionName(_classThis, "Capsule3D");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Capsule3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis._mesh = requireAsset("../../../../Meshes/DefaultCapsule.mesh");
    _classThis._materialAsset = requireAsset("../../../../Materials/DefaultCapsule.mat");
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Capsule3D = _classThis;
})();
exports.Capsule3D = Capsule3D;
//# sourceMappingURL=Capsule3D.js.map