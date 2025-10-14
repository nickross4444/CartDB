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
// @input bool snapToTriggerPosition {"hint":"Enable triggering anywhere on the slider track to snap the knob to that position"}
// @input bool hasTrackVisual = true {"hint":"Enable this to show a fill on the track up to the knob position"}
// @input bool customKnobSize {"hint":"Enable this to customize the knob size"}
// @input vec2 _knobSize = {3,3} {"showIf":"customKnobSize"}
// @input bool addCallbacks {"hint":"Enable this to add functions from another script to this component's callbacks"}
// @input Callback[] onValueChangeCallbacks = {} {"label":"On Value Changed Callbacks", "showIf":"addCallbacks"}
// @input Callback[] onFinishedCallbacks = {} {"label":"On Interaction Finished Callbacks", "showIf":"addCallbacks"}
// @input int _defaultValue {"hint":"The default state of the switch", "widget":"combobox", "values":[{"label":"Off", "value":0}, {"label":"On", "value":1}]}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/Switch/Switch");
Object.setPrototypeOf(script, Module.Switch.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_inactive", []);
    checkUndefined("_playAudio", []);
    checkUndefined("snapToTriggerPosition", []);
    checkUndefined("hasTrackVisual", []);
    checkUndefined("customKnobSize", []);
    checkUndefined("_knobSize", [["customKnobSize",true]]);
    checkUndefined("addCallbacks", []);
    checkUndefined("onValueChangeCallbacks", [["addCallbacks",true]]);
    checkUndefined("onFinishedCallbacks", [["addCallbacks",true]]);
    checkUndefined("_defaultValue", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
