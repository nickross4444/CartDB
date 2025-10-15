/**
 * Acts as a dynamic audio track output for PCM16 input
 */
@component
export class DynamicAudioOutput extends BaseScriptComponent {
  @ui.separator
  @ui.label("This script manages audio output for generative AI models.")
  @ui.separator
  @input
  private audioOutputTrack: AudioTrackAsset;

  private audComponent: AudioComponent;
  private audioOutputProvider: AudioOutputProvider;

  onAwake() {
    this.audioOutputProvider = this.audioOutputTrack
      .control as AudioOutputProvider;
    this.audComponent = this.sceneObject.getComponent("AudioComponent");
  }
  /**
   * Initializes the audio output with the specified sample rate.
   * @param sampleRate - Sample rate for the audio output.
   */
  initialize(sampleRate: number) {
    this.audioOutputProvider.sampleRate = sampleRate;
    this.audComponent.audioTrack = this.audioOutputTrack;
    this.audComponent.play(-1);
  }

  /**
   * Adds an audio frame to the output.
   * @param uint8Array - Audio data in PCM 16-bit format as a Uint8Array.
   * @param channels - Optional channel count. Default is 1.
   *
   * Expects interleaved PCM16 for multi-channel input.
   */
  addAudioFrame(uint8Array: Uint8Array, channels: number = 1) {
    if (!this.audComponent.isPlaying()) {
      this.audComponent.play(-1);
    }
    let { data, shape } = this.convertPCM16ToAudFrameAndShape(
      uint8Array,
      channels
    );
    this.audioOutputProvider.enqueueAudioFrame(data, shape);
  }

  /**
   * Stops the audio output if it is currently playing.
   */
  interruptAudioOutput() {
    if (this.audComponent.isPlaying()) {
      this.audComponent.stop(false);
    }
  }

  private convertPCM16ToAudFrameAndShape(
    uint8Array: Uint8Array,
    channels: number = 1
  ): {
    data: Float32Array;
    shape: vec3;
  } {
    const clampedChannels = Math.max(1, channels | 0);
    const bytesPerFrame = 2 * clampedChannels;
    const safeLength = uint8Array.length - (uint8Array.length % bytesPerFrame);
    const totalSamples = safeLength / 2;
    const frames = totalSamples / clampedChannels;

    let monoData = new Float32Array(frames);
    if (clampedChannels === 1) {
      for (let i = 0, j = 0; i < safeLength; i += 2, j++) {
        const sample = ((uint8Array[i] | (uint8Array[i + 1] << 8)) << 16) >> 16;
        monoData[j] = sample / 32768.0;
      }
    } else {
      for (let f = 0; f < frames; f++) {
        const byteIndex = f * bytesPerFrame;
        const sample =
          ((uint8Array[byteIndex] | (uint8Array[byteIndex + 1] << 8)) << 16) >>
          16;
        monoData[f] = sample / 32768.0;
      }
    }

    let shape = new vec3(monoData.length, 1, 1);
    return { data: monoData, shape: shape };
  }
}
