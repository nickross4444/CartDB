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
// @input string systemPrompt = "Give your reasoning in no more than one sentence." {"widget":"text_area"}
// @input string userPrompt = "Is a hotdog a sandwich" {"widget":"text_area"}
// @input bool runOnTap
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
var Module = require("../../../../../../Modules/Src/Assets/RemoteServiceGateway.lspkg/HostedSnap/Examples/ExampleDeepseekCalls");
Object.setPrototypeOf(script, Module.ExampleDeepseekCalls.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("textDisplay", []);
    checkUndefined("systemPrompt", []);
    checkUndefined("userPrompt", []);
    checkUndefined("runOnTap", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
