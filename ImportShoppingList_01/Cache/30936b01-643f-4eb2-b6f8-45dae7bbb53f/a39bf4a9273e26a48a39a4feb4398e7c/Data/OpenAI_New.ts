import { OpenAI } from "../OpenAI";
import { OpenAITypes } from "../OpenAITypes";
import { Promisfy } from "../../Utils/Promisfy";

@component
export class ExampleOAICalls extends BaseScriptComponent {
  @ui.separator
  @ui.group_start("Chat Completions Example")
  @input
  textDisplay: Text;
  @input
  @widget(new TextAreaWidget())
  private systemPrompt: string =
    "You are an incredibly smart but witty AI assistant who likes to answer life's greatest mysteries in under two sentences";
  @input
  @widget(new TextAreaWidget())
  private userPrompt: string = "Is a hotdog a sandwich";
  @input
  @label("Run On Tap")
  private doChatCompletionsOnTap: boolean = false;
  @ui.group_end
  @ui.separator
  @ui.group_start("Image Generation Example")
  @input
  private imgObject: SceneObject;
  @input
  @widget(new TextAreaWidget())
  private imageGenerationPrompt: string = "The future of augmented reality";
  @input
  @label("Run On Tap")
  private generateImageOnTap: boolean = false;
  @ui.group_end
  @ui.separator
  @ui.group_start("Image Edit Example")
  @input
  private editBaseImg: Texture;
  @input
  private editMaskImg: Texture;
  @input
  private editResultObject: SceneObject;
  @input
  @widget(new TextAreaWidget())
  private imageEditPrompt: string = "Add a cat into the image";
  @input
  @label("Run On Tap")
  private doEditImageOnTap: boolean = false;
  @ui.group_end
  @ui.separator
  @ui.group_start("Image to Text Example")
  @input
  private imageToReadTexture: Texture;
  @input
  @widget(new TextAreaWidget())
  private imageToTextPrompt: string = "Can you read what's in this image? give me the output as a text, ";
  @input
  @label("Run On Tap")
  private doImageToTextOnTap: boolean = false;
  @ui.group_end
  @ui.separator
  @ui.group_start("Voice Generation Example")
  @input
  @widget(new TextAreaWidget())
  private voiceGenerationPrompt: string =
    "Get ready for the future of augmented reality with Lens Studio!";
  @input
  @widget(new TextAreaWidget())
  private voiceGenerationInstructions: string =
    "Serious, movie trailer voice, insert pauses for dramatic effect";
  @input
  @label("Run On Tap")
  private generateVoiceOnTap: boolean = false;
  @ui.group_end
  @ui.separator
  @ui.group_start("Function Calling Example")
  @input
  @widget(new TextAreaWidget())
  private functionCallingPrompt: string = "Make the text display yellow";
  @input
  @label("Run On Tap")
  private doFunctionCallingOnTap: boolean = false;
  @ui.group_end
  private rmm = require("LensStudio:RemoteMediaModule") as RemoteMediaModule;
  private internetModule =
    require("LensStudio:InternetModule") as InternetModule;
  private gestureModule: GestureModule = require("LensStudio:GestureModule");

  onAwake() {
    if (global.deviceInfoSystem.isEditor()) {
      this.createEvent("TapEvent").bind(() => {
        this.onTap();
      });
    } else {
      this.gestureModule
        .getPinchDownEvent(GestureModule.HandType.Right)
        .add(() => {
          this.onTap();
        });
    }
  }
  private onTap() {
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
    Base64.encodeTextureAsync(
      this.imageToReadTexture,
      (base64String) => {
        // Call OpenAI Vision API
        OpenAI.chatCompletions({
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
      },
      () => {
        print("Error encoding texture");
        this.textDisplay.text = "Error encoding image";
      },
      CompressionQuality.LowQuality,
      EncodingType.Png
    );
  }

}