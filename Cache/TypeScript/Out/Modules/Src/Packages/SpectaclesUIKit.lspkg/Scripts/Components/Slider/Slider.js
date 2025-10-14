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
exports.Slider = void 0;
var __selfType = requireType("./Slider");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const SIK_1 = require("SpectaclesInteractionKit.lspkg/SIK");
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const mathUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/mathUtils");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const springAnimate_1 = require("SpectaclesInteractionKit.lspkg/Utils/springAnimate");
const SnapOS2_1 = require("../../Themes/SnapOS-2.0/SnapOS2");
const SceneUtilities_1 = require("../../Utility/SceneUtilities");
const UIKitUtilities_1 = require("../../Utility/UIKitUtilities");
const RoundedRectangleVisual_1 = require("../../Visuals/RoundedRectangle/RoundedRectangleVisual");
const VisualElement_1 = require("../VisualElement");
const log = new NativeLogger_1.default("Slider");
const SPRING_EPSILON = 0.001;
const KNOB_Z_OFFSET = 0.015;
const TRACKFILL_Z_OFFSET = 0.01;
const SliderVisualParameters = {
    default: {
        isBaseGradient: true,
        baseGradient: {
            start: new vec2(0, 1),
            end: new vec2(0, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.12, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.17, 1)
            }
        },
        hasBorder: true,
        borderSize: 0.1,
        borderType: "Gradient",
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.36, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.17, 0)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0.0, 0.36, 1)
            }
        }
    },
    hover: {},
    triggered: {
        baseGradient: {
            start: new vec2(0, 1),
            end: new vec2(0, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(53, 0.62, 0.21, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(53, 0.62, 0.21, 1)
            }
        },
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.36, 0.7, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(45, 0.52, 0.37, 0)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.36, 0.7, 1)
            }
        }
    }
};
const KnobVisualParameters = {
    default: {
        isBaseGradient: true,
        borderSize: 0.07,
        baseGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.13, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.17, 1)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.3, 1)
            }
        },
        hasBorder: true,
        borderType: "Gradient",
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.32, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.22, 0.0)
            }
        }
    },
    hover: {
        baseGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.22, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.32, 1)
            }
        },
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.34, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.16, 0.5)
            }
        }
    },
    triggered: {
        baseGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(43, 0.59, 0.29, 1)
            },
            stop1: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.63, 0.68, 1)
            }
        },
        borderGradient: {
            start: new vec2(-0.8, 1),
            end: new vec2(0.8, -1),
            stop0: {
                percent: 0,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.52, 1, 1)
            },
            stop1: {
                percent: 0.5,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.64, 0.35, 0.5)
            },
            stop2: {
                percent: 1,
                color: (0, UIKitUtilities_1.HSVtoRGB)(48, 0.54, 0.12, 0.5)
            }
        }
    }
};
const TrackVisualParameters = {
    default: {
        isBaseGradient: false,
        baseColor: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.25, 1),
        hasBorder: false
    },
    hover: {
        baseColor: (0, UIKitUtilities_1.HSVtoRGB)(0, 0, 0.35, 1)
    },
    triggered: {
        baseColor: (0, UIKitUtilities_1.HSVtoRGB)(50, 0.38, 0.5, 1)
    }
};
const DEFAULT_SPRING_CONFIG = {
    k: 150, // Spring constant
    damp: 21, // Damping constant
    mass: 1 // Mass of the object
};
/**
 * Represents a slider component that allows users to select a value within a specified range.
 * The slider includes a draggable knob and emits events when the value changes or interaction finishes.
 *
 * @remarks
 * - The slider's value is constrained between 0 and 1.
 * - The knob's position is updated based on the current value.
 * - The component supports animations for knob position updates.
 *
 * @extends VisualElement
 */
