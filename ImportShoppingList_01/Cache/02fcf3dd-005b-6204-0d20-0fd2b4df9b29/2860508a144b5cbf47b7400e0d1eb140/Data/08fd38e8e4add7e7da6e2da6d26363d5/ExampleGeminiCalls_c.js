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
// @ui {"widget":"group_start", "label":"Text Generation Example"}
// @input Component.Text textDisplay
// @input string modelPrompt = "You are an incredibly smart but witty AI assistant who likes to answers life's greatest mysteries in under two sentences" {"widget":"text_area"}
// @input string textPrompt = "Is a hotdog a sandwich?" {"widget":"text_area"}
// @input bool doTextGenerationOnTap {"label":"Run On Tap"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Image Generation Example"}
// @input SceneObject imgObject
// @input string imageGenerationPrompt = "The future of augmented reality" {"widget":"text_area"}
// @input bool generateImageOnTap {"label":"Run On Tap"}
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
var Module = require("../../../../../../Modules/Src/Packages/RemoteServiceGateway.lspkg/HostedExternal/Examples/ExampleGeminiCalls");
Object.setPrototypeOf(script, Module.ExampleGeminiCalls.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("textDisplay", []);
    checkUndefined("modelPrompt", []);
    checkUndefined("textPrompt", []);
    checkUndefined("doTextGenerationOnTap", []);
    checkUndefined("imgObject", []);
    checkUndefined("imageGenerationPrompt", []);
    checkUndefined("generateImageOnTap", []);
    checkUndefined("functionCallingPrompt", []);
    checkUndefined("doFunctionCallingOnTap", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
