import animate, {CancelSet} from "SpectaclesInteractionKit.lspkg/Utils/animate"
import {withAlpha} from "SpectaclesInteractionKit.lspkg/Utils/color"
import Event, {unsubscribe} from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {clamp} from "SpectaclesInteractionKit.lspkg/Utils/mathUtils"
import {StateName} from "./Components/Element"
import {ScrollWindow} from "./Components/ScrollWindow/ScrollWindow"
import {Slider} from "./Components/Slider/Slider"
import {gradientParameterClone} from "./Utility/UIKitUtilities"
import {GradientParameters, RoundedRectangle} from "./Visuals/RoundedRectangle/RoundedRectangle"
import {
  RoundedRectangleVisual,
  RoundedRectangleVisualParameters
} from "./Visuals/RoundedRectangle/RoundedRectangleVisual"

enum ScrollOrientation {
  Horizontal = "Horizontal",
  Vertical = "Vertical"
}

const darkGray = new vec4(0.22, 0.22, 0.22, 1)
const mediumGray = new vec4(0.31, 0.31, 0.31, 1)
const lightGray = new vec4(0.4, 0.4, 0.4, 1)

const bgDarkGray = new vec4(0.15, 0.15, 0.15, 1)
const bgMediumGray = new vec4(0.2, 0.2, 0.2, 1)
const bgLightGray = new vec4(0.25, 0.25, 0.25, 1)

const SCROLL_BAR_BACKGROUND_GRADIENT: GradientParameters = {
  enabled: true,
  type: "Rectangle",
  start: new vec2(0, -1),
  end: new vec2(0, 1),
  stop0: {enabled: true, percent: -1, color: bgMediumGray},
  stop1: {enabled: true, percent: 2, color: bgDarkGray}
}

const SCROLL_BAR_BACKGROUND_HOVER_GRADIENT: GradientParameters = {
  enabled: true,
  type: "Rectangle",
  start: new vec2(0, -1),
  end: new vec2(0, 1),
  stop0: {enabled: true, percent: -1, color: bgLightGray},
  stop1: {enabled: true, percent: 2, color: bgMediumGray}
}

const SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT: GradientParameters = {
  enabled: true,
  type: "Rectangle",
  start: new vec2(0, -1),
  end: new vec2(0, 1),
  stop0: {enabled: true, percent: -1, color: withAlpha(bgMediumGray, 0)},
  stop1: {enabled: true, percent: 2, color: withAlpha(bgDarkGray, 0)}
}

const SCROLL_BAR_KNOB_GRADIENT: GradientParameters = {
  enabled: true,
  type: "Rectangle",
  stop0: {enabled: true, percent: -1, color: darkGray},
  stop1: {enabled: true, percent: -0.25, color: darkGray},
  stop2: {enabled: true, percent: 2, color: mediumGray}
}

const SCROLL_BAR_KNOB_HOVER_GRADIENT: GradientParameters = {
  enabled: true,
  type: "Rectangle",
  stop0: {enabled: true, percent: -1, color: mediumGray},
  stop1: {enabled: true, percent: -0.25, color: mediumGray},
  stop2: {enabled: true, percent: 2, color: lightGray}
}

const SCROLL_BAR_KNOB_INACTIVE_GRADIENT: GradientParameters = {
  enabled: true,
  type: "Rectangle",
  stop0: {enabled: true, percent: -1, color: withAlpha(darkGray, 0)},
  stop1: {enabled: true, percent: -0.25, color: withAlpha(darkGray, 0)},
  stop2: {enabled: true, percent: 2, color: withAlpha(mediumGray, 0)}
}

@component
export class ScrollBar extends BaseScriptComponent {
  @input
  @widget(new ComboBoxWidget([new ComboBoxItem("Horizontal", "Horizontal"), new ComboBoxItem("Vertical", "Vertical")]))
  private orientation: string = "Vertical"

  @input
  private scrollWindow: ScrollWindow

  @input
  private slider: Slider

  private trackVisual: RoundedRectangleVisual
  private knobVisual: RoundedRectangleVisual

  private trackRoundedRectangle: RoundedRectangle
  private knobRoundedRectangle: RoundedRectangle

