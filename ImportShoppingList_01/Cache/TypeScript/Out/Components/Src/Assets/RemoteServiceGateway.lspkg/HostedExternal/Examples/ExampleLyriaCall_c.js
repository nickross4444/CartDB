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
// @ui {"widget":"group_start", "label":"Music Generation Example"}
// @input string musicPrompt = "An energetic electronic dance track with a fast tempo" {"widget":"text_area"}
// @input string negativePrompt = "vocals, slow tempo" {"widget":"text_area"}
// @input float seed = 12345
// @input float sampleCount = 1
// @input bool generateMusicOnTap {"label":"Generate Music on tap"}
// @input AssignableType dynamicAudioOutput
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @ui {"widget":"group_start", "label":"Audio Output"}
// @input bool playAudioOnTap {"label":"Play Generated Audio"}
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
var Module = require("../../../../../../Modules/Src/Assets/RemoteServiceGateway.lspkg/HostedExternal/Examples/ExampleLyriaCall");
Object.setPrototypeOf(script, Module.ExampleLyriaCall.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("musicPrompt", []);
    checkUndefined("negativePrompt", []);
    checkUndefined("seed", []);
    checkUndefined("sampleCount", []);
    checkUndefined("generateMusicOnTap", []);
    checkUndefined("dynamicAudioOutput", []);
    checkUndefined("playAudioOnTap", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
