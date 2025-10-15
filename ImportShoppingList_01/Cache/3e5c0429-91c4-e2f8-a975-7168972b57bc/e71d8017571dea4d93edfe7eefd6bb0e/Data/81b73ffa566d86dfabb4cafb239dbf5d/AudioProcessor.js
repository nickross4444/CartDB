"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioProcessor = void 0;
const Event_1 = require("../Utils/Event");
/**
 * Class for managing and creating an audio buffer for sending to an external service.
 * Available API:
 * - processFrame to add a new audio frame to the buffer.
 */
class AudioProcessor {
    /**
     * Constructor for AudioProcessor.
     * @param sendRateMS - The rate at which audio frames are sent in milliseconds. Default is 100ms.
     */
    constructor(sendRateMS = 100) {
        this.sendRate = 100;
        this.audioFrameBuffer = [];
        this.lastSendTime = -1;
        this.onAudioChunkReady = new Event_1.default();
        this.sendRate = sendRateMS / 1000;
    }
    /**
     *
     * @param audioFrame - Float32 array representing the audio frame
     * This method converts the audio frame into PCM16 and appends it to the buffer.
     * If the buffer has enough data to send, it concatenates the audio frames into a single Uint8Array,
     * encodes it to Base64, and invokes the onAudioChunkReady event with the Base64 string.
     */
    processFrame(audioFrame) {
        if (audioFrame.length == 0) {
            return;
        }
        this.audioFrameBuffer.push(this.convertAudioFrameToPCM16(audioFrame));
        let currentTime = getTime();
        if (this.lastSendTime == -1) {
            this.lastSendTime = currentTime;
            return;
        }
        else if (currentTime - this.lastSendTime < this.sendRate) {
            return;
        }
        else {
            this.lastSendTime = currentTime;
        }
        let combinedAudioFrames = this.concatenateUint8Arrays([...this.audioFrameBuffer]);
        this.audioFrameBuffer = [];
        let b64AudioFrames = Base64.encode(combinedAudioFrames);
        this.onAudioChunkReady.invoke(b64AudioFrames);
    }
    /**
     * Converts a Float32Array audio frame to a Uint8Array in PCM16 format.
     * @param audioFrame - The Float32Array audio frame to convert.
     * @returns A Uint8Array representing the PCM16 audio data.
     */
    convertAudioFrameToPCM16(audioFrame) {
        const int16Array = new Int16Array(audioFrame.length);
        for (let i = 0; i < audioFrame.length; i++) {
            const s = Math.max(-1, Math.min(1, audioFrame[i]));
            int16Array[i] = s < 0 ? Math.round(s * 0x8000) : Math.round(s * 0x7FFF);
        }
        return new Uint8Array(int16Array.buffer);
    }
    /**
     * Concatenates multiple Uint8Arrays into a single Uint8Array.
     * @param arrays - An array of Uint8Arrays to concatenate.
     * @returns A single Uint8Array containing all the data from the input arrays.
     */
    concatenateUint8Arrays(arrays) {
        if (arrays.length === 0) {
            return new Uint8Array(0);
        }
        let totalLength = 0;
        for (const arr of arrays) {
            totalLength += arr.byteLength;
        }
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const arr of arrays) {
            result.set(arr, offset);
            offset += arr.byteLength;
        }
        return result;
    }
}
exports.AudioProcessor = AudioProcessor;
//# sourceMappingURL=AudioProcessor.js.map