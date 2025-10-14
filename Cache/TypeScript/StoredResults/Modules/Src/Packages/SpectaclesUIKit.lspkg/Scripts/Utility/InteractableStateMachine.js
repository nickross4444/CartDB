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
exports.InteractableStateMachine = void 0;
var __selfType = requireType("./InteractableStateMachine");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Interactable_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const log = new NativeLogger_1.default("InteractableStateMachine");
var State;
(function (State) {
    State["default"] = "default";
    State["hovered"] = "hovered";
    State["triggered"] = "triggered";
    State["toggledDefault"] = "toggledDefault";
    State["toggledHovered"] = "toggledHovered";
    State["toggledTriggered"] = "toggledTriggered";
})(State || (State = {}));
var Action;
(function (Action) {
    Action["hover"] = "hover";
    Action["unHover"] = "unHover";
    Action["triggerStart"] = "triggerStart";
    Action["triggerEnd"] = "triggerEnd";
    Action["triggerEndOutside"] = "triggerEndOutside";
    Action["triggerCancel"] = "triggerCancel";
    Action["toggleOn"] = "toggleOn";
    Action["toggleOff"] = "toggleOff";
})(Action || (Action = {}));
let InteractableStateMachine = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var InteractableStateMachine = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.interactable = this.sceneObject.getComponent(Interactable_1.Interactable.getTypeName());
            this.initialized = false;
            this._state = State.default;
            this.isToggle = false;
            this.untoggleOnClick = true;
            this.events = {
                default: new Event_1.default(),
                hovered: new Event_1.default(),
                triggered: new Event_1.default(),
                toggledDefault: new Event_1.default(),
                toggledHovered: new Event_1.default(),
                toggledTriggered: new Event_1.default()
            };
            this.onDefault = this.events.default.publicApi();
            this.onHovered = this.events.hovered.publicApi();
            this.onTriggered = this.events.triggered.publicApi();
            this.onToggledDefault = this.events.toggledDefault.publicApi();
            this.onToggledHovered = this.events.toggledHovered.publicApi();
            this.onToggledTriggered = this.events.toggledTriggered.publicApi();
            this.triggered = false;
            this.onStart = () => {
                if (!this.initialized) {
                    this.initialize();
                }
            };
            this.initialize = () => {
                this.interactable.onHoverEnter.add((e) => {
                    if (this.interactable.enabled) {
                        if (this.triggered)
                            this.transition(Action.triggerStart);
                        else
                            this.transition(Action.hover, e);
                    }
                });
                this.interactable.onHoverExit.add((e) => {
                    if (this.interactable.enabled) {
                        if (this.triggered) {
                            // Only unhover the Interactable if the Interactable is not meant to keep hover on trigger.
                            if (!this.interactable.keepHoverOnTrigger) {
                                this.transition(Action.unHover, e);
                            }
                        }
                        else {
                            this.transition(Action.unHover, e);
                        }
                    }
                });
                this.interactable.onTriggerStart.add((e) => {
                    if (this.interactable.enabled && e.propagationPhase === "Target") {
                        this.transition(Action.triggerStart, e);
                        this.triggered = true;
                    }
                });
                this.interactable.onTriggerEnd.add((e) => {
                    if (this.interactable.enabled) {
                        this.transition(Action.triggerEnd, e);
                        this.triggered = false;
                    }
                });
                this.interactable.onTriggerEndOutside.add((e) => {
                    if (this.interactable.enabled) {
                        this.transition(Action.triggerEndOutside, e);
                        this.triggered = false;
                    }
                });
                this.interactable.onTriggerCanceled.add((e) => {
                    if (this.interactable.enabled) {
                        this.transition(Action.triggerCancel, e);
                        this.triggered = false;
                    }
                });
                this.initialized = true;
            };
            this.transition = (action, e = null) => {
                const lastState = this._state;
                this._state = this.getTransition(action);
                log.d(`----------------------`);
                log.d(`lastState = ${lastState}`);
                log.d(`action = ${action}`);
                log.d(`state = ${this.state}`);
                this.events[this.state].invoke({ state: lastState, event: e });
            };
            this.getTransition = (action) => {
                const transitions = {
                    default: {
                        hover: State.hovered,
                        unHover: State.default,
                        triggerStart: State.triggered,
                        triggerEnd: State.default,
                        triggerEndOutside: State.default,
                        triggerCancel: State.default,
                        toggleOn: State.toggledDefault,
                        toggleOff: State.default
                    },
                    hovered: {
                        hover: State.hovered,
                        unHover: State.default,
                        triggerStart: State.triggered,
                        triggerEnd: State.hovered,
                        triggerEndOutside: State.default,
                        triggerCancel: State.hovered,
                        toggleOn: State.toggledHovered,
                        toggleOff: State.hovered
                    },
                    triggered: {
                        hover: State.triggered,
                        unHover: State.default,
                        triggerStart: State.triggered,
                        triggerEnd: this.isToggle ? State.toggledHovered : State.hovered,
                        triggerEndOutside: State.default,
                        triggerCancel: State.default,
                        toggleOn: State.toggledTriggered,
                        toggleOff: State.triggered
                    },
                    toggledDefault: {
                        hover: State.toggledHovered,
                        unHover: State.toggledDefault,
                        triggerStart: State.toggledTriggered,
                        triggerEnd: State.toggledHovered,
                        triggerEndOutside: State.toggledDefault,
                        triggerCancel: State.toggledDefault,
                        toggleOn: State.toggledDefault,
                        toggleOff: State.default
                    },
                    toggledHovered: {
                        hover: State.toggledHovered,
                        unHover: State.toggledDefault,
                        triggerStart: State.toggledTriggered,
                        triggerEnd: State.toggledHovered,
                        triggerEndOutside: State.toggledDefault,
                        triggerCancel: State.toggledDefault,
                        toggleOn: State.toggledHovered,
                        toggleOff: State.hovered
                    },
                    toggledTriggered: {
                        hover: State.toggledHovered,
                        unHover: State.toggledDefault,
                        triggerStart: State.toggledTriggered,
                        triggerEnd: this.untoggleOnClick ? State.hovered : State.toggledTriggered,
                        triggerEndOutside: State.toggledDefault,
                        triggerCancel: State.toggledDefault,
                        toggleOn: State.toggledTriggered,
                        toggleOff: State.triggered
                    }
                };
                return transitions[this.state][action];
            };
        }
        __initialize() {
            super.__initialize();
            this.interactable = this.sceneObject.getComponent(Interactable_1.Interactable.getTypeName());
            this.initialized = false;
            this._state = State.default;
            this.isToggle = false;
            this.untoggleOnClick = true;
            this.events = {
                default: new Event_1.default(),
                hovered: new Event_1.default(),
                triggered: new Event_1.default(),
                toggledDefault: new Event_1.default(),
                toggledHovered: new Event_1.default(),
                toggledTriggered: new Event_1.default()
            };
            this.onDefault = this.events.default.publicApi();
            this.onHovered = this.events.hovered.publicApi();
            this.onTriggered = this.events.triggered.publicApi();
            this.onToggledDefault = this.events.toggledDefault.publicApi();
            this.onToggledHovered = this.events.toggledHovered.publicApi();
            this.onToggledTriggered = this.events.toggledTriggered.publicApi();
            this.triggered = false;
            this.onStart = () => {
                if (!this.initialized) {
                    this.initialize();
                }
            };
            this.initialize = () => {
                this.interactable.onHoverEnter.add((e) => {
                    if (this.interactable.enabled) {
                        if (this.triggered)
                            this.transition(Action.triggerStart);
                        else
                            this.transition(Action.hover, e);
                    }
                });
                this.interactable.onHoverExit.add((e) => {
                    if (this.interactable.enabled) {
                        if (this.triggered) {
                            // Only unhover the Interactable if the Interactable is not meant to keep hover on trigger.
                            if (!this.interactable.keepHoverOnTrigger) {
                                this.transition(Action.unHover, e);
                            }
                        }
                        else {
                            this.transition(Action.unHover, e);
                        }
                    }
                });
                this.interactable.onTriggerStart.add((e) => {
                    if (this.interactable.enabled && e.propagationPhase === "Target") {
                        this.transition(Action.triggerStart, e);
                        this.triggered = true;
                    }
                });
                this.interactable.onTriggerEnd.add((e) => {
                    if (this.interactable.enabled) {
                        this.transition(Action.triggerEnd, e);
                        this.triggered = false;
                    }
                });
                this.interactable.onTriggerEndOutside.add((e) => {
                    if (this.interactable.enabled) {
                        this.transition(Action.triggerEndOutside, e);
                        this.triggered = false;
                    }
                });
                this.interactable.onTriggerCanceled.add((e) => {
                    if (this.interactable.enabled) {
                        this.transition(Action.triggerCancel, e);
                        this.triggered = false;
                    }
                });
                this.initialized = true;
            };
            this.transition = (action, e = null) => {
                const lastState = this._state;
                this._state = this.getTransition(action);
                log.d(`----------------------`);
                log.d(`lastState = ${lastState}`);
                log.d(`action = ${action}`);
                log.d(`state = ${this.state}`);
                this.events[this.state].invoke({ state: lastState, event: e });
            };
            this.getTransition = (action) => {
                const transitions = {
                    default: {
                        hover: State.hovered,
                        unHover: State.default,
                        triggerStart: State.triggered,
                        triggerEnd: State.default,
                        triggerEndOutside: State.default,
                        triggerCancel: State.default,
                        toggleOn: State.toggledDefault,
                        toggleOff: State.default
                    },
                    hovered: {
                        hover: State.hovered,
                        unHover: State.default,
                        triggerStart: State.triggered,
                        triggerEnd: State.hovered,
                        triggerEndOutside: State.default,
                        triggerCancel: State.hovered,
                        toggleOn: State.toggledHovered,
                        toggleOff: State.hovered
                    },
                    triggered: {
                        hover: State.triggered,
                        unHover: State.default,
                        triggerStart: State.triggered,
                        triggerEnd: this.isToggle ? State.toggledHovered : State.hovered,
                        triggerEndOutside: State.default,
                        triggerCancel: State.default,
                        toggleOn: State.toggledTriggered,
                        toggleOff: State.triggered
                    },
                    toggledDefault: {
                        hover: State.toggledHovered,
                        unHover: State.toggledDefault,
                        triggerStart: State.toggledTriggered,
                        triggerEnd: State.toggledHovered,
                        triggerEndOutside: State.toggledDefault,
                        triggerCancel: State.toggledDefault,
                        toggleOn: State.toggledDefault,
                        toggleOff: State.default
                    },
                    toggledHovered: {
                        hover: State.toggledHovered,
                        unHover: State.toggledDefault,
                        triggerStart: State.toggledTriggered,
                        triggerEnd: State.toggledHovered,
                        triggerEndOutside: State.toggledDefault,
                        triggerCancel: State.toggledDefault,
                        toggleOn: State.toggledHovered,
                        toggleOff: State.hovered
                    },
                    toggledTriggered: {
                        hover: State.toggledHovered,
                        unHover: State.toggledDefault,
                        triggerStart: State.toggledTriggered,
                        triggerEnd: this.untoggleOnClick ? State.hovered : State.toggledTriggered,
                        triggerEndOutside: State.toggledDefault,
                        triggerCancel: State.toggledDefault,
                        toggleOn: State.toggledTriggered,
                        toggleOff: State.triggered
                    }
                };
                return transitions[this.state][action];
            };
        }
        onAwake() {
            if (!this.interactable) {
                log.e(`Interactable not found on this object: ${this.sceneObject.name}`);
            }
            this.createEvent("OnStartEvent").bind(this.onStart);
        }
        get state() {
            return this._state;
        }
        set state(newState) {
            if (newState === undefined || newState === this._state) {
                return;
            }
            const lastState = this._state;
            this._state = newState;
            this.events[this._state].invoke({ state: lastState });
        }
        set toggle(on) {
            if (on === undefined) {
                return;
            }
            if (on) {
                this.transition(Action.toggleOn);
            }
            else {
                this.transition(Action.toggleOff);
            }
        }
        get toggle() {
            return (this.state === State.toggledTriggered ||
                this.state === State.toggledDefault ||
                this.state === State.toggledHovered);
        }
    };
    __setFunctionName(_classThis, "InteractableStateMachine");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InteractableStateMachine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InteractableStateMachine = _classThis;
})();
exports.InteractableStateMachine = InteractableStateMachine;
//# sourceMappingURL=InteractableStateMachine.js.map