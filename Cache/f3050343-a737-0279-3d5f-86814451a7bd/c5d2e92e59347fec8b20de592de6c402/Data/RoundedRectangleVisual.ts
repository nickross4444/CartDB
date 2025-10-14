import animate, {CancelSet} from "SpectaclesInteractionKit.lspkg/Utils/animate"
import {withAlpha} from "SpectaclesInteractionKit.lspkg/Utils/color"
import {StateName} from "../../Components/Element"
import {isEqual} from "../../Utility/UIKitUtilities"
import {COLORS, INACTIVE_COLOR, Visual, VisualArgs, VisualParameters, VisualState} from "../Visual"
import {BorderType, GradientParameters, RoundedRectangle} from "./RoundedRectangle"

const BACKGROUND_GRADIENT_PARAMETERS: {[key: string]: GradientParameters} = {
  default: {
    enabled: true,
    type: "Rectangle",
    stop0: {enabled: true, percent: 0, color: COLORS.darkGray},
    stop1: {enabled: true, percent: 0.5, color: COLORS.darkGray},
    stop2: {enabled: true, percent: 0.95, color: COLORS.darkGray},
    stop3: {enabled: true, percent: 0.99, color: COLORS.darkGray}
  },
  hover: {
    enabled: true,
    type: "Rectangle",
    stop0: {enabled: true, percent: 0, color: COLORS.darkGray},
    stop1: {enabled: true, percent: 0.5, color: COLORS.darkGray},
    stop2: {enabled: true, percent: 0.95, color: COLORS.darkGray},
    stop3: {enabled: true, percent: 0.99, color: COLORS.darkGray}
  },
  toggled: {
    enabled: true,
    type: "Rectangle",
    stop0: {enabled: true, percent: -1, color: withAlpha(COLORS.brightYellow.uniformScale(0.3), 1)},
    stop1: {enabled: true, percent: -1, color: withAlpha(COLORS.brightYellow.uniformScale(0.3), 1)},
    stop2: {enabled: true, percent: -1, color: withAlpha(COLORS.brightYellow.uniformScale(0.3), 1)},
    stop3: {enabled: true, percent: 3, color: withAlpha(COLORS.brightYellow.uniformScale(0.9), 1)}
  }
}

const BORDER_GRADIENT_PARAMETERS: {[key: string]: GradientParameters} = {
  default: {
    enabled: true,
    start: new vec2(-1, 0),
    end: new vec2(1, 0),
    stop0: {enabled: true, percent: 0, color: COLORS.lightGray},
    stop1: {enabled: true, percent: 0.5, color: withAlpha(COLORS.lightGray.uniformScale(0.66), 1)},
    stop2: {enabled: true, percent: 1, color: COLORS.lightGray}
  },
  hover: {
    enabled: true,
    start: new vec2(-1, 0),
    end: new vec2(1, 0),
    stop0: {enabled: true, percent: 0, color: withAlpha(COLORS.brightYellow.uniformScale(0.9), 1)},
    stop1: {enabled: true, percent: 0.5, color: withAlpha(COLORS.brightYellow.uniformScale(0.66), 1)},
    stop2: {enabled: true, percent: 1, color: withAlpha(COLORS.brightYellow.uniformScale(0.9), 1)}
  },
  toggled: {
    enabled: true,
    start: new vec2(-1, 0),
    end: new vec2(1, 0),
    stop0: {enabled: true, percent: 0, color: COLORS.brightYellow},
    stop1: {enabled: true, percent: 0.5, color: COLORS.brightYellow},
    stop2: {enabled: true, percent: 1, color: COLORS.brightYellow}
  },
  toggledHovered: {
    enabled: true,
    start: new vec2(-1, 0),
    end: new vec2(1, 0),
    stop0: {enabled: true, percent: 0, color: withAlpha(COLORS.brightYellow.uniformScale(0.9), 1)},
    stop1: {enabled: true, percent: 0.5, color: withAlpha(COLORS.brightYellow.uniformScale(0.66), 1)},
    stop2: {enabled: true, percent: 1, color: withAlpha(COLORS.brightYellow.uniformScale(0.9), 1)}
  }
}

export type RoundedRectangleVisualState = {
  baseGradient?: GradientParameters
  isBaseGradient?: boolean
  borderColor?: vec4
  borderGradient?: GradientParameters
  borderSize?: number
  hasBorder?: boolean
  borderType?: BorderType
} & VisualState

export type RoundedRectangleVisualParameters = {
  default: RoundedRectangleVisualState
  hover: RoundedRectangleVisualState
  triggered: RoundedRectangleVisualState
  toggledDefault: RoundedRectangleVisualState
  toggledHover: RoundedRectangleVisualState
  toggledTriggered: RoundedRectangleVisualState
  inactive: RoundedRectangleVisualState
} & VisualParameters

export type RoundedRectangleVisualArgs = {
  transparent?: boolean
} & VisualArgs

/**
 * The `RoundedRectangleVisual` class represents a visual component that renders a rounded rectangle
 * with customizable properties such as border, gradients, and colors. It extends the base `Visual` class
 * and provides additional functionality specific to rounded rectangles.
 *
 * @extends Visual
 */
