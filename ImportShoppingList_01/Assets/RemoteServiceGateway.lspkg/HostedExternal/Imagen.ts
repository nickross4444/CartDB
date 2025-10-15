import {
  AvaliableApiTypes,
  RemoteServiceGatewayCredentials,
} from "../RemoteServiceGatewayCredentials";

import { GoogleGenAITypes } from "./GoogleGenAITypes";

const RSM_IMAGEN = requireAsset(
  "./RemoteServiceModules/Imagen_Sync.remoteServiceModule"
) as RemoteServiceModule;

/**
 * Imagen API client for image generation, editing, and upscaling
 * @link https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview
 */
export class Imagen {
  /**
   * Edit images using the Imagen API (inpainting/outpainting)
   * @param request The image editing request
   * @returns A promise that resolves with the edited image
   */
  // Edit/upscale are currently not supported by the proxy contract; intentionally omitted

  /**
   * Perform a generic Imagen API request
   * @param imagenRequest The Imagen request object
   * @returns A promise that resolves with the Imagen response
   */
  static generateImage(
    imagenRequest: GoogleGenAITypes.Imagen.ImagenRequest
  ): Promise<GoogleGenAITypes.Imagen.ImagenResponse> {
    return new Promise((resolve, reject) => {
      const submitApiRequest = RemoteApiRequest.create();

      let apiToken;
      try {
        apiToken = RemoteServiceGatewayCredentials.getApiToken(
          AvaliableApiTypes.Google
        );
      } catch (error) {
        reject(
          new Error(
            "Imagen API token not configured. Please configure credentials for Imagen API."
          )
        );
        return;
      }

      submitApiRequest.endpoint = "imagen";
      submitApiRequest.parameters = {
        "api-token": apiToken,
        model: imagenRequest.model,
      };
      submitApiRequest.body = JSON.stringify(imagenRequest.body);

      RSM_IMAGEN.performApiRequest(submitApiRequest, (response) => {
        if (response.statusCode == 1) {
          try {
            let bodyJson = JSON.parse(
              response.body
            ) as GoogleGenAITypes.Imagen.ImagenResponse;
            resolve(bodyJson);
          } catch (parseError) {
            reject(
              new Error("Failed to parse Imagen API response: " + parseError)
            );
          }
        } else {
          print("Imagen API Error: " + response.body);
          reject(new Error(response.body));
        }
      });
    });
  }
}
