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
exports.SphereButton = void 0;
var __selfType = requireType("./SphereButton");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const BaseButton_1 = require("../../../Scripts/Components/Button/BaseButton");
const SnapOS2_1 = require("../../Themes/SnapOS-2.0/SnapOS2");
const SphereVisual_1 = require("./Visual/SphereVisual");
const log = new NativeLogger_1.default("SphereButton"); // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * Represents a SphereButton component that extends the base Toggle class.
 * This component initializes a SphereVisual instance and assigns it as the visual representation.
 *
 * @extends BaseButton - Inherits functionality from the Toggle class.
 */
let SphereButton = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseButton_1.BaseButton;
    var SphereButton = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._radius = this._radius;
            this._zBackScale = this._zBackScale;
            this._size = new vec3(2, 2, 2);
            this._style = SnapOS2_1.SnapOS2Styles.Custom;
        }
        __initialize() {
            super.__initialize();
            this._radius = this._radius;
            this._zBackScale = this._zBackScale;
            this._size = new vec3(2, 2, 2);
            this._style = SnapOS2_1.SnapOS2Styles.Custom;
        }
        /**
         * Gets the size of the sphere toggle as a 3D vector.
         *
         * @returns {vec3} The size of the sphere toggle.
         */
        get size() {
            return this._size;
        }
        /**
         * Setter for the size property.
         *
         * The `size` property is not applicable for `SphereToggle`.
         * Use the `radius` property instead to define the size of the toggle.
         * A warning will be logged if this setter is used.
         *
         * @param size - The size value, which is ignored for `SphereToggle`.
         */
        set size(size) {
            log.w(`Size is not applicable for SphereToggle. Use radius instead.`);
        }
        /**
         * Gets the radius of the sphere toggle.
         *
         * @returns {number} The radius of the sphere toggle in local space units.
         */
        get radius() {
            return this._radius;
        }
        /**
         * Gets the radius of the sphere toggle.
         *
         * @returns {number} The radius of the sphere toggle in local space units.
         */
        set radius(radius) {
            if (radius === undefined) {
                return;
            }
            this._radius = radius;
            super.size = vec3.one().uniformScale(this._radius * 2);
        }
        /**
         * Gets the z-axis back scale of the sphere toggle.
         *
         * @returns {number} The z-axis back scale of the sphere toggle.
         */
        get zBackScale() {
            return this._zBackScale;
        }
        /**
         * Sets the z-axis back scale for the toggle's visual appearance.
         * This value determines the depth scaling effect applied to the toggle.
         *
         * @param zBackScale - The new z-axis back scale value to be applied.
         */
        set zBackScale(zBackScale) {
            if (zBackScale === undefined) {
                return;
            }
            ;
            this._visual.zBackScale = this._zBackScale = zBackScale;
        }
        /**
         * Initializes the SphereToggle component. This method ensures that the component
         * is only initialized once. If not already initialized, it creates a `SphereVisual` instance to bind as visual.
         */
        initialize() {
            super.initialize();
            this.radius = this._radius;
            this.zBackScale = this._zBackScale;
        }
        createDefaultVisual() {
            if (!this._visual) {
                this._visual = new SphereVisual_1.SphereVisual({
                    sceneObject: this.sceneObject
                });
            }
        }
    };
    __setFunctionName(_classThis, "SphereButton");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SphereButton = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SphereButton = _classThis;
})();
exports.SphereButton = SphereButton;
//# sourceMappingURL=SphereButton.js.map