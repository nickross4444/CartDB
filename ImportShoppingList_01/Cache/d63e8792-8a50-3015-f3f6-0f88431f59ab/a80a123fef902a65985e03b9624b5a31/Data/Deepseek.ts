import { RemoteServiceGatewayCredentials, AvaliableApiTypes } from "../RemoteServiceGatewayCredentials";
import { DeepSeekTypes } from "./DeepSeekTypes";

const RSM_COMPLETIONS = requireAsset(
  "./RemoteServiceModules/Deepseek_Completions.remoteServiceModule"
) as RemoteServiceModule

/**
 * Early Access Feature - Get ahead with AI capabilities!
 * The DeepSeek class provides chat completion methods that may evolve as we enhance our AI offerings.
 */
export class DeepSeek {
    /**
     * Performs a chat completion request to Snap hosted DeepSeek API.
     * @param deepSeekRequest The request object containing the chat completion parameters.
     * @returns A promise that resolves with the chat completion response.
     * @link https://api-docs.deepseek.com/api/create-chat-completion
     */
    static chatCompletions(
        deepSeekRequest: DeepSeekTypes.ChatCompletions.Request
      ): Promise<DeepSeekTypes.ChatCompletions.Response> {
        return new Promise<DeepSeekTypes.ChatCompletions.Response>((resolve, reject) => {
          var submitApiRequest = RemoteApiRequest.create();
          let apiToken = RemoteServiceGatewayCredentials.getApiToken(
                AvaliableApiTypes.Snap
          );
          submitApiRequest.endpoint = "chat_completions";
          submitApiRequest.parameters = {
            "api-token": apiToken
          }
          let textBody = JSON.stringify(deepSeekRequest)
          submitApiRequest.body = textBody
        
          RSM_COMPLETIONS.performApiRequest(submitApiRequest, function (resp) {
            if (resp.statusCode == 1) {
              var bodyJson = JSON.parse(resp.body) as DeepSeekTypes.ChatCompletions.Response;
              resolve(bodyJson);
            } 
            else {
              reject(resp.body);
            }
          });
        });
    };
}