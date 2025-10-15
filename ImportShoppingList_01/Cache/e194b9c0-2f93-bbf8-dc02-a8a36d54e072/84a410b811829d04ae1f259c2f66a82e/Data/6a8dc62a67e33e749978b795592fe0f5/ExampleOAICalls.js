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
var __selfType = requireType("./ExampleOAICalls");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const OpenAI_1 = require("../OpenAI");
const Promisfy_1 = require("../../Utils/Promisfy");
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
            this.systemPrompt = this.systemPrompt;
            this.userPrompt = this.userPrompt;
            this.doChatCompletionsOnTap = this.doChatCompletionsOnTap;
            this.imgObject = this.imgObject;
            this.imageGenerationPrompt = this.imageGenerationPrompt;
            this.generateImageOnTap = this.generateImageOnTap;
            this.editBaseImg = this.editBaseImg;
            this.editMaskImg = this.editMaskImg;
            this.editResultObject = this.editResultObject;
            this.imageEditPrompt = this.imageEditPrompt;
            this.doEditImageOnTap = this.doEditImageOnTap;
            this.voiceGenerationPrompt = this.voiceGenerationPrompt;
            this.voiceGenerationInstructions = this.voiceGenerationInstructions;
            this.generateVoiceOnTap = this.generateVoiceOnTap;
            this.functionCallingPrompt = this.functionCallingPrompt;
            this.doFunctionCallingOnTap = this.doFunctionCallingOnTap;
            this.rmm = require("LensStudio:RemoteMediaModule");
            this.internetModule = require("LensStudio:InternetModule");
            this.gestureModule = require("LensStudio:GestureModule");
        }
        __initialize() {
            super.__initialize();
            this.textDisplay = this.textDisplay;
            this.systemPrompt = this.systemPrompt;
            this.userPrompt = this.userPrompt;
            this.doChatCompletionsOnTap = this.doChatCompletionsOnTap;
            this.imgObject = this.imgObject;
            this.imageGenerationPrompt = this.imageGenerationPrompt;
            this.generateImageOnTap = this.generateImageOnTap;
            this.editBaseImg = this.editBaseImg;
            this.editMaskImg = this.editMaskImg;
            this.editResultObject = this.editResultObject;
            this.imageEditPrompt = this.imageEditPrompt;
            this.doEditImageOnTap = this.doEditImageOnTap;
            this.voiceGenerationPrompt = this.voiceGenerationPrompt;
            this.voiceGenerationInstructions = this.voiceGenerationInstructions;
            this.generateVoiceOnTap = this.generateVoiceOnTap;
            this.functionCallingPrompt = this.functionCallingPrompt;
            this.doFunctionCallingOnTap = this.doFunctionCallingOnTap;
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
            if (this.generateVoiceOnTap) {
                this.doSpeechGeneration();
            }
            if (this.generateImageOnTap) {
                this.doImageGeneration();
            }
            if (this.doChatCompletionsOnTap) {
                this.doChatCompletions();
            }
            if (this.doFunctionCallingOnTap) {
                this.doFunctionCalling();
            }
            if (this.doEditImageOnTap) {
                this.doImageEdit();
            }
        }
        doChatCompletions() {
            this.textDisplay.sceneObject.enabled = true;
            this.textDisplay.text = "Generating...";
            OpenAI_1.OpenAI.chatCompletions({
                model: "gpt-4.1-nano",
                messages: [
                    {
                        role: "system",
                        content: this.systemPrompt,
                    },
                    {
                        role: "user",
                        content: this.userPrompt,
                    },
                ],
                temperature: 0.7,
            })
                .then((response) => {
                this.textDisplay.text = response.choices[0].message.content;
            })
                .catch((error) => {
                this.textDisplay.text = "Error: " + error;
            });
        }
        doImageGeneration() {
            this.imgObject.enabled = true;
            OpenAI_1.OpenAI.imagesGenerate({
                model: "dall-e-2",
                prompt: this.imageGenerationPrompt,
                n: 1,
                size: "512x512",
            })
                .then((response) => {
                print("Image Generated");
                response.data.forEach(async (datum) => {
                    let url = datum.url;
                    let b64 = datum.b64_json;
                    if (url) {
                        print("Texture loaded as image URL");
                        let httpRequest = RemoteServiceHttpRequest.create();
                        httpRequest.url = url;
                        let resource = await Promisfy_1.Promisfy.InternetModule.performHttpRequest(this.internetModule, httpRequest);
                        this.rmm.loadResourceAsImageTexture(resource, (texture) => {
                            let imgComponent = this.imgObject.getComponent("Image");
                            let imageMaterial = imgComponent.mainMaterial.clone();
                            imgComponent.mainMaterial = imageMaterial;
                            imgComponent.mainPass.baseTex = texture;
                        }, () => {
                            print("Failure to download texture from URL");
                        });
                    }
                    else if (b64) {
                        print("Decoding texture from base64");
                        Base64.decodeTextureAsync(b64, (texture) => {
                            let imgComponent = this.imgObject.getComponent("Image");
                            imgComponent.mainPass.baseTex = texture;
                        }, () => {
                            print("Failure to download texture from base64");
                        });
                    }
                });
            })
                .catch((error) => {
                print("Error: " + error);
                this.textDisplay.text = "Error: " + error;
            });
        }
        doImageEdit() {
            if (!this.editBaseImg || !this.editMaskImg) {
                print("Error: Base image or mask image is missing");
                return;
            }
            this.editResultObject.enabled = true;
            // Convert textures to base64
            Promise.all([
                new Promise((resolve, reject) => {
                    Base64.encodeTextureAsync(this.editBaseImg, (base64) => resolve(Base64.decode(base64)), reject, CompressionQuality.LowQuality, EncodingType.Png);
                }),
                new Promise((resolve, reject) => {
                    Base64.encodeTextureAsync(this.editMaskImg, (base64) => resolve(Base64.decode(base64)), reject, CompressionQuality.LowQuality, EncodingType.Png);
                }),
            ])
                .then(([baseImageData, maskImageData]) => {
                // Call the OpenAI image edit API
                let imageEditRequest = {
                    prompt: this.imageEditPrompt,
                    image: baseImageData,
                    mask: maskImageData,
                    n: 1,
                    size: "512x512",
                    model: "dall-e-2",
                };
                OpenAI_1.OpenAI.imagesEdit(imageEditRequest)
                    .then((response) => {
                    print("Image Edit Generated");
                    response.data.forEach(async (datum) => {
                        let url = datum.url;
                        let b64 = datum.b64_json;
                        if (url) {
                            print("Texture loaded as image URL");
                            let httpRequest = RemoteServiceHttpRequest.create();
                            httpRequest.url = url;
                            let resource = await Promisfy_1.Promisfy.InternetModule.performHttpRequest(this.internetModule, httpRequest);
                            this.rmm.loadResourceAsImageTexture(resource, (texture) => {
                                let imgComponent = this.editResultObject.getComponent("Image");
                                let imageMaterial = imgComponent.mainMaterial.clone();
                                imgComponent.mainMaterial = imageMaterial;
                                imgComponent.mainPass.baseTex = texture;
                            }, () => {
                                print("Failure to download texture from URL");
                            });
                        }
                        else if (b64) {
                            print("Decoding texture from base64");
                            Base64.decodeTextureAsync(b64, (texture) => {
                                let imgComponent = this.editResultObject.getComponent("Image");
                                imgComponent.mainPass.baseTex = texture;
                            }, () => {
                                print("Failure to download texture from base64");
                            });
                        }
                    });
                })
                    .catch((error) => {
                    print("Error: " + error);
                    if (this.textDisplay) {
                        this.textDisplay.text = "Error: " + error;
                    }
                });
            })
                .catch((error) => {
                print("Error encoding textures: " + error);
            });
        }
        doSpeechGeneration() {
            OpenAI_1.OpenAI.speech({
                model: "gpt-4o-mini-tts",
                input: this.voiceGenerationPrompt,
                voice: "coral",
                instructions: this.voiceGenerationInstructions,
            })
                .then((response) => {
                print("Got speech response");
                let aud = this.sceneObject.createComponent("AudioComponent");
                aud.audioTrack = response;
                aud.play(1);
            })
                .catch((error) => {
                print("Error: " + error);
                this.textDisplay.text = "Error: " + error;
            });
        }
        doFunctionCalling() {
            this.textDisplay.sceneObject.enabled = true;
            this.textDisplay.text = "Processing function call...";
            // Define available functions
            const tools = [
                {
                    type: "function",
                    function: {
                        name: "set-text-color",
                        description: "Set the color of the text display",
                        parameters: {
                            type: "object",
                            properties: {
                                r: {
                                    type: "number",
                                    description: "Red component of the color (0-255)",
                                },
                                g: {
                                    type: "number",
                                    description: "Green component of the color (0-255)",
                                },
                                b: {
                                    type: "number",
                                    description: "Blue component of the color (0-255)",
                                },
                            },
                            required: ["r", "g", "b"],
                        },
                    },
                },
            ];
            OpenAI_1.OpenAI.chatCompletions({
                model: "gpt-4.1-nano",
                messages: [
                    {
                        role: "user",
                        content: this.functionCallingPrompt,
                    },
                ],
                tools: tools,
                tool_choice: "auto",
                temperature: 0.7,
            })
                .then((response) => {
                const message = response.choices[0].message;
                if (message.tool_calls && message.tool_calls.length > 0) {
                    const toolCall = message.tool_calls[0];
                    if (toolCall.function.name === "set-text-color") {
                        let args = JSON.parse(toolCall.function.arguments);
                        this.textDisplay.textFill.color = new vec4(args.r / 255, args.g / 255, args.b / 255, 1);
                        this.textDisplay.text = `Text color set to RGB(${args.r}, ${args.g}, ${args.b})`;
                    }
                }
            })
                .catch((error) => {
                this.textDisplay.text = "Error: " + error;
            });
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
//# sourceMappingURL=ExampleOAICalls.js.map