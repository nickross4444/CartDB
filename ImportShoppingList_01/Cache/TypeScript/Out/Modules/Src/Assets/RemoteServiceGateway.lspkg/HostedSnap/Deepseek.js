"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepSeek = void 0;
const RemoteServiceGatewayCredentials_1 = require("../RemoteServiceGatewayCredentials");
const RSM_COMPLETIONS = requireAsset("./RemoteServiceModules/Deepseek_Completions.remoteServiceModule");
/**
 * Early Access Feature - Get ahead with AI capabilities!
 * The DeepSeek class provides chat completion methods that may evolve as we enhance our AI offerings.
 */
class DeepSeek {
    /**
     * Performs a chat completion request to Snap hosted DeepSeek API.
     * @param deepSeekRequest The request object containing the chat completion parameters.
     * @returns A promise that resolves with the chat completion response.
     * @link https://api-docs.deepseek.com/api/create-chat-completion
     */
    static chatCompletions(deepSeekRequest) {
        return new Promise((resolve, reject) => {
            var submitApiRequest = RemoteApiRequest.create();
            let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Snap);
            submitApiRequest.endpoint = "chat_completions";
            submitApiRequest.parameters = {
                "api-token": apiToken
            };
            let textBody = JSON.stringify(deepSeekRequest);
            submitApiRequest.body = textBody;
            RSM_COMPLETIONS.performApiRequest(submitApiRequest, function (resp) {
                if (resp.statusCode == 1) {
                    var bodyJson = JSON.parse(resp.body);
                    resolve(bodyJson);
                }
                else {
                    reject(resp.body);
                }
            });
        });
    }
    ;
}
exports.DeepSeek = DeepSeek;
//# sourceMappingURL=Deepseek.js.map