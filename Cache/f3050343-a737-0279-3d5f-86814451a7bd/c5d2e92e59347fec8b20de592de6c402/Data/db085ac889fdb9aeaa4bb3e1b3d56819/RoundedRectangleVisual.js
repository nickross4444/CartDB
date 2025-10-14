"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundedRectangleVisual = void 0;
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const color_1 = require("SpectaclesInteractionKit.lspkg/Utils/color");
const Element_1 = require("../../Components/Element");
const UIKitUtilities_1 = require("../../Utility/UIKitUtilities");
const Visual_1 = require("../Visual");
const RoundedRectangle_1 = require("./RoundedRectangle");
const BACKGROUND_GRADIENT_PARAMETERS = {
    default: {
        enabled: true,
        type: "Rectangle",
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.darkGray },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.darkGray },
        stop2: { enabled: true, percent: 0.95, color: Visual_1.COLORS.darkGray },
        stop3: { enabled: true, percent: 0.99, color: Visual_1.COLORS.darkGray }
    },
    hover: {
        enabled: true,
        type: "Rectangle",
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.darkGray },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.darkGray },
        stop2: { enabled: true, percent: 0.95, color: Visual_1.COLORS.darkGray },
        stop3: { enabled: true, percent: 0.99, color: Visual_1.COLORS.darkGray }
    },
    toggled: {
        enabled: true,
        type: "Rectangle",
        stop0: { enabled: true, percent: -1, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.3), 1) },
        stop1: { enabled: true, percent: -1, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.3), 1) },
        stop2: { enabled: true, percent: -1, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.3), 1) },
        stop3: { enabled: true, percent: 3, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.9), 1) }
    }
};
const BORDER_GRADIENT_PARAMETERS = {
    default: {
        enabled: true,
        start: new vec2(-1, 0),
        end: new vec2(1, 0),
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.lightGray },
        stop1: { enabled: true, percent: 0.5, color: (0, color_1.withAlpha)(Visual_1.COLORS.lightGray.uniformScale(0.66), 1) },
        stop2: { enabled: true, percent: 1, color: Visual_1.COLORS.lightGray }
    },
    hover: {
        enabled: true,
        start: new vec2(-1, 0),
        end: new vec2(1, 0),
        stop0: { enabled: true, percent: 0, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.9), 1) },
        stop1: { enabled: true, percent: 0.5, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.66), 1) },
        stop2: { enabled: true, percent: 1, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.9), 1) }
    },
    toggled: {
        enabled: true,
        start: new vec2(-1, 0),
        end: new vec2(1, 0),
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.brightYellow },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.brightYellow },
        stop2: { enabled: true, percent: 1, color: Visual_1.COLORS.brightYellow }
    },
    toggledHovered: {
        enabled: true,
        start: new vec2(-1, 0),
        end: new vec2(1, 0),
        stop0: { enabled: true, percent: 0, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.9), 1) },
        stop1: { enabled: true, percent: 0.5, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.66), 1) },
        stop2: { enabled: true, percent: 1, color: (0, color_1.withAlpha)(Visual_1.COLORS.brightYellow.uniformScale(0.9), 1) }
    }
};
/**
 * The `RoundedRectangleVisual` class represents a visual component that renders a rounded rectangle
 * with customizable properties such as border, gradients, and colors. It extends the base `Visual` class
 * and provides additional functionality specific to rounded rectangles.
 *
 * @extends Visual
 */
