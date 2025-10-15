//@input SceneObject parent
//@input SceneObject leftSection
//@input SceneObject environmentIconObj
//@input SceneObject chevronIconObj

/*
@typedef LightData
@property {SceneObject} sceneObject
@property {bool} enabled
*/

//@input LightData[] light
//@input SceneObject[] iconBackgroundObjs
//@input Component.Image[] environmentIconBackgrounds
//@input SceneObject[] environmentCheckObjects

//@ui {"widget":"separator"}
//@input SceneObject environmentLightParent
//@input SceneObject envMapObj

/*
@typedef EnvironmentLightData
@property {Component.Texture} diffuseEnvMap
@property {Component.Texture} specularEnvMap
@property {float} exposure
*/

//@input EnvironmentLightData[] environmentLight

let envLighSource = null;
let environmentIconImage = null;
let chevronIconImage = null;
let echoparkIdx = 0;
const iconBackgroundImages = [];

init();

function init() {
    environmentIconImage = script.environmentIconObj.getComponent('Component.Image');
    chevronIconImage = script.chevronIconObj.getComponent('Component.Image');

    script.iconBackgroundObjs.forEach(function(obj) {
        const curImage = obj.getComponent('Component.Image');
        iconBackgroundImages.push(curImage);
    });

    const newEnvMapObj = script.environmentLightParent.copyWholeHierarchy(script.envMapObj);
    newEnvMapObj.getTransform().setLocalPosition(vec3.zero());
    envLighSource = newEnvMapObj.getComponent('Component.LightSource');
}

function onIconTapped(idx) {
    iconBackgroundImages[idx].mainPass.Active = !iconBackgroundImages[idx].mainPass.Active
    script.light[idx].sceneObject.enabled = iconBackgroundImages[idx].mainPass.Active
}

function reset() {
    script.light.forEach(function(item) {
        item.sceneObject.enabled = item.enabled;
    });

    iconBackgroundImages.forEach(function(image, i) {
        image.mainPass.Active = script.light[i].enabled;
    });

    resetCheckObjects();
    resetEnvironmentIcons();
}

function onEnvironmentIconTapped(idx) {

    const color = script.environmentIconBackgrounds[idx].mainPass.baseColor;
    if (color.w > 0) {
        color.w = 0;
        
    } else {
        color.w = 1;

        resetEnvironmentIcons();
    }

    const checkObject = script.environmentCheckObjects[idx];
    if (!checkObject.enabled) {
        resetCheckObjects();
        checkObject.enabled = true;

        script.environmentLightParent.enabled = true;
        envLighSource.diffuseEnvmapTexture = script.environmentLight[idx].diffuseEnvMap;
        envLighSource.specularEnvmapTexture = script.environmentLight[idx].specularEnvMap;
        envLighSource.envmapExposure = script.environmentLight[idx].exposure;
    } else {
        script.environmentLightParent.enabled = false;
        resetCheckObjects();
    }
}

function setEnvironmentIconHoverStatus(idx, status) {
    const color = script.environmentIconBackgrounds[idx].mainPass.baseColor;
    color.w = status;
    script.environmentIconBackgrounds[idx].mainPass.baseColor = color;
}

function onMainEnvironmentIconTapped() {
    resetCheckObjects();
    resetEnvironmentIcons();
}

function resetEnvironmentIcons() {

    script.environmentLightParent.enabled = false;

    script.environmentIconBackgrounds.forEach(function(image) {
        color = image.mainPass.baseColor;
        color.w = 0;
        image.mainPass.baseColor = color;
    });
}

function resetCheckObjects() {
    script.environmentCheckObjects.forEach(function(obj) {
        obj.enabled = false;
    });
}

function show() {
    script.parent.enabled = true;
    script.leftSection.enabled = true;
    reset();
    onEnvironmentIconTapped(echoparkIdx);
}

function hide() {
    script.parent.enabled = false;
    script.leftSection.enabled = false;
}

function addDropDownImage(newImage) {
    script.environmentIconBackgrounds.push(newImage);
}

function addCheckObject(newObject) {
    script.environmentCheckObjects.push(newObject);
}

script.onIconTapped = onIconTapped;
script.onEnvironmentIconTapped = onEnvironmentIconTapped;
script.setEnvironmentIconHoverStatus = setEnvironmentIconHoverStatus;
script.onMainEnvironmentIconTapped = onMainEnvironmentIconTapped;
script.resetEnvironmentIcons = resetEnvironmentIcons;
script.addDropDownImage = addDropDownImage;
script.addCheckObject = addCheckObject;
script.show = show;
script.hide = hide;
