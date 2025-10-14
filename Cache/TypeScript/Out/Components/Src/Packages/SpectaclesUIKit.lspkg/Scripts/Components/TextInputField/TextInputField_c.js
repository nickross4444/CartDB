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
// @input int _renderOrder
// @input vec3 _size = {6,3,3} {"hint":"Size of the element in centimeters"}
// @input bool _inactive {"hint":"Inactive Mode: set the element to ignore inputs"}
// @input bool _playAudio {"label":"Play Audio", "hint":"Play audio on interaction"}
// @input string inputType = "default" {"widget":"combobox", "values":[{"label":"Default", "value":"default"}, {"label":"Numeric", "value":"numeric"}, {"label":"Password", "value":"password"}, {"label":"Pin", "value":"pin"}]}
// @input string formatType = "date" {"widget":"combobox", "values":[{"label":"Date", "value":"date"}, {"label":"Email", "value":"email"}, {"label":"URL", "value":"url"}], "showIf":"inputType", "showIfValue":"format"}
// @input string placeholderText {"hint":"Text that is displayed before any text is entered"}
// @input Asset.Font fontFamily {"hint":"Font Family"}
// @input bool useIcon {"hint":"Use an icon?"}
// @input Asset.Texture icon {"hint":"Icon Texture", "showIf":"useIcon", "showIfValue":true}
// @input bool changeIconOnFocus {"hint":"Switch to a different icon on focus", "showIf":"useIcon"}
// @input Asset.Texture alternateIcon {"hint":"Alternate icon used on focus", "showIf":"changeIconOnFocus", "showIfValue":true}
// @input bool contentRequiredOnDeactivate {"hint":"Throw error if unfocused with no input"}
// @input bool addCallbacks {"hint":"Enable this to add functions from another script to this component's callbacks"}
// @input Callback[] onTextChangedCallbacks = {} {"label":"On Text Changed Callbacks", "showIf":"addCallbacks"}
// @input Callback[] onKeyboardStateChangedCallbacks = {} {"label":"On Keyboard State Changed Callbacks", "showIf":"addCallbacks"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/TextInputField/TextInputField");
Object.setPrototypeOf(script, Module.TextInputField.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_inactive", []);
    checkUndefined("_playAudio", []);
    checkUndefined("inputType", []);
    checkUndefined("formatType", [["inputType","format"]]);
    checkUndefined("placeholderText", []);
    checkUndefined("useIcon", []);
    checkUndefined("changeIconOnFocus", [["useIcon",true]]);
    checkUndefined("alternateIcon", [["changeIconOnFocus",true]]);
    checkUndefined("contentRequiredOnDeactivate", []);
    checkUndefined("addCallbacks", []);
    checkUndefined("onTextChangedCallbacks", [["addCallbacks",true]]);
    checkUndefined("onKeyboardStateChangedCallbacks", [["addCallbacks",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
