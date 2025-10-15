import { Lyria } from "../Lyria";
import { GoogleGenAITypes } from "../GoogleGenAITypes";
import { DynamicAudioOutput } from "../../Helpers/DynamicAudioOutput";

@component
export class ExampleLyriaCall extends BaseScriptComponent {
  @ui.separator
  @ui.group_start("Music Generation Example")
  @input
  @widget(new TextAreaWidget())
  private musicPrompt: string =
    "An energetic electronic dance track with a fast tempo";

  @input
  @widget(new TextAreaWidget())
  private negativePrompt: string = "vocals, slow tempo";

  @input
  private seed: number = 12345;

  @input
  private sampleCount: number = 1;

  @input
  @label("Generate Music on tap")
  private generateMusicOnTap: boolean = false;

  @input
  dynamicAudioOutput: DynamicAudioOutput;

  @ui.group_end
  @ui.separator
  @ui.group_start("Audio Output")
  @input
  @label("Play Generated Audio")
  private playAudioOnTap: boolean = false;
  @ui.group_end
  private gestureModule: GestureModule = require("LensStudio:GestureModule");
  private isGeneratingMusic: boolean = false;

  onAwake() {
    if (this.playAudioOnTap) {
      this.createEvent("TapEvent").bind(() => {
        this.onTap();
      });
      this.gestureModule
        .getPinchDownEvent(GestureModule.HandType.Right)
        .add(() => {
          this.onTap();
        });
    }
  }

  onTap() {
    if (this.generateMusicOnTap) {
      this.generateMusic();
    }
  }
  private generateMusic() {
    // Check if a music generation is already in progress
    if (this.isGeneratingMusic) {
      print("Music generation is already in progress. Please wait...");
      return;
    }

    this.isGeneratingMusic = true;
    print("Generating music... This may take a moment.");

    // Create the music generation request using the exact Lyria API specification
    const musicRequest: GoogleGenAITypes.Lyria.LyriaRequest = {
      model: "lyria-002",
      type: "predict",
      body: {
        instances: [
          {
            prompt: this.musicPrompt,
            negative_prompt: this.negativePrompt || undefined,
            seed: this.seed || undefined,
          },
        ],
        parameters: {
          sample_count: this.sampleCount || undefined,
        },
      },
    };
    this.dynamicAudioOutput.initialize(48000);
    // Call the Lyria API
    Lyria.performLyriaRequest(musicRequest)
      .then((response) => {
        response.predictions.forEach((prediction) => {
          let b64 = prediction.bytesBase64Encoded;
          this.dynamicAudioOutput.addAudioFrame(Base64.decode(b64), 2);
        });
      })
      .catch((error) => {
        this.isGeneratingMusic = false;
        print(`Music generation failed: ${error.message || error}`);
        print(`[Lyria Error] ${error}`);
      });
  }
}
