//@input Asset.Material gridMaterial
//@input Asset.Texture deviceCameraTexture
//@input SceneObject gridButtonObj
//@input SceneObject gridObject

let gridButtonImage;
let gridPass;
const scale = vec2.one();
const textureSize = 40;
let prevWidth = 0;
let prevHeight = 0;

init();

function init() {
    gridButtonImage = script.gridButtonObj.getComponent('Component.Image');
    gridPass = script.gridMaterial.mainPass;
    script.gridButtonObj.enabled = true;
}

const updateEvent = script.createEvent('UpdateEvent');
updateEvent.bind(update);

function update() {
    if (!script.gridObject.enabled) {
        return;
    }

    const width = script.deviceCameraTexture.getWidth();
    const height = script.deviceCameraTexture.getHeight();

    if (width == prevWidth && height == prevHeight) {
        return;
    }

    var screenScale = global.deviceInfoSystem.screenScale;    
    
    scale.x = width / textureSize;
    scale.y = height / textureSize;

    prevWidth = width;
    prevHeight = height;

    gridPass.uv2Scale = scale.uniformScale(1 / screenScale);
}

function onGridButtonTapped() {
    gridButtonImage.mainPass.Active = !gridButtonImage.mainPass.Active;
    if (gridButtonImage.mainPass.Active) {
        script.gridObject.enabled = true;
        update();
    } else {
        script.gridObject.enabled = false;
    }
}

function show(){
    gridButtonImage.mainPass.Active = true;
    script.gridObject.enabled = true;
    script.gridButtonObj.enabled = true;
}

script.onGridButtonTapped = onGridButtonTapped;
script.show = show;
