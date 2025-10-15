//@input SceneObject middleSection
//@input Component.ScriptComponent lightController
//@input Component.ScriptComponent fovController
//@input Asset.Texture textureAnalyzer
//@input SceneObject mappingImageObj

let mainPass;
let initTex;
let mappingImage;

init();

function init() {
    mappingImage = script.mappingImageObj.getComponent('Component.Image');
}

function show(newSceneObject) {
    script.middleSection.enabled = true;
    script.lightController.show();
    mainPass = newSceneObject.getComponent('Component.RenderMeshVisual').mainPass;
    mainPass.twoSided = true;
    initTex = mainPass.baseTex;
    script.fovController.resume(true);
    reset();
}

function hide() {
    script.middleSection.enabled = false;
    script.lightController.hide();
}

function onMappingButtonTapped() {
    mappingImage.mainPass.Active = !mappingImage.mainPass.Active

    if (mappingImage.mainPass.Active) {
        mainPass.baseTex = script.textureAnalyzer;
    } else {
        mainPass.baseTex = initTex;
    }
}

function reset() {
    mappingImage.mainPass.Active = false;
}

script.onMappingButtonTapped = onMappingButtonTapped;
script.show = show;
script.hide = hide;