  private windowSize: number = 0
  private contentLength: number = 0

  private isDraggingSlider: boolean = false

  private _previousState: StateName = StateName.default
  private _isEnabled: boolean = true

  private _renderOrder: number = 0

  private initialized: boolean = false

  private sliderColorChangeCancel = new CancelSet()
  private unsubscribes: unsubscribe[] = []

  private onVisibilityChangedEvent: Event<boolean> = new Event<boolean>()
  readonly onVisibilityChanged = this.onVisibilityChangedEvent.publicApi()

  get renderOrder(): number {
    return this._renderOrder
  }

  set renderOrder(order: number) {
    if (order === undefined) {
      return
    }
    this._renderOrder = order
    if (this.initialized) {
      this.slider.renderOrder = order
    }
  }

  /**
   * Gets the scene object associated with the knob visual of the scroll bar.
   *
   * @returns {SceneObject} The scene object representing the knob visual.
   */
  get knobObject(): SceneObject {
    return this.knobVisual.sceneObject
  }

  /**
   * Gets the enabled state of the scrollbar.
   *
   * @returns {boolean} `true` if the scrollbar is enabled; otherwise, `false`.
   */
  get isEnabled(): boolean {
    return this._isEnabled
  }

  /**
   * Sets the enabled state of the scrollbar.
   *
   * @param enabled - A boolean indicating whether the scrollbar should be enabled (`true`) or disabled (`false`).
   */
  set isEnabled(enabled: boolean) {
    if (enabled === undefined) {
      return
    }
    this._isEnabled = enabled
    if (this.initialized) {
      this.updateSliderVisibility()
    }
  }

  /**
   * Determines whether the scrollbar is visible.
   * The scrollbar is considered visible if it is enabled and the content length
   * of the scroll view exceeds the size of the visible window.
   *
   * @returns `true` if the scrollbar is enabled and the content length is greater
   *          than the window size; otherwise, `false`.
   */
  get isVisible(): boolean {
    return this._isEnabled && this.isScrollable
  }

  private get isScrollable(): boolean {
    return this.contentLength > this.windowSize
  }

  onAwake() {
    this.setupVisuals()
    this.createEvent("OnStartEvent").bind(() => {
      this.scrollWindow.horizontal = this.orientation === ScrollOrientation.Horizontal
      this.scrollWindow.vertical = this.orientation === ScrollOrientation.Vertical
      this.windowSize =
        this.orientation === ScrollOrientation.Horizontal
          ? this.scrollWindow.getWindowSize().x
          : this.scrollWindow.getWindowSize().y
      this.contentLength =
        this.orientation === ScrollOrientation.Horizontal
          ? this.scrollWindow.getScrollDimensions().x
          : this.scrollWindow.getScrollDimensions().y
      this.trackVisual.cornerRadius =
        this.orientation === ScrollOrientation.Horizontal ? this.slider.size.x * 0.5 : this.slider.size.y * 0.5
      this.slider.visual = this.trackVisual
      this.slider.knobVisual = this.knobVisual
      this.slider.hasTrackVisual = false

      this.trackRoundedRectangle = this.slider.visual.sceneObject.getComponent(RoundedRectangle.getTypeName())
      this.knobRoundedRectangle = this.slider.knobVisual.sceneObject.getComponent(RoundedRectangle.getTypeName())

      this.slider.onInitialized.add(() => {
        this.slider.renderOrder = this._renderOrder
        this.setupScrollviewEventHandlers()
        this.setupSliderEventHandlers()
        this.updateSliderKnobSize()
        this.setupGradientFades()
        this.updateSliderVisibility()
        this.slider.sceneObject.enabled = this.isVisible
        this.slider.currentValue = clamp(
          (this.orientation === ScrollOrientation.Horizontal
            ? this.scrollWindow.scrollPositionNormalized.x
            : this.scrollWindow.scrollPositionNormalized.y) /
            2 +
            0.5,
          0,
          1
        )
      })

      this.createEvent("OnEnableEvent").bind(() => {
        if (this.unsubscribes.length === 0) {
          this.setupScrollviewEventHandlers()
          this.setupSliderEventHandlers()
        }
      })
      this.createEvent("OnDisableEvent").bind(() => {
        this.unsubscribes.forEach((unsubscribe) => unsubscribe())
        this.unsubscribes = []
      })
      this.createEvent("OnDestroyEvent").bind(() => {
        this.sliderColorChangeCancel()
        this.unsubscribes.forEach((unsubscribe) => unsubscribe())
        this.unsubscribes = []
      })

      this.slider.createEvent("OnEnableEvent").bind(() => {
        this.onVisibilityChangedEvent.invoke(true)
      })
      this.slider.createEvent("OnDisableEvent").bind(() => {
        this.onVisibilityChangedEvent.invoke(false)
      })
      this.slider.createEvent("OnDestroyEvent").bind(() => {
        this.sliderColorChangeCancel()
        this.unsubscribes.forEach((unsubscribe) => unsubscribe())
        this.unsubscribes = []
      })

      this.initialized = true
    })
  }

