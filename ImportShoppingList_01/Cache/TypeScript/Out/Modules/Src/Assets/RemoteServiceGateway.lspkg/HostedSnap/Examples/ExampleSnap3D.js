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
exports.ExampleSnap3D = void 0;
var __selfType = requireType("./ExampleSnap3D");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Snap3D_1 = require("../Snap3D");
let ExampleSnap3D = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ExampleSnap3D = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.prompt = this.prompt;
            this.refineMesh = this.refineMesh;
            this.useVertexColor = this.useVertexColor;
            this.imageRoot = this.imageRoot;
            this.baseMeshRoot = this.baseMeshRoot;
            this.refinedMeshRoot = this.refinedMeshRoot;
            this.modelMat = this.modelMat;
            this.hintText = this.hintText;
            this.runOnTap = this.runOnTap;
            this.baseMeshSceneObject = null;
            this.refinedMeshSceneObject = null;
            this.avaliableToRequest = true;
            this.gestureModule = require("LensStudio:GestureModule");
        }
        __initialize() {
            super.__initialize();
            this.prompt = this.prompt;
            this.refineMesh = this.refineMesh;
            this.useVertexColor = this.useVertexColor;
            this.imageRoot = this.imageRoot;
            this.baseMeshRoot = this.baseMeshRoot;
            this.refinedMeshRoot = this.refinedMeshRoot;
            this.modelMat = this.modelMat;
            this.hintText = this.hintText;
            this.runOnTap = this.runOnTap;
            this.baseMeshSceneObject = null;
            this.refinedMeshSceneObject = null;
            this.avaliableToRequest = true;
            this.gestureModule = require("LensStudio:GestureModule");
        }
        onAwake() {
            this.initalizeSpinners();
            this.imageRoot.enabled = false;
            if (global.deviceInfoSystem.isEditor()) {
                this.createEvent("TapEvent").bind(() => {
                    this.onTap();
                });
            }
            else {
                this.gestureModule
                    .getPinchDownEvent(GestureModule.HandType.Right)
                    .add(() => {
                    this.onTap();
                });
            }
        }
        onTap() {
            if (!this.runOnTap) {
                return;
            }
            if (!this.avaliableToRequest) {
                return;
            }
            this.avaliableToRequest = false;
            this.resetAssets();
            this.hintText.text = "Requested Snap3D generation. Please wait...";
            this.enableSpinners(true);
            Snap3D_1.Snap3D.submitAndGetStatus({
                prompt: this.prompt,
                format: "glb",
                refine: this.refineMesh,
                use_vertex_color: this.useVertexColor,
            })
                .then((submitGetStatusResults) => {
                submitGetStatusResults.event.add(([value, assetOrError]) => {
                    if (value === "image") {
                        this.generateImageAsset(assetOrError);
                    }
                    else if (value === "base_mesh") {
                        this.generateBaseMeshAsset(assetOrError);
                    }
                    else if (value === "refined_mesh") {
                        this.generateRefinedMeshAsset(assetOrError);
                    }
                    else if (value === "failed") {
                        this.enableSpinners(false);
                        let error = assetOrError;
                        print("Task failed with error: " +
                            error.errorMsg +
                            " (Code: " +
                            error.errorCode +
                            ")");
                        this.hintText.text =
                            "Generation failed. Please Tap or Pinch to try again.";
                        this.avaliableToRequest = true;
                    }
                });
            })
                .catch((error) => {
                this.hintText.text =
                    "Generation failed. Please Tap or Pinch to try again.";
                print("Error submitting task or getting status: " + error);
                this.avaliableToRequest = true;
            });
        }
        generateImageAsset(textureAssetData) {
            this.imageRoot.mainPass.baseTex = textureAssetData.texture;
            this.loaderSpinnerImage.enabled = false;
            this.imageRoot.enabled = true;
        }
        generateBaseMeshAsset(gltfAssetData) {
            this.baseMeshSceneObject = gltfAssetData.gltfAsset.tryInstantiate(this.baseMeshRoot, this.modelMat);
            this.baseMeshSpinner.enabled = false;
        }
        generateRefinedMeshAsset(gltfAssetData) {
            this.refinedMeshSceneObject = gltfAssetData.gltfAsset.tryInstantiate(this.refinedMeshRoot, this.modelMat);
            this.refinedMeshSpinner.enabled = false;
            this.hintText.text =
                "Generation Completed. Please Tap or Pinch to try again.";
            this.avaliableToRequest = true;
        }
        resetAssets() {
            this.imageRoot.enabled = false;
            if (!isNull(this.baseMeshSceneObject)) {
                this.baseMeshSceneObject.destroy();
                this.baseMeshSceneObject = null;
            }
            if (!isNull(this.refinedMeshSceneObject)) {
                this.refinedMeshSceneObject.destroy();
                this.refinedMeshSceneObject = null;
            }
        }
        initalizeSpinners() {
            this.loaderSpinnerImage = this.imageRoot.sceneObject.getChild(1);
            this.baseMeshSpinner = this.baseMeshRoot.getChild(1);
            this.refinedMeshSpinner = this.refinedMeshRoot.getChild(1);
            this.enableSpinners(false);
        }
        enableSpinners(enable) {
            this.loaderSpinnerImage.enabled = enable;
            this.baseMeshSpinner.enabled = enable;
            this.refinedMeshSpinner.enabled = enable;
        }
    };
    __setFunctionName(_classThis, "ExampleSnap3D");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleSnap3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleSnap3D = _classThis;
})();
exports.ExampleSnap3D = ExampleSnap3D;
//# sourceMappingURL=ExampleSnap3D.js.map