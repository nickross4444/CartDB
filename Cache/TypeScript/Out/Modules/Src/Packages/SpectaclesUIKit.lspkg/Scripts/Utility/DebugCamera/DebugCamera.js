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
exports.DebugCamera = void 0;
var __selfType = requireType("./DebugCamera");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider");
let DebugCamera = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var DebugCamera = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.lookAt = this.lookAt;
            this.attachToCamera = this.attachToCamera;
            this.worldCameraFinder = WorldCameraFinderProvider_1.default.getInstance();
            this.worldCameraComponent = this.worldCameraFinder.getComponent();
            this.renderTarget = global.scene.createRenderTargetTexture();
            this.camera = this.sceneObject.createComponent("Camera");
            this.viewingPlaneMesh = requireAsset("./Unit Plane.mesh");
            this.viewingPlaneMaterial = requireAsset("./ViewingPlane.mat");
            this.transform = this.getTransform();
            this.offset = this.transform.getLocalPosition();
            this.initialize = () => {
                this.viewingPlane = global.scene.createSceneObject("ViewingPlane");
                const rmv = this.viewingPlane.createComponent("RenderMeshVisual");
                rmv.mesh = this.viewingPlaneMesh;
                rmv.mainMaterial = this.viewingPlaneMaterial.clone();
                rmv.mainMaterial.mainPass.baseTex = this.renderTarget;
                this.viewingPlane.setParent(this.worldCameraComponent.sceneObject);
                const transform = this.viewingPlane.getTransform();
                transform.setLocalPosition(new vec3(-1.5, 2, -10));
                transform.setLocalScale(new vec3(2, 3, 1));
                this.camera.enableClearColor = true;
                this.camera.clearColor = new vec4(0, 0, 0.5, 1);
                this.camera.type = Camera.Type.Perspective;
                this.camera.far = 1000;
                const camPosition = this.transform.getLocalPosition();
                if (this.lookAt) {
                    this.lookAtTransform = this.lookAt.getTransform();
                    this.transform.setLocalRotation(quat.lookAt(camPosition.sub(this.lookAtTransform.getWorldPosition()).normalize(), vec3.up()));
                }
                const control = this.renderTarget.control;
                control.useScreenResolution = true;
                // set render camera target
                this.camera.renderTarget = this.renderTarget;
                this.createEvent("UpdateEvent").bind(this.update);
            };
            this.update = () => {
                const camPosition = this.transform.getLocalPosition();
                if (this.attachToCamera) {
                    this.transform.setLocalPosition(this.worldCameraFinder.getWorldPosition().add(this.offset));
                }
                if (this.lookAt) {
                    this.transform.setLocalRotation(quat.lookAt(camPosition.sub(this.lookAtTransform.getWorldPosition()).normalize(), vec3.up()));
                }
            };
        }
        __initialize() {
            super.__initialize();
            this.lookAt = this.lookAt;
            this.attachToCamera = this.attachToCamera;
            this.worldCameraFinder = WorldCameraFinderProvider_1.default.getInstance();
            this.worldCameraComponent = this.worldCameraFinder.getComponent();
            this.renderTarget = global.scene.createRenderTargetTexture();
            this.camera = this.sceneObject.createComponent("Camera");
            this.viewingPlaneMesh = requireAsset("./Unit Plane.mesh");
            this.viewingPlaneMaterial = requireAsset("./ViewingPlane.mat");
            this.transform = this.getTransform();
            this.offset = this.transform.getLocalPosition();
            this.initialize = () => {
                this.viewingPlane = global.scene.createSceneObject("ViewingPlane");
                const rmv = this.viewingPlane.createComponent("RenderMeshVisual");
                rmv.mesh = this.viewingPlaneMesh;
                rmv.mainMaterial = this.viewingPlaneMaterial.clone();
                rmv.mainMaterial.mainPass.baseTex = this.renderTarget;
                this.viewingPlane.setParent(this.worldCameraComponent.sceneObject);
                const transform = this.viewingPlane.getTransform();
                transform.setLocalPosition(new vec3(-1.5, 2, -10));
                transform.setLocalScale(new vec3(2, 3, 1));
                this.camera.enableClearColor = true;
                this.camera.clearColor = new vec4(0, 0, 0.5, 1);
                this.camera.type = Camera.Type.Perspective;
                this.camera.far = 1000;
                const camPosition = this.transform.getLocalPosition();
                if (this.lookAt) {
                    this.lookAtTransform = this.lookAt.getTransform();
                    this.transform.setLocalRotation(quat.lookAt(camPosition.sub(this.lookAtTransform.getWorldPosition()).normalize(), vec3.up()));
                }
                const control = this.renderTarget.control;
                control.useScreenResolution = true;
                // set render camera target
                this.camera.renderTarget = this.renderTarget;
                this.createEvent("UpdateEvent").bind(this.update);
            };
            this.update = () => {
                const camPosition = this.transform.getLocalPosition();
                if (this.attachToCamera) {
                    this.transform.setLocalPosition(this.worldCameraFinder.getWorldPosition().add(this.offset));
                }
                if (this.lookAt) {
                    this.transform.setLocalRotation(quat.lookAt(camPosition.sub(this.lookAtTransform.getWorldPosition()).normalize(), vec3.up()));
                }
            };
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(this.initialize);
        }
    };
    __setFunctionName(_classThis, "DebugCamera");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DebugCamera = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DebugCamera = _classThis;
})();
exports.DebugCamera = DebugCamera;
//# sourceMappingURL=DebugCamera.js.map