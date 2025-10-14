import {DragInteractorEvent} from "SpectaclesInteractionKit.lspkg/Core/Interactor/InteractorEvent"
import {StateEvent} from "../../Utility/InteractableStateMachine"
import {Slider} from "../Slider/Slider"
import {Toggleable} from "../Toggle/Toggleable"

/**
 * Represents a Switch component that extends the Slider functionality.
 *
 * @extends VisualElement
 * @implements Toggleable
 */
@component
export class Switch extends Slider implements Toggleable {
  @input("int")
  @hint("The default state of the switch")
  @widget(new ComboBoxWidget([new ComboBoxItem("Off", 0), new ComboBoxItem("On", 1)]))
  protected _defaultValue: number = 0

  // Hidden inputs
  protected segmented: boolean = true
  protected numberOfSegments: number = 2

  private _isExplicit: boolean = true

  /**
   * Gets the current state of the switch.
   *
   * @returns {boolean} - Returns `true` if the switch's current state is not set to 0, otherwise `false`.
   */
  get isOn(): boolean {
    return this._currentValue !== 0
  }

  /**
   * Sets the state of the switch to either "on" or "off".
   *
   * @param on - A boolean value indicating whether the switch should be turned on (`true`) or off (`false`).
   */
  set isOn(on: boolean) {
    if (on === undefined) {
      return
    }
    this._isExplicit = false
    this.setOn(on)
  }

  /**
   * Converts the current component to a toggle switch.
   * This method sets the component to cycle through two states and updates the knob position accordingly.
   */
  setIsToggleable(isToggle: boolean): void {
    if (isToggle) {
      this.segmented = true
      this.snapToTriggerPosition = true
      this.numberOfSegments = 2
      this.updateKnobPositionFromValue()
      this.interactable.enableInstantDrag = false
    }
    // to do: should we cache previous setup if not toggle?
  }

  /**
   * Toggles the switch to the on/off state.
   *
   * This method sets the current state of the switch to 1 or 0 and updates the knob position accordingly.
   * @param on - A boolean value indicating the desired toggle state.
   */
  toggle(on: boolean): void {
    this._isExplicit = true
    this.setOn(on)
  }

  /**
   * Initializes the switch component.
   *
   * This method sets the default state, segmented mode, trigger to cycle, and number of segments.
   * It then calls the parent class's initialize method to set up the component.
   */
  initialize() {
    this.segmented = true
    this.numberOfSegments = 2
    super.initialize()
  }

  protected onTriggerUpHandler(stateEvent: StateEvent) {
    this._isExplicit = true
    super.onTriggerUpHandler(stateEvent)
  }

  protected onInteractableDragEnd(dragEvent: DragInteractorEvent): void {
    this._isExplicit = true
    super.onInteractableDragEnd(dragEvent)
  }

  protected onTriggerRespond(_: StateEvent): void {
    if (!this._isDragged) {
      if (this.segmented && this.snapToTriggerPosition) {
        const newValue = this.currentValue === 0 ? 1 : 0
        this.updateCurrentValue(newValue, true)
      }
    }
  }

  private setOn(on: boolean) {
    if ((on && this._currentValue === 1) || (!on && this._currentValue === 0)) {
      return
    }
    this.updateCurrentValue(on ? 1 : 0, true)
  }

  protected get isExplicit(): boolean {
    return this._isExplicit
  }
}