  private setupVisuals() {
    const trackParameters: Partial<RoundedRectangleVisualParameters> = {
      default: {
        isBaseGradient: true,
        hasBorder: false,
        baseGradient: gradientParameterClone(SCROLL_BAR_BACKGROUND_GRADIENT)
      }
    }
    this.trackVisual = new RoundedRectangleVisual({sceneObject: this.slider.sceneObject, style: trackParameters})
    this.trackVisual.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto
    this.trackVisual.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true)
    this.trackVisual.shouldColorChange = false
    this.trackVisual.initialize()

    const knobParameters: Partial<RoundedRectangleVisualParameters> = {
      default: {
        isBaseGradient: true,
        hasBorder: false,
        baseGradient: gradientParameterClone(SCROLL_BAR_KNOB_GRADIENT)
      }
    }
    const knobObject = global.scene.createSceneObject("ScrollBarKnob")
    knobObject.setParent(this.slider.sceneObject)
    this.knobVisual = new RoundedRectangleVisual({
      sceneObject: knobObject,
      style: knobParameters
    })
    this.knobVisual.renderMeshVisual.mainPass.blendMode = BlendMode.PremultipliedAlphaAuto
    this.knobVisual.renderMeshVisual.mainPass.colorMask = new vec4b(true, true, true, true)
    this.knobVisual.shouldColorChange = false
    this.knobVisual.initialize()
  }

  private setupScrollviewEventHandlers() {
    this.unsubscribes.push(
      this.scrollWindow.onScrollDimensionsUpdated.add(() => {
        this.contentLength =
          this.orientation === ScrollOrientation.Horizontal
            ? this.scrollWindow.getScrollDimensions().x
            : this.scrollWindow.getScrollDimensions().y
        this.updateSliderKnobSize()
        this.updateSliderVisibility()
      })
    )
    this.unsubscribes.push(
      this.scrollWindow.onScrollPositionUpdated.add(() => {
        if (!this.isDraggingSlider) {
          this.slider.currentValue = clamp(
            (this.orientation === ScrollOrientation.Horizontal
              ? this.scrollWindow.scrollPositionNormalized.x
              : this.scrollWindow.scrollPositionNormalized.y) /
              2 +
              0.5,
            0,
            1
          )
        }
      })
    )
  }

  private setupSliderEventHandlers() {
    this.unsubscribes.push(
      this.slider.interactable.onTriggerStart.add(() => {
        this.isDraggingSlider = true
      })
    )

    this.unsubscribes.push(
      this.slider.onFinished.add(() => {
        this.isDraggingSlider = false
      })
    )

    this.unsubscribes.push(
      this.slider.interactable.onTriggerCanceled.add(() => {
        this.isDraggingSlider = false
      })
    )

    this.unsubscribes.push(
      this.slider.onValueChange.add((value) => {
        if (this.isDraggingSlider) {
          if (this.scrollWindow) {
            this.scrollWindow.scrollPositionNormalized =
              this.orientation === ScrollOrientation.Horizontal
                ? new vec2(value * 2 - 1, 0)
                : new vec2(0, value * 2 - 1)
          }
        }
      })
    )
  }

  private updateSliderKnobSize() {
    if (this.isScrollable) {
      if (this.slider) {
        const width = this.slider.customKnobSize ? this.slider.knobSize.y : this.slider.size.y
        const length = this.slider.size.x * Math.min(this.windowSize / this.contentLength, 1)
        this.slider.knobSize = new vec2(Math.max(length, width), width)
        this.knobVisual.cornerRadius = width * 0.5
      }
    }
  }

  private updateSliderVisibility() {
    if (this.slider) {
      if (this.isVisible) {
        this.slider.sceneObject.enabled = true
      }
      this.slider.inactive = !this.isVisible
    }
  }

  private setupGradientFades = () => {
    let sliderVisible = true
    const visDuration = 0.3

    const doAnimation = (
      fromKnob: GradientParameters,
      fromBase: GradientParameters,
      toKnob: GradientParameters,
      toBase: GradientParameters,
      onCompleted: () => void
    ) => {
      const trackGradient = this.trackVisual.defaultGradient
      const knobGradient = this.knobVisual.defaultGradient
      animate({
        duration: visDuration,
        cancelSet: this.sliderColorChangeCancel,
        update: (t) => {
          trackGradient.stop0.color = vec4.lerp(fromBase.stop0.color, toBase.stop0.color, t)
          trackGradient.stop1.color = vec4.lerp(fromBase.stop1.color, toBase.stop1.color, t)
          this.trackRoundedRectangle?.setBackgroundGradient(trackGradient)
          knobGradient.stop0.color = vec4.lerp(fromKnob.stop0.color, toKnob.stop0.color, t)
          knobGradient.stop1.color = vec4.lerp(fromKnob.stop1.color, toKnob.stop1.color, t)
          knobGradient.stop2.color = vec4.lerp(fromKnob.stop2.color, toKnob.stop2.color, t)
          this.knobRoundedRectangle?.setBackgroundGradient(knobGradient)
        },
        ended: () => {
          onCompleted()
        }
      })
    }

    this.slider.onStateChanged.add((state) => {
      if (state === StateName.inactive) {
        if (sliderVisible === true) {
          // hide slider
          sliderVisible = false
          const fromKnob = SCROLL_BAR_KNOB_GRADIENT
          const toKnob = SCROLL_BAR_KNOB_INACTIVE_GRADIENT
          const fromBase = SCROLL_BAR_BACKGROUND_GRADIENT
          const toBase = SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT
          this.sliderColorChangeCancel()
          doAnimation(fromKnob, fromBase, toKnob, toBase, () => {
            this.slider.sceneObject.enabled = false
          })
        }
      } else if (this._previousState === StateName.default && state === StateName.hover) {
        if (sliderVisible === true) {
          const fromKnob = SCROLL_BAR_KNOB_GRADIENT
          const toKnob = SCROLL_BAR_KNOB_HOVER_GRADIENT
          const fromBase = SCROLL_BAR_BACKGROUND_GRADIENT
          const toBase = SCROLL_BAR_BACKGROUND_HOVER_GRADIENT
          this.sliderColorChangeCancel()
          doAnimation(fromKnob, fromBase, toKnob, toBase, () => {})
        }
      } else if (this._previousState === StateName.hover && state === StateName.default) {
        if (sliderVisible === true) {
          const fromKnob = SCROLL_BAR_KNOB_HOVER_GRADIENT
          const toKnob = SCROLL_BAR_KNOB_GRADIENT
          const fromBase = SCROLL_BAR_BACKGROUND_HOVER_GRADIENT
          const toBase = SCROLL_BAR_BACKGROUND_GRADIENT
          this.sliderColorChangeCancel()
          doAnimation(fromKnob, fromBase, toKnob, toBase, () => {})
        }
      } else if (this._previousState === StateName.inactive && state === StateName.default) {
        if (sliderVisible === false) {
          // show slider
          sliderVisible = true
          const fromKnob = SCROLL_BAR_KNOB_INACTIVE_GRADIENT
          const toKnob = SCROLL_BAR_KNOB_GRADIENT
          const fromBase = SCROLL_BAR_BACKGROUND_INACTIVE_GRADIENT
          const toBase = SCROLL_BAR_BACKGROUND_GRADIENT
          this.sliderColorChangeCancel()
          doAnimation(fromKnob, fromBase, toKnob, toBase, () => {})
        }
      }
      this._previousState = state
    })
  }
}
