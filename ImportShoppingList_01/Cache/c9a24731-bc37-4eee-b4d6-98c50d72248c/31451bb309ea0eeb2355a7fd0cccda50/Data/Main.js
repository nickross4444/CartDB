//@input Component.ScriptComponent texturePreviewController
//@input Component.ScriptComponent materialPreviewController
//@input Component.ScriptComponent meshPreviewController
//@input Component.ScriptComponent vfxPreviewController
//@input Component.ScriptComponent otherObjectsPreviewController
//@input Component.ScriptComponent gridController
//@input Component.ScriptComponent placementScript

const updateEvent = script.createEvent('LateUpdateEvent');
updateEvent.bind(update);

function update() {

    if (global.scene.getRootObjectsCount() <= 1) {
        return;
    }

    let newObject = null;
    for (let i = global.scene.getRootObjectsCount() - 1; i >= 0; --i) {
        const root = global.scene.getRootObject(i);
        if (root.name === '[ROOT]') {
            continue;
        }

        newObject = root;
    }

    script.gridController.show();

    newObject.enabled = true;
    const hasChild = (newObject.getChildrenCount() != 0);

    const image = newObject.getComponent('Component.Image');

    if (!hasChild && image) {
        if (image) {
            const mainPass = image.mainPass;
            if (mainPass) {
                hide();
                const texture = mainPass.baseTex;
                script.texturePreviewController.show(texture);
                newObject.destroy();
            }

            return;
        }
    }

    var renderMeshVisual = newObject.getComponent('Component.RenderMeshVisual');

    if (!hasChild && renderMeshVisual && (newObject.name.includes('Mesh using') || newObject.name.includes('Post Effect:'))) {
        if (renderMeshVisual) {
            hide();
            script.placementScript.reparentNew();
            script.materialPreviewController.show(newObject);
            return;
        }
    }

    if (!hasChild && renderMeshVisual) {
        var renderMeshVisual = newObject.getComponent('Component.RenderMeshVisual');
        if (renderMeshVisual) {
            hide();
            script.placementScript.reparentNew();
            script.meshPreviewController.show(newObject);
            return;
        }
    }

    const vfxComponent = newObject.getComponent('Component.VFXComponent');

    if (vfxComponent) {
        hide();
        script.vfxPreviewController.show(newObject);
        return;
    }

    if (newObject.name == '_ngsVfxManager') {
        script.vfxPreviewController.setVfxManager(newObject);
        return;
    }

    hide();
    script.placementScript.reparentNew();
    script.otherObjectsPreviewController.show();
}

function hide() {
    script.texturePreviewController.hide();
    script.materialPreviewController.hide();
    script.meshPreviewController.hide();
    script.vfxPreviewController.hide();
    script.otherObjectsPreviewController.hide();
}
