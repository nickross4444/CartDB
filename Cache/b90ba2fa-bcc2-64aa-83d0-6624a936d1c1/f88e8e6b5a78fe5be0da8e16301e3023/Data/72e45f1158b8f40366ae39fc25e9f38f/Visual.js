"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visual = exports.INACTIVE_COLOR = exports.ERROR_COLOR = exports.COLORS = void 0;
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const color_1 = require("SpectaclesInteractionKit.lspkg/Utils/color");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const Element_1 = require("../Components/Element");
const SnapOS2_1 = require("../Themes/SnapOS-2.0/SnapOS2");
const UIKitUtilities_1 = require("../Utility/UIKitUtilities");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = new NativeLogger_1.default("Visual");
exports.COLORS = {
    gray: (0, color_1.withAlpha)((0, color_1.HSLToRGB)(new vec3(0, 0, 0.4)), 1),
    darkGray: (0, color_1.withAlpha)((0, color_1.HSLToRGB)(new vec3(0, 0, 0.24)), 1),
    lightGray: (0, color_1.withAlpha)((0, color_1.HSLToRGB)(new vec3(0, 0, 0.56)), 1),
    brightYellow: (0, color_1.withAlpha)((0, color_1.HSLToRGB)(new vec3(47.7, 0.8, 0.55)), 1),
    brighterYellow: (0, color_1.withAlpha)((0, color_1.HSLToRGB)(new vec3(41.7, 0.847, 0.9253)), 1)
};
// mesh
exports.ERROR_COLOR = new vec4(0.8, 0.2, 0.2, 1);
exports.INACTIVE_COLOR = new vec4(0.2, 0.2, 0.2, 0.2);
const DEFAULT_FADE_DURATION = 0.2;
/**
 * The `Visual` abstract class serves as a base class for creating visual components
 * with customizable states, animations, and interactions. It provides a framework
 * for managing visual properties such as color, scale, and position states.
 *
 * @abstract
 */
