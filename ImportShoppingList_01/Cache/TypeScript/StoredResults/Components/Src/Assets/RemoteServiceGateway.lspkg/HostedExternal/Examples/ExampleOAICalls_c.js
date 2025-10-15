if (script.onAwake) {
    script.onAwake();
    return;
}
function checkUndefined(property, showIfData) {
    for (var i = 0; i < showIfData.length; i++) {
        if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]) {
            return;
        }
    }
    if (script[property] == undefined) {
        throw new Error("Input " + property + " was not provided for the object " + script.getSceneObject().name);
    }
}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Chat Completions Example"}
// @input Component.Text textDisplay
// @input string systemPrompt = "You are an incredibly smart but witty AI assistant who likes to answer life's greatest mysteries in under two sentences" {"widget":"text_area"}
// @input string userPrompt = "Is a hotdog a sandwich" {"widget":"text_area"}
// @input bool doChatCompletionsOnTap {"label":"Run On Tap"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Image Generation Example"}
// @input SceneObject imgObject
// @input string imageGenerationPrompt = "The future of augmented reality" {"widget":"text_area"}
// @input bool generateImageOnTap {"label":"Run On Tap"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Image Edit Example"}
// @input Asset.Texture editBaseImg
// @input Asset.Texture editMaskImg
// @input SceneObject editResultObject
// @input string imageEditPrompt = "Add a cat into the image" {"widget":"text_area"}
// @input bool doEditImageOnTap {"label":"Run On Tap"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Voice Generation Example"}
// @input string voiceGenerationPrompt = "Get ready for the future of augmented reality with Lens Studio!" {"widget":"text_area"}
// @input string voiceGenerationInstructions = "Serious, movie trailer voice, insert pauses for dramatic effect" {"widget":"text_area"}
// @input bool generateVoiceOnTap {"label":"Run On Tap"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Function Calling Example"}
// @input string functionCallingPrompt = "Make the text display yellow" {"widget":"text_area"}
// @input bool doFunctionCallingOnTap {"label":"Run On Tap"}
// @ui {"widget":"group_end"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../Modules/Src/Assets/RemoteServiceGateway.lspkg/HostedExternal/Examples/ExampleOAICalls");
Object.setPrototypeOf(script, Module.ExampleOAICalls.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("textDisplay", []);
    checkUndefined("systemPrompt", []);
    checkUndefined("userPrompt", []);
    checkUndefined("doChatCompletionsOnTap", []);
    checkUndefined("imgObject", []);
    checkUndefined("imageGenerationPrompt", []);
    checkUndefined("generateImageOnTap", []);
    checkUndefined("editBaseImg", []);
    checkUndefined("editMaskImg", []);
    checkUndefined("editResultObject", []);
    checkUndefined("imageEditPrompt", []);
    checkUndefined("doEditImageOnTap", []);
    checkUndefined("voiceGenerationPrompt", []);
    checkUndefined("voiceGenerationInstructions", []);
    checkUndefined("generateVoiceOnTap", []);
    checkUndefined("functionCallingPrompt", []);
    checkUndefined("doFunctionCallingOnTap", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
