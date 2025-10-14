"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseButton = void 0;
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const SceneUtilities_1 = require("../../../Scripts/Utility/SceneUtilities");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const Element_1 = require("../Element");
const VisualElement_1 = require("../VisualElement");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = new NativeLogger_1.default("Button");
/**
 * The `Button` class represents a button component in the Spectacles UI Kit.
 * It extends the `VisualElement` class and initializes a default visual if none is provided.
 *
 * @extends VisualElement
 */
class BaseButton extends VisualElement_1.VisualElement {
    constructor() {
        super();
        this._toggleable = this._toggleable;
        this._defaultToOn = this._defaultToOn;
        this.addCallbacks = this.addCallbacks;
        this.triggerUpCallbacks = this.triggerUpCallbacks;
        this.triggerDownCallbacks = this.triggerDownCallbacks;
        this.onValueChangeCallbacks = this.onValueChangeCallbacks;
        this.onFinishedCallbacks = this.onFinishedCallbacks;
        this._isOn = false;
        this.onValueChangeEvent = new Event_1.default();
        this.onValueChange = this.onValueChangeEvent.publicApi();
        this.onFinishedEvent = new Event_1.default();
        this.onFinished = this.onFinishedEvent.publicApi();
    }
    __initialize() {
        super.__initialize();
        this._toggleable = this._toggleable;
        this._defaultToOn = this._defaultToOn;
        this.addCallbacks = this.addCallbacks;
        this.triggerUpCallbacks = this.triggerUpCallbacks;
        this.triggerDownCallbacks = this.triggerDownCallbacks;
        this.onValueChangeCallbacks = this.onValueChangeCallbacks;
        this.onFinishedCallbacks = this.onFinishedCallbacks;
        this._isOn = false;
        this.onValueChangeEvent = new Event_1.default();
        this.onValueChange = this.onValueChangeEvent.publicApi();
        this.onFinishedEvent = new Event_1.default();
        this.onFinished = this.onFinishedEvent.publicApi();
    }
    get isToggle() {
        return this._toggleable;
    }
    /**
     * Gets the current state of the toggle.
     *
     * @returns {boolean} - Returns `true` if the toggle is on, otherwise `false`.
     */
    get isOn() {
        return this._isOn;
    }
    /**
     * Sets the state of the toggle.
     * If the new state is different from the current state, it updates the state,
     * triggers the updateCheck method, and invokes the onValueChangeEvent.
     *
     * @param on - A boolean indicating the new state of the toggle.
     */
    set isOn(on) {
        if (on === undefined) {
            return;
        }
        this.setOn(on, false);
    }
    setIsToggleable(isToggle) {
        if (this._toggleable === false && isToggle) {
            // programmatically forcing toggleable
            print(`WARNING: ${this.sceneObject.name} is being automatically converted to a toggle.`);
        }
        this._toggleable = isToggle;
        // undo previous settings
        this.removeInteractableListeners();
        // sets interactable state machine to be a toggle
        this.setUpInteractableListeners();
    }
    initialize() {
        this._isOn = this._defaultToOn;
        this.stateName = this._defaultToOn ? Element_1.StateName.toggledDefault : Element_1.StateName.default;
        super.initialize();
        if (this.isToggle) {
            this._interactableStateMachine.toggle = this._isOn;
        }
    }
    setUpEventCallbacks() {
        super.setUpEventCallbacks();
        if (this.addCallbacks) {
            this.onTriggerUp.add((0, SceneUtilities_1.createCallbacks)(this.triggerUpCallbacks));
            this.onTriggerDown.add((0, SceneUtilities_1.createCallbacks)(this.triggerDownCallbacks));
            this.onValueChange.add((0, SceneUtilities_1.createCallbacks)(this.onValueChangeCallbacks));
            this.onFinished.add((0, SceneUtilities_1.createCallbacks)(this.onFinishedCallbacks));
        }
    }
    setState(stateName) {
        super.setState(stateName);
        const shouldBeOn = stateName === Element_1.StateName.toggledDefault ||
            stateName === Element_1.StateName.toggledHovered ||
            stateName === Element_1.StateName.toggledTriggered;
        if (this._isOn !== shouldBeOn) {
            this.setOn(shouldBeOn, true); // explicit = true to notify toggle group
        }
    }
    /**
     * Toggle on/off the toggle by setting its state
     *
     * @param on - A boolean value indicating the desired toggle state.
     */
    toggle(on) {
        if (this.isToggle) {
            this.setOn(on, true);
        }
        else {
            print("WARNING: this is not in toggle mode! Did you mean to check `isToggle`?");
        }
    }
    setOn(on, explicit) {
        if (this.initialized) {
            if (this._isOn === on) {
                return;
            }
            this._isOn = on;
            if (this.isToggle) {
                this._interactableStateMachine.toggle = on;
            }
            this.onValueChangeEvent.invoke(this._isOn ? 1 : 0);
            this.onFinishedEvent.invoke(explicit);
        }
        else {
            this._defaultToOn = on;
        }
    }
}
exports.BaseButton = BaseButton;
//# sourceMappingURL=BaseButton.js.map