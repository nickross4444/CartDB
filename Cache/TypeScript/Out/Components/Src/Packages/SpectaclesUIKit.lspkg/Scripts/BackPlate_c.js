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
// @input vec2 _size = {10,10}
// @input string _style = "default" {"widget":"combobox", "values":[{"label":"Default", "value":"default"}, {"label":"Dark", "value":"dark"}, {"label":"Simple", "value":"simple"}]}
// @ui {"widget":"separator"}
// @ui {"hint":"Settings for an interaction plane that extends around the frame.", "widget":"group_start", "label":"Interaction Plane"}
// @input bool _enableInteractionPlane = true {"hint":"Enables an Interaction Plane that creates a near-field targeting zone around the frame that improves precision when interacting with buttons and UI elements using hand tracking."}
// @input vec3 _interactionPlaneOffset = {0,0,0} {"hint":"Offset position for the interaction plane relative to the frame center.", "showIf":"_enableInteractionPlane"}
// @input vec2 _interactionPlanePadding = {0,0} {"hint":"Padding that extends the InteractionPlane size.", "showIf":"_enableInteractionPlane"}
// @ui {"widget":"group_end"}
// @input float _targetingVisual {"hint":"Sets the preferred targeting visual. (Requires the V2 Cursor to be enabled on InteractorCursors).\n\n- 0: None\n- 1: Cursor (default)\n- 2: Ray", "widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Cursor", "value":1}, {"label":"Ray", "value":2}], "showIf":"_enableInteractionPlane"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/BackPlate");
Object.setPrototypeOf(script, Module.BackPlate.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_renderOrder", []);
    checkUndefined("_size", []);
    checkUndefined("_style", []);
    checkUndefined("_enableInteractionPlane", []);
    checkUndefined("_interactionPlaneOffset", [["_enableInteractionPlane",true]]);
    checkUndefined("_interactionPlanePadding", [["_enableInteractionPlane",true]]);
    checkUndefined("_targetingVisual", [["_enableInteractionPlane",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
