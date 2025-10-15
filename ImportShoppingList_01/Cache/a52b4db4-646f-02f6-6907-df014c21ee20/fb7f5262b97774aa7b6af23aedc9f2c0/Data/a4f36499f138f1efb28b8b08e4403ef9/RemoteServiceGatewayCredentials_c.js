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
// @input string openAIToken = "[INSERT OPENAI TOKEN HERE]" {"label":"OpenAI Token"}
// @input string googleToken = "[INSERT GOOGLE TOKEN HERE]" {"label":"Google Token"}
// @input string snapToken = "[INSERT SNAP TOKEN HERE]" {"label":"Snap Token"}
// @ui {"widget":"label", "label":"<span style=\"color: red;\">⚠️ Do not include your API token when sharing or uploading this project to version control.</span>"}
// @ui {"widget":"label", "label":"For setup instructions, please visit: <a href=\"https://developers.snap.com/spectacles/about-spectacles-features/apis/remoteservice-gateway#setup-instructions\" target=\"_blank\">Remote Service Gateway Setup</a>"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../Modules/Src/Packages/RemoteServiceGateway.lspkg/RemoteServiceGatewayCredentials");
Object.setPrototypeOf(script, Module.RemoteServiceGatewayCredentials.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("openAIToken", []);
    checkUndefined("googleToken", []);
    checkUndefined("snapToken", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
