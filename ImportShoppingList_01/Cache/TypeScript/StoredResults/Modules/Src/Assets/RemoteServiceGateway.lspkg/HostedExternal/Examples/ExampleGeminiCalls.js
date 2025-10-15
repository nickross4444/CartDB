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
exports.ExampleGeminiCalls = void 0;
var __selfType = requireType("./ExampleGeminiCalls");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const GoogleGenAI_1 = require("../GoogleGenAI");
let ExampleGeminiCalls = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ExampleGeminiCalls = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.textDisplay = this.textDisplay;
            this.modelPrompt = this.modelPrompt;
            this.textPrompt = this.textPrompt;
            this.doTextGenerationOnTap = this.doTextGenerationOnTap;
            this.imgObject = this.imgObject;
            this.imageGenerationPrompt = this.imageGenerationPrompt;
            this.generateImageOnTap = this.generateImageOnTap;
            this.functionCallingPrompt = this.functionCallingPrompt;
            this.doFunctionCallingOnTap = this.doFunctionCallingOnTap;
            this.gestureModule = require("LensStudio:GestureModule");
        }
        __initialize() {
            super.__initialize();
            this.textDisplay = this.textDisplay;
            this.modelPrompt = this.modelPrompt;
            this.textPrompt = this.textPrompt;
            this.doTextGenerationOnTap = this.doTextGenerationOnTap;
            this.imgObject = this.imgObject;
            this.imageGenerationPrompt = this.imageGenerationPrompt;
            this.generateImageOnTap = this.generateImageOnTap;
            this.functionCallingPrompt = this.functionCallingPrompt;
            this.doFunctionCallingOnTap = this.doFunctionCallingOnTap;
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
            if (this.generateImageOnTap) {
                this.generateImageExample();
            }
            if (this.doTextGenerationOnTap) {
                this.textToTextExample();
            }
            if (this.doFunctionCallingOnTap) {
                this.functionCallingExample();
            }
        }
        textToTextExample() {
            this.textDisplay.sceneObject.enabled = true;
            this.textDisplay.text = "Generating...";
            let request = {
                model: "gemini-2.0-flash",
                type: "generateContent",
                body: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: this.modelPrompt,
                                },
                            ],
                            role: "model",
                        },
                        {
                            parts: [
                                {
                                    text: this.textPrompt,
                                },
                            ],
                            role: "user",
                        },
                    ],
                },
            };
            GoogleGenAI_1.Gemini.models(request)
                .then((response) => {
                print("Gemini response: " + JSON.stringify(response));
                this.textDisplay.text = response.candidates[0].content.parts[0].text;
            })
                .catch((error) => {
                print("Gemini error: " + error);
                this.textDisplay.text = "Error: " + error;
            });
        }
        generateImageExample() {
            this.imgObject.enabled = true;
            let request = {
                model: "gemini-2.0-flash-preview-image-generation",
                type: "generateContent",
                body: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: this.imageGenerationPrompt,
                                },
                            ],
                            role: "user",
                        },
                    ],
                    generationConfig: {
                        responseModalities: ["TEXT", "IMAGE"],
                    },
                },
            };
            GoogleGenAI_1.Gemini.models(request)
                .then((response) => {
                for (let part of response.candidates[0].content.parts) {
                    if (part?.inlineData) {
                        let b64Data = part.inlineData.data;
                        Base64.decodeTextureAsync(b64Data, (texture) => {
                            let imgComponent = this.imgObject.getComponent("Image");
                            let imageMaterial = imgComponent.mainMaterial.clone();
                            imgComponent.mainMaterial = imageMaterial;
                            imgComponent.mainPass.baseTex = texture;
                        }, () => {
                            print("Failed to decode texture from base64 data.");
                        });
                    }
                }
            })
                .catch((error) => {
                print("Error while generating image: " + error);
                this.textDisplay.text = "Error: " + error;
            });
        }
        functionCallingExample() {
            this.textDisplay.sceneObject.enabled = true;
            this.textDisplay.text = "Processing function call...";
            let request = {
                model: "gemini-2.0-flash",
                type: "generateContent",
                body: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: this.functionCallingPrompt,
                                },
                            ],
                            role: "user",
                        },
                    ],
                    tools: [
                        {
                            functionDeclarations: [
                                {
                                    name: "set_text_color",
                                    description: "Set the color of the text display",
                                    parameters: {
                                        type: "object",
                                        properties: {
                                            red: {
                                                type: "number",
                                                description: "Red component of the color (0-255)",
                                            },
                                            green: {
                                                type: "number",
                                                description: "Green component of the color (0-255)",
                                            },
                                            blue: {
                                                type: "number",
                                                description: "Blue component of the color (0-255)",
                                            },
                                        },
                                        required: ["red", "green", "blue"],
                                    },
                                },
                            ],
                        },
                    ],
                },
            };
            GoogleGenAI_1.Gemini.models(request)
                .then((response) => {
                print("Gemini function call response: " + JSON.stringify(response));
                // Check for function calls in the response
                const functionCalls = response.candidates[0]?.content?.parts?.[0]?.functionCall;
                if (functionCalls && functionCalls.name === "set_text_color") {
                    try {
                        const args = functionCalls.args;
                        const r = args.red || 0;
                        const g = args.green || 0;
                        const b = args.blue || 0;
                        // Set the text color
                        this.textDisplay.textFill.color = new vec4(r / 255, g / 255, b / 255, 1);
                        this.textDisplay.text = `Text color set to RGB(${r}, ${g}, ${b})`;
                    }
                    catch (e) {
                        this.textDisplay.text = "Error parsing function arguments: " + e;
                    }
                }
                else {
                    // If no function call was made, display the regular text response
                    const textResponse = response.candidates[0]?.content?.parts?.[0]?.text;
                    if (textResponse) {
                        this.textDisplay.text = textResponse;
                    }
                    else {
                        this.textDisplay.text =
                            "No function call or text response received";
                    }
                }
            })
                .catch((error) => {
                print("Gemini function call error: " + error);
                this.textDisplay.text = "Error: " + error;
            });
        }
    };
    __setFunctionName(_classThis, "ExampleGeminiCalls");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleGeminiCalls = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleGeminiCalls = _classThis;
})();
exports.ExampleGeminiCalls = ExampleGeminiCalls;
//# sourceMappingURL=ExampleGeminiCalls.js.map