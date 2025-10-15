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
exports.LoadingSpinner = void 0;
var __selfType = requireType("./LoadingSpinner");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const __material = requireAsset("./LoadingSpinner.mat");
const __mesh = requireAsset("./LoadingSpinner.mesh");
const SPIN_SPEED = 5;
const FADE_IN_TIME = 0.3;
const FADE_OUT_TIME = 0.2;
const ARC_SPREAD_TIME = 0.8;
/**
 * LoadingSpinner is the standard indeterminate progress bar used everywhere.
 * To use it, add this component to an empty SceneObject. It will create the
 * RenderMeshVisual automatically. In local space, the bounding box of the mesh
 * goes from -0.5 to 0.5 and faces the Z-axis. It can be resized by setting a
 * scale on the Transform or by adding a ScreenTransform to the SceneObject.
 */
let LoadingSpinner = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var LoadingSpinner = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.renderOrder = this.renderOrder;
            this.meshVisual = this.sceneObject.getComponent("RenderMeshVisual") ??
                this.sceneObject.createComponent("RenderMeshVisual");
            this.arcSpread = 0;
            this.reveal = false;
        }
        __initialize() {
            super.__initialize();
            this.renderOrder = this.renderOrder;
            this.meshVisual = this.sceneObject.getComponent("RenderMeshVisual") ??
                this.sceneObject.createComponent("RenderMeshVisual");
            this.arcSpread = 0;
            this.reveal = false;
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(() => this.onEnable());
            this.createEvent("OnEnableEvent").bind(() => this.onEnable());
            this.createEvent("UpdateEvent").bind(() => this.onUpdate());
            // build visual
            this.meshVisual.mesh ??= __mesh;
            this.meshVisual.mainMaterial ??= __material;
            this.meshVisual.setRenderOrder(this.renderOrder);
            // prevent first-frame glitch
            this.meshVisual.enabled = false;
            // initial state
            const pass = this.meshVisual.mainPassOverrides;
            pass["opacity"] = this.meshVisual.mainPass["opacity"];
            pass["arcCenter"] = this.meshVisual.mainPass["arcCenter"];
            pass["arcSpread"] = this.meshVisual.mainPass["arcSpread"];
            this.arcSpread = pass["arcSpread"];
        }
        onEnable() {
            // restart fade in tween
            this.reveal = true;
            const pass = this.meshVisual.mainPassOverrides;
            pass["opacity"] = 0;
            pass["arcCenter"] = vec2.zero();
            pass["arcSpread"] = 0;
        }
        onUpdate() {
            // don't skip over too much of the fade in during jank
            const dt = Math.min(getDeltaTime(), 1 / 30);
            const pass = this.meshVisual.mainPassOverrides;
            // animate spinning
            let arcCenter = pass["arcCenter"];
            arcCenter.x += SPIN_SPEED * -dt;
            arcCenter.y += SPIN_SPEED * dt;
            pass["arcCenter"] = arcCenter;
            // tween arc spread on reveal
            pass["arcSpread"] = this.moveTowards(pass["arcSpread"], this.reveal ? this.arcSpread : 0, (this.arcSpread / (this.reveal ? ARC_SPREAD_TIME : FADE_OUT_TIME * 3)) *
                dt);
            // tween alpha on reveal and conceal
            const opacity = (pass["opacity"] = this.moveTowards(pass["opacity"], this.reveal ? 1 : 0, (1 / (this.reveal ? FADE_IN_TIME : FADE_OUT_TIME)) * dt));
            // disable mesh when alpha is 0
            this.meshVisual.enabled = opacity > 0;
        }
        moveTowards(current, target, dist) {
            // apply a delta to a value, but don't overshoot the target
            const delta = target - current;
            if (dist >= Math.abs(delta)) {
                return target;
            }
            else {
                const travel = dist * Math.sign(delta);
                return current + travel;
            }
        }
    };
    __setFunctionName(_classThis, "LoadingSpinner");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoadingSpinner = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoadingSpinner = _classThis;
})();
exports.LoadingSpinner = LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map