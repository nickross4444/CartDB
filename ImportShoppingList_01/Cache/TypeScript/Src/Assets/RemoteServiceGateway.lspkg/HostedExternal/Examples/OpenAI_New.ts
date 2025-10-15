import { OpenAI } from "../OpenAI";
import { OpenAITypes } from "../OpenAITypes";
import { Promisfy } from "../../Utils/Promisfy";

@component
export class ExampleOAICalls extends BaseScriptComponent {

  @input
  textDisplay: Text;
 
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