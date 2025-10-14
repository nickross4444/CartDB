"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callback = void 0;
exports.findAllChildComponents = findAllChildComponents;
exports.findComponentInAncestors = findComponentInAncestors;
exports.getSceneRoots = getSceneRoots;
exports.createCallbacks = createCallbacks;
class Callback {
}
exports.Callback = Callback;
/**
 * Searches for components with the given type in the tree rooted at the given root SceneObject.
 *
 * @param root - The root SceneObject of the tree to search.
 * @param name - The component typename to search for.
 * @returns An array of the components with that type
 */
function findAllChildComponents(root, name) {
    const children = root?.children ?? getSceneRoots();
    const components = root?.getComponents(name) ?? [];
    components.push(...children.flatMap((c) => findAllChildComponents(c, name)));
    return components;
}
/**
 * Searches for components with the given type in the tree rooted at the given root SceneObject.
 *
 * @param root - The root SceneObject of the tree to search.
 * @param name - The component typename to search for.
 * @returns An array of the components with that type
 */
function findComponentInAncestors(start, name) {
    let parent = start;
    let component = null;
    while (parent !== null) {
        component = parent.getComponent(name);
        if (component)
            break;
        parent = parent.getParent();
    }
    return component;
}
/**
 * Returns an array of all root objects in the scene.
 */
function getSceneRoots() {
    const nodes = [];
    for (let i = 0; i < global.scene.getRootObjectsCount(); i++) {
        nodes.push(global.scene.getRootObject(i));
    }
    return nodes;
}
function createCallbacks(callbacks) {
    if (callbacks === undefined || callbacks.length === 0) {
        return () => { };
    }
    return (args) => {
        for (let i = 0; i < callbacks.length; i++) {
            if (callbacks[i].scriptComponent[callbacks[i].functionName]) {
                ;
                callbacks[i].scriptComponent[callbacks[i].functionName](args);
            }
        }
    };
}
//# sourceMappingURL=SceneUtilities.js.map