export class RoundedRectangleVisual extends Visual {
  private _borderDefaultColor: vec4 = COLORS.lightGray
  private _borderHoverColor: vec4 = COLORS.brightYellow
  private _borderTriggeredColor: vec4 = COLORS.brightYellow
  private _borderInactiveColor: vec4 = INACTIVE_COLOR
  private _borderToggledDefaultColor: vec4 = COLORS.brightYellow
  private _borderToggledHoverColor: vec4 = COLORS.brightYellow
  private _borderToggledTriggeredColor: vec4 = COLORS.brightYellow

  private _defaultIsBaseGradient: boolean = false
  private _hoverIsBaseGradient: boolean = false
  private _triggeredIsBaseGradient: boolean = false
  private _inactiveIsBaseGradient: boolean = false
  private _toggledDefaultIsBaseGradient: boolean = false
  private _toggledHoverIsBaseGradient: boolean = false
  private _toggledTriggeredIsBaseGradient: boolean = false

  private _defaultGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.default
  private _hoverGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.default
  private _triggeredGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.toggled
  private _inactiveGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.default
  private _toggledDefaultGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.default
  private _toggledHoverGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.default
  private _toggledTriggeredGradient: GradientParameters = BACKGROUND_GRADIENT_PARAMETERS.toggled

  private _defaultHasBorder: boolean = false
  private _hoverHasBorder: boolean = false
  private _triggeredHasBorder: boolean = false
  private _inactiveHasBorder: boolean = false
  private _toggledDefaultHasBorder: boolean = false
  private _toggledHoverHasBorder: boolean = false
  private _toggledTriggeredHasBorder: boolean = false

  private _defaultBorderType: BorderType = "Gradient"
  private _hoverBorderType: BorderType = "Gradient"
  private _triggeredBorderType: BorderType = "Gradient"
  private _inactiveBorderType: BorderType = "Gradient"
  private _toggledDefaultBorderType: BorderType = "Gradient"
  private _toggledHoverBorderType: BorderType = "Gradient"
  private _toggledTriggeredBorderType: BorderType = "Gradient"

  private _defaultBorderSize: number = 0.1
  private _hoverBorderSize: number = 0.1
  private _triggeredBorderSize: number = 0.1
  private _inactiveBorderSize: number = 0.1
  private _toggledDefaultBorderSize: number = 0.1
  private _toggledHoverBorderSize: number = 0.1
  private _toggledTriggeredBorderSize: number = 0.1

  private _borderDefaultGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.default
  private _borderHoverGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.hover
  private _borderTriggeredGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.toggled
  private _borderInactiveGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.default
  private _borderToggledDefaultGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.toggled
  private _borderToggledHoverGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.toggledHovered
  private _borderToggledTriggeredGradient: GradientParameters = BORDER_GRADIENT_PARAMETERS.toggled

  private _borderColorChangeCancelSet: CancelSet = new CancelSet()
  private _hasBorder: boolean = false

  private _roundedRectangleVisualStates: Map<StateName, RoundedRectangleVisualState>
  protected _state: RoundedRectangleVisualState

  protected get visualStates(): Map<StateName, RoundedRectangleVisualState> {
    return this._roundedRectangleVisualStates
  }

  /**
   * Gets the `RenderMeshVisual` associated with the rounded rectangle.
   *
   * @returns {RenderMeshVisual} The visual representation of the rounded rectangle's mesh.
   */
  public get renderMeshVisual(): RenderMeshVisual {
    return this.roundedRectangle.renderMeshVisual
  }

  /**
   * Retrieves the base color of the rounded rectangle visual.
   *
   * @returns {vec4} The background color of the rounded rectangle as a `vec4` value.
   */
  public get baseColor(): vec4 {
    return this.roundedRectangle.backgroundColor
  }

  /**
   * Indicates whether the rounded rectangle visual has a border.
   *
   * @returns `true` if the visual has a border; otherwise, `false`.
   */
  public get hasBorder(): boolean {
    return this._hasBorder
  }

