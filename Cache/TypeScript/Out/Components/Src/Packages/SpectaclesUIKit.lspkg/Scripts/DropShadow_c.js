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
// @input int _renderOrder
// @input vec2 _size = {3,3}
// @input float _cornerRadius = 1.5
// @input vec4 color = "{.43,.43,.43,.15}" {"widget":"color"}
// @input float _spread = 0.5 {"widget":"slider", "min":0, "max":1}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/DropShadow");
Object.setPrototypeOf(script, Module.DropShadow.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_cornerRadius", []);
    checkUndefined("color", []);
    checkUndefined("_spread", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
