"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snap3D = void 0;
const RemoteServiceGatewayCredentials_1 = require("../RemoteServiceGatewayCredentials");
const Event_1 = require("../Utils/Event");
const Promisfy_1 = require("../Utils/Promisfy");
const RSM_GETSTATUS = requireAsset("./RemoteServiceModules/Snap3D_GetStatus.remoteServiceModule");
const RSM_SUBMIT = requireAsset("./RemoteServiceModules/Snap3D_Submit.remoteServiceModule");
const REMOTE_MEDIA_MODULE = require("LensStudio:RemoteMediaModule");
const REPEAT_SUBMIT_TIME = 0.25; // seconds
const INTERNET_MODULE = require("LensStudio:InternetModule");
/**
 * The Snap3D class can generate 3D assets from text prompts
 */
class Snap3D {
    static generateScript() {
        if (isNull(Snap3D.script)) {
            Snap3D.script = global.scene
                .createSceneObject("Snap3D")
                .createComponent("ScriptComponent");
        }
    }
    /**
     * Submits a Snap3D generation request which turns an id. Generation of 3D assets are not immediate and can be tracked using the `getStatus` method.
     *
     * This method sends a request to generate a 3D asset based on the provided request body.
     * Resolves with the task ID if the request is successful, or rejects with an error message if it fails.
     *
     * @param requestBody - The request body containing parameters for Snap3D asset generation.
     * @returns A Promise that resolves to the task ID string if successful.
     */
    static async submit(requestBody) {
        Snap3D.generateScript();
        return new Promise((resolve, reject) => {
            let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Snap);
            let submitApiRequest = RemoteApiRequest.create();
            submitApiRequest.endpoint = "submit";
            submitApiRequest.parameters = {
                "api-token": apiToken,
            };
            submitApiRequest.body = JSON.stringify({
                ...requestBody,
                use_case: "Spectacles",
            });
            RSM_SUBMIT.performApiRequest(submitApiRequest, (response) => {
                if (response.statusCode == 1) {
                    let responseBody = JSON.parse(response.body);
                    resolve(responseBody.task_id);
                }
                else {
                    reject(response.statusCode + ": " + response.body);
                }
            });
        });
    }
    /**
     * Retrieves the status of a Snap3D generation task.
     *
     * This method allows you to check the current status of a Snap3D asset generation request by providing the task ID.
     * It returns information about whether the task has completed, failed, or is still in progress.
     * If available, it also provides generated texture and GLTF assets associated with the request.
     *
     * @param requestBody - The request body containing the task ID for status checking.
     * @returns A Promise that resolves to the status response, including task state, error information, and any generated assets.
     */
    static async getStatus(requestBody) {
        Snap3D.generateScript();
        return new Promise((resolve, reject) => {
            let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Snap);
            let getStatusApiRequest = RemoteApiRequest.create();
            getStatusApiRequest.endpoint = "get_status";
            getStatusApiRequest.parameters = {
                "api-token": apiToken,
            };
            getStatusApiRequest.body = JSON.stringify(requestBody);
            RSM_GETSTATUS.performApiRequest(getStatusApiRequest, (response) => {
                if (response.statusCode == 1) {
                    let responseBody = JSON.parse(response.body);
                    if (responseBody.status === "failed") {
                        reject(responseBody.error_code + ": " + responseBody.error_msg);
                    }
                    else {
                        resolve(responseBody);
                    }
                }
                else {
                    reject(response.statusCode + ": " + response.body);
                }
            });
        });
    }
    static setTimeout(callback, time) {
        let delayedEvent = Snap3D.script.createEvent("DelayedCallbackEvent");
        delayedEvent.reset(time / 1000);
        delayedEvent.bind((eventData) => {
            callback();
        });
    }
    static promiseSetTimeout(time) {
        return new Promise((resolve) => {
            Snap3D.setTimeout(() => {
                resolve();
            }, time);
        });
    }
    static async repeatGetStatus(submitGetStatus) {
        let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Snap);
        let getStatusApiRequest = RemoteApiRequest.create();
        getStatusApiRequest.endpoint = "get_status";
        getStatusApiRequest.parameters = {
            "api-token": apiToken,
        };
        let getStatusRequestBody = {
            task_id: submitGetStatus.task_id,
        };
        getStatusApiRequest.body = JSON.stringify(getStatusRequestBody);
        let taskCompleted = false;
        while (!taskCompleted) {
            try {
                let response = await Promisfy_1.Promisfy.RemoteServiceModule.performApiRequest(RSM_GETSTATUS, getStatusApiRequest);
                if (response.statusCode != 1) {
                    taskCompleted = true;
                    submitGetStatus.status = "failed";
                    submitGetStatus.event.invoke([
                        "failed",
                        {
                            errorMsg: response.body,
                            errorCode: response.statusCode,
                        },
                    ]);
                    break;
                }
                let responseBody = JSON.parse(response.body);
                if (responseBody.status === "failed") {
                    taskCompleted = true;
                    submitGetStatus.status = "failed";
                    submitGetStatus.event.invoke([
                        "failed",
                        {
                            errorMsg: responseBody.error_msg,
                            errorCode: responseBody.error_code,
                        },
                    ]);
                    break;
                }
                if (responseBody.stage === "base_mesh_gen" &&
                    !submitGetStatus.texture) {
                    for (const artifact of responseBody.artifacts) {
                        if (artifact.artifact_type === "image") {
                            let imgUrl = artifact.url;
                            let httpRequest = RemoteServiceHttpRequest.create();
                            httpRequest.url = imgUrl;
                            let dynamicImgResource = await Promisfy_1.Promisfy.InternetModule.performHttpRequest(INTERNET_MODULE, httpRequest);
                            let texture;
                            try {
                                texture =
                                    await Promisfy_1.Promisfy.RemoteMediaModule.loadResourceAsImageTexture(REMOTE_MEDIA_MODULE, dynamicImgResource.asResource());
                                submitGetStatus.texture = texture;
                                submitGetStatus.status = "running";
                                let textureAssetData = {
                                    url: imgUrl,
                                    texture: texture,
                                };
                                submitGetStatus.event.invoke([
                                    artifact.artifact_type,
                                    textureAssetData,
                                ]);
                                break;
                            }
                            catch (error) {
                                submitGetStatus.status = "failed";
                                submitGetStatus.event.invoke([
                                    "failed",
                                    {
                                        errorMsg: error,
                                        errorCode: -1,
                                    },
                                ]);
                            }
                        }
                    }
                }
                else if (responseBody.stage === "refined_mesh_gen" &&
                    !submitGetStatus.baseMeshGltf) {
                    for (const artifact of responseBody.artifacts) {
                        if (artifact.artifact_type === "base_mesh") {
                            let baseMeshUrl = artifact.url;
                            let httpRequest = RemoteServiceHttpRequest.create();
                            httpRequest.url = baseMeshUrl;
                            let dynamicGltfResource = await Promisfy_1.Promisfy.InternetModule.performHttpRequest(INTERNET_MODULE, httpRequest);
                            try {
                                let gltfAsset = await Promisfy_1.Promisfy.RemoteMediaModule.loadResourceAsGltfAsset(REMOTE_MEDIA_MODULE, dynamicGltfResource.asResource());
                                submitGetStatus.baseMeshGltf = gltfAsset;
                                submitGetStatus.status = "running";
                                let gltfAssetData = {
                                    url: baseMeshUrl,
                                    gltfAsset: gltfAsset,
                                };
                                submitGetStatus.event.invoke([
                                    artifact.artifact_type,
                                    gltfAssetData,
                                ]);
                                break;
                            }
                            catch (error) {
                                submitGetStatus.status = "failed";
                                submitGetStatus.event.invoke([
                                    "failed",
                                    {
                                        errorMsg: error,
                                        errorCode: -1,
                                    },
                                ]);
                            }
                        }
                    }
                }
                else if (responseBody.status === "completed" &&
                    !submitGetStatus.refinedMeshGltf) {
                    for (const artifact of responseBody.artifacts) {
                        if (artifact.artifact_type === "refined_mesh") {
                            let refinedMeshUrl = artifact.url;
                            let httpRequest = RemoteServiceHttpRequest.create();
                            httpRequest.url = refinedMeshUrl;
                            let dynamicGltfResource = await Promisfy_1.Promisfy.InternetModule.performHttpRequest(INTERNET_MODULE, httpRequest);
                            try {
                                let gltfAsset = await Promisfy_1.Promisfy.RemoteMediaModule.loadResourceAsGltfAsset(REMOTE_MEDIA_MODULE, dynamicGltfResource.asResource());
                                taskCompleted = true;
                                submitGetStatus.refinedMeshGltf = gltfAsset;
                                submitGetStatus.status = "completed";
                                let gltfAssetData = {
                                    url: refinedMeshUrl,
                                    gltfAsset: gltfAsset,
                                };
                                submitGetStatus.event.invoke([
                                    artifact.artifact_type,
                                    gltfAssetData,
                                ]);
                                break;
                            }
                            catch (error) {
                                submitGetStatus.status = "failed";
                                submitGetStatus.event.invoke([
                                    "failed",
                                    {
                                        errorMsg: error,
                                        errorCode: -1,
                                    },
                                ]);
                            }
                        }
                    }
                }
            }
            catch (error) {
                submitGetStatus.status = "failed";
                submitGetStatus.event.invoke([
                    "failed",
                    {
                        errorMsg: error,
                        errorCode: -1,
                    },
                ]);
            }
            await Snap3D.promiseSetTimeout(REPEAT_SUBMIT_TIME);
        }
    }
    /**
     * Submits a Snap3D generation request and automatically tracks its status.
     *
     * This method sends a request to generate a 3D asset and returns an object containing the task ID,
     * current status, and an event that emits updates as the asset is processed.
     * The event will notify you when textures or GLTF assets are generated, or if the task fails.
     *
     * @param requestBody - The request body containing parameters for Snap3D asset generation.
     * @returns A Promise that resolves to a SubmitGetStatusResults object, which includes the task ID, status, and an event for tracking progress and results.
     */
    static async submitAndGetStatus(requestBody) {
        Snap3D.generateScript();
        return new Promise((resolve, reject) => {
            let apiToken = RemoteServiceGatewayCredentials_1.RemoteServiceGatewayCredentials.getApiToken(RemoteServiceGatewayCredentials_1.AvaliableApiTypes.Snap);
            let submitApiRequest = RemoteApiRequest.create();
            submitApiRequest.endpoint = "submit";
            submitApiRequest.parameters = {
                "api-token": apiToken,
            };
            submitApiRequest.body = JSON.stringify({
                ...requestBody,
                use_case: "Spectacles",
            });
            RSM_SUBMIT.performApiRequest(submitApiRequest, async (response) => {
                if (response.statusCode == 1) {
                    let responseBody = JSON.parse(response.body);
                    let submitGetStatus = {
                        task_id: responseBody.task_id,
                        status: "initialized",
                        event: new Event_1.default(),
                    };
                    resolve(submitGetStatus);
                    Snap3D.repeatGetStatus(submitGetStatus);
                }
                else {
                    reject(response.statusCode + ": " + response.body);
                }
            });
        });
    }
}
exports.Snap3D = Snap3D;
//# sourceMappingURL=Snap3D.js.map