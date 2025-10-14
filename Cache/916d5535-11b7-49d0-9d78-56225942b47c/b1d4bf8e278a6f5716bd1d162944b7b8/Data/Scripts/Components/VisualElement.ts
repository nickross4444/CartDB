import {unsubscribe} from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {CancelToken, clearTimeout, setTimeout} from "SpectaclesInteractionKit.lspkg/Utils/FunctionTimingUtils"
import {SnapOS2Styles} from "../Themes/SnapOS-2.0/SnapOS2"
import {Tooltip} from "../Tooltip"
import {StateEvent} from "../Utility/InteractableStateMachine"
import {findAllChildComponents} from "../Utility/SceneUtilities"
import {isEqual} from "../Utility/UIKitUtilities"
import {Visual} from "../Visuals/Visual"
import {Element, StateName} from "./Element"

/**
 * This constant determines how long the user must hover or interact with an element before the tooltip appears.
 */
const TOOLTIP_ACTIVATION_DELAY = 50 //in milliseconds

/**
 * Represents an abstract base class for visual elements in the UI framework.
 * This class extends the `Element` class and provides functionality for managing
 * a visual representation (`Visual`) and handles initialization and event binding for the visual element.
 *
 * @abstract
 */

export abstract class VisualElement extends Element {
  @input
  @widget(
    new ComboBoxWidget([
      new ComboBoxItem("PrimaryNeutral", "PrimaryNeutral"),
      new ComboBoxItem("Primary", "Primary"),
      new ComboBoxItem("Secondary", "Secondary"),
      new ComboBoxItem("Special", "Special"),
      new ComboBoxItem("Ghost", "Ghost")
    ])
  )
  protected _style: string = SnapOS2Styles.PrimaryNeutral

  protected _visual: Visual
  protected visualEventHandlerUnsubscribes: unsubscribe[] = []

  private tooltip: Tooltip
  private tooltipCancelToken: CancelToken

  get typeString(): string {
    return this.constructor.name
  }

  /**
   * Gets the associated `Visual` instance for this component.
   *
   * @returns {Visual} The `Visual` instance linked to this component.
   */
  get visual(): Visual {
    return this._visual
  }

  /**
   * The style of the visual element.
   *
   * @returns {string} The style of the visual element.
   */
  public get style(): string {
    return this._style as string
  }

  /**
   * Sets the visual element for this component. If a previous visual element exists,
   * it will be destroyed before assigning the new one. Ensures that the new visual
   * element is only set if it differs from the current one.
   *
   * @param value - The new `Visual` instance to be assigned.
   */
  set visual(value: Visual) {
    if (value === undefined) {
      return
    }
    if (isEqual<Visual>(this._visual, value)) {
      return
    }
    this.destroyVisual()
    this._visual = value
    if (this._initialized) {
      this.configureVisual()
      this.setState(this.stateName) // set the new visual to current state
    }
  }

  /**
   * Gets the size of the visual element.
   *
   * @returns {vec3} The size of the visual element.
   */
  get size(): vec3 {
    return this._size
  }

  /**
   * @returns current size
   */
  set size(size: vec3) {
    if (size === undefined) {
      return
    }
    super.size = size
    if (this._initialized) {
      this._visual.size = size
    }
  }

  /**
   * The render order of the visual element.
   */
  get renderOrder(): number {
    return this._renderOrder
  }

  /**
   * The render order of the visual element.
   */
  set renderOrder(value: number) {
    if (value === undefined) {
      return
    }
    this._renderOrder = value
    if (this._initialized) {
      this._visual.renderMeshVisual.renderOrder = value
    }
  }

  /**
   * Initializes the visual element and its associated properties and events.
   *
   * @override
   */
  initialize(): void {
    if (this._initialized) {
      return
    }

    this.createDefaultVisual()

    this._visual.renderMeshVisual.renderOrder = this._renderOrder

    super.initialize()

    this.configureVisual()

    this.visual.onPositionChanged.add((args) => {
      this.currentPosition = args.current
      this.updateCollider()
    })

    this.visual.onScaleChanged.add((args) => {
      this.currentScale = args.current
      this.updateCollider()
    })

    if (!this.tooltip) {
      const tooltipComponents = findAllChildComponents(
        this.sceneObject,
        Tooltip.getTypeName() as unknown as keyof ComponentNameMap
      )
      if (tooltipComponents.length > 0) {
        this.registerTooltip(tooltipComponents[0] as Tooltip)
      }
    }

    this.setState(this.stateName)
  }

  /**
   * Registers a tooltip instance with the current component
   *
   * @param tooltip - The Tooltip instance to associate with this component.
   */
  registerTooltip(tooltip: Tooltip): void {
    this.tooltip = tooltip
    this.tooltip.setOn(false)
  }

  /**
   * Sets the tooltip text for the visual element.
   *
   * @param text - The text to be displayed in the tooltip.
   */
  setTooltip(text: string): void {
    if (this.tooltip) {
      if (this.tooltip.tip !== text) {
        this.tooltip.tip = text
      }
    }
  }

  protected abstract createDefaultVisual(): void

  protected configureVisual(): void {
    if (this._visual) {
      this.visualEventHandlerUnsubscribes.push(
        this._visual.onDestroyed.add(() => {
          this._visual = null
        })
      )

      this._visual.initialize()

      this._visual.size = this._size
      this._visual.collider = this.collider
    }
  }

  protected onEnabled() {
    super.onEnabled()
    if (this._initialized) {
      this.visual.enable()
    }
  }

  protected onDisabled() {
    super.onDisabled()
    if (this._initialized) {
      this.visual.disable()
    }
  }

  private destroyVisual(): void {
    if (this._visual) {
      this._visual.destroy()
    }
    this.visualEventHandlerUnsubscribes.forEach((unsubscribe) => unsubscribe())
    this.visualEventHandlerUnsubscribes = []
  }

  protected release(): void {
    this._visual?.destroy()
    super.release()
  }

  protected setState(stateName: StateName): void {
    this._visual?.setState(stateName)
    super.setState(stateName)
  }

  protected onHoverEnterHandler(stateEvent: StateEvent): void {
    this.setTooltipState(true)
    super.onHoverEnterHandler(stateEvent)
  }

  protected onHoverExitHandler(stateEvent: StateEvent): void {
    this.setTooltipState(false)
    super.onHoverExitHandler(stateEvent)
  }

  private updateCollider(): void {
    if (this._colliderFitElement) {
      const delta = this.deltaPosition.div(this.deltaScale)
      this.colliderShape.size = this._size.add(delta)
      this.collider.shape = this.colliderShape
      this.colliderTransform.setLocalPosition(delta.uniformScale(-1 / 2))
    }
  }

  private setTooltipState(isOn: boolean): void {
    if (this.tooltip) {
      if (isOn) {
        this.tooltipCancelToken = setTimeout(() => {
          if (this.tooltipCancelToken && !this.tooltipCancelToken.cancelled) {
            this.tooltip.setOn(true)
          }
        }, TOOLTIP_ACTIVATION_DELAY)
      } else {
        clearTimeout(this.tooltipCancelToken)
        this.tooltip.setOn(false)
      }
      const unsubscribe = this.tooltip.onDestroy.add(() => {
        clearTimeout(this.tooltipCancelToken)
        this.tooltipCancelToken = null
        this.tooltip = null
        unsubscribe()
      })
    }
  }
}