class Visual {
    /**
     * Gets the associated `SceneObject` instance.
     *
     * @returns {SceneObject} The `SceneObject` associated with this visual.
     */
    get sceneObject() {
        return this._sceneObject;
    }
    /**
     * Gets the transform associated with this visual.
     *
     * @returns {Transform} The current transform of the visual.
     */
    get transform() {
        return this._transform;
    }
    /**
     * Gets the collider associated with this visual.
     *
     * @returns {ColliderComponent} The current collider of the visual.
     */
    get collider() {
        return this._collider;
    }
    /**
     * Binds the collider for the visual element.
     *
     * @param collider - An instance of `ColliderComponent` representing the collider to be assigned.
     */
    set collider(collider) {
        if (collider === undefined) {
            return;
        }
        this._collider = collider;
    }
    /**
     * Gets the size of the visual element.
     *
     * @returns A `vec3` representing the dimensions of the visual element.
     */
    get size() {
        return this._size;
    }
    /**
     * Sets the size of the visual element.
     * Updates both the internal `_size` property and the `visualSize` property.
     *
     * @param size - A `vec3` object representing the dimensions of the visual element.
     */
    set size(size) {
        if (size === undefined) {
            return;
        }
        this._size = size;
        this.visualSize = size;
    }
    /**
     * Determines whether the color should change when transition to a new state.
     *
     * @returns {boolean} A boolean value indicating if the color change is enabled.
     */
    get shouldColorChange() {
        return this._shouldColorChange;
    }
    /**
     * Sets whether to enable the color changing behavior for the visual.
     *
     * @param shouldColorChange - A boolean indicating whether the color change is enabled (`true`) or disabled (`false`).
     */
    set shouldColorChange(shouldColorChange) {
        if (shouldColorChange === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._shouldColorChange, shouldColorChange)) {
            return;
        }
        const wasColorChanging = this._shouldColorChange;
        this._shouldColorChange = shouldColorChange;
        if (wasColorChanging && !this._shouldColorChange) {
            this._colorChangeCancelSet.cancel();
        }
    }
    /**
     * Gets the default base color for the visual element.
     *
     * @returns A `vec4` representing the current base default color.
     */
    get baseDefaultColor() {
        return this._defaultColor;
    }
    /**
     * Sets the default base color for the visual element.
     *
     * @param baseDefaultColor - A `vec4` representing the RGBA color to be used as the default.
     */
    set baseDefaultColor(baseDefaultColor) {
        if (baseDefaultColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultColor, baseDefaultColor)) {
            return;
        }
        this._defaultColor = baseDefaultColor;
        if (!this._shouldColorChange) {
            this.baseColor = baseDefaultColor;
        }
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the hover color for the visual element.
     *
     * @returns A `vec4` representing the current hover color.
     */
    get baseHoverColor() {
        return this._hoverColor;
    }
    /**
     * Gets the default base color for the visual element.
     *
     * @returns A `vec4` representing the current base default color.
     */
    set baseHoverColor(baseHoverColor) {
        if (baseHoverColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverColor, baseHoverColor)) {
            return;
        }
        this._hoverColor = baseHoverColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the triggered color for the visual element.
     *
     * @returns A `vec4` representing the current triggered color.
     */
    get baseTriggeredColor() {
        return this._triggeredColor;
    }
    /**
     * Gets the triggered color for the visual element.
     *
     * @returns A `vec4` representing the current triggered color.
     */
    set baseTriggeredColor(baseTriggeredColor) {
        if (baseTriggeredColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredColor, baseTriggeredColor)) {
            return;
        }
        this._triggeredColor = baseTriggeredColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled default color for the visual element.
     *
     * @returns A `vec4` representing the current toggled default color.
     */
    get baseToggledDefaultColor() {
        return this._toggledDefaultColor;
    }
    /**
     * Sets the toggled default color for the visual element.
     *
     * @param baseToggledDefaultColor - A `vec4` representing the RGBA color to be used as the toggled default color.
     */
    set baseToggledDefaultColor(baseToggledDefaultColor) {
        if (baseToggledDefaultColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultColor, baseToggledDefaultColor)) {
            return;
        }
        this._toggledDefaultColor = baseToggledDefaultColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled hover color for the visual element.
     *
     * @returns A `vec4` representing the current toggled hover color.
     */
    get baseToggledHoverColor() {
        return this._toggledHoverColor;
    }
    /**
     * Sets the toggled hover color for the visual element.
     *
     * @param baseToggledHoverColor - A `vec4` representing the RGBA color to be used as the toggled hover color.
     */
    set baseToggledHoverColor(baseToggledHoverColor) {
        if (baseToggledHoverColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverColor, baseToggledHoverColor)) {
            return;
        }
        this._toggledHoverColor = baseToggledHoverColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled triggered color for the visual element.
     *
     * @returns A `vec4` representing the current toggled triggered color.
     */
    get baseToggledTriggeredColor() {
        return this._toggledTriggeredColor;
    }
    /**
     * Sets the toggled triggered color for the visual element.
     *
     * @param baseToggledTriggeredColor - A `vec4` representing the RGBA color to be used as the toggled triggered color.
     */
    set baseToggledTriggeredColor(baseToggledTriggeredColor) {
        if (baseToggledTriggeredColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredColor, baseToggledTriggeredColor)) {
            return;
        }
        this._toggledTriggeredColor = baseToggledTriggeredColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the inactive color for the visual element.
     *
     * @returns A `vec4` representing the current inactive color.
     */
    get baseInactiveColor() {
        return this._inactiveColor;
    }
    /**
     * Sets the inactive color for the visual element.
     *
     * @param baseInactiveColor - A `vec4` representing the RGBA color to be used as the inactive color.
     */
    set baseInactiveColor(baseInactiveColor) {
        if (baseInactiveColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveColor, baseInactiveColor)) {
            return;
        }
        this._inactiveColor = baseInactiveColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the error color for the visual element.
     *
     * @returns A `vec4` representing the current error color.
     */
    get baseErrorColor() {
        return this._errorColor;
    }
    /**
     * Sets the error color for the visual element.
     *
     * @param baseErrorColor - A `vec4` representing the RGBA color to be used as the error color.
     */
    set baseErrorColor(baseErrorColor) {
        if (baseErrorColor === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._errorColor, baseErrorColor)) {
            return;
        }
        this._errorColor = baseErrorColor;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Determines whether the visual element should scale when transitioning to a new state
     *
     * @returns {boolean} `true` if the visual element should scale, otherwise `false`.
     */
    get shouldScale() {
        return this._shouldScale;
    }
    /**
     * Sets whether to enable the scaling behavior of the visual.
     *
     * @param shouldScale - A boolean value indicating whether scaling is enabled.
     */
    set shouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._shouldScale, shouldScale)) {
            return;
        }
        const wasScaling = this._shouldScale;
        this._shouldScale = shouldScale;
        if (wasScaling && !this._shouldScale) {
            this._updateScaleCancelSet.cancel();
        }
    }
    /**
     * Gets the default scale of the visual element.
     *
     * @returns A `vec3` representing the current default scale.
     */
    get defaultScale() {
        return this._defaultScale;
    }
    /**
     * Sets the default scale of the visual and initializes its visual states.
     *
     * @param scale - A `vec3` object representing the default scale to be applied.
     */
    set defaultScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultScale, scale)) {
            return;
        }
        this._defaultScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the hover scale of the visual element.
     *
     * @returns A `vec3` representing the current hover scale.
     */
    get hoverScale() {
        return this._hoverScale;
    }
    /**
     * Sets the hover scale for the visual element and initializes its visual states.
     *
     * @param scale - A `vec3` object representing the hover scale to be applied.
     */
    set hoverScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverScale, scale)) {
            return;
        }
        this._hoverScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the triggered scale of the visual element.
     *
     * @returns A `vec3` representing the current triggered scale.
     */
    get triggeredScale() {
        return this._triggeredScale;
    }
    /**
     * Sets the triggered scale of the visual and initializes its visual states.
     *
     * @param scale - A `vec3` representing the scale to be applied to the visual.
     */
    set triggeredScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredScale, scale)) {
            return;
        }
        this._triggeredScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled scale of the visual element.
     *
     * @returns A `vec3` representing the current toggled scale.
     */
    get toggledScale() {
        return this._toggledScale;
    }
    /**
     * Sets the scale to be applied when the visual is toggled and initializes its visual states.
     *
     * @param scale - A `vec3` representing the new scale to apply when toggled.
     */
    set toggledScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledScale, scale)) {
            return;
        }
        this._toggledScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled hover scale of the visual element.
     *
     * @returns A `vec3` representing the current toggled hover scale.
     */
    get toggledHoverScale() {
        return this._toggledHoverScale;
    }
    /**
     * Sets the scale to be applied when the visual is toggled and hovered over.
     *
     * @param scale - A `vec3` representing the new scale to apply when toggled and hovered.
     */
    set toggledHoverScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverScale, scale)) {
            return;
        }
        this._toggledHoverScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled triggered scale of the visual element.
     *
     * @returns A `vec3` representing the current toggled triggered scale.
     */
    get toggledTriggeredScale() {
        return this._toggledTriggeredScale;
    }
    /**
     * Sets the toggled triggered scale of the visual element.
     *
     * @param scale - A `vec3` object representing the new toggled triggered scale.
     */
    set toggledTriggeredScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredScale, scale)) {
            return;
        }
        this._toggledTriggeredScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the scale applied when the visual is in a inactive state.
     *
     * @returns A `vec3` representing the current inactive scale.
     */
    get inactiveScale() {
        return this._inactiveScale;
    }
    /**
     * Sets the scale to be applied when the visual is in a inactive state and initializes its visual states.
     *
     * @param scale - A `vec3` object representing the scale to apply in the inactive state.
     */
    set inactiveScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveScale, scale)) {
            return;
        }
        this._inactiveScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the scale applied when the visual is in an error state.
     *
     * @returns A `vec3` representing the current error scale.
     */
    get errorScale() {
        return this._errorScale;
    }
    /**
     * Sets the scale for the error visualization and initializes its visual states.
     *
     * @param scale - A `vec3` object representing the scale to be applied to the error visualization.
     */
    set errorScale(scale) {
        if (scale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._errorScale, scale)) {
            return;
        }
        this._errorScale = scale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Indicates whether the visual element should be translated when transitioning to a new state.
     *
     * @returns {boolean} `true` if the visual element should be translated; otherwise, `false`.
     */
    get shouldTranslate() {
        return this._shouldTranslate;
    }
    /**
     * Sets whether to enable the translating behaviors.
     *
     * @param shouldTranslate - A boolean value indicating whether the translation behavior is enabled.
     */
    set shouldTranslate(shouldTranslate) {
        if (shouldTranslate === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._shouldTranslate, shouldTranslate)) {
            return;
        }
        const wasTranslating = this._shouldTranslate;
        this._shouldTranslate = shouldTranslate;
        if (wasTranslating && !this._shouldTranslate) {
            this._updatePositionCancelSet.cancel();
        }
    }
    /**
     * Gets the default position of the visual element.
     *
     * @returns A `vec3` representing the current default position.
     */
    get defaultPosition() {
        return this._defaultPosition;
    }
    /**
     * Sets the default position of the visual element.
     *
     * @param position - A `vec3` object representing the new default position.
     */
    set defaultPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultPosition, position)) {
            return;
        }
        this._defaultPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
            if (!this.shouldTranslate) {
                this._transform.setLocalPosition(position);
            }
        }
    }
    /**
     * Gets the hover position of the visual element.
     *
     * @returns A `vec3` representing the current hover position.
     */
    get hoverPosition() {
        return this._hoverPosition;
    }
    /**
     * Gets the hover position of the visual element.
     *
     * @returns A `vec3` representing the new hover position.
     */
    set hoverPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverPosition, position)) {
            return;
        }
        this._hoverPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the triggered position of the visual element.
     *
     * @returns A `vec3` representing the current triggered position.
     */
    get triggeredPosition() {
        return this._triggeredPosition;
    }
    /**
     * Sets the triggered position of the visual element.
     *
     * @param position - A `vec3` object representing the new triggered position.
     */
    set triggeredPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredPosition, position)) {
            return;
        }
        this._triggeredPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled position of the visual element.
     *
     * @returns A `vec3` representing the current toggled position.
     */
    get toggledPosition() {
        return this._toggledPosition;
    }
    /**
     * Sets the toggled position of the visual element.
     *
     * @param position - A `vec3` object representing the new toggled position.
     */
    set toggledPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledPosition, position)) {
            return;
        }
        this._toggledPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled hovered position of the visual element.
     *
     * @returns A `vec3` representing the current toggled hovered position.
     */
    get toggledHoverPosition() {
        return this._toggledHoverPosition;
    }
    /**
     * Sets the toggled hovered position of the visual element.
     *
     * @param position - A `vec3` object representing the new toggled hovered position.
     */
    set toggledHoverPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverPosition, position)) {
            return;
        }
        this._toggledHoverPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the toggled triggered position of the visual element.
     *
     * @returns A `vec3` representing the current toggled triggered position.
     */
    get toggledTriggeredPosition() {
        return this._toggledTriggeredPosition;
    }
    /**
     * Sets the toggled triggered position of the visual element.
     *
     * @param position - A `vec3` object representing the new toggled triggered position.
     */
    set toggledTriggeredPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredPosition, position)) {
            return;
        }
        this._toggledTriggeredPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the position of the visual element when it is in a inactive state.
     *
     * @returns A `vec3` representing the current inactive position.
     */
    get inactivePosition() {
        return this._inactivePosition;
    }
    /**
     * Sets the position of the visual element when it is in a inactive state.
     *
     * @param position - A `vec3` object representing the new position for the inactive state.
     */
    set inactivePosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactivePosition, position)) {
            return;
        }
        this._inactivePosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the position of the visual element when it is in an error state.
     *
     * @returns A `vec3` representing the current error position.
     */
    get errorPosition() {
        return this._errorPosition;
    }
    /**
     * Sets the position of the visual element when it is in an error state.
     *
     * @param position - A `vec3` object representing the new position for the error state.
     */
    set errorPosition(position) {
        if (position === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._errorPosition, position)) {
            return;
        }
        this._errorPosition = position;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the default state should apply position changes.
     *
     * @returns `true` if the default state should apply position changes; otherwise, `false`.
     */
    get defaultShouldPosition() {
        return this._defaultShouldPosition;
    }
    /**
     * Sets whether the default state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the default state should apply position changes.
     */
    set defaultShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultShouldPosition, shouldPosition)) {
            return;
        }
        this._defaultShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the hover state should apply position changes.
     *
     * @returns `true` if the hover state should apply position changes; otherwise, `false`.
     */
    get hoverShouldPosition() {
        return this._hoverShouldPosition;
    }
    /**
     * Sets whether the hover state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the hover state should apply position changes.
     */
    set hoverShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverShouldPosition, shouldPosition)) {
            return;
        }
        this._hoverShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the triggered state should apply position changes.
     *
     * @returns `true` if the triggered state should apply position changes; otherwise, `false`.
     */
    get triggeredShouldPosition() {
        return this._triggeredShouldPosition;
    }
    /**
     * Sets whether the triggered state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the triggered state should apply position changes.
     */
    set triggeredShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredShouldPosition, shouldPosition)) {
            return;
        }
        this._triggeredShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the inactive state should apply position changes.
     *
     * @returns `true` if the inactive state should apply position changes; otherwise, `false`.
     */
    get inactiveShouldPosition() {
        return this._inactiveShouldPosition;
    }
    /**
     * Sets whether the inactive state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the inactive state should apply position changes.
     */
    set inactiveShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveShouldPosition, shouldPosition)) {
            return;
        }
        this._inactiveShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled default state should apply position changes.
     *
     * @returns `true` if the toggled default state should apply position changes; otherwise, `false`.
     */
    get toggledDefaultShouldPosition() {
        return this._toggledDefaultShouldPosition;
    }
    /**
     * Sets whether the toggled default state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the toggled default state should apply position changes.
     */
    set toggledDefaultShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultShouldPosition, shouldPosition)) {
            return;
        }
        this._toggledDefaultShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled hover state should apply position changes.
     *
     * @returns `true` if the toggled hover state should apply position changes; otherwise, `false`.
     */
    get toggledHoverShouldPosition() {
        return this._toggledHoverShouldPosition;
    }
    /**
     * Sets whether the toggled hover state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the toggled hover state should apply position changes.
     */
    set toggledHoverShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverShouldPosition, shouldPosition)) {
            return;
        }
        this._toggledHoverShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled triggered state should apply position changes.
     *
     * @returns `true` if the toggled triggered state should apply position changes; otherwise, `false`.
     */
    get toggledTriggeredShouldPosition() {
        return this._toggledTriggeredShouldPosition;
    }
    /**
     * Sets whether the toggled triggered state should apply position changes and initializes the visual states.
     *
     * @param shouldPosition - A boolean indicating whether the toggled triggered state should apply position changes.
     */
    set toggledTriggeredShouldPosition(shouldPosition) {
        if (shouldPosition === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredShouldPosition, shouldPosition)) {
            return;
        }
        this._toggledTriggeredShouldPosition = shouldPosition;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the default state should apply scale changes.
     *
     * @returns `true` if the default state should apply scale changes; otherwise, `false`.
     */
    get defaultShouldScale() {
        return this._defaultShouldScale;
    }
    /**
     * Sets whether the default state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the default state should apply scale changes.
     */
    set defaultShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._defaultShouldScale, shouldScale)) {
            return;
        }
        this._defaultShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the hover state should apply scale changes.
     *
     * @returns `true` if the hover state should apply scale changes; otherwise, `false`.
     */
    get hoverShouldScale() {
        return this._hoverShouldScale;
    }
    /**
     * Sets whether the hover state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the hover state should apply scale changes.
     */
    set hoverShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._hoverShouldScale, shouldScale)) {
            return;
        }
        this._hoverShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the triggered state should apply scale changes.
     *
     * @returns `true` if the triggered state should apply scale changes; otherwise, `false`.
     */
    get triggeredShouldScale() {
        return this._triggeredShouldScale;
    }
    /**
     * Sets whether the triggered state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the triggered state should apply scale changes.
     */
    set triggeredShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._triggeredShouldScale, shouldScale)) {
            return;
        }
        this._triggeredShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the inactive state should apply scale changes.
     *
     * @returns `true` if the inactive state should apply scale changes; otherwise, `false`.
     */
    get inactiveShouldScale() {
        return this._inactiveShouldScale;
    }
    /**
     * Sets whether the inactive state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the inactive state should apply scale changes.
     */
    set inactiveShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._inactiveShouldScale, shouldScale)) {
            return;
        }
        this._inactiveShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled default state should apply scale changes.
     *
     * @returns `true` if the toggled default state should apply scale changes; otherwise, `false`.
     */
    get toggledDefaultShouldScale() {
        return this._toggledDefaultShouldScale;
    }
    /**
     * Sets whether the toggled default state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the toggled default state should apply scale changes.
     */
    set toggledDefaultShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledDefaultShouldScale, shouldScale)) {
            return;
        }
        this._toggledDefaultShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled hover state should apply scale changes.
     *
     * @returns `true` if the toggled hover state should apply scale changes; otherwise, `false`.
     */
    get toggledHoverShouldScale() {
        return this._toggledHoverShouldScale;
    }
    /**
     * Sets whether the toggled hover state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the toggled hover state should apply scale changes.
     */
    set toggledHoverShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledHoverShouldScale, shouldScale)) {
            return;
        }
        this._toggledHoverShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets whether the toggled triggered state should apply scale changes.
     *
     * @returns `true` if the toggled triggered state should apply scale changes; otherwise, `false`.
     */
    get toggledTriggeredShouldScale() {
        return this._toggledTriggeredShouldScale;
    }
    /**
     * Sets whether the toggled triggered state should apply scale changes and initializes the visual states.
     *
     * @param shouldScale - A boolean indicating whether the toggled triggered state should apply scale changes.
     */
    set toggledTriggeredShouldScale(shouldScale) {
        if (shouldScale === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._toggledTriggeredShouldScale, shouldScale)) {
            return;
        }
        this._toggledTriggeredShouldScale = shouldScale;
        if (this.initialized) {
            this.needsVisualStateUpdate = true;
        }
    }
    /**
     * Gets the duration of the animation.
     *
     * @returns The duration of the animation in milliseconds.
     */
    get animateDuration() {
        return this._animateDuration;
    }
    /**
     * Sets the duration of the animation.
     *
     * @param animateDuration - The duration of the animation in milliseconds.
     */
    set animateDuration(animateDuration) {
        if (animateDuration === undefined) {
            return;
        }
        this._animateDuration = animateDuration;
    }
    /**
     * Initializes the visual component by setting up its initial scale and position,
     * and preparing its visual states. This method is typically called during the
     * setup phase to ensure the visual component is ready for use.
     */
    initialize() {
        if (this.initialized)
            return;
        if (this.visualArgs.style) {
            if (this.isVisualStyleKey(this.visualArgs.style)) {
                this.applyStyleParameters(SnapOS2_1.SnapOS2.styles[this.visualArgs.style.visualElementType][this.visualArgs.style.style]);
            }
            else {
                this.applyStyleParameters(this.visualArgs.style);
            }
        }
        this.updateVisualStates();
        this._currentPosition = this.defaultPosition;
        this._currentScale = this.defaultScale;
        this.initialized = true;
        this.onInitializedEvent.invoke();
        this._visualComponent?.createEvent("LateUpdateEvent").bind(() => {
            if (this.needsVisualStateUpdate) {
                this.updateVisualStates();
                this.needsVisualStateUpdate = false;
            }
        });
    }
    /**
     * Updates the visual state of the object based on the provided state type.
     *
     * @param stateName - The type of state to set, which determines the visual properties
     * such as color, scale, and position.
     */
    setState(stateName) {
        if (this._state === this.visualStates.get(stateName)) {
            // skip redundant calls
            return;
        }
        this.stateName = stateName;
        this._state = this.visualStates.get(stateName);
        this.updateColors(this._state.baseColor);
        this.updateScale(this._state.localScale);
        this.updatePosition(this._state.localPosition);
        this.updateShouldPosition(this._state.shouldPosition);
        this.updateShouldScale(this._state.shouldScale);
    }
    /**
     * Creates an instance of the Visual class.
     *
     * @param sceneObject - The parent SceneObject associated with this visual.
     */
    constructor(args) {
        this._size = new vec3(1, 1, 1);
        this._currentPosition = vec3.zero();
        this._currentScale = vec3.one();
        this._defaultShouldPosition = false;
        this._hoverShouldPosition = false;
        this._triggeredShouldPosition = false;
        this._inactiveShouldPosition = false;
        this._toggledDefaultShouldPosition = false;
        this._toggledHoverShouldPosition = false;
        this._toggledTriggeredShouldPosition = false;
        this._defaultShouldScale = false;
        this._hoverShouldScale = false;
        this._triggeredShouldScale = false;
        this._inactiveShouldScale = false;
        this._toggledDefaultShouldScale = false;
        this._toggledHoverShouldScale = false;
        this._toggledTriggeredShouldScale = false;
        this._defaultPosition = vec3.zero();
        this._hoverPosition = vec3.zero();
        this._triggeredPosition = new vec3(0, 0, 0.5);
        this._toggledPosition = vec3.forward();
        this._toggledHoverPosition = vec3.forward();
        this._toggledTriggeredPosition = new vec3(0, 0, 0.5);
        this._inactivePosition = vec3.zero();
        this._errorPosition = vec3.zero();
        this._defaultScale = vec3.one();
        this._hoverScale = vec3.one();
        this._triggeredScale = new vec3(0.9, 0.9, 0.9);
        this._toggledScale = new vec3(1.05, 1.05, 1.05);
        this._toggledHoverScale = new vec3(1.05, 1.05, 1.05);
        this._toggledTriggeredScale = new vec3(1, 1, 1);
        this._inactiveScale = vec3.one();
        this._errorScale = vec3.one();
        this._defaultColor = exports.COLORS.darkGray;
        this._hoverColor = exports.COLORS.brightYellow;
        this._triggeredColor = exports.COLORS.brightYellow.uniformScale(0.3);
        this._toggledDefaultColor = exports.COLORS.brightYellow.uniformScale(0.3);
        this._toggledHoverColor = exports.COLORS.brightYellow.uniformScale(0.3);
        this._toggledTriggeredColor = exports.COLORS.brightYellow.uniformScale(0.3);
        this._inactiveColor = exports.INACTIVE_COLOR;
        this._errorColor = exports.ERROR_COLOR;
        this._shouldColorChange = true;
        this._shouldScale = false;
        this._shouldTranslate = false;
        this.stateName = Element_1.StateName.default;
        this.initialized = false;
        // Amount of time it takes to animate 1 unit of distance
        this._animateDuration = DEFAULT_FADE_DURATION;
        this._colorChangeCancelSet = new animate_1.CancelSet();
        this._updateScaleCancelSet = new animate_1.CancelSet();
        this._updatePositionCancelSet = new animate_1.CancelSet();
        this.onInitializedEvent = new Event_1.default();
        this.onInitialized = this.onInitializedEvent.publicApi();
        this.onDestroyedEvent = new Event_1.default();
        this.onDestroyed = this.onDestroyedEvent.publicApi();
        this.onScaleChangedEvent = new Event_1.default();
        this.onScaleChanged = this.onScaleChangedEvent.publicApi();
        this.onPositionChangedEvent = new Event_1.default();
        this.onPositionChanged = this.onPositionChangedEvent.publicApi();
        this.needsVisualStateUpdate = true;
        this.managedComponents = [];
        this.visualArgs = args;
    }
    enable() {
        this.managedComponents.forEach((component) => {
            if (component) {
                component.enabled = true;
            }
        });
    }
    disable() {
        this.managedComponents.forEach((component) => {
            if (component) {
                component.enabled = false;
            }
        });
    }
    /**
     * Destroys the current instance.
     *
     */
    destroy() {
        this._colorChangeCancelSet.cancel();
        this._updateScaleCancelSet.cancel();
        this._updatePositionCancelSet.cancel();
        this.managedComponents.forEach((component) => {
            if (!isNull(component) && component) {
                component.destroy();
            }
        });
        this.managedComponents = [];
        this.onDestroyedEvent.invoke();
    }
    updateColors(meshColor) {
        if (!this._shouldColorChange) {
            return;
        }
        this._colorChangeCancelSet.cancel();
        const from = this.baseColor;
        (0, animate_1.default)({
            duration: this._animateDuration,
            cancelSet: this._colorChangeCancelSet,
            update: (t) => {
                this.baseColor = vec4.lerp(from, meshColor, t);
            }
        });
    }
    updateScale(scale) {
        if (!this._shouldScale) {
            return;
        }
        const from = this._currentScale;
        const to = scale;
        const difference = to.distance(from);
        const duration = difference * this._animateDuration;
        this._updateScaleCancelSet.cancel();
        (0, animate_1.default)({
            duration: duration,
            cancelSet: this._updateScaleCancelSet,
            update: (t) => {
                const newScale = vec3.lerp(from, to, t);
                const delta = newScale.div(this._currentScale);
                this.transform.setLocalScale(this.transform.getLocalScale().mult(delta));
                this._currentScale = newScale;
                this.onScaleChangedEvent.invoke({ from: from, current: this._currentScale });
            }
        });
    }
    updatePosition(pos) {
        if (!this._shouldTranslate) {
            return;
        }
        const from = this._currentPosition;
        const to = pos;
        // if both zero, return early
        if (to.equal(from) && to.equal(vec3.zero()))
            return;
        const difference = to.distance(from);
        const duration = difference * this._animateDuration;
        this._updatePositionCancelSet.cancel();
        (0, animate_1.default)({
            duration: duration,
            cancelSet: this._updatePositionCancelSet,
            update: (t) => {
                const previousPosition = this._currentPosition;
                this._currentPosition = vec3.lerp(from, to, t);
                const delta = this._currentPosition.sub(previousPosition);
                this.transform.setLocalPosition(this.transform.getLocalPosition().add(delta));
                this.onPositionChangedEvent.invoke({ from: from, current: this._currentPosition });
            }
        });
    }
    updateShouldPosition(shouldPosition) {
        // This would be used by the parent Visual class to determine
        // whether to apply position changes for the current state
        // The actual position updates are handled by the base Visual class
        this.shouldTranslate = shouldPosition;
    }
    updateShouldScale(shouldScale) {
        // This would be used by the parent Visual class to determine
        // whether to apply scale changes for the current state
        // The actual scale updates are handled by the base Visual class
        this.shouldScale = shouldScale;
    }
    applyStyleProperty(parameters, parameterName, setters) {
        const defaultParams = parameters.default;
        const defaultValue = defaultParams?.[parameterName];
        const hasDefault = defaultValue !== undefined;
        for (const stateName in setters) {
            const stateParams = parameters[stateName];
            const stateValue = stateParams?.[parameterName];
            const valueToSet = stateValue !== undefined ? stateValue : hasDefault ? defaultValue : undefined;
            if (valueToSet !== undefined) {
                setters[stateName](valueToSet);
            }
        }
    }
    applyStyleParameters(parameters) {
        this.applyStyleProperty(parameters, "baseColor", {
            default: (value) => (this.baseDefaultColor = value),
            hover: (value) => (this.baseHoverColor = value),
            triggered: (value) => (this.baseTriggeredColor = value),
            inactive: (value) => (this.baseInactiveColor = value),
            toggledDefault: (value) => (this.baseToggledDefaultColor = value),
            toggledHover: (value) => (this.baseToggledHoverColor = value),
            toggledTriggered: (value) => (this.baseToggledTriggeredColor = value)
        });
        // shouldPosition
        this.applyStyleProperty(parameters, "shouldPosition", {
            default: (value) => (this.defaultShouldPosition = value),
            hover: (value) => (this.hoverShouldPosition = value),
            triggered: (value) => (this.triggeredShouldPosition = value),
            inactive: (value) => (this.inactiveShouldPosition = value),
            toggledDefault: (value) => (this.toggledDefaultShouldPosition = value),
            toggledHover: (value) => (this.toggledHoverShouldPosition = value),
            toggledTriggered: (value) => (this.toggledTriggeredShouldPosition = value)
        });
        // shouldScale
        this.applyStyleProperty(parameters, "shouldScale", {
            default: (value) => (this.defaultShouldScale = value),
            hover: (value) => (this.hoverShouldScale = value),
            triggered: (value) => (this.triggeredShouldScale = value),
            inactive: (value) => (this.inactiveShouldScale = value),
            toggledDefault: (value) => (this.toggledDefaultShouldScale = value),
            toggledHover: (value) => (this.toggledHoverShouldScale = value),
            toggledTriggered: (value) => (this.toggledTriggeredShouldScale = value)
        });
        // localPosition
        this.applyStyleProperty(parameters, "localPosition", {
            default: (value) => (this.defaultPosition = value),
            hover: (value) => (this.hoverPosition = value),
            triggered: (value) => (this.triggeredPosition = value),
            inactive: (value) => (this.inactivePosition = value),
            toggledDefault: (value) => (this.toggledPosition = value),
            toggledHover: (value) => (this.toggledHoverPosition = value),
            toggledTriggered: (value) => (this.toggledTriggeredPosition = value)
        });
        // localScale
        this.applyStyleProperty(parameters, "localScale", {
            default: (value) => (this.defaultScale = value),
            hover: (value) => (this.hoverScale = value),
            triggered: (value) => (this.triggeredScale = value),
            inactive: (value) => (this.inactiveScale = value),
            toggledDefault: (value) => (this.toggledScale = value),
            toggledHover: (value) => (this.toggledHoverScale = value),
            toggledTriggered: (value) => (this.toggledTriggeredScale = value)
        });
    }
    updateVisualStates() {
        this.verifyStates();
        this.setState(this.stateName);
    }
    verifyStates() {
        for (const stateName of Object.values(Element_1.StateName)) {
            if (!this.visualStates.has(stateName)) {
                print(`WARNING, missing state: ${stateName}, replaced with default state`);
                const isToggleState = stateName === Element_1.StateName.toggledDefault || stateName === Element_1.StateName.toggledHovered;
                this.visualStates.set(stateName, isToggleState ? this.visualStates.get(Element_1.StateName.hover) : this.visualStates.get(Element_1.StateName.default));
            }
        }
    }
    /**
     * This function checks if the input is an object with both `visualElementType` and `style` properties,
     * and that both properties are strings. Returns `true` if the input matches the `VisualStyleKey`,
     * otherwise returns `false`.
     *
     * @param style - The value to check, which may be a `VisualStyleKey`, a partial `VisualParameters`, or `undefined`.
     * @returns `true` if `style` is a `VisualStyleKey`, otherwise `false`.
     */
    isVisualStyleKey(style) {
        return (style !== undefined &&
            typeof style === "object" &&
            "visualElementType" in style &&
            "style" in style &&
            typeof style.visualElementType === "string" &&
            typeof style.style === "string");
    }
}
exports.Visual = Visual;
//# sourceMappingURL=Visual.js.map