let Slider = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = VisualElement_1.VisualElement;
    var Slider = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._defaultValue = this._defaultValue;
            this.snapToTriggerPosition = this.snapToTriggerPosition;
            this.segmented = this.segmented;
            this.numberOfSegments = this.numberOfSegments;
            this.hasTrackVisual = this.hasTrackVisual;
            this.customKnobSize = this.customKnobSize;
            this._knobSize = this._knobSize;
            this.addCallbacks = this.addCallbacks;
            this.onValueChangeCallbacks = this.onValueChangeCallbacks;
            this.onFinishedCallbacks = this.onFinishedCallbacks;
            this._style = SnapOS2_1.SnapOS2Styles.Custom;
            this._currentValue = this.segmented
                ? Math.round(this._defaultValue / (1 / (this.numberOfSegments - 1))) * (1 / (this.numberOfSegments - 1))
                : this._defaultValue;
            this._knobValue = this._currentValue;
            this._knobPosition = 0;
            this._initialDragPosition = null;
            this._initialCursorPosition = null;
            this._currentCursorPosition = null;
            this._updateKnobPositionCancelSet = new animate_1.CancelSet();
            this.onKnobMovedEvent = new Event_1.default();
            this.onKnobMoved = this.onKnobMovedEvent.publicApi();
            this.onValueChangeEvent = new Event_1.default();
            this.onValueChange = this.onValueChangeEvent.publicApi();
            this.onFinishedEvent = new Event_1.default();
            this.onFinished = this.onFinishedEvent.publicApi();
            this._knobSpringAnimate = new springAnimate_1.SpringAnimate(DEFAULT_SPRING_CONFIG.k, DEFAULT_SPRING_CONFIG.damp, DEFAULT_SPRING_CONFIG.mass);
            this._initialKnobPosition = 0;
            this._knobValueAtDragStart = 0;
            this.knobVisualEventHandlerUnsubscribes = [];
            this.trackVisualEventHandlerUnsubscribes = [];
        }
        __initialize() {
            super.__initialize();
            this._defaultValue = this._defaultValue;
            this.snapToTriggerPosition = this.snapToTriggerPosition;
            this.segmented = this.segmented;
            this.numberOfSegments = this.numberOfSegments;
            this.hasTrackVisual = this.hasTrackVisual;
            this.customKnobSize = this.customKnobSize;
            this._knobSize = this._knobSize;
            this.addCallbacks = this.addCallbacks;
            this.onValueChangeCallbacks = this.onValueChangeCallbacks;
            this.onFinishedCallbacks = this.onFinishedCallbacks;
            this._style = SnapOS2_1.SnapOS2Styles.Custom;
            this._currentValue = this.segmented
                ? Math.round(this._defaultValue / (1 / (this.numberOfSegments - 1))) * (1 / (this.numberOfSegments - 1))
                : this._defaultValue;
            this._knobValue = this._currentValue;
            this._knobPosition = 0;
            this._initialDragPosition = null;
            this._initialCursorPosition = null;
            this._currentCursorPosition = null;
            this._updateKnobPositionCancelSet = new animate_1.CancelSet();
            this.onKnobMovedEvent = new Event_1.default();
            this.onKnobMoved = this.onKnobMovedEvent.publicApi();
            this.onValueChangeEvent = new Event_1.default();
            this.onValueChange = this.onValueChangeEvent.publicApi();
            this.onFinishedEvent = new Event_1.default();
            this.onFinished = this.onFinishedEvent.publicApi();
            this._knobSpringAnimate = new springAnimate_1.SpringAnimate(DEFAULT_SPRING_CONFIG.k, DEFAULT_SPRING_CONFIG.damp, DEFAULT_SPRING_CONFIG.mass);
            this._initialKnobPosition = 0;
            this._knobValueAtDragStart = 0;
            this.knobVisualEventHandlerUnsubscribes = [];
            this.trackVisualEventHandlerUnsubscribes = [];
        }
        /**
         * The render order of the Slider.
         */
        set renderOrder(order) {
            if (order === undefined) {
                return;
            }
            super.renderOrder = order;
            if (this._initialized) {
                if (this._trackFillVisual) {
                    this._trackFillVisual.renderMeshVisual.renderOrder = order + 1;
                }
                if (this._knobVisual) {
                    this._knobVisual.renderMeshVisual.renderOrder = order + 2;
                }
            }
        }
        /**
         * Gets the visual representation of the slider's track fill.
         *
         * @returns {Visual} The visual object representing the track fill.
         */
        get trackFillVisual() {
            return this._trackFillVisual;
        }
        /**
         * Sets the visual representation of the slider's track fill.
         * If a previous visual exists, it will be destroyed before assigning the new one.
         *
         * @param value - The new visual to be assigned to the track fill.
         */
        set trackFillVisual(value) {
            if (value === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._trackFillVisual, value)) {
                return;
            }
            this.destroyTrackFillVisual();
            this._trackFillVisual = value;
            if (this.initialized) {
                this.configureTrackFillVisual();
                this.updateFillSize();
            }
        }
        /**
         * Gets the visual representation of the slider's knob.
         *
         * @returns {Visual} The visual object representing the knob.
         */
        get knobVisual() {
            return this._knobVisual;
        }
        /**
         * Sets the visual representation of the slider's knob.
         * If a previous visual exists, it will be destroyed before assigning the new one.
         *
         * @param value - The new visual to be assigned to the knob.
         */
        set knobVisual(value) {
            if (value === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._knobVisual, value)) {
                return;
            }
            this.destroyKnobVisual();
            this._knobVisual = value;
            if (this.initialized) {
                this.configureKnobVisual();
                this.updateKnobSize();
                this.updateKnobPositionFromValue();
            }
        }
        /**
         * Gets the size of the knob.
         *
         * @returns {vec2} The size of the knob.
         */
        get knobSize() {
            return this._knobSize;
        }
        /**
         * Sets the size of the knob.
         * If the new size is different from the current size, it updates the knob size.
         *
         * @param value - The new size of the knob.
         */
        set knobSize(size) {
            if (size === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._knobSize, size)) {
                return;
            }
            this._knobSize = size;
            if (this._initialized) {
                this.updateKnobSize();
                this.updateKnobPositionFromValue();
            }
        }
        /**
         * Gets a value indicating whether the slider component is draggable.
         *
         * @returns {boolean} always return true, as it is always draggable.
         */
        get isDraggable() {
            return true;
        }
        /**
         * Gets the current value of the slider.
         * This is the actual value of the element, and is updated immediately after user input
         *
         * @returns {number} The current value.
         */
        get currentValue() {
            return this._currentValue;
        }
        /**
         * Sets the current value of the slider.
         *
         * @param value - The new value to set, which should be between 0 and 1.
         *
         * If the value is outside the range [0, 1], a warning is logged and the value is not set.
         * If the value is the same as the current value, a debug message is logged and the value is not set.
         * Otherwise, the current value is updated, a debug message is logged, the knob position is updated,
         * and the onValueChangeEvent is invoked.
         */
        set currentValue(value) {
            if (value === undefined) {
                return;
            }
            this.updateCurrentValue(value);
        }
        /**
         * The current position of the knob as a normalized value from 0-1.
         * This differs from the `currentValue`, as the `currentValue` may be set, while the `knobValue` is animating to that position. If you want the actual value of the element, please use `currentValue`
         *
         * @returns {number} The current value.
         */
        get knobValue() {
            return this._knobValue;
        }
        /**
         * Gets the current spring animation configuration for the knob.
         *
         * @returns The current spring configuration including stiffness (k), damping, and mass values.
         *
         */
        get knobSpringConfig() {
            return {
                k: this._knobSpringAnimate.k,
                damp: this._knobSpringAnimate.damp,
                mass: this._knobSpringAnimate.mass
            };
        }
        /**
         * Updates the spring animation configuration for the knob.
         *
         * @param springConfig - The new spring configuration. Only provided properties will be updated.
         *
         */
        set knobSpringConfig(springConfig) {
            if (springConfig === undefined) {
                return;
            }
            this._knobSpringAnimate.k = springConfig.k ? springConfig.k : this._knobSpringAnimate.k;
            this._knobSpringAnimate.damp = springConfig.damp ? springConfig.damp : this._knobSpringAnimate.damp;
            this._knobSpringAnimate.mass = springConfig.mass ? springConfig.mass : this._knobSpringAnimate.mass;
            this._knobSpringAnimate.reset();
        }
        /**
         * Updates the current value of the slider with optional animation control.
         *
         * @param value - The new value to set. Must be between 0 and 1 (inclusive).
         * @param shouldAnimate - Whether to animate the transition to the new value using spring physics.
         *                        When `true`, the knob will spring animate from current to target value.
         *                        When `false` (default), the knob jumps immediately to the new value.
         *
         */
        updateCurrentValue(value, shouldAnimate = false) {
            if (value < 0 || value > 1) {
                log.w(`Value ${value} should be between 0 and 1`);
                return;
            }
            if (value === this._currentValue) {
                log.d(`slider ${this.sceneObject.name} value is already set to ${this._currentValue}`);
                return;
            }
            if (this.initialized) {
                this._knobSpringAnimate.reset();
                this._currentValue = value;
                if (!shouldAnimate) {
                    this._knobValue = value;
                    log.d(`slider ${this.sceneObject.name} value changed to ${this._knobValue}`);
                    this.updateKnobPositionFromValue();
                    this.onValueChangeEvent.invoke(this._knobValue);
                }
                this.onFinishedEvent.invoke(this.isExplicit);
            }
            else {
                this._currentValue = value;
                this._knobValue = value;
            }
        }
        /**
         * Initializes the slider component. This method sets up the visual and knob visual elements
         * if they are not already defined, and ensures the default value is within the valid range.
         */
        initialize() {
            if (this._defaultValue < 0 || this._defaultValue > 1) {
                throw new Error(`Default value ${this._defaultValue} should be between 0 and 1`);
            }
            if (this.segmented && this.numberOfSegments < 2) {
                throw new Error(`Number of segments ${this.numberOfSegments} should be at least 2`);
            }
            super.initialize();
            if (this._trackFillVisual) {
                this._trackFillVisual.renderMeshVisual.renderOrder = this._renderOrder + 1;
            }
            if (this._knobVisual) {
                this._knobVisual.renderMeshVisual.renderOrder = this._renderOrder + 2;
            }
            this.interactable.enableInstantDrag = !this.snapToTriggerPosition;
            this.interactable.keepHoverOnTrigger = true;
            this.configureKnobVisual();
            this.configureTrackFillVisual();
            this.updateKnobSize();
            this.updateKnobPositionFromValue();
        }
        createDefaultVisual() {
            if (!this._visual) {
                const defaultVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: this.sceneObject,
                    style: SliderVisualParameters
                });
                defaultVisual.cornerRadius = this.size.y * 0.5;
                this._visual = defaultVisual;
            }
            if (!this._knobVisual) {
                const knobObject = global.scene.createSceneObject("SliderKnob");
                this.managedSceneObjects.add(knobObject);
                const defaultKnobVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: knobObject,
                    style: KnobVisualParameters
                });
                defaultKnobVisual.cornerRadius = (this.size.y - defaultKnobVisual.borderSize * 2) * 0.5;
                this._knobVisual = defaultKnobVisual;
                if (!this.customKnobSize) {
                    this._knobSize = new vec2(this.size.y, this.size.y);
                }
                knobObject.setParent(this.sceneObject);
            }
            if (!this._trackFillVisual && this.hasTrackVisual) {
                const trackFillObject = global.scene.createSceneObject("SliderTrackFill");
                this.managedSceneObjects.add(trackFillObject);
                const defaultTrackFillVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: trackFillObject,
                    style: TrackVisualParameters
                });
                this._trackFillVisual = defaultTrackFillVisual;
                trackFillObject.setParent(this.sceneObject);
            }
        }
        configureVisual() {
            super.configureVisual();
            if (this._visual) {
                this.visualEventHandlerUnsubscribes.push(this._visual.onDestroyed.add(() => {
                    // knobs and trackFill are children of the visual
                    this._trackFillVisual = null;
                    this._knobVisual = null;
                }));
            }
        }
        configureKnobVisual() {
            if (this._knobVisual) {
                this.knobVisualEventHandlerUnsubscribes.push(this._knobVisual.onDestroyed.add(() => {
                    this._knobVisual = null;
                }));
            }
        }
        destroyKnobVisual() {
            this.knobVisualEventHandlerUnsubscribes.forEach((unsubscribe) => unsubscribe());
            this.knobVisualEventHandlerUnsubscribes = [];
            if (this._knobVisual) {
                this._knobVisual.destroy();
                this._knobVisual = null;
            }
        }
        configureTrackFillVisual() {
            if (this._trackFillVisual) {
                this.trackVisualEventHandlerUnsubscribes.push(this._trackFillVisual.onDestroyed.add(() => {
                    this._trackFillVisual = null;
                }));
            }
        }
        destroyTrackFillVisual() {
            this.trackVisualEventHandlerUnsubscribes.forEach((unsubscribe) => unsubscribe());
            this.trackVisualEventHandlerUnsubscribes = [];
            if (this._trackFillVisual) {
                this._trackFillVisual.destroy();
                this._trackFillVisual = null;
            }
        }
        setUpEventCallbacks() {
            if (this.addCallbacks) {
                this.onValueChange.add((0, SceneUtilities_1.createCallbacks)(this.onValueChangeCallbacks));
                this.onFinished.add((0, SceneUtilities_1.createCallbacks)(this.onFinishedCallbacks));
                super.setUpEventCallbacks();
            }
        }
        release() {
            this._updateKnobPositionCancelSet.cancel();
            this._knobVisual?.destroy();
            this._knobVisual = null;
            this._trackFillVisual?.destroy();
            this._trackFillVisual = null;
            super.release();
        }
        onTriggerUpHandler(stateEvent) {
            super.onTriggerUpHandler(stateEvent);
            this.onTriggerRespond(stateEvent);
        }
        onTriggerRespond(stateEvent) {
            if (!this._isDragged) {
                if (this.snapToTriggerPosition) {
                    const triggerValue = MathUtils.clamp((this.transform.getInvertedWorldTransform().multiplyPoint(stateEvent.event?.interactor.planecastPoint).x +
                        this._size.x / 2) /
                        this._size.x, 0, 1);
                    if (this.segmented) {
                        const segmentStep = 1 / (this.numberOfSegments - 1);
                        const closestSegmentIndex = Math.round(triggerValue / segmentStep);
                        const newValue = MathUtils.clamp(closestSegmentIndex * segmentStep, 0, 1);
                        this.updateCurrentValue(newValue, true);
                    }
                    else {
                        this.updateCurrentValue(triggerValue, true);
                    }
                }
            }
        }
        onInteractableDragStart(dragEvent) {
            super.onInteractableDragStart(dragEvent);
            this._initialDragPosition = this.getInteractionPosition(dragEvent.interactor);
            const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(dragEvent.interactor);
            this._initialCursorPosition = cursor ? cursor.cursorPosition : null;
            this._currentCursorPosition = this._initialCursorPosition;
            this._initialKnobPosition = this.getKnobPositionFromValue(this._currentValue);
            this._knobValueAtDragStart = this._currentValue;
        }
        onInteractableDragUpdate(dragEvent) {
            if (this._isDragged) {
                if (dragEvent.interactor) {
                    const currentDragPosition = this.getInteractionPosition(dragEvent.interactor);
                    const dragDelta = currentDragPosition.sub(this._initialDragPosition).x;
                    const unclampedValue = this._knobValueAtDragStart +
                        (this.segmented ? Math.round(dragDelta / this.stateInterval) * this.stateInterval : dragDelta) /
                            this.trackLength;
                    const newValue = (0, mathUtils_1.clamp)(unclampedValue, 0, 1);
                    const valueChanged = this._knobValue !== newValue;
                    if (valueChanged) {
                        this._knobValue = newValue;
                        log.d(`slider ${this.sceneObject.name} updating to ${this._knobValue}`);
                        this.updateKnobPositionFromValue();
                        this.onValueChangeEvent.invoke(this._knobValue);
                    }
                    if (this._initialCursorPosition && this._currentCursorPosition) {
                        let clampedOffset = 0;
                        // If the Slider is segmented and at the min/max value, allow the cursor to smoothly follow the drag.
                        const dragValue = this._knobValueAtDragStart + dragDelta / this.trackLength;
                        if (dragValue > 1 && unclampedValue >= 1) {
                            clampedOffset = (this.size.x - this.knobSize.x) * (dragValue - 1);
                        }
                        else if (dragValue < 0 && unclampedValue <= 0) {
                            clampedOffset = (this.size.x - this.knobSize.x) * dragValue;
                        }
                        const knobPosition = this.getKnobPositionFromValue(newValue);
                        let knobVector = new vec3(knobPosition - this._initialKnobPosition + clampedOffset, 0, 0);
                        const worldTransform = this.transform.getWorldTransform();
                        knobVector = worldTransform.multiplyDirection(knobVector);
                        this._currentCursorPosition = this._initialCursorPosition.add(knobVector);
                        const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(dragEvent.interactor);
                        if (cursor) {
                            cursor.cursorPosition = this._currentCursorPosition;
                        }
                    }
                }
            }
            super.onInteractableDragUpdate(dragEvent);
        }
        onInteractableDragEnd(dragEvent) {
            if (this._isDragged) {
                this._currentValue = this._knobValue;
                this.updateKnobPositionFromValue();
                this.onFinishedEvent.invoke(this.isExplicit);
                this._knobSpringAnimate.reset();
                const cursor = SIK_1.SIK.CursorController.getCursorByInteractor(dragEvent.interactor);
                if (cursor) {
                    cursor.cursorPosition = null;
                }
            }
            super.onInteractableDragEnd(dragEvent);
        }
        update() {
            if (!this._knobVisual) {
                return;
            }
            if (this._isDragged) {
                return;
            }
            if (Math.abs(this._knobValue - this._currentValue) <= SPRING_EPSILON) {
                return;
            }
            const min = Math.min(this._currentValue, this._knobValue);
            const max = Math.max(this._currentValue, this._knobValue);
            const springResult = new vec3(this._knobValue, 0, KNOB_Z_OFFSET);
            this._knobSpringAnimate.evaluate(new vec3(this._knobValue, 0, KNOB_Z_OFFSET), new vec3(this._currentValue, 0, KNOB_Z_OFFSET), springResult);
            this._knobValue = (0, mathUtils_1.clamp)(springResult.x, min, max);
            if (Math.abs(this._knobValue - this._currentValue) <= SPRING_EPSILON) {
                this._knobValue = this._currentValue;
            }
            this.updateKnobPositionFromValue();
            this.onValueChangeEvent.invoke(this._currentValue);
        }
        updateKnobPositionFromValue() {
            if (!this._knobVisual) {
                return;
            }
            this._knobPosition = this.getKnobPositionFromValue(this._knobValue);
            this.updateKnobPosition(this._knobPosition);
        }
        updateKnobPosition(value) {
            if (!this._knobVisual) {
                return;
            }
            this._knobVisual.transform.setLocalPosition(new vec3(value, 0, KNOB_Z_OFFSET));
            const knobValue = (value + this.size.x * 0.5) / this.size.x;
            this.updateFillSize();
            this.onKnobMovedEvent.invoke(knobValue);
        }
        setState(stateName) {
            super.setState(stateName);
            this._knobVisual?.setState(stateName);
            this._trackFillVisual?.setState(stateName);
        }
        updateKnobSize() {
            if (!this._knobVisual) {
                return;
            }
            this._knobVisual.size = this._visual.hasBorder
                ? new vec3(this._knobSize.x - this._visual.borderSize * 2, this._knobSize.y - this._visual.borderSize * 2, this.size.z)
                : new vec3(this._knobSize.x, this._knobSize.y, this.size.z);
        }
        updateFillSize() {
            if (!this._trackFillVisual) {
                return;
            }
            const borderSize = this._visual.borderSize;
            const fillSize = this.trackFillVisual.size.uniformScale(1);
            fillSize.y = this.size.y - borderSize * 2;
            fillSize.x = MathUtils.lerp(fillSize.y, this.size.x - borderSize * 2, this.knobValue - 0.01);
            const xPos = MathUtils.lerp((this.size.x - borderSize * 2) * -0.5 + fillSize.y * 0.5, 0, this.knobValue);
            this.trackFillVisual.transform.setLocalPosition(new vec3(xPos, 0, TRACKFILL_Z_OFFSET));
            this.trackFillVisual.cornerRadius = fillSize.y * 0.5;
            this.trackFillVisual.size = fillSize;
        }
        get isExplicit() {
            return true;
        }
        getKnobPositionFromValue(value) {
            return (value - 0.5) * (this.size.x - this.knobSize.x);
        }
        get trackLength() {
            return this.size.x - this._knobSize.x;
        }
        get stateInterval() {
            return (1.0 / (this.numberOfSegments - 1)) * this.trackLength;
        }
        onEnabled() {
            super.onEnabled();
            if (this._initialized) {
                this.knobVisual?.enable();
                this.trackFillVisual?.enable();
            }
        }
        onDisabled() {
            super.onDisabled();
            if (this._initialized) {
                this.knobVisual?.disable();
                this.trackFillVisual?.disable();
            }
        }
    };
    __setFunctionName(_classThis, "Slider");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Slider = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Slider = _classThis;
})();
exports.Slider = Slider;
//# sourceMappingURL=Slider.js.map