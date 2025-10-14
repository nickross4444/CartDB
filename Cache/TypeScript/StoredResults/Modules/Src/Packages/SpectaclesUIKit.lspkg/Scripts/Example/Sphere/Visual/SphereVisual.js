"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SphereVisual = void 0;
const Element_1 = require("../../../Components/Element");
const UIKitUtilities_1 = require("../../../Utility/UIKitUtilities");
const Visual_1 = require("../../../Visuals/Visual");
const Sphere_1 = require("./Sphere");
const Colors = {
    darkGray: new vec4(0.1, 0.1, 0.1, 1),
    lightGray: new vec4(0.4, 0.4, 0.4, 1),
    lighterGray: new vec4(0.8, 0.8, 0.8, 1),
    brightYellow: new vec4(1, 0.8, 0, 1),
    yellow: new vec4(0.7, 0.6, 0.1, 1)
};
const SphereColors = {
    default: {
        base: Colors.darkGray
    },
    hover: {
        base: Colors.darkGray,
        second: Colors.lightGray
    },
    triggered: {
        base: Colors.yellow
    },
    toggledHover: {
        base: Colors.yellow,
        second: Colors.lighterGray
    }
};
/**
 * The `SphereVisual` class represents a visual component in the form of a sphere.
 * It extends the `Visual` class and provides functionality for managing the sphere's
 * appearance, size, and state transitions.
 *
 * @extends Visual
 */
