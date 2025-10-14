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
exports.BaseToggleGroup = void 0;
var __selfType = requireType("./BaseToggleGroup");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const SceneUtilities_1 = require("../../Utility/SceneUtilities");
const UIKitUtilities_1 = require("../../Utility/UIKitUtilities");
/* eslint-disable @typescript-eslint/no-unused-vars */
const log = new NativeLogger_1.default("ToggleGroup");
/**
 * BaseToggleGroup is an abstract class that provides functionality for managing a group of Toggleable components.
 * It handles the registration and deregistration of Toggleables, and ensures that only one Toggleable can be
 * active at a time unless configured otherwise.
 *
 * @abstract
 * @extends BaseScriptComponent
 */
let BaseToggleGroup = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var BaseToggleGroup = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._allowAllTogglesOff = this._allowAllTogglesOff;
            this.addCallbacks = this.addCallbacks;
            this.onToggleSelectedCallbacks = this.onToggleSelectedCallbacks;
            this._firstOnToggle = -1;
            this.initialized = false;
            this._toggleableToValue = new Map();
            this._toggleFinishedHandlers = new Map();
            this._initializedToggles = new Set();
            this.onToggleSelectedEvent = new Event_1.default();
            /**
             * An event that is triggered when a toggle is selected within the group.
             *
             * @remarks
             * Use this event to listen for changes in the toggle group selection state.
             * Subscribers will be notified whenever a toggle is selected.
             */
            this.onToggleSelected = this.onToggleSelectedEvent.publicApi();
            this._toggleables = [];
            this.onToggleFinishedEventHandler = (toggleable, explicit) => {
                if (explicit) {
                    if (toggleable.isOn) {
                        this.toggleables.forEach((t) => {
                            if (t !== toggleable) {
                                t.isOn = false;
                            }
                        });
                    }
                    else if (!this._allowAllTogglesOff) {
                        toggleable.isOn = true;
                    }
                }
                if (explicit && toggleable.isOn) {
                    const toggleSelectArgs = { toggleable, value: this._toggleableToValue.get(toggleable) };
                    this.onToggleSelectedEvent.invoke(toggleSelectArgs);
                }
            };
        }
        __initialize() {
            super.__initialize();
            this._allowAllTogglesOff = this._allowAllTogglesOff;
            this.addCallbacks = this.addCallbacks;
            this.onToggleSelectedCallbacks = this.onToggleSelectedCallbacks;
            this._firstOnToggle = -1;
            this.initialized = false;
            this._toggleableToValue = new Map();
            this._toggleFinishedHandlers = new Map();
            this._initializedToggles = new Set();
            this.onToggleSelectedEvent = new Event_1.default();
            /**
             * An event that is triggered when a toggle is selected within the group.
             *
             * @remarks
             * Use this event to listen for changes in the toggle group selection state.
             * Subscribers will be notified whenever a toggle is selected.
             */
            this.onToggleSelected = this.onToggleSelectedEvent.publicApi();
            this._toggleables = [];
            this.onToggleFinishedEventHandler = (toggleable, explicit) => {
                if (explicit) {
                    if (toggleable.isOn) {
                        this.toggleables.forEach((t) => {
                            if (t !== toggleable) {
                                t.isOn = false;
                            }
                        });
                    }
                    else if (!this._allowAllTogglesOff) {
                        toggleable.isOn = true;
                    }
                }
                if (explicit && toggleable.isOn) {
                    const toggleSelectArgs = { toggleable, value: this._toggleableToValue.get(toggleable) };
                    this.onToggleSelectedEvent.invoke(toggleSelectArgs);
                }
            };
        }
        /**
         * Gets the list of toggleable components managed by this toggle group.
         *
         * @returns An array of `Toggleable` objects representing the toggleable components.
         */
        get toggleables() {
            return this._toggleables;
        }
        /**
         * Gets a value indicating whether all toggles in the group are allowed to be turned off.
         *
         * When this property is `true`, it means that none of the toggles in the group
         * are required to remain active, allowing all toggles to be in an "off" state.
         *
         * @returns A boolean value indicating if all toggles can be turned off.
         */
        get allowAllTogglesOff() {
            return this._allowAllTogglesOff;
        }
        /**
         * Sets whether all toggles in the group can be turned off simultaneously.
         *
         * @param value - A boolean indicating if all toggles can be turned off.
         *                If `true`, all toggles can be deselected at the same time.
         */
        set allowAllTogglesOff(value) {
            if (value === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._allowAllTogglesOff, value)) {
                return;
            }
            this._allowAllTogglesOff = value;
            if (this.initialized) {
                this.configureToggles();
                this.reset();
            }
        }
        get firstOnToggle() {
            return this._firstOnToggle;
        }
        set firstOnToggle(value) {
            this._firstOnToggle = value;
        }
        /**
         * Registers a toggleable component with the toggle group, with an optional value.
         *
         * @param toggleable - The toggleable component to be registered.
         * @param value - An optional value associated with the toggleable.
         */
        registerToggleable(toggleable, value = null) {
            this.toggleables.push(toggleable);
            this._toggleableToValue.set(toggleable, value);
            this.initializeToggle(toggleable);
            // if basetogglegroup has run setup already, rerun init for each registered toggleable
            if (this.initialized)
                this.configureToggles();
            this.reset();
        }
        /**
         * Deregisters a toggleable component from the toggle group.
         *
         * This method removes the specified toggleable component from the list of
         * registered toggleables and also removes its associated event handler.
         *
         * @param toggleable - The toggleable component to be deregistered.
         */
        deregisterToggleable(toggleable) {
            this.toggleables.splice(this.toggleables.indexOf(toggleable), 1);
            if (this._toggleableToValue.has(toggleable)) {
                this._toggleableToValue.delete(toggleable);
            }
            this.removeToggleableEventHandler(toggleable);
            this._initializedToggles.delete(toggleable);
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(() => {
                this.onStart();
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this.onDestroyed();
            });
        }
        onStart() {
            this.onToggleSelected.add(() => {
                if (this.addCallbacks) {
                    (0, SceneUtilities_1.createCallbacks)(this.onToggleSelectedCallbacks);
                }
            });
            this.setUpToggleables(); // Set up the toggleables when the component starts
            this.configureToggles();
            this.reset();
            this.initialized = true;
        }
        onDestroyed() {
            while (this.toggleables.length > 0) {
                const toggleable = this.toggleables[0];
                this.deregisterToggleable(toggleable);
            }
        }
        setUpToggleables() {
            for (let i = 0; i < this.toggleables.length; i++) {
                const toggleable = this.toggleables[i];
                this.initializeToggle(toggleable);
            }
        }
        /**
         * Initializes the ToggleGroup component, by determining the first item that is toggled on.
         */
        configureToggles() {
            for (let i = 0; i < this.toggleables.length; i++) {
                if (this._firstOnToggle === -1 && this.toggleables[i].isOn) {
                    this._firstOnToggle = i;
                    break;
                }
            }
            if (!this._allowAllTogglesOff && this._firstOnToggle === -1 && this.toggleables.length > 0) {
                this._firstOnToggle = 0;
            }
        }
        /**
         * Resets all toggleable components within the group based on firstOnToggle
         */
        reset() {
            this.toggleables.forEach((toggleable) => {
                this.resetToggle(toggleable);
            });
        }
        /**
         * A public API to reset the togglegroup
         */
        resetToggleGroup() {
            this.reset();
        }
        setUpToggleableEventHandler(toggleable) {
            const handler = this.onToggleFinishedEventHandler.bind(this, toggleable);
            this._toggleFinishedHandlers.set(toggleable, handler);
            toggleable.onFinished.add(handler);
        }
        removeToggleableEventHandler(toggleable) {
            const handler = this._toggleFinishedHandlers.get(toggleable);
            if (handler) {
                toggleable.onFinished.remove(handler);
                this._toggleFinishedHandlers.delete(toggleable);
            }
        }
        initializeToggle(toggleable) {
            if (this._initializedToggles.has(toggleable))
                return;
            toggleable.initialize();
            toggleable.setIsToggleable(true);
            this.setUpToggleableEventHandler(toggleable);
            this._initializedToggles.add(toggleable);
        }
        resetToggle(toggleable) {
            if (this._firstOnToggle !== -1) {
                if (toggleable.isOn && this.toggleables[this._firstOnToggle] !== toggleable) {
                    toggleable.isOn = false;
                }
                else if (!toggleable.isOn && this.toggleables[this._firstOnToggle] === toggleable) {
                    toggleable.isOn = true;
                }
            }
        }
    };
    __setFunctionName(_classThis, "BaseToggleGroup");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BaseToggleGroup = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BaseToggleGroup = _classThis;
})();
exports.BaseToggleGroup = BaseToggleGroup;
//# sourceMappingURL=BaseToggleGroup.js.map