  /**
   * Sets whether the rounded rectangle has a border.
   *
   * @param hasBorder - A boolean indicating whether the rounded rectangle should have a border.
   */
  public set hasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    this._hasBorder = hasBorder
    this.roundedRectangle.border = hasBorder
  }

  /**
   * Gets the size of the border for the rounded rectangle.
   *
   * @returns The border size as a number.
   */
  public get borderSize(): number {
    return this.roundedRectangle.borderSize
  }

  /**
   * Sets the border size of the rounded rectangle.
   *
   * @param borderSize - The thickness of the border in centimeters.
   */
  public set borderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    this.roundedRectangle.borderSize = borderSize
  }

  /**
   * Updates the visual state of the RoundedRectangleVisual component.
   *
   * This method overrides the base `setState` method to apply visual updates
   * specific to the RoundedRectangleVisual, such as gradients and border colors.
   *
   * @param stateName - The new state to apply, represented as a `stateName` object.
   */
  setState(stateName: StateName) {
    if (this._state === this.visualStates.get(stateName)) {
      // skip redundant calls
      return
    }
    super.setState(stateName)
    this.updateIsBaseGradient(this._state.isBaseGradient)
    this.updateGradient(this._state.baseGradient)
    this.updateHasBorder(this._state.hasBorder)
    this.updateBorderType(this._state.borderType)
    this.updateBorderColors(this._state.borderColor)
    this.updateBorderGradient(this._state.borderGradient)
    this.updateBorderSize(this._state.borderSize)
  }

  /**
   * Constructs a new instance of the `RoundedRectangleVisual` class.
   *
   * @param sceneObject - The parent `SceneObject` to which this visual will be attached.
   */
  constructor(args: RoundedRectangleVisualArgs) {
    super(args)
    this._sceneObject = args.sceneObject
    this.roundedRectangle = this._sceneObject.createComponent(RoundedRectangle.getTypeName())
    this.managedComponents.push(this.roundedRectangle)
    this.roundedRectangle.initialize()
    this._transform = this._sceneObject.getTransform()
    if (args.transparent) {
      this.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true)
      this.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto
    }
    this.initialize()
  }

  destroy(): void {
    this._borderColorChangeCancelSet.cancel()
    super.destroy()
  }

  protected set baseColor(value: vec4) {
    this.roundedRectangle.backgroundColor = value
  }

  protected get visualSize(): vec3 {
    return new vec3(this.roundedRectangle.size.x, this.roundedRectangle.size.y, 1)
  }

  protected set visualSize(value: vec3) {
    this.roundedRectangle.size = new vec2(value.x, value.y)
  }

  protected updateColors(meshColor: vec4) {
    if (this.roundedRectangle.gradient) {
      return
    }
    super.updateColors(meshColor)
  }

  /****  Rounded Rectangle explicit  ******************/

  /**
   * Gets the corner radius of the rounded rectangle.
   *
   * @returns The current corner radius of the rounded rectangle in pixels.
   */
  get cornerRadius(): number {
    return this.roundedRectangle.cornerRadius
  }

  /**
   * Sets the corner radius of the rounded rectangle.
   *
   * @param cornerRadius - The radius of the corners in pixels.
   */
  set cornerRadius(cornerRadius: number) {
    if (cornerRadius === undefined) {
      return
    }
    this.roundedRectangle.cornerRadius = cornerRadius
  }

  /**
   * Whether the rounded rectangle uses a texture for its base(background).
   * @return {boolean} `true` if the rounded rectangle uses a texture, otherwise `false`.
   */
  public get useTexture(): boolean {
    return this.roundedRectangle.useTexture
  }

  /**
   * Whether the rounded rectangle uses a texture for its base(background).
   * @return {boolean} `true` if the rounded rectangle uses a texture, otherwise `false`.
   */
  public set useTexture(value: boolean) {
    if (value === undefined) {
      return
    }
    this.roundedRectangle.useTexture = value
  }

  /**
   * The texture of the rounded rectangle.
   *
   * @returns The texture used by the rounded rectangle.
   */
  public get texture(): Texture {
    return this.roundedRectangle.texture
  }

  /**
   * The texture of the rounded rectangle.
   *
   * @param texture - The new texture to be applied to the rounded rectangle.
   */
  public set texture(texture: Texture) {
    if (texture === undefined) {
      return
    }
    this.roundedRectangle.texture = texture
  }

  /**
   * Whether the rounded rectangle uses a gradient for its base(background).
   */
  public get isBaseGradient(): boolean {
    return this.roundedRectangle.gradient
  }

  /**
   * Whether the rounded rectangle uses a gradient for its base(background).
   *
   * @param gradient - A boolean indicating whether to use a gradient (`true`) or a solid color (`false`).
   */
  public set isBaseGradient(gradient: boolean) {
    if (gradient === undefined) {
      return
    }
    this.roundedRectangle.gradient = gradient
    this.roundedRectangle.useTexture = false
  }

  /**
   * Gets the default gradient parameters for the visual.
   *
   * @returns The default gradient parameters.
   */
  public get defaultGradient(): GradientParameters {
    return this._defaultGradient
  }

  /**
   * Sets the default gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set as the default.
   */
  public set defaultGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._defaultGradient, gradient)) {
      return
    }
    this._defaultGradient = gradient
    if (!this.shouldColorChange && this.isBaseGradient) {
      this.roundedRectangle.setBackgroundGradient(gradient)
    } else if (this.shouldColorChange) {
      if (this.initialized) {
        this.needsVisualStateUpdate = true
      }
    }
  }

  /**
   * Gets the hover gradient parameters for the visual.
   *
   * @returns The hover gradient parameters.
   */
  public get hoverGradient(): GradientParameters {
    return this._hoverGradient
  }

  /**
   * Sets the hover gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the hover state.
   */
  public set hoverGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._hoverGradient, gradient)) {
      return
    }
    this._hoverGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the toggled hover gradient parameters for the visual.
   *
   * @returns The toggled hover gradient parameters.
   */
  public get toggledHoverGradient(): GradientParameters {
    return this._toggledHoverGradient
  }

  /**
   * Sets the toggled hover gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the toggled hover state.
   */
  public set toggledHoverGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._toggledHoverGradient, gradient)) {
      return
    }
    this._toggledHoverGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the toggled triggered gradient parameters for the visual.
   *
   * @returns The toggled triggered gradient parameters.
   */
  public get toggledTriggeredGradient(): GradientParameters {
    return this._toggledTriggeredGradient
  }

  /**
   * Sets the toggled triggered gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the toggled triggered state.
   */
  public set toggledTriggeredGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._toggledTriggeredGradient, gradient)) {
      return
    }
    this._toggledTriggeredGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the toggled default gradient parameters for the visual.
   *
   * @returns The toggled default gradient parameters.
   */
  public get toggledDefaultGradient(): GradientParameters {
    return this._toggledDefaultGradient
  }

  /**
   * Sets the toggled default gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the toggled default state.
   */
  public set toggledDefaultGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._toggledDefaultGradient, gradient)) {
      return
    }
    this._toggledDefaultGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the triggered gradient parameters for the visual.
   *
   * @returns The triggered gradient parameters.
   */
  public get triggeredGradient(): GradientParameters {
    return this._triggeredGradient
  }

  /**
   * Sets the triggered gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the triggered state.
   */
  public set triggeredGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._triggeredGradient, gradient)) {
      return
    }
    this._triggeredGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the inactive gradient parameters for the visual.
   *
   * @returns The inactive gradient parameters.
   */
  public get inactiveGradient(): GradientParameters {
    return this._inactiveGradient
  }

  /**
   * Sets the inactive gradient parameters for the visual and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the inactive state.
   */
  public set inactiveGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._inactiveGradient, gradient)) {
      return
    }
    this._inactiveGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Sets the gradient start and end positions for the base of the rounded rectangle.
   *
   * @param gradientStartPosition - A 2D vector representing the starting position of the gradient.
   * @param gradientEndPosition - A 2D vector representing the ending position of the gradient.
   */
  public setBaseGradientPositions(gradientStartPosition: vec2, gradientEndPosition: vec2) {
    this.roundedRectangle.gradientStartPosition = gradientStartPosition
    this.roundedRectangle.gradientEndPosition = gradientEndPosition
  }

  /**
   * Gets the type of border for the rounded rectangle.
   *
   * @returns The type of border, which can be either "Color" or "Gradient".
   */
  public get isBorderGradient(): boolean {
    return this.roundedRectangle.borderType === "Gradient"
  }

  /**
   * Sets whether the rounded rectangle uses a gradient for its border.
   *
   * @param gradient - A boolean indicating whether to use a gradient (`true`) or a solid color (`false`) for the border.
   */
  public set isBorderGradient(gradient: boolean) {
    if (gradient === undefined) {
      return
    }
    this.roundedRectangle.borderType = gradient ? "Gradient" : "Color"
  }

  /**
   * Gets the default color for the border of the rounded rectangle.
   *
   * @returns The default border color as a `vec4` value.
   */
  public get borderDefaultColor(): vec4 {
    return this._borderDefaultColor
  }

  /**
   * Sets the default color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The default color to be set for the border.
   */
  public set borderDefaultColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderDefaultColor, color)) {
      return
    }
    this._borderDefaultColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the hover color for the border of the rounded rectangle.
   *
   * @returns The hover border color as a `vec4` value.
   */
  public get borderHoverColor(): vec4 {
    return this._borderHoverColor
  }

  /**
   * Sets the hover color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The hover color to be set for the border.
   */
  public set borderHoverColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderHoverColor, color)) {
      return
    }
    this._borderHoverColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the triggered color for the border of the rounded rectangle.
   *
   * @returns The triggered border color as a `vec4` value.
   */
  public get borderTriggeredColor(): vec4 {
    return this._borderTriggeredColor
  }

  /**
   * Sets the triggered color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The triggered color to be set for the border.
   */
  public set borderTriggeredColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderTriggeredColor, color)) {
      return
    }
    this._borderTriggeredColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the gradient parameters for the toggled default state of the border.
   */
  public get borderToggledDefaultGradient(): GradientParameters {
    return this._borderToggledDefaultGradient
  }

  /**
   * Sets the gradient parameters for the toggled default state of the border
   */
  public set borderToggledDefaultGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderToggledDefaultGradient, gradient)) {
      return
    }
    this._borderToggledDefaultGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the gradient parameters for the toggled hover state of the border.
   */
  public get borderToggledHoverGradient(): GradientParameters {
    return this._borderToggledHoverGradient
  }

  /**
   * Sets the gradient parameters for the toggled hover state of the border and initializes the visual states.
   */
  public set borderToggledHoverGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderToggledHoverGradient, gradient)) {
      return
    }
    this._borderToggledHoverGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the gradient parameters for the toggled triggered state of the border.
   */
  public get borderToggledTriggeredGradient(): GradientParameters {
    return this._borderToggledTriggeredGradient
  }

  /**
   * Sets the gradient parameters for the toggled triggered state of the border and initializes the visual states.
   */
  public set borderToggledTriggeredGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderToggledTriggeredGradient, gradient)) {
      return
    }
    this._borderToggledTriggeredGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the inactive color for the border of the rounded rectangle.
   *
   * @returns The inactive border color as a `vec4` value.
   */
  public get borderInactiveColor(): vec4 {
    return this._borderInactiveColor
  }

  /**
   * Sets the inactive color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The inactive color to be set for the border.
   */
  public set borderInactiveColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderInactiveColor, color)) {
      return
    }
    this._borderInactiveColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the toggled default color for the border of the rounded rectangle.
   *
   * @returns The toggled default border color as a `vec4` value.
   */
  public get borderToggledDefaultColor(): vec4 {
    return this._borderToggledDefaultColor
  }

  /**
   * Sets the toggled default color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The toggled default color to be set for the border.
   */
  public set borderToggledDefaultColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderToggledDefaultColor, color)) {
      return
    }
    this._borderToggledDefaultColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the toggled hover color for the border of the rounded rectangle.
   *
   * @returns The toggled hover border color as a `vec4` value.
   */
  public get borderToggledHoverColor(): vec4 {
    return this._borderToggledHoverColor
  }

  /**
   * Sets the toggled hover color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The toggled hover color to be set for the border.
   */
  public set borderToggledHoverColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderToggledHoverColor, color)) {
      return
    }
    this._borderToggledHoverColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the toggled triggered color for the border of the rounded rectangle.
   *
   * @returns The toggled triggered border color as a `vec4` value.
   */
  public get borderToggledTriggeredColor(): vec4 {
    return this._borderToggledTriggeredColor
  }

  /**
   * Sets the toggled triggered color for the border of the rounded rectangle and initializes the visual states.
   *
   * @param color - The toggled triggered color to be set for the border.
   */
  public set borderToggledTriggeredColor(color: vec4) {
    if (color === undefined) {
      return
    }
    if (isEqual<vec4>(this._borderToggledTriggeredColor, color)) {
      return
    }
    this._borderToggledTriggeredColor = color
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the default gradient parameters for the border of the rounded rectangle.
   *
   * @returns The default border gradient parameters.
   */
  public get borderDefaultGradient(): GradientParameters {
    return this._borderDefaultGradient
  }

  /**
   * Sets the gradient parameters for the default state of the border and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the default state of the border.
   */
  public set borderDefaultGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderDefaultGradient, gradient)) {
      return
    }
    this._borderDefaultGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the gradient parameters for the hover state of the border.
   *
   * @returns The hover border gradient parameters.
   */
  public get borderHoverGradient(): GradientParameters {
    return this._borderHoverGradient
  }

  /**
   * Sets the gradient parameters for the hover state of the border and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the hover state of the border.
   */
  public set borderHoverGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderHoverGradient, gradient)) {
      return
    }
    this._borderHoverGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the gradient parameters for the triggered state of the border.
   *
   * @returns The triggered border gradient parameters.
   */
  public get borderTriggeredGradient(): GradientParameters {
    return this._borderTriggeredGradient
  }

  /**
   * Sets the gradient parameters for the triggered state of the border and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the triggered state of the border.
   */
  public set borderTriggeredGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderTriggeredGradient, gradient)) {
      return
    }
    this._borderTriggeredGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the gradient parameters for the inactive state of the border.
   *
   * @returns The inactive border gradient parameters.
   */
  public get borderInactiveGradient(): GradientParameters {
    return this._borderInactiveGradient
  }

  /**
   * Sets the gradient parameters for the inactive state of the border and initializes the visual states.
   *
   * @param gradient - The gradient parameters to be set for the inactive state of the border.
   */
  public set borderInactiveGradient(gradient: GradientParameters) {
    if (gradient === undefined) {
      return
    }
    if (isEqual<GradientParameters>(this._borderInactiveGradient, gradient)) {
      return
    }
    this._borderInactiveGradient = gradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Sets the start and end positions for the border gradient of the rounded rectangle.
   *
   * @param gradientStartPosition - A 2D vector representing the starting position of the border gradient.
   * @param gradientEndPosition - A 2D vector representing the ending position of the border gradient.
   */
  public setBorderGradientPositions(gradientStartPosition: vec2, gradientEndPosition: vec2): void {
    this.roundedRectangle.borderGradientStartPosition = gradientStartPosition
    this.roundedRectangle.borderGradientEndPosition = gradientEndPosition
  }

  /**
   * Gets whether the default state uses a base gradient.
   *
   * @returns `true` if the default state uses a base gradient; otherwise, `false`.
   */
  public get defaultIsBaseGradient(): boolean {
    return this._defaultIsBaseGradient
  }

  /**
   * Sets whether the default state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the default state should use a base gradient.
   */
  public set defaultIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._defaultIsBaseGradient, isBaseGradient)) {
      return
    }
    this._defaultIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the hover state uses a base gradient.
   *
   * @returns `true` if the hover state uses a base gradient; otherwise, `false`.
   */
  public get hoverIsBaseGradient(): boolean {
    return this._hoverIsBaseGradient
  }

  /**
   * Sets whether the hover state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the hover state should use a base gradient.
   */
  public set hoverIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._hoverIsBaseGradient, isBaseGradient)) {
      return
    }
    this._hoverIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the triggered state uses a base gradient.
   *
   * @returns `true` if the triggered state uses a base gradient; otherwise, `false`.
   */
  public get triggeredIsBaseGradient(): boolean {
    return this._triggeredIsBaseGradient
  }

  /**
   * Sets whether the triggered state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the triggered state should use a base gradient.
   */
  public set triggeredIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._triggeredIsBaseGradient, isBaseGradient)) {
      return
    }
    this._triggeredIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the inactive state uses a base gradient.
   *
   * @returns `true` if the inactive state uses a base gradient; otherwise, `false`.
   */
  public get inactiveIsBaseGradient(): boolean {
    return this._inactiveIsBaseGradient
  }

  /**
   * Sets whether the inactive state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the inactive state should use a base gradient.
   */
  public set inactiveIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._inactiveIsBaseGradient, isBaseGradient)) {
      return
    }
    this._inactiveIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the toggled default state uses a base gradient.
   *
   * @returns `true` if the toggled default state uses a base gradient; otherwise, `false`.
   */
  public get toggledDefaultIsBaseGradient(): boolean {
    return this._toggledDefaultIsBaseGradient
  }

  /**
   * Sets whether the toggled default state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the toggled default state should use a base gradient.
   */
  public set toggledDefaultIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._toggledDefaultIsBaseGradient, isBaseGradient)) {
      return
    }
    this._toggledDefaultIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the toggled hover state uses a base gradient.
   *
   * @returns `true` if the toggled hover state uses a base gradient; otherwise, `false`.
   */
  public get toggledHoverIsBaseGradient(): boolean {
    return this._toggledHoverIsBaseGradient
  }

  /**
   * Sets whether the toggled hover state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the toggled hover state should use a base gradient.
   */
  public set toggledHoverIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._toggledHoverIsBaseGradient, isBaseGradient)) {
      return
    }
    this._toggledHoverIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the toggled triggered state uses a base gradient.
   *
   * @returns `true` if the toggled triggered state uses a base gradient; otherwise, `false`.
   */
  public get toggledTriggeredIsBaseGradient(): boolean {
    return this._toggledTriggeredIsBaseGradient
  }

  /**
   * Sets whether the toggled triggered state uses a base gradient and initializes the visual states.
   *
   * @param isBaseGradient - A boolean indicating whether the toggled triggered state should use a base gradient.
   */
  public set toggledTriggeredIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient === undefined) {
      return
    }
    if (isEqual<boolean>(this._toggledTriggeredIsBaseGradient, isBaseGradient)) {
      return
    }
    this._toggledTriggeredIsBaseGradient = isBaseGradient
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the default state has a border.
   *
   * @returns `true` if the default state has a border; otherwise, `false`.
   */
  public get defaultHasBorder(): boolean {
    return this._defaultHasBorder
  }

  /**
   * Sets whether the default state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the default state should have a border.
   */
  public set defaultHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._defaultHasBorder, hasBorder)) {
      return
    }
    this._defaultHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the hover state has a border.
   *
   * @returns `true` if the hover state has a border; otherwise, `false`.
   */
  public get hoverHasBorder(): boolean {
    return this._hoverHasBorder
  }

  /**
   * Sets whether the hover state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the hover state should have a border.
   */
  public set hoverHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._hoverHasBorder, hasBorder)) {
      return
    }
    this._hoverHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the triggered state has a border.
   *
   * @returns `true` if the triggered state has a border; otherwise, `false`.
   */
  public get triggeredHasBorder(): boolean {
    return this._triggeredHasBorder
  }

  /**
   * Sets whether the triggered state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the triggered state should have a border.
   */
  public set triggeredHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._triggeredHasBorder, hasBorder)) {
      return
    }
    this._triggeredHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the inactive state has a border.
   *
   * @returns `true` if the inactive state has a border; otherwise, `false`.
   */
  public get inactiveHasBorder(): boolean {
    return this._inactiveHasBorder
  }

  /**
   * Sets whether the inactive state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the inactive state should have a border.
   */
  public set inactiveHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._inactiveHasBorder, hasBorder)) {
      return
    }
    this._inactiveHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the toggled default state has a border.
   *
   * @returns `true` if the toggled default state has a border; otherwise, `false`.
   */
  public get toggledDefaultHasBorder(): boolean {
    return this._toggledDefaultHasBorder
  }

  /**
   * Sets whether the toggled default state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the toggled default state should have a border.
   */
  public set toggledDefaultHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._toggledDefaultHasBorder, hasBorder)) {
      return
    }
    this._toggledDefaultHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the toggled hover state has a border.
   *
   * @returns `true` if the toggled hover state has a border; otherwise, `false`.
   */
  public get toggledHoverHasBorder(): boolean {
    return this._toggledHoverHasBorder
  }

  /**
   * Sets whether the toggled hover state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the toggled hover state should have a border.
   */
  public set toggledHoverHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._toggledHoverHasBorder, hasBorder)) {
      return
    }
    this._toggledHoverHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets whether the toggled triggered state has a border.
   *
   * @returns `true` if the toggled triggered state has a border; otherwise, `false`.
   */
  public get toggledTriggeredHasBorder(): boolean {
    return this._toggledTriggeredHasBorder
  }

  /**
   * Sets whether the toggled triggered state has a border and initializes the visual states.
   *
   * @param hasBorder - A boolean indicating whether the toggled triggered state should have a border.
   */
  public set toggledTriggeredHasBorder(hasBorder: boolean) {
    if (hasBorder === undefined) {
      return
    }
    if (isEqual<boolean>(this._toggledTriggeredHasBorder, hasBorder)) {
      return
    }
    this._toggledTriggeredHasBorder = hasBorder
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the default state.
   *
   * @returns The border type for the default state.
   */
  public get defaultBorderType(): BorderType {
    return this._defaultBorderType
  }

  /**
   * Sets the border type for the default state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the default state.
   */
  public set defaultBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._defaultBorderType, borderType)) {
      return
    }
    this._defaultBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the hover state.
   *
   * @returns The border type for the hover state.
   */
  public get hoverBorderType(): BorderType {
    return this._hoverBorderType
  }

  /**
   * Sets the border type for the hover state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the hover state.
   */
  public set hoverBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._hoverBorderType, borderType)) {
      return
    }
    this._hoverBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the triggered state.
   *
   * @returns The border type for the triggered state.
   */
  public get triggeredBorderType(): BorderType {
    return this._triggeredBorderType
  }

  /**
   * Sets the border type for the triggered state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the triggered state.
   */
  public set triggeredBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._triggeredBorderType, borderType)) {
      return
    }
    this._triggeredBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the inactive state.
   *
   * @returns The border type for the inactive state.
   */
  public get inactiveBorderType(): BorderType {
    return this._inactiveBorderType
  }

  /**
   * Sets the border type for the inactive state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the inactive state.
   */
  public set inactiveBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._inactiveBorderType, borderType)) {
      return
    }
    this._inactiveBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the toggled default state.
   *
   * @returns The border type for the toggled default state.
   */
  public get toggledDefaultBorderType(): BorderType {
    return this._toggledDefaultBorderType
  }

  /**
   * Sets the border type for the toggled default state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the toggled default state.
   */
  public set toggledDefaultBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._toggledDefaultBorderType, borderType)) {
      return
    }
    this._toggledDefaultBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the toggled hover state.
   *
   * @returns The border type for the toggled hover state.
   */
  public get toggledHoverBorderType(): BorderType {
    return this._toggledHoverBorderType
  }

  /**
   * Sets the border type for the toggled hover state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the toggled hover state.
   */
  public set toggledHoverBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._toggledHoverBorderType, borderType)) {
      return
    }
    this._toggledHoverBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border type for the toggled triggered state.
   *
   * @returns The border type for the toggled triggered state.
   */
  public get toggledTriggeredBorderType(): BorderType {
    return this._toggledTriggeredBorderType
  }

  /**
   * Sets the border type for the toggled triggered state and initializes the visual states.
   *
   * @param borderType - The border type to be set for the toggled triggered state.
   */
  public set toggledTriggeredBorderType(borderType: BorderType) {
    if (borderType === undefined) {
      return
    }
    if (isEqual<BorderType>(this._toggledTriggeredBorderType, borderType)) {
      return
    }
    this._toggledTriggeredBorderType = borderType
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the default state.
   *
   * @returns The border size for the default state.
   */
  public get defaultBorderSize(): number {
    return this._defaultBorderSize
  }

  /**
   * Sets the border size for the default state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the default state.
   */
  public set defaultBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._defaultBorderSize, borderSize)) {
      return
    }
    this._defaultBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the hover state.
   *
   * @returns The border size for the hover state.
   */
  public get hoverBorderSize(): number {
    return this._hoverBorderSize
  }

  /**
   * Sets the border size for the hover state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the hover state.
   */
  public set hoverBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._hoverBorderSize, borderSize)) {
      return
    }
    this._hoverBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the triggered state.
   *
   * @returns The border size for the triggered state.
   */
  public get triggeredBorderSize(): number {
    return this._triggeredBorderSize
  }

  /**
   * Sets the border size for the triggered state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the triggered state.
   */
  public set triggeredBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._triggeredBorderSize, borderSize)) {
      return
    }
    this._triggeredBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the inactive state.
   *
   * @returns The border size for the inactive state.
   */
  public get inactiveBorderSize(): number {
    return this._inactiveBorderSize
  }

  /**
   * Sets the border size for the inactive state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the inactive state.
   */
  public set inactiveBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._inactiveBorderSize, borderSize)) {
      return
    }
    this._inactiveBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the toggled default state.
   *
   * @returns The border size for the toggled default state.
   */
  public get toggledDefaultBorderSize(): number {
    return this._toggledDefaultBorderSize
  }

  /**
   * Sets the border size for the toggled default state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the toggled default state.
   */
  public set toggledDefaultBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._toggledDefaultBorderSize, borderSize)) {
      return
    }
    this._toggledDefaultBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the toggled hover state.
   *
   * @returns The border size for the toggled hover state.
   */
  public get toggledHoverBorderSize(): number {
    return this._toggledHoverBorderSize
  }

  /**
   * Sets the border size for the toggled hover state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the toggled hover state.
   */
  public set toggledHoverBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._toggledHoverBorderSize, borderSize)) {
      return
    }
    this._toggledHoverBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  /**
   * Gets the border size for the toggled triggered state.
   *
   * @returns The border size for the toggled triggered state.
   */
  public get toggledTriggeredBorderSize(): number {
    return this._toggledTriggeredBorderSize
  }

  /**
   * Sets the border size for the toggled triggered state and initializes the visual states.
   *
   * @param borderSize - The border size to be set for the toggled triggered state.
   */
  public set toggledTriggeredBorderSize(borderSize: number) {
    if (borderSize === undefined) {
      return
    }
    if (isEqual<number>(this._toggledTriggeredBorderSize, borderSize)) {
      return
    }
    this._toggledTriggeredBorderSize = borderSize
    if (this.initialized) {
      this.needsVisualStateUpdate = true
    }
  }

  protected updateGradient(gradient: GradientParameters) {
    if (!this.shouldColorChange || !this.isBaseGradient) {
      return
    }
    this.roundedRectangle.setBackgroundGradient(gradient)
  }

  protected updateBorderColors(borderColor: vec4) {
    if (!this.shouldColorChange || !this.hasBorder || this.isBorderGradient) {
      return
    }
    this._borderColorChangeCancelSet.cancel()
    const from = this.roundedRectangle.borderColor
    animate({
      duration: this.animateDuration,
      cancelSet: this._borderColorChangeCancelSet,
      update: (t) => {
        this.roundedRectangle.borderColor = vec4.lerp(from, borderColor, t)
      }
    })
  }

  protected updateBorderGradient(gradient: GradientParameters) {
    if (!this.hasBorder || !this.isBorderGradient) {
      return
    }
    this.roundedRectangle.setBorderGradient(gradient)
  }

  protected updateBorderSize(borderSize: number) {
    if (!this.hasBorder) {
      return
    }
    this.roundedRectangle.borderSize = borderSize
  }

  protected updateHasBorder(hasBorder: boolean) {
    if (hasBorder !== undefined) {
      this.hasBorder = hasBorder
    }
  }

  protected updateIsBaseGradient(isBaseGradient: boolean) {
    if (isBaseGradient !== undefined) {
      this.isBaseGradient = isBaseGradient
    }
  }

  protected updateBorderType(borderType: BorderType) {
    if (borderType !== undefined) {
      this.isBorderGradient = borderType === "Gradient"
    }
  }

  /**
   * Prints the configuration of the rounded rectangle visual to the console.
   */
  printConfig(): void {
    this.roundedRectangle.printConfig()
  }

  protected applyStyleParameters(parameters: Partial<RoundedRectangleVisualParameters>) {
    // First call the parent method to handle base VisualState properties
    super.applyStyleParameters(parameters)

    // Then handle RoundedRectangle-specific properties
    // Base gradient parameters
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, GradientParameters>(
      parameters,
      "baseGradient",
      {
        default: (value) => (this.defaultGradient = value),
        hover: (value) => (this.hoverGradient = value),
        triggered: (value) => (this.triggeredGradient = value),
        inactive: (value) => (this.inactiveGradient = value),
        toggledDefault: (value) => (this.toggledDefaultGradient = value),
        toggledHover: (value) => (this.toggledHoverGradient = value),
        toggledTriggered: (value) => (this.toggledTriggeredGradient = value)
      }
    )

    // IsBaseGradient flags
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, boolean>(
      parameters,
      "isBaseGradient",
      {
        default: (value) => (this.defaultIsBaseGradient = value),
        hover: (value) => (this.hoverIsBaseGradient = value),
        triggered: (value) => (this.triggeredIsBaseGradient = value),
        inactive: (value) => (this.inactiveIsBaseGradient = value),
        toggledDefault: (value) => (this.toggledDefaultIsBaseGradient = value),
        toggledHover: (value) => (this.toggledHoverIsBaseGradient = value),
        toggledTriggered: (value) => (this.toggledTriggeredIsBaseGradient = value)
      }
    )

    // HasBorder flags
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, boolean>(
      parameters,
      "hasBorder",
      {
        default: (value) => (this.defaultHasBorder = value),
        hover: (value) => (this.hoverHasBorder = value),
        triggered: (value) => (this.triggeredHasBorder = value),
        inactive: (value) => (this.inactiveHasBorder = value),
        toggledDefault: (value) => (this.toggledDefaultHasBorder = value),
        toggledHover: (value) => (this.toggledHoverHasBorder = value),
        toggledTriggered: (value) => (this.toggledTriggeredHasBorder = value)
      }
    )

    // Border types
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, BorderType>(
      parameters,
      "borderType",
      {
        default: (value) => (this.defaultBorderType = value),
        hover: (value) => (this.hoverBorderType = value),
        triggered: (value) => (this.triggeredBorderType = value),
        inactive: (value) => (this.inactiveBorderType = value),
        toggledDefault: (value) => (this.toggledDefaultBorderType = value),
        toggledHover: (value) => (this.toggledHoverBorderType = value),
        toggledTriggered: (value) => (this.toggledTriggeredBorderType = value)
      }
    )

    // Border sizes
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, number>(
      parameters,
      "borderSize",
      {
        default: (value) => (this.defaultBorderSize = value),
        hover: (value) => (this.hoverBorderSize = value),
        triggered: (value) => (this.triggeredBorderSize = value),
        inactive: (value) => (this.inactiveBorderSize = value),
        toggledDefault: (value) => (this.toggledDefaultBorderSize = value),
        toggledHover: (value) => (this.toggledHoverBorderSize = value),
        toggledTriggered: (value) => (this.toggledTriggeredBorderSize = value)
      }
    )

    // Border colors
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, vec4>(
      parameters,
      "borderColor",
      {
        default: (value) => (this.borderDefaultColor = value),
        hover: (value) => (this.borderHoverColor = value),
        triggered: (value) => (this.borderTriggeredColor = value),
        inactive: (value) => (this.borderInactiveColor = value),
        toggledDefault: (value) => (this.borderToggledDefaultColor = value),
        toggledHover: (value) => (this.borderToggledHoverColor = value),
        toggledTriggered: (value) => (this.borderToggledTriggeredColor = value)
      }
    )

    // Border gradients
    this.applyStyleProperty<Partial<RoundedRectangleVisualParameters>, RoundedRectangleVisualState, GradientParameters>(
      parameters,
      "borderGradient",
      {
        default: (value) => (this.borderDefaultGradient = value),
        hover: (value) => (this.borderHoverGradient = value),
        triggered: (value) => (this.borderTriggeredGradient = value),
        inactive: (value) => (this.borderInactiveGradient = value),
        toggledDefault: (value) => (this.borderToggledDefaultGradient = value),
        toggledHover: (value) => (this.borderToggledHoverGradient = value),
        toggledTriggered: (value) => (this.borderToggledTriggeredGradient = value)
      }
    )
  }

  protected updateVisualStates(): void {
    this._roundedRectangleVisualStates = new Map([
      [
        StateName.default,
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
        StateName.hover,
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
        StateName.triggered,
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
        StateName.toggledHovered,
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
        StateName.toggledDefault,
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
        StateName.toggledTriggered,
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
        StateName.error,
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
        StateName.errorHover,
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
        StateName.inactive,
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
    ])
    super.updateVisualStates()
  }

  private get roundedRectangle(): RoundedRectangle {
    return this._visualComponent as RoundedRectangle
  }

  private set roundedRectangle(value: RoundedRectangle) {
    this._visualComponent = value
  }
}
