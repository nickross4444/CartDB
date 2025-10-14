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
// @input Asset.SupabaseProject supabaseProject {"hint":"SupabaseProject asset from Asset Browser (created via Supabase Plugin)"}
// @input Component.Text text {"hint":"Text component to display warning messages (optional)"}
// @input bool disableWarningsWhenConfigured = true {"hint":"Disable warnings when requirements are properly set (auto-detected)"}
// @input bool showSetupInstructions = true {"hint":"Show detailed setup instructions in console"}
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
var Module = require("../../../../Modules/Src/Assets/Examples/SnapCloudRequirements");
Object.setPrototypeOf(script, Module.SnapCloudRequirements.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("disableWarningsWhenConfigured", []);
    checkUndefined("showSetupInstructions", []);
    checkUndefined("enableDebugLogs", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
