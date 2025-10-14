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
exports.DropShadow = void 0;
var __selfType = requireType("./DropShadow");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const RoundedRectangle_1 = require("./Visuals/RoundedRectangle/RoundedRectangle");
let DropShadow = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var DropShadow = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._cornerRadius = this._cornerRadius;
            this.color = this.color;
            this._spread = this._spread;
            this.initialized = false;
        }
        __initialize() {
            super.__initialize();
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._cornerRadius = this._cornerRadius;
            this.color = this.color;
            this._spread = this._spread;
            this.initialized = false;
        }
        /**
         * The size of the drop shadow.
         * @type {vec2}
         */
        get size() {
            return this._size;
        }
        /**
         * The size of the drop shadow.
         * @param {vec2} value - The new size of the drop shadow.
         */
        set size(value) {
            if (value === undefined) {
                return;
            }
            this._size = value;
            if (this.initialized) {
                this.shadow.size = new vec2(value.x, value.y);
            }
        }
        /**
         * The corner radius of the drop shadow.
         * @type {number}
         */
        get cornerRadius() {
            return this._cornerRadius;
        }
        /**
         * The corner radius of the drop shadow.
         * @param {number} value - The new corner radius of the drop shadow.
         */
        set cornerRadius(value) {
            if (value === undefined) {
                return;
            }
            this._cornerRadius = value;
            if (this.initialized) {
                this.shadow.cornerRadius = value;
            }
        }
        /**
         * The color of the drop shadow.
         * @type {vec4}
         */
        get spread() {
            return this._spread;
        }
        /**
         * The color of the drop shadow.
         * @param {vec4} value - The new color of the drop shadow.
         */
        set spread(spread) {
            if (spread === undefined) {
                return;
            }
            this._spread = spread;
            if (this.initialized) {
                this.shadow.setBackgroundGradient(this.defaultGradient);
            }
        }
        /**
         * The render order of the shadow.
         */
        get renderOrder() {
            return this._renderOrder;
        }
        /**
         * The render order of the shadow.
         */
        set renderOrder(value) {
            if (value === undefined) {
                return;
            }
            this._renderOrder = value;
            if (this.initialized) {
                this.shadow.renderOrder = value;
            }
        }
        get renderMeshVisual() {
            return this.shadow.renderMeshVisual;
        }
        get defaultGradient() {
            return {
                type: "Rectangle",
                start: new vec2(-1, 0),
                end: new vec2(1, 0),
                stop0: { enabled: true, color: this.color, percent: 1 - this._spread * 3 },
                stop1: { enabled: true, color: new vec4(this.color.x, this.color.y, this.color.z, 0), percent: 1 },
                stop2: { enabled: false },
                stop3: { enabled: false },
                stop4: { enabled: false }
            };
        }
        onAwake() {
            this.initialize();
            this.createEvent("OnEnableEvent").bind(() => {
                this.shadow.enabled = true;
            });
            this.createEvent("OnDisableEvent").bind(() => {
                this.shadow.enabled = false;
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this.shadow.destroy();
                this.shadow = null;
            });
        }
        /**
         * Initializes the drop shadow component.
         * This method creates a RoundedRectangle component and sets its properties
         * based on the input parameters.
         */
        initialize() {
            this.shadow = this.sceneObject.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
            this.shadow.initialize();
            this.shadow.size = new vec2(this._size.x, this._size.y);
            this.shadow.cornerRadius = this._cornerRadius;
            this.shadow.border = false;
            this.shadow.borderSize = 0;
            this.shadow.gradient = true;
            this.shadow.gradientType = "Rectangle";
            this.shadow.setBackgroundGradient(this.defaultGradient);
            this.shadow.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
            this.shadow.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
            this.shadow.renderMeshVisual.mainMaterial.mainPass.depthTest = true;
            this.shadow.renderMeshVisual.mainMaterial.mainPass.depthWrite = true;
            this.shadow.renderOrder = this._renderOrder;
            this.initialized = true;
        }
    };
    __setFunctionName(_classThis, "DropShadow");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DropShadow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DropShadow = _classThis;
})();
exports.DropShadow = DropShadow;
//# sourceMappingURL=DropShadow.js.map