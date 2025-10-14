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
// @ui {"hint":"Controls the appearance, size, and interaction behavior of the frame.", "widget":"group_start", "label":"Frame Settings"}
// @input bool autoShowHide = true {"hint":"When enabled, the frame automatically appears when hovered and hides when not being interacted with. Disable to manually control frame visibility."}
// @input string _appearance {"hint":"Preset appearance configurations for the frame. <br><br> <code>Large</code> is useful for <i>far-field</i> interactons. <br><br> While, <code>Small</code> is useful for <i>near-field</i> interactions", "widget":"combobox", "values":[{"label":"Large", "value":"Large"}, {"label":"Small", "value":"Small"}]}
// @input vec2 _innerSize = "{32,32}" {"hint":"Size of the frames's inner content area. In local space centimeters."}
// @input vec2 _padding = "{0,0}" {"hint":"Extra padding that maintains a fixed size in centimeters regardless of frame scaling, useful for toolbars and fixed-size UI elements. In local space centimeters."}
// @input bool allowScaling = true {"hint":"Enables interactive scaling of the frame via corner handles."}
// @input bool autoScaleContent = true {"hint":"Automatically scales child content when the frame is resized to maintain proportions."}
// @input bool relativeZ = true {"hint":"When enabled, Z-axis scaling of content will match X-axis scaling during frame resizing."}
// @input bool _onlyInteractOnBorder {"hint":"When enabled, only the borders are interactive for controlling the frame."}
// @input bool allowTranslation = true {"hint":"Enables moving the frame."}
// @input bool _cutOutCenter {"hint":"When enabled, creates a transparent center in the frame, allowing content behind the frame to be visible."}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"hint":"Sets the minimum and maximum dimensions that the frame can be resized to.", "widget":"group_start", "label":"Min/Max Size"}
// @input vec2 minimumSize = "{10,10}" {"hint":"Minimum dimensions that the frame can be resized to. In local space centimeters."}
// @input vec2 maximumSize = "{150,150}" {"hint":"Maximum dimensions that the frame can be resized to. In local space centimeters."}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"hint":"Controls how the frame automatically rotates to face the camera/user.", "widget":"group_start", "label":"Billboarding"}
// @input bool useBillboarding = true {"hint":"Enables the frame to automatically rotate to face the camera/user."}
// @input bool xOnTranslate = true {"hint":"When enabled, the frame rotates around the X-axis to face the user, but only during movement/translation unless xAlways is also enabled.", "showIf":"useBillboarding"}
// @input bool xAlways {"hint":"When enabled, the frame continuously rotates around the X-axis to face the user, regardless of movement.", "showIf":"xOnTranslate"}
// @input float xBufferDegrees {"hint":"A buffered degrees on the x-axis before the frame billboards to face the user.", "showIf":"xAlways"}
// @input bool yOnTranslate = true {"hint":"When enabled, the frame rotates around the Y-axis to face the user, but only during movement/translation unless yAlways is also enabled.", "showIf":"useBillboarding"}
// @input bool yAlways {"hint":"When enabled, the frame continuously rotates around the Y-axis to face the user, regardless of movement.", "showIf":"yOnTranslate"}
// @input float yBufferDegrees {"hint":"A buffered degrees on the y-axis before the frame billboards to face the user.", "showIf":"yAlways"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"hint":"Controls how the frame snaps to other frames or world features when moved.", "widget":"group_start", "label":"Snapping"}
// @input bool useSnapping {"hint":"Enables frame snapping functionality for automatic alignment to other frames or world features when moved."}
// @input bool itemSnapping {"hint":"Enables snapping to other frames when moving.", "showIf":"useSnapping"}
// @input bool worldSnapping {"hint":"Enables snapping to physical surfaces in the real-world environment when moving.", "showIf":"useSnapping"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"hint":"Controls whether the frame automatically follows the user's view when moving around.", "widget":"group_start", "label":"Follow Behavior"}
// @input bool _showFollowButton {"hint":"Shows a button that allows users to toggle whether the frame follows their view as they move."}
// @input bool useFollowBehavior {"label":"Use Built-In Follow Behavior", "hint":"When enabled, creates a follow behavior that keeps the frame in front of the user's view.", "showIf":"_showFollowButton"}
// @input bool _following {"hint":"Turns on the following. If this is set to true, it will begin following the user immediately.", "showIf":"useFollowBehavior"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"hint":"Controls whether a close button is displayed in the corner of the frame.", "widget":"group_start", "label":"Close Button"}
// @input bool _showCloseButton {"hint":"Shows a button that allows users to close or dismiss the frame."}
// @ui {"widget":"group_end"}
// @ui {"hint":"Settings for an interaction plane that extends around the frame.", "widget":"group_start", "label":"Interaction Plane"}
// @input bool _enableInteractionPlane = true {"hint":"Enables an Interaction Plane that creates a near-field targeting zone around the frame that improves precision when interacting with buttons and UI elements using hand tracking."}
// @input vec3 _interactionPlaneOffset = {0,0,0} {"hint":"Offset position for the interaction plane relative to the frame center.", "showIf":"_enableInteractionPlane"}
// @input vec2 _interactionPlanePadding = {0,0} {"hint":"Padding that extends the InteractionPlane size.", "showIf":"_enableInteractionPlane"}
// @input float _targetingVisual {"hint":"Sets the preferred targeting visual. (Requires the V2 Cursor to be enabled on InteractorCursors).\n\n- 0: None\n- 1: Cursor (default)\n- 2: Ray", "widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Cursor", "value":1}, {"label":"Ray", "value":2}], "showIf":"_enableInteractionPlane"}
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/Frame/Frame");
Object.setPrototypeOf(script, Module.Frame.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("autoShowHide", []);
    checkUndefined("_appearance", []);
    checkUndefined("_innerSize", []);
    checkUndefined("_padding", []);
    checkUndefined("allowScaling", []);
    checkUndefined("autoScaleContent", []);
    checkUndefined("relativeZ", []);
    checkUndefined("_onlyInteractOnBorder", []);
    checkUndefined("allowTranslation", []);
    checkUndefined("_cutOutCenter", []);
    checkUndefined("minimumSize", []);
    checkUndefined("maximumSize", []);
    checkUndefined("useBillboarding", []);
    checkUndefined("xOnTranslate", [["useBillboarding",true]]);
    checkUndefined("xAlways", [["xOnTranslate",true]]);
    checkUndefined("xBufferDegrees", [["xAlways",true]]);
    checkUndefined("yOnTranslate", [["useBillboarding",true]]);
    checkUndefined("yAlways", [["yOnTranslate",true]]);
    checkUndefined("yBufferDegrees", [["yAlways",true]]);
    checkUndefined("useSnapping", []);
    checkUndefined("itemSnapping", [["useSnapping",true]]);
    checkUndefined("worldSnapping", [["useSnapping",true]]);
    checkUndefined("_showFollowButton", []);
    checkUndefined("useFollowBehavior", [["_showFollowButton",true]]);
    checkUndefined("_following", [["useFollowBehavior",true]]);
    checkUndefined("_showCloseButton", []);
    checkUndefined("_enableInteractionPlane", []);
    checkUndefined("_interactionPlaneOffset", [["_enableInteractionPlane",true]]);
    checkUndefined("_interactionPlanePadding", [["_enableInteractionPlane",true]]);
    checkUndefined("_targetingVisual", [["_enableInteractionPlane",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