class SphereVisual extends Visual_1.Visual {
    get visualStates() {
        return this._sphereVisualStates;
    }
    /**
     * Gets the `RenderMeshVisual` associated with the sphere.
     *
     * @returns {RenderMeshVisual} The visual representation of the sphere's mesh.
     */
    get renderMeshVisual() {
        return this.sphere.renderMeshVisual;
    }
    /**
     * Gets the base color of the sphere visual.
     *
     * @returns {vec4} The background color of the sphere as a 4-component vector.
     */
    get baseColor() {
        return this.sphere.backgroundColor;
    }
    /**
     * Indicates whether the sphere visual has a border.
     *
     * @returns {boolean} The border property always returns false for the `SphereVisual` class,
     */
    get hasBorder() {
        return false;
    }
    /**
     * Gets the size of the border for the sphere visual in world space units.
     *
     * @returns The border size as a number. Currently, this always returns 0.
     */
    get borderSize() {
        return 0;
    }
    /**
     * @returns vec4 default second color
     */
    get defaultSecondColor() {
        return this._defaultSecondColor;
    }
    /**
     * @returns vec4 hover second color
     */
    get hoverSecondColor() {
        return this._hoverSecondColor;
    }
    /**
     * @returns vec4 triggered second color
     */
    get triggeredSecondColor() {
        return this._triggeredSecondColor;
    }
    get toggledSecondDefaultColor() {
        return this._toggledSecondDefaultColor;
    }
    /**
     * @returns vec4 toggled second color
     */
    get toggledSecondHoverColor() {
        return this._toggledSecondHoverColor;
    }
    /**
     * @params vec4 default second color
     */
    set defaultSecondColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultSecondColor, color)) {
            return;
        }
        this._defaultSecondColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * @params vec4 hover second color
     */
    set hoverSecondColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverSecondColor, color)) {
            return;
        }
        this._hoverSecondColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * @params vec4 triggered second color
     */
    set triggeredSecondColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredSecondColor, color)) {
            return;
        }
        this._triggeredSecondColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * @params vec4 toggled second color
     */
    set toggledSecondDefaultColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledSecondDefaultColor, color)) {
            return;
        }
        this._toggledSecondDefaultColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * @params vec4 toggled second color
     */
    set toggledSecondHoverColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledSecondHoverColor, color)) {
            return;
        }
        this._toggledSecondHoverColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Updates the state of the SphereVisual component and refreshes the associated icon.
     *
     * @param stateName - The name of the state to set for the component.
     */
    setState(stateName) {
        if (this._state === this.visualStates.get(stateName)) {
            // skip redundant calls
            return;
        }
        super.setState(stateName);
        this.updateIcon(this._state.icon);
        this.updateSecondColor(this._state.secondColor);
    }
    constructor(args) {
        super(args);
        this._defaultColor = SphereColors.default.base;
        this._hoverColor = SphereColors.hover.base;
        this._triggeredColor = SphereColors.triggered.base;
        this._toggledDefaultColor = SphereColors.triggered.base;
        this._toggledHoverColor = SphereColors.toggledHover.base;
        this._defaultSecondColor = SphereColors.default.base;
        this._hoverSecondColor = SphereColors.hover.second;
        this._triggeredSecondColor = SphereColors.triggered.base;
        this._toggledSecondDefaultColor = SphereColors.triggered.base;
        this._toggledSecondHoverColor = SphereColors.toggledHover.second;
        this._sceneObject = args.sceneObject;
        this.sphere = this._sceneObject.createComponent(Sphere_1.Sphere.getTypeName());
        this.managedComponents.push(this.sphere);
        this.sphere.radius = this.size.x / 2;
        this.sphere.initialize();
        this._transform = this._sceneObject.getTransform();
        this.initialize();
    }
    set baseColor(value) {
        this.sphere.backgroundColor = value;
    }
    get visualSize() {
        return vec3.one().uniformScale(this.sphere.radius * 2);
    }
    set visualSize(size) {
        this.sphere.radius = Math.max(size.x, size.y, size.z) / 2;
    }
    /********** Sphere Specific **************/
    /**
     * Sets the scale factor for the back of the sphere along the z-axis.
     * This property adjusts the depth scaling of the sphere's back side.
     *
     * @param zBackScale - The new scale factor for the z-axis back scaling.
     */
    set zBackScale(zBackScale) {
        if (zBackScale === undefined) {
            return;
        }
        this.sphere.zBackScale = zBackScale;
    }
    /**
     * Sets the default icon for the sphere visual and updates its visual states.
     *
     * @param icon - The texture to be used as the default icon.
     */
    set defaultIcon(icon) {
        if (icon === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultIcon, icon)) {
            return;
        }
        this._defaultIcon = icon;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Sets the hover icon for the sphere visual and updates its visual states.
     *
     * @param icon - The texture to be used as the hover icon.
     */
    set hoverIcon(icon) {
        if (icon === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverIcon, icon)) {
            return;
        }
        this._hoverIcon = icon;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Sets the triggered icon for the sphere visual and updates its visual states.
     *
     * @param icon - The texture to be used as the triggered icon.
     */
    set triggeredIcon(icon) {
        if (icon === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredIcon, icon)) {
            return;
        }
        this._triggeredIcon = icon;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Sets the inactive icon for the sphere visual and updates its visual states.
     *
     * @param icon - The texture to be used as the inactive icon.
     */
    set inactiveIcon(icon) {
        if (icon === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveIcon, icon)) {
            return;
        }
        this._inactiveIcon = icon;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Sets the error icon for the sphere visual and updates its visual states.
     *
     * @param icon - The texture to be used as the error icon.
     */
    set errorIcon(icon) {
        if (icon === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._errorIcon, icon)) {
            return;
        }
        this._errorIcon = icon;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Updates the icon of the sphere visual.
     *
     * @param icon - The texture to be used as the new icon.
     */
    updateIcon(icon) {
        this.sphere.icon = icon;
    }
    updateSecondColor(color) {
        if (color) {
            this.renderMeshVisual.mainPass.secondColor = color;
            this.renderMeshVisual.mainPass.hasSecondColor = 1;
        }
        else {
            this.renderMeshVisual.mainPass.hasSecondColor = 0;
        }
    }
    updateVisualStates() {
        this._sphereVisualStates = new Map([
            [
                Element_1.StateName.default,
                {
                    baseColor: this.baseDefaultColor,
                    secondColor: this.defaultSecondColor,
                    localScale: this.defaultScale,
                    localPosition: this.defaultPosition,
                    icon: this._defaultIcon
                }
            ],
            [
                Element_1.StateName.hover,
                {
                    baseColor: this.baseHoverColor,
                    secondColor: this.hoverSecondColor,
                    localScale: this.hoverScale,
                    localPosition: this.hoverPosition,
                    icon: this._hoverIcon
                }
            ],
            [
                Element_1.StateName.triggered,
                {
                    baseColor: this.baseTriggeredColor,
                    secondColor: this.triggeredSecondColor,
                    localScale: this.triggeredScale,
                    localPosition: this.triggeredPosition,
                    icon: this._triggeredIcon
                }
            ],
            [
                Element_1.StateName.toggledHovered,
                {
                    baseColor: this.baseToggledHoverColor,
                    secondColor: this.toggledSecondHoverColor,
                    localScale: this.toggledHoverScale,
                    localPosition: this.toggledPosition,
                    icon: this._triggeredIcon
                }
            ],
            [
                Element_1.StateName.toggledDefault,
                {
                    baseColor: this.baseToggledDefaultColor,
                    secondColor: this.toggledSecondDefaultColor,
                    localScale: this.toggledScale,
                    localPosition: this.toggledPosition,
                    icon: this._triggeredIcon
                }
            ],
            [
                Element_1.StateName.error,
                {
                    baseColor: this.baseErrorColor,
                    secondColor: this.baseErrorColor,
                    localScale: this.errorScale,
                    localPosition: this.errorPosition,
                    icon: this._errorIcon
                }
            ],
            [
                Element_1.StateName.errorHover,
                {
                    baseColor: this.baseErrorColor,
                    secondColor: this.baseErrorColor,
                    localScale: this.hoverScale,
                    localPosition: this.hoverPosition,
                    icon: this._errorIcon
                }
            ],
            [
                Element_1.StateName.inactive,
                {
                    baseColor: this.baseErrorColor,
                    secondColor: this.baseErrorColor,
                    localScale: this.inactiveScale,
                    localPosition: this.inactivePosition,
                    icon: this._inactiveIcon
                }
            ]
        ]);
        super.updateVisualStates();
    }
    get sphere() {
        return this._visualComponent;
    }
    set sphere(value) {
        this._visualComponent = value;
    }
}
exports.SphereVisual = SphereVisual;
//# sourceMappingURL=SphereVisual.js.map