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
// @input bool _allowAllTogglesOff {"hint":"Is it allowed that no toggle is switched on?"}
// @input bool addCallbacks {"hint":"Enable this to add functions from another script to this component's callbacks"}
// @input Callback[] onToggleSelectedCallbacks = {} {"label":"On Toggle Selected Callbacks", "showIf":"addCallbacks"}
// @input AssignableType[] _switches = {}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/Toggle/SwitchToggleGroup");
Object.setPrototypeOf(script, Module.SwitchToggleGroup.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_allowAllTogglesOff", []);
    checkUndefined("addCallbacks", []);
    checkUndefined("onToggleSelectedCallbacks", [["addCallbacks",true]]);
    checkUndefined("_switches", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
