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
exports.ExampleImagenCalls = void 0;
var __selfType = requireType("./ExampleImagenCalls");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Imagen_1 = require("../Imagen");
let ExampleImagenCalls = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ExampleImagenCalls = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.imgObject = this.imgObject;
            this.generatePrompt = this.generatePrompt;
            this.doGenerateOnTap = this.doGenerateOnTap;
            this.gestureModule = require("LensStudio:GestureModule");
        }
        __initialize() {
            super.__initialize();
            this.imgObject = this.imgObject;
            this.generatePrompt = this.generatePrompt;
            this.doGenerateOnTap = this.doGenerateOnTap;
            this.gestureModule = require("LensStudio:GestureModule");
        }
        onAwake() {
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
            if (this.doGenerateOnTap) {
                this.generateImageExample();
            }
        }
        setImageTextureFromBase64(base64PngOrJpeg) {
            if (!this.imgObject) {
                print("ExampleImagenCalls: imgObject not assigned.");
                return;
            }
            this.imgObject.enabled = true;
            Base64.decodeTextureAsync(base64PngOrJpeg, (texture) => {
                let imgComponent = this.imgObject.getComponent("Image");
                if (!imgComponent) {
                    print("ExampleImagenCalls: SceneObject has no Image component.");
                    return;
                }
                let imageMaterial = imgComponent.mainMaterial.clone();
                imgComponent.mainMaterial = imageMaterial;
                imgComponent.mainPass.baseTex = texture;
            }, () => {
                print("ExampleImagenCalls: Failed to decode texture from base64 data.");
            });
        }
        generateImageExample() {
            print("Generating image with prompt: " + this.generatePrompt);
            const request = {
                model: "imagen-3.0-generate-002",
                body: {
                    parameters: {
                        sampleCount: 1,
                        addWatermark: false,
                        aspectRatio: "1:1",
                        enhancePrompt: true,
                        language: "en",
                        seed: 0,
                    },
                    instances: [
                        {
                            prompt: this.generatePrompt,
                        },
                    ],
                },
            };
            Imagen_1.Imagen.generateImage(request)
                .then((response) => {
                print("Response: " + JSON.stringify(response));
                response.predictions.forEach((prediction) => {
                    let b64 = prediction.bytesBase64Encoded;
                    Base64.decodeTextureAsync(b64, (texture) => {
                        this.imgObject.getComponent("Image").mainPass.baseTex = texture;
                    }, () => {
                        print("Failed to decode texture from base64 data.");
                    });
                });
            })
                .catch((error) => {
                print("Imagen generate error: " + error);
            });
        }
    };
    __setFunctionName(_classThis, "ExampleImagenCalls");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleImagenCalls = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleImagenCalls = _classThis;
})();
exports.ExampleImagenCalls = ExampleImagenCalls;
//# sourceMappingURL=ExampleImagenCalls.js.map