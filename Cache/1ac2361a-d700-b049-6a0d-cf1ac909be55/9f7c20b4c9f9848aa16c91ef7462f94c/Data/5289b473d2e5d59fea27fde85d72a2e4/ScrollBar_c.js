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
// @input string orientation = "Vertical" {"widget":"combobox", "values":[{"label":"Horizontal", "value":"Horizontal"}, {"label":"Vertical", "value":"Vertical"}]}
// @input AssignableType scrollWindow
// @input AssignableType_1 slider
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/ScrollBar");
Object.setPrototypeOf(script, Module.ScrollBar.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("orientation", []);
    checkUndefined("scrollWindow", []);
    checkUndefined("slider", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
