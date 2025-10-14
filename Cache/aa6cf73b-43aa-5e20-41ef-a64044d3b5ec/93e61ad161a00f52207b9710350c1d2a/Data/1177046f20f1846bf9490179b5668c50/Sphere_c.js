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
// @input float _radius = 4 {"hint":"Size of Sphere In Local Space Units"}
// @input vec4 _backgroundColor = "{.8,.8,.8,1.}" {"widget":"color"}
// @input Asset.Texture _icon
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Example/Sphere/Visual/Sphere");
Object.setPrototypeOf(script, Module.Sphere.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_radius", []);
    checkUndefined("_backgroundColor", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
