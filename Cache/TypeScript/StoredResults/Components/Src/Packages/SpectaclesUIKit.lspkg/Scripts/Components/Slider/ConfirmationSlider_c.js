if (script.onAwake) {
    script.onAwake();
    return;
}
/*
@typedef Callback
@property {Component.ScriptComponent} scriptComponent
@property {string} functionName
*/
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
// @input int _renderOrder
// @input vec3 _size = {6,3,3} {"hint":"Size of the element in centimeters"}
// @input bool _inactive {"hint":"Inactive Mode: set the element to ignore inputs"}
// @input bool _playAudio {"label":"Play Audio", "hint":"Play audio on interaction"}
// @input float _defaultValue {"hint":"The default value of the slider, should be between 0 and 1", "widget":"slider", "min":0, "max":1, "step":0.01}
// @input bool snapToTriggerPosition {"hint":"Enable triggering anywhere on the slider track to snap the knob to that position"}
// @input bool segmented {"hint":"Enable this to make the slider segmented, with a fixed number of segments"}
// @input float numberOfSegments = 5 {"hint":"The number of segments for the segmented slider, must be at least 2", "showIf":"segmented"}
// @input bool addCallbacks {"hint":"Enable this to add functions from another script to this component's callbacks"}
// @input Callback[] onValueChangeCallbacks = {} {"label":"On Value Changed Callbacks", "showIf":"addCallbacks"}
// @input Callback[] onFinishedCallbacks = {} {"label":"On Interaction Finished Callbacks", "showIf":"addCallbacks"}
// @input number _confirmationThreshold = "0.9"
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/Slider/ConfirmationSlider");
Object.setPrototypeOf(script, Module.ConfirmationSlider.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_inactive", []);
    checkUndefined("_playAudio", []);
    checkUndefined("_defaultValue", []);
    checkUndefined("snapToTriggerPosition", []);
    checkUndefined("segmented", []);
    checkUndefined("numberOfSegments", [["segmented",true]]);
    checkUndefined("addCallbacks", []);
    checkUndefined("onValueChangeCallbacks", [["addCallbacks",true]]);
    checkUndefined("onFinishedCallbacks", [["addCallbacks",true]]);
    checkUndefined("_confirmationThreshold", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
