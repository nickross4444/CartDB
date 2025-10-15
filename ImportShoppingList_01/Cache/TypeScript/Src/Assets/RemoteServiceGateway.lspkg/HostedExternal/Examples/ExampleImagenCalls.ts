import { Imagen } from "../Imagen";
import { GoogleGenAITypes } from "../GoogleGenAITypes";

@component
export class ExampleImagenCalls extends BaseScriptComponent {
  @ui.separator
  @ui.group_start("Generate Image Example")
  @input
  private imgObject: SceneObject;
  @input
  @widget(new TextAreaWidget())
  private generatePrompt: string = "A futuristic cityscape at sunset";
  @input
  @label("Run On Tap")
  private doGenerateOnTap: boolean = false;
  @ui.group_end
  // Edit and Upscale are not supported by current proxy; removed from example
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
    if (this.doGenerateOnTap) {
      this.generateImageExample();
    }
  }

  private setImageTextureFromBase64(base64PngOrJpeg: string) {
    if (!this.imgObject) {
      print("ExampleImagenCalls: imgObject not assigned.");
      return;
    }
    this.imgObject.enabled = true;
    Base64.decodeTextureAsync(
      base64PngOrJpeg,
      (texture) => {
        let imgComponent = this.imgObject.getComponent("Image");
        if (!imgComponent) {
          print("ExampleImagenCalls: SceneObject has no Image component.");
          return;
        }
        let imageMaterial = imgComponent.mainMaterial.clone();
        imgComponent.mainMaterial = imageMaterial;
        imgComponent.mainPass.baseTex = texture;
      },
      () => {
        print("ExampleImagenCalls: Failed to decode texture from base64 data.");
      }
    );
  }

  private generateImageExample() {
    print("Generating image with prompt: " + this.generatePrompt);
    const request: GoogleGenAITypes.Imagen.ImagenRequest = {
      model: "imagen-3.0-generate-002",
      body: {
        parameters: {
          sampleCount: 1,
          addWatermark: false,
          aspectRatio: "1:1",
          enhancePrompt: true,
          language: "en",
          seed: 0,
        },
        instances: [
          {
            prompt: this.generatePrompt,
          },
        ],
      },
    };

    Imagen.generateImage(request)
      .then((response) => {
        print("Response: " + JSON.stringify(response));
        response.predictions.forEach((prediction) => {
          let b64 = prediction.bytesBase64Encoded;
          Base64.decodeTextureAsync(
            b64,
            (texture) => {
              this.imgObject.getComponent("Image").mainPass.baseTex = texture;
            },
            () => {
              print("Failed to decode texture from base64 data.");
            }
          );
        });
      })
      .catch((error) => {
        print("Imagen generate error: " + error);
      });
  }
}
