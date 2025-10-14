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
// @input string storageBucket = "[Insert your bucket name]" {"hint":"Supabase Storage bucket name where assets are stored"}
// @input string modelFileName = "fox/scene.gltf" {"hint":"3D model filename in storage (e.g., 'fox/scene.gltf')"}
// @input string imageFileName = "images/spectacles.jpg" {"hint":"Image filename in storage (e.g., 'images/spectacles.jpg')"}
// @input string audioFileName = "audio/chill.mp3" {"hint":"Audio filename in storage (e.g., 'audio/chill.mp3')"}
// @input SceneObject cameraObject {"hint":"Camera object to use for positioning models in front of camera"}
// @input SceneObject modelParent {"hint":"Parent scene object for the loaded 3D model"}
// @input Component.Image imageDisplay {"hint":"Image component to display the loaded texture"}
// @input SceneObject audioPlayer {"hint":"Scene object with AudioComponent to play the loaded audio"}
// @input Asset.Material defaultMaterial {"hint":"Material to use for instantiated 3D models"}
// @input AssignableType_1 loadButton {"hint":"RectangleButton to trigger asset loading (from Spectacles UI Kit)"}
// @input bool enableProgressLogs = true {"hint":"Show loading progress in console"}
// @input bool enableDebugLogs = true {"hint":"Enable detailed debug logging"}
// @input float modelDistance = 100 {"hint":"Distance in front of camera to place model (in cm)", "widget":"slider", "min":50, "max":300, "step":10}
// @input float modelScale = 1 {"hint":"Scale factor for loaded models", "widget":"slider", "min":0.1, "max":5, "step":0.1}
// @input Component.Text statusText {"hint":"Text component to display loading status (optional)"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../Modules/Src/Assets/Examples/Example3-LoadAssets/StorageLoader");
Object.setPrototypeOf(script, Module.StorageLoader.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("snapCloudRequirements", []);
    checkUndefined("storageBucket", []);
    checkUndefined("modelFileName", []);
    checkUndefined("imageFileName", []);
    checkUndefined("audioFileName", []);
    checkUndefined("cameraObject", []);
    checkUndefined("modelParent", []);
    checkUndefined("imageDisplay", []);
    checkUndefined("audioPlayer", []);
    checkUndefined("defaultMaterial", []);
    checkUndefined("loadButton", []);
    checkUndefined("enableProgressLogs", []);
    checkUndefined("enableDebugLogs", []);
    checkUndefined("modelDistance", []);
    checkUndefined("modelScale", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
