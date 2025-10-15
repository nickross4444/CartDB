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
exports.MicrophoneRecorder = void 0;
var __selfType = requireType("./MicrophoneRecorder");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Event_1 = require("../Utils/Event");
/**
 * Class for managing microphone input and recording audio frames.
 */
let MicrophoneRecorder = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var MicrophoneRecorder = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.micAudioTrack = this.micAudioTrack;
            this.onAudioFrame = new Event_1.default();
        }
        __initialize() {
            super.__initialize();
            this.micAudioTrack = this.micAudioTrack;
            this.onAudioFrame = new Event_1.default();
        }
        onAwake() {
            // Require the VoiceML Module in order to get Bystander Rejection
            require("LensStudio:VoiceMLModule");
            this.micAudioProvider = this.micAudioTrack
                .control;
            this.recordUpdate = this.createEvent("UpdateEvent");
            this.recordUpdate.bind(this.onUpdate.bind(this));
            this.recordUpdate.enabled = false;
        }
        onUpdate() {
            let audioFrame = new Float32Array(this.micAudioProvider.maxFrameSize);
            let audioShape = this.micAudioProvider.getAudioFrame(audioFrame);
            audioFrame = audioFrame.subarray(0, audioShape.x);
            this.onAudioFrame.invoke(audioFrame);
        }
        /**
         * Sets the sample rate for the microphone audio provider.
         * @param sampleRate The sample rate to set.
         */
        setSampleRate(sampleRate) {
            this.micAudioProvider.sampleRate = sampleRate;
        }
        /**
         * Starts recording audio from the microphone.
         */
        startRecording() {
            this.micAudioProvider.start();
            this.recordUpdate.enabled = true;
        }
        /**
         * Stops recording audio from the microphone.
         */
        stopRecording() {
            this.micAudioProvider.stop();
            this.recordUpdate.enabled = false;
        }
    };
    __setFunctionName(_classThis, "MicrophoneRecorder");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MicrophoneRecorder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MicrophoneRecorder = _classThis;
})();
exports.MicrophoneRecorder = MicrophoneRecorder;
//# sourceMappingURL=MicrophoneRecorder.js.map