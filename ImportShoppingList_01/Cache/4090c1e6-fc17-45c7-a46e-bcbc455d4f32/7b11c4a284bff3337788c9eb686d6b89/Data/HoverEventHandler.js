//@input bool showHint
//@input SceneObject hintParent {"showIf" : "showHint"}
//@input vec2 leftRightPosition {"showIf" : "showHint"}
//@input string hintText {"showIf" : "showHint"}

let isCreated = false;
let hintObject = null;
let hoverIdx;
const delay = 0.5;

const interactionComp = script.getSceneObject().getComponent('Component.InteractionComponent');

let mainPass;

init();

function init() {
    mainPass = script.getSceneObject().getComponent("Component.Image").mainPass;
}

const delayedEvent = script.createEvent('DelayedCallbackEvent');
delayedEvent.bind(function() {
    checkHoverStatus();
});

interactionComp.onHoverStart.add(function() {
    if (script.showHint && script.hintText.length > 0) {
        if (!isCreated) {
            setUpHint();
        }
    }
    
    mainPass.Hover = true;

    if (script.showHint && hintObject) {
        hintObject.enabled = true;
        hoverIdx = global.hoverIdx;
        delayedEvent.enable = true;
        delayedEvent.reset(delay);
    }
});

interactionComp.onHoverEnd.add(function() {
    mainPass.Hover = false;
    if (script.showHint && hintObject) {
        hintObject.enabled = false;
    }
});

script.createEvent("OnDisableEvent").bind(function(){
    mainPass.Hover = false;
    if (hintObject) {
        hintObject.enabled = false;
    }
})

function checkHoverStatus() {
    if (hoverIdx != global.hoverIdx) {
        mainPass.Hover = false;
        if (script.showHint && hintObject) {
            hintObject.enabled = false;
        }
        delayedEvent.enable = false;
    } else {
        delayedEvent.reset(delay);
    }
}

function setUpHint() {
    isCreated = true;
    const newObj = script.hintParent.copyWholeHierarchyAndAssets(global.hintObject);
    const screenT = newObj.getComponent('Component.ScreenTransform');
    const anchors = screenT.anchors;
    anchors.left = script.leftRightPosition.x;
    anchors.right = script.leftRightPosition.y;

    const textComp = newObj.getChild(0).getComponent('Component.Text');
    textComp.text = script.hintText;

    hintObject = newObj;
}
