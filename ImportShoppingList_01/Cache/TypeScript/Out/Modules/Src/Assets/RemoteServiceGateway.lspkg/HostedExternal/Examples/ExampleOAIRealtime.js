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
exports.ExampleOAIRealtime = void 0;
var __selfType = requireType("./ExampleOAIRealtime");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const AudioProcessor_1 = require("../../Helpers/AudioProcessor");
const OpenAI_1 = require("../OpenAI");
let ExampleOAIRealtime = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ExampleOAIRealtime = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.websocketRequirementsObj = this.websocketRequirementsObj;
            this.dynamicAudioOutput = this.dynamicAudioOutput;
            this.microphoneRecorder = this.microphoneRecorder;
            this.textDisplay = this.textDisplay;
            this.instructions = this.instructions;
            this.audioOutput = this.audioOutput;
            this.voice = this.voice;
            this.audioProcessor = new AudioProcessor_1.AudioProcessor();
        }
        __initialize() {
            super.__initialize();
            this.websocketRequirementsObj = this.websocketRequirementsObj;
            this.dynamicAudioOutput = this.dynamicAudioOutput;
            this.microphoneRecorder = this.microphoneRecorder;
            this.textDisplay = this.textDisplay;
            this.instructions = this.instructions;
            this.audioOutput = this.audioOutput;
            this.voice = this.voice;
            this.audioProcessor = new AudioProcessor_1.AudioProcessor();
        }
        onAwake() {
            this.websocketRequirementsObj.enabled = true;
            this.createEvent("OnStartEvent").bind(() => {
                this.dynamicAudioOutput.initialize(24000);
                this.connectToWebsocket();
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
        connectToWebsocket() {
            let OAIRealtime = OpenAI_1.OpenAI.createRealtimeSession({
                model: "gpt-4o-mini-realtime-preview",
            });
            OAIRealtime.onOpen.add((event) => {
                print("Connection opened");
                let modalitiesArray = ["text"];
                if (this.audioOutput) {
                    modalitiesArray.push("audio");
                }
                const setTextColor = {
                    type: "function",
                    name: "set-text-color",
                    description: "Use this function to set the text color of the text display",
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
                };
                // Set up the session
                let sessionUpdateMsg = {
                    type: "session.update",
                    session: {
                        instructions: this.instructions,
                        voice: this.voice,
                        modalities: modalitiesArray,
                        input_audio_format: "pcm16",
                        tools: [setTextColor],
                        output_audio_format: "pcm16",
                        turn_detection: {
                            type: "server_vad",
                            threshold: 0.5,
                            prefix_padding_ms: 300,
                            silence_duration_ms: 500,
                            create_response: true,
                        },
                    },
                };
                OAIRealtime.send(sessionUpdateMsg);
                // Process microphone input to send to the server
                this.audioProcessor.onAudioChunkReady.add((encodedAudioChunk) => {
                    let audioMsg = {
                        type: "input_audio_buffer.append",
                        audio: encodedAudioChunk,
                    };
                    OAIRealtime.send(audioMsg);
                });
                // Configure the microphone
                this.microphoneRecorder.setSampleRate(24000);
                this.microphoneRecorder.onAudioFrame.add((audioFrame) => {
                    this.audioProcessor.processFrame(audioFrame);
                });
                this.microphoneRecorder.startRecording();
            });
            let completedTextDisplay = true;
            OAIRealtime.onMessage.add((message) => {
                // Listen for text responses
                if (message.type === "response.text.delta" ||
                    message.type === "response.audio_transcript.delta") {
                    if (!completedTextDisplay) {
                        this.textDisplay.text += message.delta;
                    }
                    else {
                        this.textDisplay.text = message.delta;
                    }
                    completedTextDisplay = false;
                }
                else if (message.type === "response.done") {
                    completedTextDisplay = true;
                }
                // Set up Audio Playback
                else if (message.type === "response.audio.delta") {
                    let delta = Base64.decode(message.delta);
                    this.dynamicAudioOutput.addAudioFrame(delta);
                }
                // Listen for function calls
                else if (message.type === "response.output_item.done") {
                    if (message.item && message.item.type === "function_call") {
                        const functionCall = message.item;
                        print(`Function called: ${functionCall.name}`);
                        print(`Function args : ${functionCall.arguments}`);
                        print("call_id: " + functionCall.call_id);
                        let args = JSON.parse(functionCall.arguments);
                        this.textDisplay.textFill.color = new vec4(args.r / 255, args.g / 255, args.b / 255, 1);
                        // Send a message back to the server indicating the function call was successful
                        let messageToSend = {
                            type: "conversation.item.create",
                            item: {
                                type: "function_call_output",
                                call_id: functionCall.call_id,
                                output: "You have successfully called the function to set the text color.",
                            },
                        };
                        OAIRealtime.send(messageToSend);
                    }
                }
            });
            OAIRealtime.onError.add((event) => {
                print("Websocket error: " + event);
            });
            OAIRealtime.onClose.add((event) => {
                this.textDisplay.text = "Websocket closed: " + event.reason;
                print("Websocket closed: " + event.reason);
            });
        }
    };
    __setFunctionName(_classThis, "ExampleOAIRealtime");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleOAIRealtime = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleOAIRealtime = _classThis;
})();
exports.ExampleOAIRealtime = ExampleOAIRealtime;
//# sourceMappingURL=ExampleOAIRealtime.js.map