"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiLiveWebsocket = exports.Gemini = void 0;
const RemoteServiceGatewayCredentials_1 = require("../RemoteServiceGatewayCredentials");
const Event_1 = require("../Utils/Event");
const RSM_GEMINISYNC = requireAsset("./RemoteServiceModules/Gemini_Sync.remoteServiceModule");
const RSM_GEMINILIVE = requireAsset("./RemoteServiceModules/Gemini_Live.remoteServiceModule");
class Gemini {
    /**
     * Performs a synchronous request to the Gemini API to generate content.
     * @param geminiRequest The request object containing the model and content generation parameters.
     * @returns A promise that resolves with the Gemini content generation response.
     * @link https://ai.google.dev/api/generate-content
     */
    static models(geminiRequest) {
        return new Promise((resolve, reject) => {
            var submitApiRequest = RemoteApiRequest.create();
            let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Google);
            submitApiRequest.endpoint = "models";
            submitApiRequest.parameters = {
                "api-token": apiToken,
                model: geminiRequest.model,
                type: geminiRequest.type,
            };
            let textBody = JSON.stringify(geminiRequest.body);
            submitApiRequest.body = textBody;
            RSM_GEMINISYNC.performApiRequest(submitApiRequest, (response) => {
                if (response.statusCode == 1) {
                    let bodyJson = JSON.parse(response.body);
                    resolve(bodyJson);
                }
                else {
                    print("Error: " + response.body);
                    reject(response.body);
                }
            });
        });
    }
    /**
     * Creates a live connection to the Gemini API for real-time interactions.
     * @returns An instance of GeminiLiveWebsocket for managing the live connection.
     * @link https://ai.google.dev/api/live
     */
    static liveConnect() {
        return new GeminiLiveWebsocket();
    }
}
exports.Gemini = Gemini;
class GeminiLiveWebsocket {
    constructor() {
        /**
         * Event triggered when a message is received from the Gemini live API.
         * @type {Event<GoogleGenAI.Gemini.Live.ServerMessage>}
         */
        this.onMessage = new Event_1.default();
        this.onError = new Event_1.default();
        this.onOpen = new Event_1.default();
        this.onClose = new Event_1.default();
        this.connect();
    }
    connect() {
        let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Google);
        this._websocket = RSM_GEMINILIVE.createAPIWebSocket("live_api", {
            "api-token": apiToken,
        });
        this._websocket.addEventListener("error", (event) => {
            this.onError.invoke(event);
        });
        this._websocket.addEventListener("message", (event) => {
            let messageData = event.data.toString();
            let parsedMessage = JSON.parse(messageData);
            this.onMessage.invoke(parsedMessage);
        });
        this._websocket.addEventListener("open", (event) => {
            this.onOpen.invoke(event);
        });
        this._websocket.addEventListener("close", (event) => {
            this.onClose.invoke(event);
        });
    }
    /**
     * Sends a message to the Gemini live API.
     * @param message The message to send, formatted as a GoogleGenAI.Gemini.Live.ClientMessage.
     */
    send(message) {
        if (this._websocket.readyState == WebSocketReadyState.OPEN) {
            this._websocket.send(JSON.stringify(message));
        }
    }
    /**
     * Overrides the default send method to allow sending raw messages.
     * @param message The raw message to send.
     */
    overrideSend(message) {
        if (this._websocket.readyState == WebSocketReadyState.OPEN) {
            this._websocket.send(message);
        }
    }
    /**
     * Checks if the WebSocket connection is currently connected.
     * @returns {boolean} True if the WebSocket is connected, false otherwise.
     */
    isConnected() {
        return this._websocket.readyState == WebSocketReadyState.OPEN;
    }
    /**
     * Closes the WebSocket connection.
     */
    close() {
        this._websocket.close();
    }
}
exports.GeminiLiveWebsocket = GeminiLiveWebsocket;
var WebSocketReadyState;
(function (WebSocketReadyState) {
    WebSocketReadyState[WebSocketReadyState["CONNECTING"] = 0] = "CONNECTING";
    WebSocketReadyState[WebSocketReadyState["OPEN"] = 1] = "OPEN";
    WebSocketReadyState[WebSocketReadyState["CLOSING"] = 2] = "CLOSING";
    WebSocketReadyState[WebSocketReadyState["CLOSED"] = 3] = "CLOSED";
})(WebSocketReadyState || (WebSocketReadyState = {}));
//# sourceMappingURL=Gemini.js.map