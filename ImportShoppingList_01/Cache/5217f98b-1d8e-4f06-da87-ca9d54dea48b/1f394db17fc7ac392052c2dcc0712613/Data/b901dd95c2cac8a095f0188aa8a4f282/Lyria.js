"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lyria = void 0;
const RemoteServiceGatewayCredentials_1 = require("../RemoteServiceGatewayCredentials");
const RSM_LYRIA = requireAsset("./RemoteServiceModules/Lyria_Sync.remoteServiceModule");
/**
 * Lyria API client for music and vocal generation
 * @link https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/lyria
 */
class Lyria {
    /**
     * Perform a generic Lyria API request
     * @private
     * @param lyriaRequest The Lyria request object
     * @returns A promise that resolves with the Lyria response
     */
    static performLyriaRequest(lyriaRequest) {
        return new Promise((resolve, reject) => {
            const submitApiRequest = RemoteApiRequest.create();
            let apiToken;
            try {
                apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Google);
            }
            catch (error) {
                reject(new Error("Lyria API token not configured. Please configure credentials for Lyria API."));
                return;
            }
            submitApiRequest.endpoint = "lyria";
            submitApiRequest.parameters = {
                "api-token": apiToken,
                model: lyriaRequest.model,
                type: lyriaRequest.type,
            };
            let textBody = JSON.stringify(lyriaRequest.body);
            submitApiRequest.body = textBody;
            RSM_LYRIA.performApiRequest(submitApiRequest, (response) => {
                if (response.statusCode == 1) {
                    try {
                        let bodyJson = JSON.parse(response.body);
                        resolve(bodyJson);
                    }
                    catch (parseError) {
                        reject(new Error("Failed to parse Lyria API response: " + parseError));
                    }
                }
                else {
                    print("Lyria API Error: " + response.body);
                    print("Status code: " + response.statusCode);
                    reject(new Error(response.body));
                }
            });
        });
    }
}
exports.Lyria = Lyria;
//# sourceMappingURL=Lyria.js.map