class RoundedRectangleVisual extends Visual_1.Visual {
    get visualStates() {
        return this._roundedRectangleVisualStates;
    }
    /**
     * Gets the `RenderMeshVisual` associated with the rounded rectangle.
     *
     * @returns {RenderMeshVisual} The visual representation of the rounded rectangle's mesh.
     */
    get renderMeshVisual() {
        return this.roundedRectangle.renderMeshVisual;
    }
    /**
     * Retrieves the base color of the rounded rectangle visual.
     *
     * @returns {vec4} The background color of the rounded rectangle as a `vec4` value.
     */
    get baseColor() {
        return this.roundedRectangle.backgroundColor;
    }
    /**
     * Indicates whether the rounded rectangle visual has a border.
     *
     * @returns `true` if the visual has a border; otherwise, `false`.
     */
    get hasBorder() {
        return this._hasBorder;
    }
    /**
     * Sets whether the rounded rectangle has a border.
     *
     * @param hasBorder - A boolean indicating whether the rounded rectangle should have a border.
     */
    set hasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        this._hasBorder = hasBorder;
        this.roundedRectangle.border = hasBorder;
    }
    /**
     * Gets the size of the border for the rounded rectangle.
     *
     * @returns The border size as a number.
     */
    get borderSize() {
        return this.roundedRectangle.borderSize;
    }
    /**
     * Sets the border size of the rounded rectangle.
     *
     * @param borderSize - The thickness of the border in centimeters.
     */
    set borderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        this.roundedRectangle.borderSize = borderSize;
    }
    /**
     * Updates the visual state of the RoundedRectangleVisual component.
     *
     * This method overrides the base `setState` method to apply visual updates
     * specific to the RoundedRectangleVisual, such as gradients and border colors.
     *
     * @param stateName - The new state to apply, represented as a `stateName` object.
     */
    setState(stateName) {
        if (this._state === this.visualStates.get(stateName)) {
            // skip redundant calls
            return;
        }
        super.setState(stateName);
        this.updateIsBaseGradient(this._state.isBaseGradient);
        this.updateGradient(this._state.baseGradient);
        this.updateHasBorder(this._state.hasBorder);
        this.updateBorderType(this._state.borderType);
        this.updateBorderColors(this._state.borderColor);
        this.updateBorderGradient(this._state.borderGradient);
        this.updateBorderSize(this._state.borderSize);
    }
    /**
     * Constructs a new instance of the `RoundedRectangleVisual` class.
     *
     * @param sceneObject - The parent `SceneObject` to which this visual will be attached.
     */
    constructor(args) {
        super(args);
        this._borderDefaultColor = Visual_1.COLORS.lightGray;
        this._borderHoverColor = Visual_1.COLORS.brightYellow;
        this._borderTriggeredColor = Visual_1.COLORS.brightYellow;
        this._borderInactiveColor = Visual_1.INACTIVE_COLOR;
        this._borderToggledDefaultColor = Visual_1.COLORS.brightYellow;
        this._borderToggledHoverColor = Visual_1.COLORS.brightYellow;
        this._borderToggledTriggeredColor = Visual_1.COLORS.brightYellow;
        this._defaultIsBaseGradient = false;
        this._hoverIsBaseGradient = false;
        this._triggeredIsBaseGradient = false;
        this._inactiveIsBaseGradient = false;
        this._toggledDefaultIsBaseGradient = false;
        this._toggledHoverIsBaseGradient = false;
        this._toggledTriggeredIsBaseGradient = false;
        this._defaultGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
        this._hoverGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
        this._triggeredGradient = BACKGROUND_GRADIENT_PARAMETERS.toggled;
        this._inactiveGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
        this._toggledDefaultGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
        this._toggledHoverGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
        this._toggledTriggeredGradient = BACKGROUND_GRADIENT_PARAMETERS.toggled;
        this._defaultHasBorder = false;
        this._hoverHasBorder = false;
        this._triggeredHasBorder = false;
        this._inactiveHasBorder = false;
        this._toggledDefaultHasBorder = false;
        this._toggledHoverHasBorder = false;
        this._toggledTriggeredHasBorder = false;
        this._defaultBorderType = "Gradient";
        this._hoverBorderType = "Gradient";
        this._triggeredBorderType = "Gradient";
        this._inactiveBorderType = "Gradient";
        this._toggledDefaultBorderType = "Gradient";
        this._toggledHoverBorderType = "Gradient";
        this._toggledTriggeredBorderType = "Gradient";
        this._defaultBorderSize = 0.1;
        this._hoverBorderSize = 0.1;
        this._triggeredBorderSize = 0.1;
        this._inactiveBorderSize = 0.1;
        this._toggledDefaultBorderSize = 0.1;
        this._toggledHoverBorderSize = 0.1;
        this._toggledTriggeredBorderSize = 0.1;
        this._borderDefaultGradient = BORDER_GRADIENT_PARAMETERS.default;
        this._borderHoverGradient = BORDER_GRADIENT_PARAMETERS.hover;
        this._borderTriggeredGradient = BORDER_GRADIENT_PARAMETERS.toggled;
        this._borderInactiveGradient = BORDER_GRADIENT_PARAMETERS.default;
        this._borderToggledDefaultGradient = BORDER_GRADIENT_PARAMETERS.toggled;
        this._borderToggledHoverGradient = BORDER_GRADIENT_PARAMETERS.toggledHovered;
        this._borderToggledTriggeredGradient = BORDER_GRADIENT_PARAMETERS.toggled;
        this._borderColorChangeCancelSet = new animate_1.CancelSet();
        this._hasBorder = false;
        this._sceneObject = args.sceneObject;
        this.roundedRectangle = this._sceneObject.createComponent(RoundedRectangle_1.RoundedRectangle.getTypeName());
        this.managedComponents.push(this.roundedRectangle);
        this.roundedRectangle.initialize();
        this._transform = this._sceneObject.getTransform();
        if (args.transparent) {
            this.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true);
            this.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto;
        }
        this.initialize();
    }
    destroy() {
        this._borderColorChangeCancelSet.cancel();
        super.destroy();
    }
    set baseColor(value) {
        this.roundedRectangle.backgroundColor = value;
    }
    get visualSize() {
        return new vec3(this.roundedRectangle.size.x, this.roundedRectangle.size.y, 1);
    }
    set visualSize(value) {
        this.roundedRectangle.size = new vec2(value.x, value.y);
    }
    updateColors(meshColor) {
        if (this.roundedRectangle.gradient) {
            return;
        }
        super.updateColors(meshColor);
    }
    /****  Rounded Rectangle explicit  ******************/
    /**
     * Gets the corner radius of the rounded rectangle.
     *
     * @returns The current corner radius of the rounded rectangle in pixels.
     */
    get cornerRadius() {
        return this.roundedRectangle.cornerRadius;
    }
    /**
     * Sets the corner radius of the rounded rectangle.
     *
     * @param cornerRadius - The radius of the corners in pixels.
     */
    set cornerRadius(cornerRadius) {
        if (cornerRadius === undefined) {
            return;
        }
        this.roundedRectangle.cornerRadius = cornerRadius;
    }
    /**
     * Whether the rounded rectangle uses a texture for its base(background).
     * @return {boolean} `true` if the rounded rectangle uses a texture, otherwise `false`.
     */
    get useTexture() {
        return this.roundedRectangle.useTexture;
    }
    /**
     * Whether the rounded rectangle uses a texture for its base(background).
     * @return {boolean} `true` if the rounded rectangle uses a texture, otherwise `false`.
     */
    set useTexture(value) {
        if (value === undefined) {
            return;
        }
        this.roundedRectangle.useTexture = value;
    }
    /**
     * The texture of the rounded rectangle.
     *
     * @returns The texture used by the rounded rectangle.
     */
    get texture() {
        return this.roundedRectangle.texture;
    }
    /**
     * The texture of the rounded rectangle.
     *
     * @param texture - The new texture to be applied to the rounded rectangle.
     */
    set texture(texture) {
        if (texture === undefined) {
            return;
        }
        this.roundedRectangle.texture = texture;
    }
    /**
     * Whether the rounded rectangle uses a gradient for its base(background).
     */
    get isBaseGradient() {
        return this.roundedRectangle.gradient;
    }
    /**
     * Whether the rounded rectangle uses a gradient for its base(background).
     *
     * @param gradient - A boolean indicating whether to use a gradient (`true`) or a solid color (`false`).
     */
    set isBaseGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        this.roundedRectangle.gradient = gradient;
        this.roundedRectangle.useTexture = false;
    }
    /**
     * Gets the default gradient parameters for the visual.
     *
     * @returns The default gradient parameters.
     */
    get defaultGradient() {
        return this._defaultGradient;
    }
    /**
     * Sets the default gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set as the default.
     */
    set defaultGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultGradient, gradient)) {
            return;
        }
        this._defaultGradient = gradient;
        if (!this.shouldColorChange && this.isBaseGradient) {
            this.roundedRectangle.setBackgroundGradient(gradient);
        }
        else if (this.shouldColorChange) {
            if (this.initialized) {
                this.needsVisualStateUpdate = true;
            }
        }
    }
    /**
     * Gets the hover gradient parameters for the visual.
     *
     * @returns The hover gradient parameters.
     */
    get hoverGradient() {
        return this._hoverGradient;
    }
    /**
     * Sets the hover gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the hover state.
     */
    set hoverGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverGradient, gradient)) {
            return;
        }
        this._hoverGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled hover gradient parameters for the visual.
     *
     * @returns The toggled hover gradient parameters.
     */
    get toggledHoverGradient() {
        return this._toggledHoverGradient;
    }
    /**
     * Sets the toggled hover gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the toggled hover state.
     */
    set toggledHoverGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverGradient, gradient)) {
            return;
        }
        this._toggledHoverGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled triggered gradient parameters for the visual.
     *
     * @returns The toggled triggered gradient parameters.
     */
    get toggledTriggeredGradient() {
        return this._toggledTriggeredGradient;
    }
    /**
     * Sets the toggled triggered gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the toggled triggered state.
     */
    set toggledTriggeredGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredGradient, gradient)) {
            return;
        }
        this._toggledTriggeredGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled default gradient parameters for the visual.
     *
     * @returns The toggled default gradient parameters.
     */
    get toggledDefaultGradient() {
        return this._toggledDefaultGradient;
    }
    /**
     * Sets the toggled default gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the toggled default state.
     */
    set toggledDefaultGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultGradient, gradient)) {
            return;
        }
        this._toggledDefaultGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the triggered gradient parameters for the visual.
     *
     * @returns The triggered gradient parameters.
     */
    get triggeredGradient() {
        return this._triggeredGradient;
    }
    /**
     * Sets the triggered gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the triggered state.
     */
    set triggeredGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredGradient, gradient)) {
            return;
        }
        this._triggeredGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the inactive gradient parameters for the visual.
     *
     * @returns The inactive gradient parameters.
     */
    get inactiveGradient() {
        return this._inactiveGradient;
    }
    /**
     * Sets the inactive gradient parameters for the visual and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the inactive state.
     */
    set inactiveGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveGradient, gradient)) {
            return;
        }
        this._inactiveGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Sets the gradient start and end positions for the base of the rounded rectangle.
     *
     * @param gradientStartPosition - A 2D vector representing the starting position of the gradient.
     * @param gradientEndPosition - A 2D vector representing the ending position of the gradient.
     */
    setBaseGradientPositions(gradientStartPosition, gradientEndPosition) {
        this.roundedRectangle.gradientStartPosition = gradientStartPosition;
        this.roundedRectangle.gradientEndPosition = gradientEndPosition;
    }
    /**
     * Gets the type of border for the rounded rectangle.
     *
     * @returns The type of border, which can be either "Color" or "Gradient".
     */
    get isBorderGradient() {
        return this.roundedRectangle.borderType === "Gradient";
    }
    /**
     * Sets whether the rounded rectangle uses a gradient for its border.
     *
     * @param gradient - A boolean indicating whether to use a gradient (`true`) or a solid color (`false`) for the border.
     */
    set isBorderGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        this.roundedRectangle.borderType = gradient ? "Gradient" : "Color";
    }
    /**
     * Gets the default color for the border of the rounded rectangle.
     *
     * @returns The default border color as a `vec4` value.
     */
    get borderDefaultColor() {
        return this._borderDefaultColor;
    }
    /**
     * Sets the default color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The default color to be set for the border.
     */
    set borderDefaultColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderDefaultColor, color)) {
            return;
        }
        this._borderDefaultColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the hover color for the border of the rounded rectangle.
     *
     * @returns The hover border color as a `vec4` value.
     */
    get borderHoverColor() {
        return this._borderHoverColor;
    }
    /**
     * Sets the hover color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The hover color to be set for the border.
     */
    set borderHoverColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderHoverColor, color)) {
            return;
        }
        this._borderHoverColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the triggered color for the border of the rounded rectangle.
     *
     * @returns The triggered border color as a `vec4` value.
     */
    get borderTriggeredColor() {
        return this._borderTriggeredColor;
    }
    /**
     * Sets the triggered color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The triggered color to be set for the border.
     */
    set borderTriggeredColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderTriggeredColor, color)) {
            return;
        }
        this._borderTriggeredColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the gradient parameters for the toggled default state of the border.
     */
    get borderToggledDefaultGradient() {
        return this._borderToggledDefaultGradient;
    }
    /**
     * Sets the gradient parameters for the toggled default state of the border
     */
    set borderToggledDefaultGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderToggledDefaultGradient, gradient)) {
            return;
        }
        this._borderToggledDefaultGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the gradient parameters for the toggled hover state of the border.
     */
    get borderToggledHoverGradient() {
        return this._borderToggledHoverGradient;
    }
    /**
     * Sets the gradient parameters for the toggled hover state of the border and initializes the visual states.
     */
    set borderToggledHoverGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderToggledHoverGradient, gradient)) {
            return;
        }
        this._borderToggledHoverGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the gradient parameters for the toggled triggered state of the border.
     */
    get borderToggledTriggeredGradient() {
        return this._borderToggledTriggeredGradient;
    }
    /**
     * Sets the gradient parameters for the toggled triggered state of the border and initializes the visual states.
     */
    set borderToggledTriggeredGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderToggledTriggeredGradient, gradient)) {
            return;
        }
        this._borderToggledTriggeredGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the inactive color for the border of the rounded rectangle.
     *
     * @returns The inactive border color as a `vec4` value.
     */
    get borderInactiveColor() {
        return this._borderInactiveColor;
    }
    /**
     * Sets the inactive color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The inactive color to be set for the border.
     */
    set borderInactiveColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderInactiveColor, color)) {
            return;
        }
        this._borderInactiveColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled default color for the border of the rounded rectangle.
     *
     * @returns The toggled default border color as a `vec4` value.
     */
    get borderToggledDefaultColor() {
        return this._borderToggledDefaultColor;
    }
    /**
     * Sets the toggled default color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The toggled default color to be set for the border.
     */
    set borderToggledDefaultColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderToggledDefaultColor, color)) {
            return;
        }
        this._borderToggledDefaultColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled hover color for the border of the rounded rectangle.
     *
     * @returns The toggled hover border color as a `vec4` value.
     */
    get borderToggledHoverColor() {
        return this._borderToggledHoverColor;
    }
    /**
     * Sets the toggled hover color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The toggled hover color to be set for the border.
     */
    set borderToggledHoverColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderToggledHoverColor, color)) {
            return;
        }
        this._borderToggledHoverColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled triggered color for the border of the rounded rectangle.
     *
     * @returns The toggled triggered border color as a `vec4` value.
     */
    get borderToggledTriggeredColor() {
        return this._borderToggledTriggeredColor;
    }
    /**
     * Sets the toggled triggered color for the border of the rounded rectangle and initializes the visual states.
     *
     * @param color - The toggled triggered color to be set for the border.
     */
    set borderToggledTriggeredColor(color) {
        if (color === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderToggledTriggeredColor, color)) {
            return;
        }
        this._borderToggledTriggeredColor = color;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the default gradient parameters for the border of the rounded rectangle.
     *
     * @returns The default border gradient parameters.
     */
    get borderDefaultGradient() {
        return this._borderDefaultGradient;
    }
    /**
     * Sets the gradient parameters for the default state of the border and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the default state of the border.
     */
    set borderDefaultGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderDefaultGradient, gradient)) {
            return;
        }
        this._borderDefaultGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the gradient parameters for the hover state of the border.
     *
     * @returns The hover border gradient parameters.
     */
    get borderHoverGradient() {
        return this._borderHoverGradient;
    }
    /**
     * Sets the gradient parameters for the hover state of the border and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the hover state of the border.
     */
    set borderHoverGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderHoverGradient, gradient)) {
            return;
        }
        this._borderHoverGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the gradient parameters for the triggered state of the border.
     *
     * @returns The triggered border gradient parameters.
     */
    get borderTriggeredGradient() {
        return this._borderTriggeredGradient;
    }
    /**
     * Sets the gradient parameters for the triggered state of the border and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the triggered state of the border.
     */
    set borderTriggeredGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderTriggeredGradient, gradient)) {
            return;
        }
        this._borderTriggeredGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the gradient parameters for the inactive state of the border.
     *
     * @returns The inactive border gradient parameters.
     */
    get borderInactiveGradient() {
        return this._borderInactiveGradient;
    }
    /**
     * Sets the gradient parameters for the inactive state of the border and initializes the visual states.
     *
     * @param gradient - The gradient parameters to be set for the inactive state of the border.
     */
    set borderInactiveGradient(gradient) {
        if (gradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._borderInactiveGradient, gradient)) {
            return;
        }
        this._borderInactiveGradient = gradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Sets the start and end positions for the border gradient of the rounded rectangle.
     *
     * @param gradientStartPosition - A 2D vector representing the starting position of the border gradient.
     * @param gradientEndPosition - A 2D vector representing the ending position of the border gradient.
     */
    setBorderGradientPositions(gradientStartPosition, gradientEndPosition) {
        this.roundedRectangle.borderGradientStartPosition = gradientStartPosition;
        this.roundedRectangle.borderGradientEndPosition = gradientEndPosition;
    }
    /**
     * Gets whether the default state uses a base gradient.
     *
     * @returns `true` if the default state uses a base gradient; otherwise, `false`.
     */
    get defaultIsBaseGradient() {
        return this._defaultIsBaseGradient;
    }
    /**
     * Sets whether the default state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the default state should use a base gradient.
     */
    set defaultIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._defaultIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the hover state uses a base gradient.
     *
     * @returns `true` if the hover state uses a base gradient; otherwise, `false`.
     */
    get hoverIsBaseGradient() {
        return this._hoverIsBaseGradient;
    }
    /**
     * Sets whether the hover state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the hover state should use a base gradient.
     */
    set hoverIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._hoverIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the triggered state uses a base gradient.
     *
     * @returns `true` if the triggered state uses a base gradient; otherwise, `false`.
     */
    get triggeredIsBaseGradient() {
        return this._triggeredIsBaseGradient;
    }
    /**
     * Sets whether the triggered state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the triggered state should use a base gradient.
     */
    set triggeredIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._triggeredIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the inactive state uses a base gradient.
     *
     * @returns `true` if the inactive state uses a base gradient; otherwise, `false`.
     */
    get inactiveIsBaseGradient() {
        return this._inactiveIsBaseGradient;
    }
    /**
     * Sets whether the inactive state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the inactive state should use a base gradient.
     */
    set inactiveIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._inactiveIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled default state uses a base gradient.
     *
     * @returns `true` if the toggled default state uses a base gradient; otherwise, `false`.
     */
    get toggledDefaultIsBaseGradient() {
        return this._toggledDefaultIsBaseGradient;
    }
    /**
     * Sets whether the toggled default state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the toggled default state should use a base gradient.
     */
    set toggledDefaultIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._toggledDefaultIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled hover state uses a base gradient.
     *
     * @returns `true` if the toggled hover state uses a base gradient; otherwise, `false`.
     */
    get toggledHoverIsBaseGradient() {
        return this._toggledHoverIsBaseGradient;
    }
    /**
     * Sets whether the toggled hover state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the toggled hover state should use a base gradient.
     */
    set toggledHoverIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._toggledHoverIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled triggered state uses a base gradient.
     *
     * @returns `true` if the toggled triggered state uses a base gradient; otherwise, `false`.
     */
    get toggledTriggeredIsBaseGradient() {
        return this._toggledTriggeredIsBaseGradient;
    }
    /**
     * Sets whether the toggled triggered state uses a base gradient and initializes the visual states.
     *
     * @param isBaseGradient - A boolean indicating whether the toggled triggered state should use a base gradient.
     */
    set toggledTriggeredIsBaseGradient(isBaseGradient) {
        if (isBaseGradient === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredIsBaseGradient, isBaseGradient)) {
            return;
        }
        this._toggledTriggeredIsBaseGradient = isBaseGradient;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the default state has a border.
     *
     * @returns `true` if the default state has a border; otherwise, `false`.
     */
    get defaultHasBorder() {
        return this._defaultHasBorder;
    }
    /**
     * Sets whether the default state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the default state should have a border.
     */
    set defaultHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultHasBorder, hasBorder)) {
            return;
        }
        this._defaultHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the hover state has a border.
     *
     * @returns `true` if the hover state has a border; otherwise, `false`.
     */
    get hoverHasBorder() {
        return this._hoverHasBorder;
    }
    /**
     * Sets whether the hover state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the hover state should have a border.
     */
    set hoverHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverHasBorder, hasBorder)) {
            return;
        }
        this._hoverHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the triggered state has a border.
     *
     * @returns `true` if the triggered state has a border; otherwise, `false`.
     */
    get triggeredHasBorder() {
        return this._triggeredHasBorder;
    }
    /**
     * Sets whether the triggered state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the triggered state should have a border.
     */
    set triggeredHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredHasBorder, hasBorder)) {
            return;
        }
        this._triggeredHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the inactive state has a border.
     *
     * @returns `true` if the inactive state has a border; otherwise, `false`.
     */
    get inactiveHasBorder() {
        return this._inactiveHasBorder;
    }
    /**
     * Sets whether the inactive state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the inactive state should have a border.
     */
    set inactiveHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveHasBorder, hasBorder)) {
            return;
        }
        this._inactiveHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled default state has a border.
     *
     * @returns `true` if the toggled default state has a border; otherwise, `false`.
     */
    get toggledDefaultHasBorder() {
        return this._toggledDefaultHasBorder;
    }
    /**
     * Sets whether the toggled default state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the toggled default state should have a border.
     */
    set toggledDefaultHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultHasBorder, hasBorder)) {
            return;
        }
        this._toggledDefaultHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled hover state has a border.
     *
     * @returns `true` if the toggled hover state has a border; otherwise, `false`.
     */
    get toggledHoverHasBorder() {
        return this._toggledHoverHasBorder;
    }
    /**
     * Sets whether the toggled hover state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the toggled hover state should have a border.
     */
    set toggledHoverHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverHasBorder, hasBorder)) {
            return;
        }
        this._toggledHoverHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled triggered state has a border.
     *
     * @returns `true` if the toggled triggered state has a border; otherwise, `false`.
     */
    get toggledTriggeredHasBorder() {
        return this._toggledTriggeredHasBorder;
    }
    /**
     * Sets whether the toggled triggered state has a border and initializes the visual states.
     *
     * @param hasBorder - A boolean indicating whether the toggled triggered state should have a border.
     */
    set toggledTriggeredHasBorder(hasBorder) {
        if (hasBorder === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredHasBorder, hasBorder)) {
            return;
        }
        this._toggledTriggeredHasBorder = hasBorder;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the default state.
     *
     * @returns The border type for the default state.
     */
    get defaultBorderType() {
        return this._defaultBorderType;
    }
    /**
     * Sets the border type for the default state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the default state.
     */
    set defaultBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultBorderType, borderType)) {
            return;
        }
        this._defaultBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the hover state.
     *
     * @returns The border type for the hover state.
     */
    get hoverBorderType() {
        return this._hoverBorderType;
    }
    /**
     * Sets the border type for the hover state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the hover state.
     */
    set hoverBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverBorderType, borderType)) {
            return;
        }
        this._hoverBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the triggered state.
     *
     * @returns The border type for the triggered state.
     */
    get triggeredBorderType() {
        return this._triggeredBorderType;
    }
    /**
     * Sets the border type for the triggered state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the triggered state.
     */
    set triggeredBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredBorderType, borderType)) {
            return;
        }
        this._triggeredBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the inactive state.
     *
     * @returns The border type for the inactive state.
     */
    get inactiveBorderType() {
        return this._inactiveBorderType;
    }
    /**
     * Sets the border type for the inactive state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the inactive state.
     */
    set inactiveBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveBorderType, borderType)) {
            return;
        }
        this._inactiveBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the toggled default state.
     *
     * @returns The border type for the toggled default state.
     */
    get toggledDefaultBorderType() {
        return this._toggledDefaultBorderType;
    }
    /**
     * Sets the border type for the toggled default state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the toggled default state.
     */
    set toggledDefaultBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultBorderType, borderType)) {
            return;
        }
        this._toggledDefaultBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the toggled hover state.
     *
     * @returns The border type for the toggled hover state.
     */
    get toggledHoverBorderType() {
        return this._toggledHoverBorderType;
    }
    /**
     * Sets the border type for the toggled hover state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the toggled hover state.
     */
    set toggledHoverBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverBorderType, borderType)) {
            return;
        }
        this._toggledHoverBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border type for the toggled triggered state.
     *
     * @returns The border type for the toggled triggered state.
     */
    get toggledTriggeredBorderType() {
        return this._toggledTriggeredBorderType;
    }
    /**
     * Sets the border type for the toggled triggered state and initializes the visual states.
     *
     * @param borderType - The border type to be set for the toggled triggered state.
     */
    set toggledTriggeredBorderType(borderType) {
        if (borderType === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredBorderType, borderType)) {
            return;
        }
        this._toggledTriggeredBorderType = borderType;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the default state.
     *
     * @returns The border size for the default state.
     */
    get defaultBorderSize() {
        return this._defaultBorderSize;
    }
    /**
     * Sets the border size for the default state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the default state.
     */
    set defaultBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultBorderSize, borderSize)) {
            return;
        }
        this._defaultBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the hover state.
     *
     * @returns The border size for the hover state.
     */
    get hoverBorderSize() {
        return this._hoverBorderSize;
    }
    /**
     * Sets the border size for the hover state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the hover state.
     */
    set hoverBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverBorderSize, borderSize)) {
            return;
        }
        this._hoverBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the triggered state.
     *
     * @returns The border size for the triggered state.
     */
    get triggeredBorderSize() {
        return this._triggeredBorderSize;
    }
    /**
     * Sets the border size for the triggered state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the triggered state.
     */
    set triggeredBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredBorderSize, borderSize)) {
            return;
        }
        this._triggeredBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the inactive state.
     *
     * @returns The border size for the inactive state.
     */
    get inactiveBorderSize() {
        return this._inactiveBorderSize;
    }
    /**
     * Sets the border size for the inactive state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the inactive state.
     */
    set inactiveBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveBorderSize, borderSize)) {
            return;
        }
        this._inactiveBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the toggled default state.
     *
     * @returns The border size for the toggled default state.
     */
    get toggledDefaultBorderSize() {
        return this._toggledDefaultBorderSize;
    }
    /**
     * Sets the border size for the toggled default state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the toggled default state.
     */
    set toggledDefaultBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultBorderSize, borderSize)) {
            return;
        }
        this._toggledDefaultBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the toggled hover state.
     *
     * @returns The border size for the toggled hover state.
     */
    get toggledHoverBorderSize() {
        return this._toggledHoverBorderSize;
    }
    /**
     * Sets the border size for the toggled hover state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the toggled hover state.
     */
    set toggledHoverBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverBorderSize, borderSize)) {
            return;
        }
        this._toggledHoverBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the border size for the toggled triggered state.
     *
     * @returns The border size for the toggled triggered state.
     */
    get toggledTriggeredBorderSize() {
        return this._toggledTriggeredBorderSize;
    }
    /**
     * Sets the border size for the toggled triggered state and initializes the visual states.
     *
     * @param borderSize - The border size to be set for the toggled triggered state.
     */
    set toggledTriggeredBorderSize(borderSize) {
        if (borderSize === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredBorderSize, borderSize)) {
            return;
        }
        this._toggledTriggeredBorderSize = borderSize;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    updateGradient(gradient) {
        if (!this.shouldColorChange || !this.isBaseGradient) {
            return;
        }
        this.roundedRectangle.setBackgroundGradient(gradient);
    }
    updateBorderColors(borderColor) {
        if (!this.shouldColorChange || !this.hasBorder || this.isBorderGradient) {
            return;
        }
        this._borderColorChangeCancelSet.cancel();
        const from = this.roundedRectangle.borderColor;
        (0, animate_1.default)({
            duration: this.animateDuration,
            cancelSet: this._borderColorChangeCancelSet,
            update: (t) => {
                this.roundedRectangle.borderColor = vec4.lerp(from, borderColor, t);
            }
        });
    }
    updateBorderGradient(gradient) {
        if (!this.hasBorder || !this.isBorderGradient) {
            return;
        }
        this.roundedRectangle.setBorderGradient(gradient);
    }
    updateBorderSize(borderSize) {
        if (!this.hasBorder) {
            return;
        }
        this.roundedRectangle.borderSize = borderSize;
    }
    updateHasBorder(hasBorder) {
        if (hasBorder !== undefined) {
            this.hasBorder = hasBorder;
        }
    }
    updateIsBaseGradient(isBaseGradient) {
        if (isBaseGradient !== undefined) {
            this.isBaseGradient = isBaseGradient;
        }
    }
    updateBorderType(borderType) {
        if (borderType !== undefined) {
            this.isBorderGradient = borderType === "Gradient";
        }
    }
    /**
     * Prints the configuration of the rounded rectangle visual to the console.
     */
    printConfig() {
        this.roundedRectangle.printConfig();
    }
    applyStyleParameters(parameters) {
        // First call the parent method to handle base VisualState properties
        super.applyStyleParameters(parameters);
        // Then handle RoundedRectangle-specific properties
        // Base gradient parameters
        this.applyStyleProperty(parameters, "baseGradient", {
            default: (value) => (this.defaultGradient = value),
            hover: (value) => (this.hoverGradient = value),
            triggered: (value) => (this.triggeredGradient = value),
            inactive: (value) => (this.inactiveGradient = value),
            toggledDefault: (value) => (this.toggledDefaultGradient = value),
            toggledHover: (value) => (this.toggledHoverGradient = value),
            toggledTriggered: (value) => (this.toggledTriggeredGradient = value)
        });
        // IsBaseGradient flags
        this.applyStyleProperty(parameters, "isBaseGradient", {
            default: (value) => (this.defaultIsBaseGradient = value),
            hover: (value) => (this.hoverIsBaseGradient = value),
            triggered: (value) => (this.triggeredIsBaseGradient = value),
            inactive: (value) => (this.inactiveIsBaseGradient = value),
            toggledDefault: (value) => (this.toggledDefaultIsBaseGradient = value),
            toggledHover: (value) => (this.toggledHoverIsBaseGradient = value),
            toggledTriggered: (value) => (this.toggledTriggeredIsBaseGradient = value)
        });
        // HasBorder flags
        this.applyStyleProperty(parameters, "hasBorder", {
            default: (value) => (this.defaultHasBorder = value),
            hover: (value) => (this.hoverHasBorder = value),
            triggered: (value) => (this.triggeredHasBorder = value),
            inactive: (value) => (this.inactiveHasBorder = value),
            toggledDefault: (value) => (this.toggledDefaultHasBorder = value),
            toggledHover: (value) => (this.toggledHoverHasBorder = value),
            toggledTriggered: (value) => (this.toggledTriggeredHasBorder = value)
        });
        // Border types
        this.applyStyleProperty(parameters, "borderType", {
            default: (value) => (this.defaultBorderType = value),
            hover: (value) => (this.hoverBorderType = value),
            triggered: (value) => (this.triggeredBorderType = value),
            inactive: (value) => (this.inactiveBorderType = value),
            toggledDefault: (value) => (this.toggledDefaultBorderType = value),
            toggledHover: (value) => (this.toggledHoverBorderType = value),
            toggledTriggered: (value) => (this.toggledTriggeredBorderType = value)
        });
        // Border sizes
        this.applyStyleProperty(parameters, "borderSize", {
            default: (value) => (this.defaultBorderSize = value),
            hover: (value) => (this.hoverBorderSize = value),
            triggered: (value) => (this.triggeredBorderSize = value),
            inactive: (value) => (this.inactiveBorderSize = value),
            toggledDefault: (value) => (this.toggledDefaultBorderSize = value),
            toggledHover: (value) => (this.toggledHoverBorderSize = value),
            toggledTriggered: (value) => (this.toggledTriggeredBorderSize = value)
        });
        // Border colors
        this.applyStyleProperty(parameters, "borderColor", {
            default: (value) => (this.borderDefaultColor = value),
            hover: (value) => (this.borderHoverColor = value),
            triggered: (value) => (this.borderTriggeredColor = value),
            inactive: (value) => (this.borderInactiveColor = value),
            toggledDefault: (value) => (this.borderToggledDefaultColor = value),
            toggledHover: (value) => (this.borderToggledHoverColor = value),
            toggledTriggered: (value) => (this.borderToggledTriggeredColor = value)
        });
        // Border gradients
        this.applyStyleProperty(parameters, "borderGradient", {
            default: (value) => (this.borderDefaultGradient = value),
            hover: (value) => (this.borderHoverGradient = value),
            triggered: (value) => (this.borderTriggeredGradient = value),
            inactive: (value) => (this.borderInactiveGradient = value),
            toggledDefault: (value) => (this.borderToggledDefaultGradient = value),
            toggledHover: (value) => (this.borderToggledHoverGradient = value),
            toggledTriggered: (value) => (this.borderToggledTriggeredGradient = value)
        });
    }
    updateVisualStates() {
        this._roundedRectangleVisualStates = new Map([
            [
                Element_1.StateName.default,
                {
                    baseColor: this.baseDefaultColor,
                    isBaseGradient: this.defaultIsBaseGradient,
                    hasBorder: this.defaultHasBorder,
                    borderSize: this.defaultBorderSize,
                    borderType: this.defaultBorderType,
                    baseGradient: this.defaultGradient,
                    borderColor: this.borderDefaultColor,
                    borderGradient: this.borderDefaultGradient,
                    shouldPosition: this.defaultShouldPosition,
                    shouldScale: this.defaultShouldScale,
                    localScale: this.defaultScale,
                    localPosition: this.defaultPosition
                }
            ],
            [
                Element_1.StateName.hover,
                {
                    baseColor: this.baseHoverColor,
                    baseGradient: this.hoverGradient,
                    hasBorder: this.hoverHasBorder,
                    borderSize: this.hoverBorderSize,
                    borderColor: this.borderHoverColor,
                    borderGradient: this.borderHoverGradient,
                    shouldPosition: this.hoverShouldPosition,
                    shouldScale: this.hoverShouldScale,
                    localScale: this.hoverScale,
                    localPosition: this.hoverPosition
                }
            ],
            [
                Element_1.StateName.triggered,
                {
                    baseColor: this.baseTriggeredColor,
                    baseGradient: this.triggeredGradient,
                    hasBorder: this.triggeredHasBorder,
                    borderSize: this.triggeredBorderSize,
                    borderColor: this.borderTriggeredColor,
                    borderGradient: this.borderTriggeredGradient,
                    shouldPosition: this.triggeredShouldPosition,
                    shouldScale: this.triggeredShouldScale,
                    localScale: this.triggeredScale,
                    localPosition: this.triggeredPosition
                }
            ],
            [
                Element_1.StateName.toggledHovered,
                {
                    baseColor: this.baseToggledHoverColor,
                    baseGradient: this.toggledHoverGradient,
                    hasBorder: this.toggledHoverHasBorder,
                    borderSize: this.toggledHoverBorderSize,
                    borderColor: this.borderToggledHoverColor,
                    borderGradient: this.borderToggledHoverGradient,
                    shouldPosition: this.toggledHoverShouldPosition,
                    shouldScale: this.toggledHoverShouldScale,
                    localScale: this.toggledHoverScale,
                    localPosition: this.toggledHoverPosition
                }
            ],
            [
                Element_1.StateName.toggledDefault,
                {
                    baseColor: this.baseTriggeredColor,
                    baseGradient: this.toggledDefaultGradient,
                    hasBorder: this.toggledDefaultHasBorder,
                    borderSize: this.toggledDefaultBorderSize,
                    borderColor: this.borderToggledDefaultColor,
                    borderGradient: this.borderToggledDefaultGradient,
                    shouldPosition: this.toggledDefaultShouldPosition,
                    shouldScale: this.toggledDefaultShouldScale,
                    localScale: this.toggledScale,
                    localPosition: this.toggledPosition
                }
            ],
            [
                Element_1.StateName.toggledTriggered,
                {
                    baseColor: this.baseTriggeredColor,
                    baseGradient: this.toggledTriggeredGradient,
                    hasBorder: this.toggledTriggeredHasBorder,
                    borderSize: this.toggledTriggeredBorderSize,
                    borderColor: this.borderToggledTriggeredColor,
                    borderGradient: this.borderToggledTriggeredGradient,
                    shouldPosition: this.toggledTriggeredShouldPosition,
                    shouldScale: this.toggledTriggeredShouldScale,
                    localScale: this.toggledTriggeredScale,
                    localPosition: this.toggledTriggeredPosition
                }
            ],
            [
                Element_1.StateName.error,
                {
                    baseColor: this.baseErrorColor,
                    baseGradient: this.defaultGradient,
                    hasBorder: this.defaultHasBorder,
                    borderSize: this.defaultBorderSize,
                    borderColor: this.baseErrorColor,
                    borderGradient: this.borderDefaultGradient,
                    shouldPosition: this.defaultShouldPosition,
                    shouldScale: this.defaultShouldScale,
                    localScale: this.errorScale,
                    localPosition: this.errorPosition
                }
            ],
            [
                Element_1.StateName.errorHover,
                {
                    baseColor: this.baseErrorColor,
                    baseGradient: this.hoverGradient,
                    hasBorder: this.hoverHasBorder,
                    borderSize: this.hoverBorderSize,
                    borderColor: this.baseErrorColor,
                    borderGradient: this.borderHoverGradient,
                    shouldPosition: this.hoverShouldPosition,
                    shouldScale: this.hoverShouldScale,
                    localScale: this.hoverScale,
                    localPosition: this.errorPosition
                }
            ],
            [
                Element_1.StateName.inactive,
                {
                    baseColor: this.baseInactiveColor,
                    baseGradient: this.inactiveGradient,
                    hasBorder: this.inactiveHasBorder,
                    borderSize: this.inactiveBorderSize,
                    borderColor: this.borderInactiveColor,
                    borderGradient: this.borderInactiveGradient,
                    shouldPosition: this.inactiveShouldPosition,
                    shouldScale: this.inactiveShouldScale,
                    localScale: this.inactiveScale,
                    localPosition: this.inactivePosition
                }
            ]
        ]);
        super.updateVisualStates();
    }
    get roundedRectangle() {
        return this._visualComponent;
    }
    set roundedRectangle(value) {
        this._visualComponent = value;
    }
}
exports.RoundedRectangleVisual = RoundedRectangleVisual;
//# sourceMappingURL=RoundedRectangleVisual.js.map