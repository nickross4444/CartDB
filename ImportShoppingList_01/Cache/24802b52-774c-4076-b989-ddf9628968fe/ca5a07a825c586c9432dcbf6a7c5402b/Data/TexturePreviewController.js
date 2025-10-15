//@input SceneObject textureLeftSection
//@input SceneObject textureMiddleSection
//@input Component.ScriptComponent fovController
//@input SceneObject[] channelBackgroundObjects
//@input SceneObject[] mappingBackgroundObjects
//@input SceneObject[] mappingObjs
//@input Asset.Material[] texturePreviewMats

// channel value is changed to float because there's no int uniform in graph, all int will be cast to float.
let channelIdx = 0;
let mappingObjIdx = 0;
const channelBackgroundPass = [];
const mappingBackgroundPass = [];
const channelNames = ["red_channel", "green_channel", "blue_channel", "alpha_channel", "envmap_preview"]
let buttonStates = [true, true, true, true, false];
let texturePreviewPass;

function init() {

    script.channelBackgroundObjects.forEach(function(obj) {
        const pass = obj.getComponent('Component.Image').mainPass;
        channelBackgroundPass.push(pass);
    });

    script.mappingBackgroundObjects.forEach(function(obj) {
        const pass = obj.getComponent('Component.Image').mainPass;
        mappingBackgroundPass.push(pass);
    });

    texturePreviewPass = [];
    script.texturePreviewMats.forEach(function(material) {
        texturePreviewPass.push(material.mainPass);
    });
}

function show(newTexture) {
    reset();
    script.textureLeftSection.enabled = true;
    script.textureMiddleSection.enabled = true;
    texturePreviewPass[0].baseTex = newTexture;
    script.mappingObjs[mappingObjIdx].enabled = true;
}

function setChannelIdx(idx) {
    buttonStates[idx] = !buttonStates[idx];
    setChannelBackgroundColor(idx, buttonStates[idx]);
    texturePreviewPass[mappingObjIdx][channelNames[idx]] = buttonStates[idx];
}

function setChannelStates() {
    channelNames.forEach(function(channelName, idx) {
        texturePreviewPass[mappingObjIdx][channelName] = buttonStates[idx];
    })
}

function setButtonStates() {
    buttonStates.forEach(function(state, idx) {
        setChannelBackgroundColor(idx, state);
    })
}

function setMappingIndex(idx) {
    setMappingBackgroundColor(mappingObjIdx, false);
    script.mappingObjs[mappingObjIdx].enabled = false;
    mappingObjIdx = idx;
    setMappingBackgroundColor(mappingObjIdx, true);
    script.mappingObjs[mappingObjIdx].enabled = true;
    texturePreviewPass[mappingObjIdx].baseTex = texturePreviewPass[0].baseTex;
    setChannelStates();

    if (mappingObjIdx == 0 || mappingObjIdx == 2) {
        script.fovController.pause();
    } else {
        script.fovController.resume(true);
    }
}

function onChannelButtonTapped(idx) {
    setChannelIdx(idx);
}

function onMappingButtonTapped(idx) {
    setMappingIndex(idx);
}

function reset() {
    buttonStates = [true, true, true, true, false];
    setButtonStates();
    setMappingIndex(0);
    hideMappingObjs();
}

function setChannelBackgroundColor(idx, state) {
    channelBackgroundPass[idx].Active = state;
}

function setMappingBackgroundColor(idx, state) {
    mappingBackgroundPass[idx].Active = state;
}

function hideMappingObjs() {
    script.mappingObjs.forEach(function(obj) {
        obj.enabled = false;
    });
}

function hide() {
    hideMappingObjs();
    script.textureLeftSection.enabled = false;
    script.textureMiddleSection.enabled = false;
    script.fovController.resume();
}

init();

script.onChannelButtonTapped = onChannelButtonTapped;
script.onMappingButtonTapped = onMappingButtonTapped;
script.show = show;
script.hide = hide;
