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
exports.ExampleOAICalls = void 0;
var __selfType = requireType("./OpenAI_New");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const OpenAI_1 = require("../OpenAI");
let ExampleOAICalls = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ExampleOAICalls = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.textDisplay = this.textDisplay;
            this.imageToReadTexture = this.imageToReadTexture;
            this.imageToTextPrompt = this.imageToTextPrompt;
            this.doImageToTextOnTap = this.doImageToTextOnTap;
            this.rmm = require("LensStudio:RemoteMediaModule");
            this.internetModule = require("LensStudio:InternetModule");
            this.gestureModule = require("LensStudio:GestureModule");
        }
        __initialize() {
            super.__initialize();
            this.textDisplay = this.textDisplay;
            this.imageToReadTexture = this.imageToReadTexture;
            this.imageToTextPrompt = this.imageToTextPrompt;
            this.doImageToTextOnTap = this.doImageToTextOnTap;
            this.rmm = require("LensStudio:RemoteMediaModule");
            this.internetModule = require("LensStudio:InternetModule");
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
            if (this.doImageToTextOnTap) {
                this.doImageToText();
            }
        }
        doImageToText() {
            if (!this.imageToReadTexture) {
                print("Error: Image texture is missing");
                if (this.textDisplay) {
                    this.textDisplay.sceneObject.enabled = true;
                    this.textDisplay.text = "Error: No image provided";
                }
                return;
            }
            this.textDisplay.sceneObject.enabled = true;
            this.textDisplay.text = "Reading image...";
            // Convert texture to base64
            Base64.encodeTextureAsync(this.imageToReadTexture, (base64String) => {
                // Call OpenAI Vision API
                OpenAI_1.OpenAI.chatCompletions({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: this.imageToTextPrompt,
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/png;base64,${base64String}`,
                                    },
                                },
                            ],
                        },
                    ],
                    max_tokens: 500,
                })
                    .then((response) => {
                    this.textDisplay.text = response.choices[0].message.content;
                    print("Image to Text Result: " + response.choices[0].message.content);
                })
                    .catch((error) => {
                    this.textDisplay.text = "Error: " + error;
                    print("Error: " + error);
                });
            }, () => {
                print("Error encoding texture");
                this.textDisplay.text = "Error encoding image";
            }, CompressionQuality.LowQuality, EncodingType.Png);
        }
    };
    __setFunctionName(_classThis, "ExampleOAICalls");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleOAICalls = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleOAICalls = _classThis;
})();
exports.ExampleOAICalls = ExampleOAICalls;
//# sourceMappingURL=OpenAI_New.js.map