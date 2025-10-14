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
// @input vec2 _size = "{1,1}" {"hint":"Size of Rectangle In Local Space Centimeters"}
// @input float _cornerRadius = "1" {"hint":"Radius of rounding in Local Space Centimeters"}
// @input bool _gradient {"hint":"Enable background gradient"}
// @input vec4 _backgroundColor = "{.8,.8,.8,1.}" {"hint":"Solid color of background if not using gradient", "widget":"color", "showIf":"_gradient", "showIfValue":false}
// @input bool _useTexture {"hint":"Enable background texture", "showIf":"_gradient", "showIfValue":false}
// @input Asset.Texture _texture {"hint":"Background texture asset", "showIf":"_useTexture", "showIfValue":true}
// @input string _textureMode = "Stretch" {"hint":"Display mode for background texture.", "widget":"combobox", "values":[{"label":"Stretch", "value":"Stretch"}, {"label":"Fill Height", "value":"Fill Height"}, {"label":"Fill Width", "value":"Fill Width"}], "showIf":"_useTexture", "showIfValue":true}
// @input string _textureWrap = "None" {"hint":"Wrap mode for background texture.", "widget":"combobox", "values":[{"label":"None", "value":"None"}, {"label":"Repeat", "value":"Repeat"}, {"label":"Clamp", "value":"Clamp"}], "showIf":"_useTexture", "showIfValue":true}
// @input string _gradientType = "Linear" {"hint":"Gradient type: either Linear or Radial", "widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Radial", "value":"Radial"}, {"label":"Rectangle", "value":"Rectangle"}], "showIf":"_gradient", "showIfValue":true}
// @input vec2 _gradientStartPosition = "{-1,-1}" {"hint":"Start Position for gradient. Use to define ratio of gradient stop percents.", "showIf":"_gradient", "showIfValue":true}
// @input vec2 _gradientEndPosition = "{1,1}" {"hint":"End Position for gradient. Use to define ratio of gradient stop percents.", "showIf":"_gradient", "showIfValue":true}
// @input vec4 _gradientColor0 = "{.5,.5,.5,1}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_gradient", "showIfValue":true}
// @input number _gradientPercent0 = "0" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_gradient", "showIfValue":true}
// @input vec4 _gradientColor1 = "{.75,.75,.7,1}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_gradient", "showIfValue":true}
// @input number _gradientPercent1 = "0" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_gradient", "showIfValue":true}
// @input bool _gradientStop2 {"hint":"Enable or disable this stop.", "showIf":"_gradient", "showIfValue":true}
// @input vec4 _gradientColor2 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_gradientStop2", "showIfValue":true}
// @input number _gradientPercent2 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_gradientStop2", "showIfValue":true}
// @input bool _gradientStop3 {"hint":"Enable or disable this stop.", "showIf":"_gradientStop2", "showIfValue":true}
// @input vec4 _gradientColor3 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_gradientStop3", "showIfValue":true}
// @input number _gradientPercent3 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_gradientStop3", "showIfValue":true}
// @input bool _gradientStop4 {"hint":"Enable or disable this stop.", "showIf":"_gradientStop3", "showIfValue":true}
// @input vec4 _gradientColor4 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_gradientStop4", "showIfValue":true}
// @input number _gradientPercent4 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_gradientStop4", "showIfValue":true}
// @input bool _gradientStop5 {"hint":"Enable or disable this stop.", "showIf":"_gradientStop4", "showIfValue":true}
// @input vec4 _gradientColor5 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_gradientStop5", "showIfValue":true}
// @input number _gradientPercent5 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_gradientStop5", "showIfValue":true}
// @input bool _border {"hint":"Enable or disable inset border."}
// @input float _borderSize = ".2" {"hint":"Border thickness in centimeters in Local Space.", "showIf":"_border", "showIfValue":true}
// @input string _borderType = "Color" {"hint":"Type of border fill. Either solid Color or Gradient.", "widget":"combobox", "values":[{"label":"Color", "value":"Color"}, {"label":"Gradient", "value":"Gradient"}], "showIf":"_border", "showIfValue":true}
// @input vec4 _borderColor = "{.8,.8,.8,1.}" {"hint":"Color of border when set to Color type.", "widget":"color", "showIf":"_border", "showIfValue":true}
// @input string _borderGradientType = "Linear" {"hint":"Type of gradient. Either Linear or Radial.", "widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Radial", "value":"Radial"}, {"label":"Rectangle", "value":"Rectangle"}], "showIf":"_borderType", "showIfValue":"Gradient"}
// @input vec2 _borderGradientStartPosition = "{-1,-1}" {"hint":"Start Position for border gradient. Use to define ratio of gradient stop percents.", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input vec2 _borderGradientEndPosition = "{1,1}" {"hint":"End Position for border gradient. Use to define ratio of gradient stop percents.", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input vec4 _borderGradientColor0 = "{.5,.5,.5,1}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input number _borderGradientPercent0 = "0" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input vec4 _borderGradientColor1 = "{.75,.75,.7,1}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input number _borderGradientPercent1 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input bool _borderGradientStop2 {"hint":"Enable or disable this stop.", "showIf":"_borderType", "showIfValue":"Gradient"}
// @input vec4 _borderGradientColor2 = "{.9,.9,.8,1}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_borderGradientStop2", "showIfValue":true}
// @input number _borderGradientPercent2 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_borderGradientStop2", "showIfValue":true}
// @input bool _borderGradientStop3 {"hint":"Enable or disable this stop.", "showIf":"_borderGradientStop2", "showIfValue":true}
// @input vec4 _borderGradientColor3 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_borderGradientStop3", "showIfValue":true}
// @input number _borderGradientPercent3 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_borderGradientStop3", "showIfValue":true}
// @input bool _borderGradientStop4 {"hint":"Enable or disable this stop.", "showIf":"_borderGradientStop3", "showIfValue":true}
// @input vec4 _borderGradientColor4 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_borderGradientStop4", "showIfValue":true}
// @input number _borderGradientPercent4 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_borderGradientStop4", "showIfValue":true}
// @input bool _borderGradientStop5 {"hint":"Enable or disable this stop.", "showIf":"_borderGradientStop4", "showIfValue":true}
// @input vec4 _borderGradientColor5 = "{0,0,0,0}" {"hint":"Color for this stop.", "widget":"color", "showIf":"_borderGradientStop5", "showIfValue":true}
// @input number _borderGradientPercent5 = "1" {"hint":"Percent position within gradient that it fully reaches this stop color.", "showIf":"_borderGradientStop5", "showIfValue":true}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle");
Object.setPrototypeOf(script, Module.RoundedRectangle.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_cornerRadius", []);
    checkUndefined("_gradient", []);
    checkUndefined("_backgroundColor", [["_gradient",false]]);
    checkUndefined("_useTexture", [["_gradient",false]]);
    checkUndefined("_texture", [["_useTexture",true]]);
    checkUndefined("_textureMode", [["_useTexture",true]]);
    checkUndefined("_textureWrap", [["_useTexture",true]]);
    checkUndefined("_gradientType", [["_gradient",true]]);
    checkUndefined("_gradientStartPosition", [["_gradient",true]]);
    checkUndefined("_gradientEndPosition", [["_gradient",true]]);
    checkUndefined("_gradientColor0", [["_gradient",true]]);
    checkUndefined("_gradientPercent0", [["_gradient",true]]);
    checkUndefined("_gradientColor1", [["_gradient",true]]);
    checkUndefined("_gradientPercent1", [["_gradient",true]]);
    checkUndefined("_gradientStop2", [["_gradient",true]]);
    checkUndefined("_gradientColor2", [["_gradientStop2",true]]);
    checkUndefined("_gradientPercent2", [["_gradientStop2",true]]);
    checkUndefined("_gradientStop3", [["_gradientStop2",true]]);
    checkUndefined("_gradientColor3", [["_gradientStop3",true]]);
    checkUndefined("_gradientPercent3", [["_gradientStop3",true]]);
    checkUndefined("_gradientStop4", [["_gradientStop3",true]]);
    checkUndefined("_gradientColor4", [["_gradientStop4",true]]);
    checkUndefined("_gradientPercent4", [["_gradientStop4",true]]);
    checkUndefined("_gradientStop5", [["_gradientStop4",true]]);
    checkUndefined("_gradientColor5", [["_gradientStop5",true]]);
    checkUndefined("_gradientPercent5", [["_gradientStop5",true]]);
    checkUndefined("_border", []);
    checkUndefined("_borderSize", [["_border",true]]);
    checkUndefined("_borderType", [["_border",true]]);
    checkUndefined("_borderColor", [["_border",true]]);
    checkUndefined("_borderGradientType", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientStartPosition", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientEndPosition", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientColor0", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientPercent0", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientColor1", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientPercent1", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientStop2", [["_borderType","Gradient"]]);
    checkUndefined("_borderGradientColor2", [["_borderGradientStop2",true]]);
    checkUndefined("_borderGradientPercent2", [["_borderGradientStop2",true]]);
    checkUndefined("_borderGradientStop3", [["_borderGradientStop2",true]]);
    checkUndefined("_borderGradientColor3", [["_borderGradientStop3",true]]);
    checkUndefined("_borderGradientPercent3", [["_borderGradientStop3",true]]);
    checkUndefined("_borderGradientStop4", [["_borderGradientStop3",true]]);
    checkUndefined("_borderGradientColor4", [["_borderGradientStop4",true]]);
    checkUndefined("_borderGradientPercent4", [["_borderGradientStop4",true]]);
    checkUndefined("_borderGradientStop5", [["_borderGradientStop4",true]]);
    checkUndefined("_borderGradientColor5", [["_borderGradientStop5",true]]);
    checkUndefined("_borderGradientPercent5", [["_borderGradientStop5",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
