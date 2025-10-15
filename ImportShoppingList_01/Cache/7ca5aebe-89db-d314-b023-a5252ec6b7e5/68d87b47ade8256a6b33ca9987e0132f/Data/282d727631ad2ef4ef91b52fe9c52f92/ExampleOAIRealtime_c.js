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
// @ui {"widget":"label", "label":"Example of connecting to the OpenAI Realtime API. Change various settings in the inspector to customize!"}
// @ui {"widget":"separator"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Setup"}
// @input SceneObject websocketRequirementsObj
// @input AssignableType dynamicAudioOutput
// @input AssignableType_1 microphoneRecorder
// @input Component.Text textDisplay
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Inputs"}
// @input string instructions = "You are a helpful assistant that loves to make puns" {"widget":"text_area"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Outputs"}
// @ui {"widget":"label", "label":"<span style=\"color: yellow;\">⚠️ To prevent audio feedback loop in Lens Studio Editor, use headphones or manage your microphone input.</span>"}
// @input bool audioOutput
// @input string voice = "coral" {"widget":"combobox", "values":[{"label":"alloy", "value":"alloy"}, {"label":"ash", "value":"ash"}, {"label":"ballad", "value":"ballad"}, {"label":"coral", "value":"coral"}, {"label":"echo", "value":"echo"}, {"label":"sage", "value":"sage"}, {"label":"shimmer", "value":"shimmer"}, {"label":"verse", "value":"verse"}], "showIf":"audioOutput", "showIfValue":true}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../Modules/Src/Packages/RemoteServiceGateway.lspkg/HostedExternal/Examples/ExampleOAIRealtime");
Object.setPrototypeOf(script, Module.ExampleOAIRealtime.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("websocketRequirementsObj", []);
    checkUndefined("dynamicAudioOutput", []);
    checkUndefined("microphoneRecorder", []);
    checkUndefined("textDisplay", []);
    checkUndefined("instructions", []);
    checkUndefined("audioOutput", []);
    checkUndefined("voice", [["audioOutput",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
