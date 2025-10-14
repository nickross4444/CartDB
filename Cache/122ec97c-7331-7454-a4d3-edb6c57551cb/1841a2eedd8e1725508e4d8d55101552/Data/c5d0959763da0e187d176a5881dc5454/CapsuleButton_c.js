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
// @input bool _inactive {"hint":"Inactive Mode: set the element to ignore inputs"}
// @input bool _playAudio {"label":"Play Audio", "hint":"Play audio on interaction"}
// @input string _style {"widget":"combobox", "values":[{"label":"PrimaryNeutral", "value":"PrimaryNeutral"}, {"label":"Primary", "value":"Primary"}, {"label":"Secondary", "value":"Secondary"}, {"label":"Special", "value":"Special"}, {"label":"Ghost", "value":"Ghost"}]}
// @input bool _toggleable
// @input bool _defaultToOn {"hint":"The default state of the Toggle", "showIf":"_toggleable"}
// @input bool addCallbacks {"hint":"Enable this to add functions from another script to this component's callbacks"}
// @ui {"widget":"group_start", "label":"Callbacks", "showIf":"addCallbacks"}
// @input Callback[] triggerUpCallbacks = {} {"label":"On Trigger Up Callbacks"}
// @input Callback[] triggerDownCallbacks = {} {"label":"On Trigger Down Callbacks"}
// @input Callback[] onValueChangeCallbacks = {} {"label":"On Value Changed Callbacks", "showIf":"_toggleable"}
// @input Callback[] onFinishedCallbacks = {} {"label":"On Finished Callbacks", "showIf":"_toggleable"}
// @ui {"widget":"group_end"}
// @input vec3 _size = {12,3,1}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/Button/CapsuleButton");
Object.setPrototypeOf(script, Module.CapsuleButton.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_inactive", []);
    checkUndefined("_playAudio", []);
    checkUndefined("_style", []);
    checkUndefined("_toggleable", []);
    checkUndefined("_defaultToOn", [["_toggleable",true]]);
    checkUndefined("addCallbacks", []);
    checkUndefined("triggerUpCallbacks", [["addCallbacks",true]]);
    checkUndefined("triggerDownCallbacks", [["addCallbacks",true]]);
    checkUndefined("onValueChangeCallbacks", [["addCallbacks",true],["_toggleable",true]]);
    checkUndefined("onFinishedCallbacks", [["addCallbacks",true],["_toggleable",true]]);
    checkUndefined("_size", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
