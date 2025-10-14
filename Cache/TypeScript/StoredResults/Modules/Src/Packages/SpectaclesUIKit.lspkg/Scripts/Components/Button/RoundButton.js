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
exports.RoundButton = void 0;
var __selfType = requireType("./RoundButton");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const RoundedRectangleVisual_1 = require("../../Visuals/RoundedRectangle/RoundedRectangleVisual");
const BaseButton_1 = require("./BaseButton");
let RoundButton = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseButton_1.BaseButton;
    var RoundButton = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._width = this._width;
            this._size = new vec3(this._width, this._width, 1);
        }
        __initialize() {
            super.__initialize();
            this._width = this._width;
            this._size = new vec3(this._width, this._width, 1);
        }
        /**
         * The width of the RoundButton, which also determines its height.
         */
        get width() {
            return this._width;
        }
        set width(width) {
            if (width === undefined) {
                return;
            }
            this._width = width;
            if (this._initialized) {
                this.size = new vec3(width, width, 1);
                this.visual.cornerRadius = width * 0.5;
            }
        }
        initialize() {
            super.initialize();
            this._size = new vec3(this._width, this._width, 1);
            this.visual.cornerRadius = this._width * 0.5;
        }
        createDefaultVisual() {
            if (!this._visual) {
                const defaultVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: this.sceneObject,
                    style: {
                        visualElementType: this.typeString,
                        style: this._style
                    },
                    transparent: this._style === "Ghost"
                });
                this._visual = defaultVisual;
            }
        }
    };
    __setFunctionName(_classThis, "RoundButton");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoundButton = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoundButton = _classThis;
})();
exports.RoundButton = RoundButton;
//# sourceMappingURL=RoundButton.js.map