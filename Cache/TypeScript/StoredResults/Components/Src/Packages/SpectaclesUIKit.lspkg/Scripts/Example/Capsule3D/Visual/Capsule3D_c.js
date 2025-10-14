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
// @input number _renderOrder = "0"
// @input vec2 _size = "{1,1}" {"hint":"Size of Capsule In Local Space Centimeters"}
// @input float _depth = 1 {"hint":"Depth of Capsule In Local Space Centimeters"}
// @input vec4 _backgroundColor = "{.8,.8,.8,1.}" {"widget":"color"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Example/Capsule3D/Visual/Capsule3D");
Object.setPrototypeOf(script, Module.Capsule3D.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_depth", []);
    checkUndefined("_backgroundColor", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
