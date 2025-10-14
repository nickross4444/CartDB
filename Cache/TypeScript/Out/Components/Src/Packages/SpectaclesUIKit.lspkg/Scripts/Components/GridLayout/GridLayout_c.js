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
// @input int rows = 3 {"hint":"Number of Rows"}
// @input int columns = 2 {"hint":"Number of Columns"}
// @input vec2 cellSize = "{32,32}" {"hint":"Size of a single cell in local space"}
// @input vec4 cellPadding = "{0,0,0,0}" {"hint":"<p>Add'l size added to a given side of a cell.</p><p>Clockwise from left:</p><code> Left, Top, Right, Bottom </code>"}
// @input number layoutBy = "0" {"hint":"<h3>Layout by Row:</h3><p>start at top left, layout top row, then second from top row, etc. Overflows vertically. </p> <h3>Layout by Column:</h3> <p>start at top left, layout left column, then second from left column, etc. Overflows horizontally.</p>", "widget":"combobox", "values":[{"label":"Row", "value":0}, {"label":"Column", "value":1}]}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Packages/SpectaclesUIKit.lspkg/Scripts/Components/GridLayout/GridLayout");
Object.setPrototypeOf(script, Module.GridLayout.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("rows", []);
    checkUndefined("columns", []);
    checkUndefined("cellSize", []);
    checkUndefined("cellPadding", []);
    checkUndefined("layoutBy", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
