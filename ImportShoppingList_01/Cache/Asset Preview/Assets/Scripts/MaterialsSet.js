//@ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":""}

//@input SceneObject[] iconBackgroundObjects

//@ui {"widget":"group_end"}
//@ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":""}

/*
@typedef IconMaterialsData
@property {Component.Image} iconImage
@property {Component.Texture} texture
*/

//@input Asset.Material iconMaterial
//@input Asset.Texture[] iconTextures

//@ui {"widget":"group_end"}
//@ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":""}

//@input Asset.Material texturePreviewMaterial
//@input Component.RenderMeshVisual[] textureRenderMeshes

//@ui {"widget":"group_end"}
//@ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":""}

//@input SceneObject hintObject

//@ui {"widget":"group_end"}

global.hintObject = script.hintObject;

const greyBackgroundImages = [];
const iconImages = [];

init();

function init() {

    createIconObjs();
    setIconMaterials();
}

function createIconObjs() {
    script.iconBackgroundObjects.forEach(function(obj) {
        let newImage = obj.createComponent('Component.Image');
        newImage.stretchMode = StretchMode.Fill;
        iconImages.push(newImage);
    });
}

function setIconMaterials() {
    iconImages.forEach(function(image, i) {
        const newMaterial = script.iconMaterial.clone();
        newMaterial.mainPass.baseTex = script.iconTextures[i];

        image.mainMaterial = newMaterial;
    });
}
