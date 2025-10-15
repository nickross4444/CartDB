import Event from "../Utils/Event";

/**
 * Class for managing microphone input and recording audio frames.
 */
@component
export class MicrophoneRecorder extends BaseScriptComponent {
  @ui.separator
  @ui.label("This script manages microphone input")
  @ui.separator
  @input
  private micAudioTrack: AudioTrackAsset;
  private micAudioProvider: MicrophoneAudioProvider;
  private recordUpdate: UpdateEvent;
  public onAudioFrame = new Event<Float32Array>();

  private onAwake() {
    // Require the VoiceML Module in order to get Bystander Rejection
    require("LensStudio:VoiceMLModule");
    this.micAudioProvider = this.micAudioTrack
      .control as MicrophoneAudioProvider;
    this.recordUpdate = this.createEvent("UpdateEvent");
    this.recordUpdate.bind(this.onUpdate.bind(this));
    this.recordUpdate.enabled = false;
  }

  private onUpdate() {
    let audioFrame = new Float32Array(this.micAudioProvider.maxFrameSize);
    let audioShape = this.micAudioProvider.getAudioFrame(audioFrame);
    audioFrame = audioFrame.subarray(0, audioShape.x);
    this.onAudioFrame.invoke(audioFrame);
  }

  /**
   * Sets the sample rate for the microphone audio provider.
   * @param sampleRate The sample rate to set.
   */
  setSampleRate(sampleRate: number) {
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
}
