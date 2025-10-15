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
exports.ExampleGeminiLive = void 0;
var __selfType = requireType("./ExampleGeminiLive");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const AudioProcessor_1 = require("../../Helpers/AudioProcessor");
const GoogleGenAI_1 = require("../GoogleGenAI");
const VideoController_1 = require("../../Helpers/VideoController");
let ExampleGeminiLive = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ExampleGeminiLive = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.websocketRequirementsObj = this.websocketRequirementsObj;
            this.dynamicAudioOutput = this.dynamicAudioOutput;
            this.microphoneRecorder = this.microphoneRecorder;
            this.textDisplay = this.textDisplay;
            this.instructions = this.instructions;
            this.haveVideoInput = this.haveVideoInput;
            this.haveAudioOutput = this.haveAudioOutput;
            this.voice = this.voice;
            this.audioProcessor = new AudioProcessor_1.AudioProcessor();
            this.videoController = new VideoController_1.VideoController();
        }
        __initialize() {
            super.__initialize();
            this.websocketRequirementsObj = this.websocketRequirementsObj;
            this.dynamicAudioOutput = this.dynamicAudioOutput;
            this.microphoneRecorder = this.microphoneRecorder;
            this.textDisplay = this.textDisplay;
            this.instructions = this.instructions;
            this.haveVideoInput = this.haveVideoInput;
            this.haveAudioOutput = this.haveAudioOutput;
            this.voice = this.voice;
            this.audioProcessor = new AudioProcessor_1.AudioProcessor();
            this.videoController = new VideoController_1.VideoController();
        }
        onAwake() {
            this.websocketRequirementsObj.enabled = true;
            this.createEvent("OnStartEvent").bind(() => {
                this.dynamicAudioOutput.initialize(24000);
                this.microphoneRecorder.setSampleRate(16000);
                this.createGeminiLiveSession();
            });
            // Display internet connection status
            this.textDisplay.text = global.deviceInfoSystem.isInternetAvailable()
                ? "Websocket connected"
                : "No internet";
            global.deviceInfoSystem.onInternetStatusChanged.add((args) => {
                this.textDisplay.text = args.isInternetAvailable
                    ? "Reconnected to internete"
                    : "No internet";
            });
        }
        createGeminiLiveSession() {
            let GeminiLive = GoogleGenAI_1.Gemini.liveConnect();
            GeminiLive.onOpen.add((event) => {
                print("Connection opened");
                let generationConfig = {
                    responseModalities: ["AUDIO"],
                    temperature: 1,
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: this.voice,
                            },
                        },
                    },
                };
                if (!this.haveAudioOutput) {
                    generationConfig = {
                        responseModalities: ["TEXT"],
                    };
                }
                // Define a tool for changing text color
                const tools = [
                    {
                        function_declarations: [
                            {
                                name: "change_text_color",
                                description: "Changes the color of the displayed text",
                                parameters: {
                                    type: "object",
                                    properties: {
                                        r: {
                                            type: "number",
                                            description: "Value for the red component of the color (0-255)",
                                        },
                                        g: {
                                            type: "number",
                                            description: "Value for the green component of the color (0-255)",
                                        },
                                        b: {
                                            type: "number",
                                            description: "Value for the blue component of the color (0-255)",
                                        },
                                    },
                                    required: ["r", "g", "b"],
                                },
                            },
                        ],
                    },
                ];
                // Send the session setup message
                let modelUri = `models/gemini-2.0-flash-live-preview-04-09`;
                const sessionSetupMessage = {
                    setup: {
                        model: modelUri,
                        generation_config: generationConfig,
                        system_instruction: {
                            parts: [
                                {
                                    text: this.instructions,
                                },
                            ],
                        },
                        tools: tools,
                        contextWindowCompression: {
                            triggerTokens: 20000,
                            slidingWindow: { targetTokens: 16000 },
                        },
                        output_audio_transcription: {},
                    },
                };
                GeminiLive.send(sessionSetupMessage);
            });
            let completedTextDisplay = true;
            GeminiLive.onMessage.add((message) => {
                print("Received message: " + JSON.stringify(message));
                // Setup complete, begin sending data
                if (message.setupComplete) {
                    message = message;
                    print("Setup complete");
                    // Process microphone input to send to the server
                    this.audioProcessor.onAudioChunkReady.add((encodedAudioChunk) => {
                        const message = {
                            realtime_input: {
                                media_chunks: [
                                    {
                                        mime_type: "audio/pcm",
                                        data: encodedAudioChunk,
                                    },
                                ],
                            },
                        };
                        GeminiLive.send(message);
                    });
                    // Configure the microphone
                    this.microphoneRecorder.onAudioFrame.add((audioFrame) => {
                        this.audioProcessor.processFrame(audioFrame);
                    });
                    this.microphoneRecorder.startRecording();
                    if (this.haveVideoInput) {
                        // Configure the video controller
                        this.videoController.onEncodedFrame.add((encodedFrame) => {
                            //print(encodedFrame)
                            const message = {
                                realtime_input: {
                                    media_chunks: [
                                        {
                                            mime_type: "image/jpeg",
                                            data: encodedFrame,
                                        },
                                    ],
                                },
                            };
                            GeminiLive.send(message);
                        });
                        this.videoController.startRecording();
                    }
                }
                if (message?.serverContent) {
                    message = message;
                    // Playback the audio response
                    if (message?.serverContent?.modelTurn?.parts?.[0]?.inlineData?.mimeType?.startsWith("audio/pcm")) {
                        let b64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
                        let audio = Base64.decode(b64Audio);
                        this.dynamicAudioOutput.addAudioFrame(audio);
                    }
                    // Show output transcription
                    else if (message?.serverContent?.outputTranscription?.text) {
                        if (completedTextDisplay) {
                            this.textDisplay.text =
                                message.serverContent.outputTranscription.text;
                        }
                        else {
                            this.textDisplay.text +=
                                message.serverContent.outputTranscription.text;
                        }
                        completedTextDisplay = false;
                    }
                    // Show text response
                    else if (message?.serverContent?.modelTurn?.parts?.[0]?.text) {
                        if (completedTextDisplay) {
                            this.textDisplay.text =
                                message.serverContent.modelTurn.parts[0].text;
                        }
                        else {
                            this.textDisplay.text +=
                                message.serverContent.modelTurn.parts[0].text;
                        }
                        completedTextDisplay = false;
                    }
                    // Determine if the response is complete
                    else if (message?.serverContent?.turnComplete) {
                        completedTextDisplay = true;
                    }
                }
                if (message.toolCall) {
                    message = message;
                    print(JSON.stringify(message));
                    // Handle tool calls
                    message.toolCall.functionCalls.forEach((functionCall) => {
                        if (functionCall.name === "change_text_color") {
                            const args = functionCall.args;
                            this.textDisplay.textFill.color = new vec4(args.r / 255, args.g / 255, args.b / 255, 1);
                            // Send a message back to the server indicating the function call was successful
                            const messageToSend = {
                                tool_response: {
                                    function_responses: [
                                        {
                                            name: functionCall.name,
                                            response: { content: "Successfully changed text color" },
                                        },
                                    ],
                                },
                            };
                            GeminiLive.send(messageToSend);
                        }
                    });
                }
            });
            GeminiLive.onError.add((event) => {
                print("Error: " + event);
            });
            GeminiLive.onClose.add((event) => {
                print("Connection closed: " + event.reason);
            });
        }
    };
    __setFunctionName(_classThis, "ExampleGeminiLive");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleGeminiLive = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleGeminiLive = _classThis;
})();
exports.ExampleGeminiLive = ExampleGeminiLive;
//# sourceMappingURL=ExampleGeminiLive.js.map