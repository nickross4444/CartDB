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
// @input AssignableType snapCloudRequirements {"hint":"Reference to SnapCloudRequirements for centralized Supabase configuration"}
// @input string functionName = "[your-function-name]" {"hint":"Edge Function name (will use SnapCloudRequirements to build full URL)"}
// @input string imageUrl = "[Insert your Supabase storage URL]/storage/v1/object/public/[bucket-name]/[path-to-image]" {"hint":"Image URL from your Supabase Storage to process"}
// @input Component.Image outputImage {"hint":"Output image component to display processed result"}
// @input AssignableType_1 processButton {"hint":"RectangleButton to trigger Edge Function call (from Spectacles UI Kit)"}
// @input bool enableDebugLogs = true {"hint":"Enable debug logging"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../Modules/Src/Assets/Examples/Example4-EdgeFunctions/EdgeFunctionImgProcessing");
Object.setPrototypeOf(script, Module.EdgeFunctionImgProcessing.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("snapCloudRequirements", []);
    checkUndefined("functionName", []);
    checkUndefined("imageUrl", []);
    checkUndefined("outputImage", []);
    checkUndefined("processButton", []);
    checkUndefined("enableDebugLogs", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
