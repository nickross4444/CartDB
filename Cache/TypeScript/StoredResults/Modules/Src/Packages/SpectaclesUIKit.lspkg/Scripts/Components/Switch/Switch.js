"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
var __selfType = requireType("./Switch");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Slider_1 = require("../Slider/Slider");
/**
 * Represents a Switch component that extends the Slider functionality.
 *
 * @extends VisualElement
 * @implements Toggleable
 */
let Switch = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Slider_1.Slider;
    var Switch = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._defaultValue = this._defaultValue;
            // Hidden inputs
            this.segmented = true;
            this.numberOfSegments = 2;
            this._isExplicit = true;
        }
        __initialize() {
            super.__initialize();
            this._defaultValue = this._defaultValue;
            // Hidden inputs
            this.segmented = true;
            this.numberOfSegments = 2;
            this._isExplicit = true;
        }
        /**
         * Gets the current state of the switch.
         *
         * @returns {boolean} - Returns `true` if the switch's current state is not set to 0, otherwise `false`.
         */
        get isOn() {
            return this._currentValue !== 0;
        }
        /**
         * Sets the state of the switch to either "on" or "off".
         *
         * @param on - A boolean value indicating whether the switch should be turned on (`true`) or off (`false`).
         */
        set isOn(on) {
            if (on === undefined) {
                return;
            }
            this._isExplicit = false;
            this.setOn(on);
        }
        /**
         * Converts the current component to a toggle switch.
         * This method sets the component to cycle through two states and updates the knob position accordingly.
         */
        setIsToggleable(isToggle) {
            if (isToggle) {
                this.segmented = true;
                this.snapToTriggerPosition = true;
                this.numberOfSegments = 2;
                this.updateKnobPositionFromValue();
                this.interactable.enableInstantDrag = false;
            }
            // to do: should we cache previous setup if not toggle?
        }
        /**
         * Toggles the switch to the on/off state.
         *
         * This method sets the current state of the switch to 1 or 0 and updates the knob position accordingly.
         * @param on - A boolean value indicating the desired toggle state.
         */
        toggle(on) {
            this._isExplicit = true;
            this.setOn(on);
        }
        /**
         * Initializes the switch component.
         *
         * This method sets the default state, segmented mode, trigger to cycle, and number of segments.
         * It then calls the parent class's initialize method to set up the component.
         */
        initialize() {
            this.segmented = true;
            this.numberOfSegments = 2;
            super.initialize();
        }
        onTriggerUpHandler(stateEvent) {
            this._isExplicit = true;
            super.onTriggerUpHandler(stateEvent);
        }
        onInteractableDragEnd(dragEvent) {
            this._isExplicit = true;
            super.onInteractableDragEnd(dragEvent);
        }
        onTriggerRespond(_) {
            if (!this._isDragged) {
                if (this.segmented && this.snapToTriggerPosition) {
                    const newValue = this.currentValue === 0 ? 1 : 0;
                    this.updateCurrentValue(newValue, true);
                }
            }
        }
        setOn(on) {
            if ((on && this._currentValue === 1) || (!on && this._currentValue === 0)) {
                return;
            }
            this.updateCurrentValue(on ? 1 : 0, true);
        }
        get isExplicit() {
            return this._isExplicit;
        }
    };
    __setFunctionName(_classThis, "Switch");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Switch = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Switch = _classThis;
})();
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map