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
// @input string channelName = "[Insert your channel name]" {"hint":"Channel name for cursor synchronization"}
// @input AssignableType_1 toggleModeButton {"hint":"RectangleButton to toggle between broadcast and follow modes (from Spectacles UI Kit)"}
// @input SceneObject cursorObject {"hint":"The cursor object to track (broadcast) or move (follow)"}
// @input Component.Text modeText {"hint":"Text component to display current mode"}
// @input SceneObject statusText {"hint":"Text component to display detailed status and logs"}
// @input float broadcastInterval = 0.1 {"hint":"Broadcast interval in seconds (when in broadcast mode)", "widget":"slider", "min":0.05, "max":1, "step":0.05}
// @input float movementSpeed = 0.15 {"hint":"Movement speed/smoothing factor (when in follow mode)", "widget":"slider", "min":0.05, "max":1, "step":0.1}
// @input float movementScale = 1.5 {"hint":"Movement scale factor (when in follow mode)", "widget":"slider", "min":0.1, "max":50, "step":0.1}
// @input float cursorZPosition = -100 {"hint":"Z position for cursor (when in follow mode) - negative is away from camera", "widget":"slider", "min":-200, "max":10, "step":1}
// @input float heightOffset {"hint":"Height offset for the cursor object (when in follow mode)", "widget":"slider", "min":-2, "max":2, "step":0.1}
// @input float lsXRange = 50 {"hint":"Lens Studio X coordinate range (from -lsXRange to +lsXRange)", "widget":"slider", "min":10, "max":200, "step":1}
// @input float lsYRange = 30 {"hint":"Lens Studio Y coordinate range (from -lsYRange to +lsYRange)", "widget":"slider", "min":10, "max":200, "step":1}
// @input float coordinateScale = 10 {"hint":"Scale factor for coordinate conversion (broadcast mode)", "widget":"slider", "min":0.1, "max":50, "step":0.1}
// @input float perspectiveScale = 10 {"hint":"Perspective scaling factor (broadcast mode)", "widget":"slider", "min":0.1, "max":20, "step":0.1}
// @input bool invertX {"hint":"Invert X axis mapping"}
// @input bool invertY {"hint":"Invert Y axis mapping"}
// @input bool enableDebugLogs = true {"hint":"Show debug information in console"}
// @input bool verboseLogging {"hint":"Show coordinate values in every broadcast log"}
// @input float logFrequency = 10 {"hint":"Log broadcast frequency (every N broadcasts)", "widget":"slider", "min":1, "max":100, "step":1}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../Modules/Src/Assets/Examples/Example2-RealTimeCursor/RealtimeCursor");
Object.setPrototypeOf(script, Module.RealtimeCursor.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("snapCloudRequirements", []);
    checkUndefined("channelName", []);
    checkUndefined("cursorObject", []);
    checkUndefined("modeText", []);
    checkUndefined("statusText", []);
    checkUndefined("broadcastInterval", []);
    checkUndefined("movementSpeed", []);
    checkUndefined("movementScale", []);
    checkUndefined("cursorZPosition", []);
    checkUndefined("heightOffset", []);
    checkUndefined("lsXRange", []);
    checkUndefined("lsYRange", []);
    checkUndefined("coordinateScale", []);
    checkUndefined("perspectiveScale", []);
    checkUndefined("invertX", []);
    checkUndefined("invertY", []);
    checkUndefined("enableDebugLogs", []);
    checkUndefined("verboseLogging", []);
    checkUndefined("logFrequency", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
