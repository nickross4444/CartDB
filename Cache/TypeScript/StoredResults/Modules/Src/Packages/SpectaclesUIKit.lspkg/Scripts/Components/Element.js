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
exports.Element = exports.StateName = exports.IMAGE_MATERIAL_ASSET = void 0;
var __selfType = requireType("./Element");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Interactable_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable");
const HandInteractor_1 = require("SpectaclesInteractionKit.lspkg/Core/HandInteractor/HandInteractor");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const ReplayEvent_1 = require("SpectaclesInteractionKit.lspkg/Utils/ReplayEvent");
const InteractableStateMachine_1 = require("../Utility/InteractableStateMachine");
const UIKitUtilities_1 = require("../Utility/UIKitUtilities");
const log = new NativeLogger_1.default("Element");
exports.IMAGE_MATERIAL_ASSET = requireAsset("../../Materials/Image.mat");
const TRIGGER_START_AUDIO_TRACK = requireAsset("../../Audio/TriggerStartAudioTrack.wav");
const TRIGGER_END_AUDIO_TRACK = requireAsset("../../Audio/TriggerEndAudioTrack.wav");
const TRIGGER_START_AUDIO_VOLUME = 1;
const TRIGGER_END_AUDIO_VOLUME = 1;
const ENLARGE_COLLIDER_MULTIPLIER = 3;
var StateName;
(function (StateName) {
    StateName["default"] = "default";
    StateName["hover"] = "hover";
    StateName["triggered"] = "triggered";
    StateName["error"] = "error";
    StateName["errorHover"] = "errorHover";
    StateName["inactive"] = "inactive";
    StateName["toggledDefault"] = "toggledDefault";
    StateName["toggledHovered"] = "toggledHovered";
    StateName["toggledTriggered"] = "toggledTriggered";
})(StateName || (exports.StateName = StateName = {}));
/**
 * Abstract class representing an element in the Spectacles UIKit.
 *
 * @abstract
 */
let Element = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Element = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Having this here is a hack for re-ordering the inputs in the inspector
            // TODO: Move it to VisualElement once we have a way to re-order the inputs in the inspector
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._inactive = this._inactive;
            this._playAudio = this._playAudio;
            this._playTriggerDownAudio = true;
            this._playTriggerUpAudio = true;
            this._transform = this.sceneObject.getTransform();
            this.initialPosition = vec3.zero();
            this.initialScale = vec3.one();
            this.currentPosition = this.initialPosition;
            this.currentScale = this.initialScale;
            this._colliderFitElement = true;
            this._colliderSize = this._size;
            this._colliderCenter = vec3.zero();
            this.managedSceneObjects = new Set();
            this.managedComponents = new Set();
            this.stateName = StateName.default;
            this._initialized = false;
            this._hasError = false;
            this._triggerStartAudioTrack = TRIGGER_START_AUDIO_TRACK;
            this._triggerStartAudioVolume = TRIGGER_START_AUDIO_VOLUME;
            this._triggerEndAudioTrack = TRIGGER_END_AUDIO_TRACK;
            this._triggerEndAudioVolume = TRIGGER_END_AUDIO_VOLUME;
            this._hoveringInteractors = new Set();
            this._triggeringInteractors = new Set();
            /**
             * Indicates whether the element is currently being dragged.
             * This property is used to track the drag state of the element.
             */
            this._isDragged = false;
            this.onInitializedEvent = new ReplayEvent_1.default();
            /**
             * A public API event that is triggered when the element is initialized.
             */
            this.onInitialized = this.onInitializedEvent.publicApi();
            this.onStateChangedEvent = new ReplayEvent_1.default();
            /**
             * An event that is triggered whenever the state of the element changes.
             */
            this.onStateChanged = this.onStateChangedEvent.publicApi();
            this.onHoverEnterEvent = new Event_1.default();
            /**
             * An event that is triggered when a hover interaction starts on the element.
             */
            this.onHoverEnter = this.onHoverEnterEvent.publicApi();
            this.onHoverExitEvent = new Event_1.default();
            /**
             * An event that is triggered when a hover interaction ends on the element.
             */
            this.onHoverExit = this.onHoverExitEvent.publicApi();
            this.onTriggerDownEvent = new Event_1.default();
            /**
             * An event that is triggered when a trigger interaction starts on the element.
             */
            this.onTriggerDown = this.onTriggerDownEvent.publicApi();
            this.onTriggerUpEvent = new Event_1.default();
            /**
             * An event that is triggered when a trigger interaction ends on the element.
             */
            this.onTriggerUp = this.onTriggerUpEvent.publicApi();
            this.onInteractableDefaultHandler = this.onInteractableDefault.bind(this);
            this.onInteractableHoveredHandler = this.onInteractableHovered.bind(this);
            this.onInteractableTriggeredHandler = this.onInteractableTriggered.bind(this);
            this.onInteractableToggledDefaultHandler = this.onInteractableToggledDefault.bind(this);
            this.onInteractableToggledHoveredHandler = this.onInteractableToggledHovered.bind(this);
            this.onInteractableToggledTriggeredHandler = this.onInteractableToggledTriggered.bind(this);
            this.onInteractableDragStartHandler = this.onInteractableDragStart.bind(this);
            this.onInteractableDragUpdateHandler = this.onInteractableDragUpdate.bind(this);
            this.onInteractableDragEndHandler = this.onInteractableDragEnd.bind(this);
            this.onStart = () => {
                if (!this._initialized) {
                    this.initialize();
                }
            };
            this.onUpdate = () => {
                if (this._initialized) {
                    this.update();
                }
            };
            this.onDestroy = () => {
                this.release();
            };
        }
        __initialize() {
            super.__initialize();
            // Having this here is a hack for re-ordering the inputs in the inspector
            // TODO: Move it to VisualElement once we have a way to re-order the inputs in the inspector
            this._renderOrder = this._renderOrder;
            this._size = this._size;
            this._inactive = this._inactive;
            this._playAudio = this._playAudio;
            this._playTriggerDownAudio = true;
            this._playTriggerUpAudio = true;
            this._transform = this.sceneObject.getTransform();
            this.initialPosition = vec3.zero();
            this.initialScale = vec3.one();
            this.currentPosition = this.initialPosition;
            this.currentScale = this.initialScale;
            this._colliderFitElement = true;
            this._colliderSize = this._size;
            this._colliderCenter = vec3.zero();
            this.managedSceneObjects = new Set();
            this.managedComponents = new Set();
            this.stateName = StateName.default;
            this._initialized = false;
            this._hasError = false;
            this._triggerStartAudioTrack = TRIGGER_START_AUDIO_TRACK;
            this._triggerStartAudioVolume = TRIGGER_START_AUDIO_VOLUME;
            this._triggerEndAudioTrack = TRIGGER_END_AUDIO_TRACK;
            this._triggerEndAudioVolume = TRIGGER_END_AUDIO_VOLUME;
            this._hoveringInteractors = new Set();
            this._triggeringInteractors = new Set();
            /**
             * Indicates whether the element is currently being dragged.
             * This property is used to track the drag state of the element.
             */
            this._isDragged = false;
            this.onInitializedEvent = new ReplayEvent_1.default();
            /**
             * A public API event that is triggered when the element is initialized.
             */
            this.onInitialized = this.onInitializedEvent.publicApi();
            this.onStateChangedEvent = new ReplayEvent_1.default();
            /**
             * An event that is triggered whenever the state of the element changes.
             */
            this.onStateChanged = this.onStateChangedEvent.publicApi();
            this.onHoverEnterEvent = new Event_1.default();
            /**
             * An event that is triggered when a hover interaction starts on the element.
             */
            this.onHoverEnter = this.onHoverEnterEvent.publicApi();
            this.onHoverExitEvent = new Event_1.default();
            /**
             * An event that is triggered when a hover interaction ends on the element.
             */
            this.onHoverExit = this.onHoverExitEvent.publicApi();
            this.onTriggerDownEvent = new Event_1.default();
            /**
             * An event that is triggered when a trigger interaction starts on the element.
             */
            this.onTriggerDown = this.onTriggerDownEvent.publicApi();
            this.onTriggerUpEvent = new Event_1.default();
            /**
             * An event that is triggered when a trigger interaction ends on the element.
             */
            this.onTriggerUp = this.onTriggerUpEvent.publicApi();
            this.onInteractableDefaultHandler = this.onInteractableDefault.bind(this);
            this.onInteractableHoveredHandler = this.onInteractableHovered.bind(this);
            this.onInteractableTriggeredHandler = this.onInteractableTriggered.bind(this);
            this.onInteractableToggledDefaultHandler = this.onInteractableToggledDefault.bind(this);
            this.onInteractableToggledHoveredHandler = this.onInteractableToggledHovered.bind(this);
            this.onInteractableToggledTriggeredHandler = this.onInteractableToggledTriggered.bind(this);
            this.onInteractableDragStartHandler = this.onInteractableDragStart.bind(this);
            this.onInteractableDragUpdateHandler = this.onInteractableDragUpdate.bind(this);
            this.onInteractableDragEndHandler = this.onInteractableDragEnd.bind(this);
            this.onStart = () => {
                if (!this._initialized) {
                    this.initialize();
                }
            };
            this.onUpdate = () => {
                if (this._initialized) {
                    this.update();
                }
            };
            this.onDestroy = () => {
                this.release();
            };
        }
        /**
         * Gets the transform associated with this element.
         *
         * @returns {Transform} The transform of the element.
         */
        get transform() {
            return this._transform;
        }
        /**
         * Gets the children of the element that are not managed by the element.
         *
         * @returns {SceneObject[]} The children of the element that are not managed by the element.
         */
        get contentChildren() {
            return this.sceneObject.children.filter((child) => !this.managedSceneObjects.has(child));
        }
        /**
         * Gets the number of children of the element that are not managed by the element.
         *
         * @returns {number} The number of children of the element that are not managed by the element.
         */
        get contentChildrenCount() {
            let managedChildrenCount = 0;
            this.managedSceneObjects.forEach((child) => {
                if (child.getParent() === this.sceneObject) {
                    managedChildrenCount++;
                }
            });
            return this.sceneObject.children.length - managedChildrenCount;
        }
        /**
         * Gets the ColliderComponent instance associated with this element.
         * The collider is used for detecting interactions or collisions with the element.
         *
         * @returns {ColliderComponent} The collider instance.
         */
        get collider() {
            return this._collider;
        }
        /**
         * Gets whether the collider automatically fits the element's size.
         *
         * @returns {boolean} True if the collider fits the element, false if using custom size/position.
         */
        get colliderFitElement() {
            return this._colliderFitElement;
        }
        /**
         * Sets whether the collider should automatically fit the element's size.
         *
         * @param colliderFitElement - True to make the collider fit the element, false to use custom size/position.
         */
        set colliderFitElement(colliderFitElement) {
            this._colliderFitElement = colliderFitElement;
            if (this._initialized) {
                if (this._colliderFitElement) {
                    const delta = this.deltaPosition.div(this.deltaScale);
                    this.colliderShape.size = this._size.add(delta);
                    this.colliderTransform.setLocalPosition(vec3.zero());
                }
                else {
                    this.colliderShape.size = this._colliderSize;
                    this.colliderTransform.setLocalPosition(this._colliderCenter);
                }
                this._collider.shape = this.colliderShape;
            }
        }
        /**
         * Gets the custom size of the collider.
         * This size is only used when colliderFitElement is false.
         *
         * @returns {vec3} The custom collider size in local space coordinates.
         */
        get colliderSize() {
            return this._colliderSize;
        }
        /**
         * Sets the custom size of the collider.
         * This size is only applied when colliderFitElement is false.
         *
         * @param size - The custom collider size in local space coordinates.
         */
        set colliderSize(size) {
            this._colliderSize = size;
            if (this._initialized) {
                if (!this._colliderFitElement) {
                    this.colliderShape.size = this._colliderSize;
                    this._collider.shape = this.colliderShape;
                }
            }
        }
        /**
         * Gets the custom center position of the collider.
         * This position is only used when colliderFitElement is false.
         *
         * @returns {vec3} The custom collider center position in local space coordinates.
         */
        get colliderCenter() {
            return this._colliderCenter;
        }
        /**
         * Sets the custom center position of the collider.
         * This position is only applied when colliderFitElement is false.
         *
         * @param center - The custom collider center position in local space coordinates.
         */
        set colliderCenter(center) {
            this._colliderCenter = center;
            if (this._initialized) {
                if (!this._colliderFitElement) {
                    this.colliderTransform.setLocalPosition(this._colliderCenter);
                }
            }
        }
        /**
         * Gets the interactable property of the element.
         *
         * @returns {Interactable} The current interactable instance associated with this element.
         */
        get interactable() {
            return this._interactable;
        }
        /**
         * Indicates whether the element has been initialized.
         *
         * @returns {boolean} `true` if the element is initialized, otherwise `false`.
         */
        get initialized() {
            return this._initialized;
        }
        /**
         * Gets the value indicating whether audio playback is enabled.
         *
         * @returns {boolean} `true` if audio playback is enabled; otherwise, `false`.
         */
        get playAudio() {
            return this._playAudio;
        }
        /**
         * Sets the playAudio behavior and initializes the audio component if necessary.
         *
         * @param playAudio - A boolean indicating whether audio should be played.
         *                    If set to `true` and the audio component is not already created,
         *                    a new audio component will be instantiated and attached to the scene object.
         */
        set playAudio(playAudio) {
            if (playAudio === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._playAudio, playAudio)) {
                return;
            }
            this._playAudio = playAudio;
            if (this._initialized) {
                this.createAudioComponent();
            }
        }
        /**
         * Gets the value indicating whether trigger down audio playback is enabled.
         *
         * @returns {boolean} `true` if trigger down audio playback is enabled; otherwise, `false`.
         */
        get playTriggerDownAudio() {
            return this._playTriggerDownAudio;
        }
        /**
         * Sets the playTriggerDownAudio behavior and initializes the audio component if necessary.
         *
         * @param playTriggerDownAudio - A boolean indicating whether trigger down audio should be played.
         *                               If set to `true` and the audio component is not already created,
         *                               a new audio component will be instantiated and attached to the scene object.
         */
        set playTriggerDownAudio(playTriggerDownAudio) {
            if (playTriggerDownAudio === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._playTriggerDownAudio, playTriggerDownAudio)) {
                return;
            }
            this._playTriggerDownAudio = playTriggerDownAudio;
            if (this._initialized) {
                this.createAudioComponent();
            }
        }
        /**
         * Gets the value indicating whether trigger up audio playback is enabled.
         *
         * @returns {boolean} `true` if trigger up audio playback is enabled; otherwise, `false`.
         */
        get playTriggerUpAudio() {
            return this._playTriggerUpAudio;
        }
        /**
         * Sets the playTriggerUpAudio behavior and initializes the audio component if necessary.
         *
         * @param playTriggerUpAudio - A boolean indicating whether trigger up audio should be played.
         *                             If set to `true` and the audio component is not already created,
         *                             a new audio component will be instantiated and attached to the scene object.
         */
        set playTriggerUpAudio(playTriggerUpAudio) {
            if (playTriggerUpAudio === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._playTriggerUpAudio, playTriggerUpAudio)) {
                return;
            }
            this._playTriggerUpAudio = playTriggerUpAudio;
            if (this._initialized) {
                this.createAudioComponent();
            }
        }
        /**
         * Gets the audio track to be played when the trigger starts.
         *
         * @returns {AudioTrackAsset} The audio track asset associated with the trigger start event.
         */
        get triggerStartAudioTrack() {
            return this._triggerStartAudioTrack;
        }
        /**
         * Sets the audio track to be played when the trigger starts.
         *
         * @param audioTrack - The audio track asset to be assigned.
         */
        set triggerStartAudioTrack(audioTrack) {
            if (audioTrack === undefined) {
                return;
            }
            this._triggerStartAudioTrack = audioTrack;
        }
        /**
         * Gets the volume level for the trigger start audio.
         *
         * @returns {number} The volume level for the trigger start audio.
         */
        get triggerStartAudioVolume() {
            return this._triggerStartAudioVolume;
        }
        /**
         * Sets the volume level for the trigger start audio.
         *
         * @param volume - The desired audio volume level as a number.
         */
        set triggerStartAudioVolume(volume) {
            if (volume === undefined) {
                return;
            }
            this._triggerStartAudioVolume = volume;
        }
        /**
         * Gets the audio track to be played at the end of a trigger event.
         *
         * @returns {AudioTrackAsset} The audio track asset associated with the trigger end event.
         */
        get triggerEndAudioTrack() {
            return this._triggerEndAudioTrack;
        }
        /**
         * Sets the audio track to be played at the end of a trigger event.
         *
         * @param audioTrack - The audio track asset to be assigned.
         */
        set triggerEndAudioTrack(audioTrack) {
            if (audioTrack === undefined) {
                return;
            }
            this._triggerEndAudioTrack = audioTrack;
        }
        /**
         * Gets the volume level for the trigger end audio.
         *
         * @returns {number} The volume level for the trigger end audio.
         */
        get triggerEndAudioVolume() {
            return this._triggerEndAudioVolume;
        }
        /**
         * Sets the volume level for the trigger end audio.
         *
         * @param volume - The desired volume level as a number.
         */
        set triggerEndAudioVolume(volume) {
            if (volume === undefined) {
                return;
            }
            this._triggerEndAudioVolume = volume;
        }
        /**
         * @returns is inactive or not
         */
        get inactive() {
            return this._inactive;
        }
        /**
         * @param inactive set is inactive or is not inactive
         */
        set inactive(inactive) {
            if (inactive === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._inactive, inactive)) {
                return;
            }
            this._inactive = inactive;
            if (this._initialized) {
                if (this._inactive) {
                    this.setState(StateName.inactive);
                }
                else {
                    if (this.stateName === StateName.inactive) {
                        this.stateName = StateName.default;
                    }
                    this.setState(this.stateName);
                }
                if (this._interactable) {
                    this._interactable.enabled = !this._inactive;
                }
                if (this._collider) {
                    this._collider.enabled = !this._inactive;
                }
            }
        }
        /**
         * @returns current size
         */
        get size() {
            return this._size;
        }
        /**
         * @param size set current size
         */
        set size(size) {
            if (size === undefined) {
                return;
            }
            if ((0, UIKitUtilities_1.isEqual)(this._size, size)) {
                return;
            }
            this._size = size;
            if (this._initialized) {
                if (this._colliderFitElement) {
                    const delta = this.deltaPosition.div(this.deltaScale);
                    this.colliderShape.size = this._size.add(delta);
                    this._collider.shape = this.colliderShape;
                }
            }
        }
        /**
         * Determines whether the element is draggable.
         *
         * @returns {boolean} Always returns `false`, indicating that the element is not draggable.
         */
        get isDraggable() {
            return false;
        }
        /**
         * Initializes the element and its associated components. This method ensures that
         * the element is set up properly, including its collider, interactable state, size,
         * and event listeners.
         */
        initialize() {
            if (this._initialized) {
                return;
            }
            this.colliderObject = global.scene.createSceneObject("Collider");
            this.managedSceneObjects.add(this.colliderObject);
            this.colliderObject.setParent(this.sceneObject);
            this.colliderTransform = this.colliderObject.getTransform();
            this._collider = this.colliderObject.createComponent("ColliderComponent");
            this.collider.fitVisual = false;
            this.colliderShape = Shape.createBoxShape();
            if (this._colliderFitElement) {
                const delta = this.deltaPosition.div(this.deltaScale);
                this.colliderShape.size = this._size.add(delta);
                this.colliderTransform.setLocalPosition(vec3.zero());
            }
            else {
                this.colliderShape.size = this._colliderSize;
                this.colliderTransform.setLocalPosition(this._colliderCenter);
            }
            this._collider.shape = this.colliderShape;
            this._collider.enabled = !this._inactive;
            this.managedComponents.add(this._collider);
            this._interactable =
                this.sceneObject.getComponent(Interactable_1.Interactable.getTypeName()) ||
                    this.sceneObject.createComponent(Interactable_1.Interactable.getTypeName());
            this._interactable.targetingMode = Interactor_1.TargetingMode.All;
            this._interactable.enableInstantDrag = this.isDraggable;
            this.managedComponents.add(this._interactable);
            this._interactableStateMachine = this.sceneObject.createComponent(InteractableStateMachine_1.InteractableStateMachine.getTypeName());
            this._interactableStateMachine.initialize();
            this.managedComponents.add(this._interactableStateMachine);
            this._interactable.enabled = !this._inactive;
            this.setUpInteractableListeners();
            this.createAudioComponent();
            this.setUpEventCallbacks();
            if (this._inactive) {
                this.inactive = this._inactive;
            }
            else {
                this.setState(this.stateName);
            }
            this._initialized = true;
            this.onInitializedEvent.invoke();
        }
        setUpEventCallbacks() { }
        update() { }
        release() {
            this.removeInteractableListeners();
            this.managedComponents.forEach((component) => {
                if (!isNull(component) && component) {
                    component.destroy();
                }
            });
            this.managedComponents.clear();
            this.managedSceneObjects.forEach((sceneObject) => {
                if (!isNull(sceneObject) && sceneObject) {
                    sceneObject.destroy();
                }
            });
            this.managedSceneObjects.clear();
        }
        setState(stateName) {
            this.stateName = stateName;
            this.onStateChangedEvent.invoke(stateName);
        }
        get isToggle() {
            return false;
        }
        get deltaPosition() {
            return this.currentPosition.sub(this.initialPosition);
        }
        get deltaScale() {
            return this.currentScale.div(this.initialScale);
        }
        setUpInteractableListeners() {
            if (this._interactableStateMachine) {
                this._interactableStateMachine.isToggle = this.isToggle;
                this._interactableStateMachine.onDefault.add(this.onInteractableDefaultHandler);
                this._interactableStateMachine.onHovered.add(this.onInteractableHoveredHandler);
                this._interactableStateMachine.onTriggered.add(this.onInteractableTriggeredHandler);
                this._interactableStateMachine.onToggledDefault.add(this.onInteractableToggledDefaultHandler);
                this._interactableStateMachine.onToggledHovered.add(this.onInteractableToggledHoveredHandler);
                this._interactableStateMachine.onToggledTriggered.add(this.onInteractableToggledTriggeredHandler);
                if (this.isDraggable) {
                    this._interactable.onDragStart.add(this.onInteractableDragStartHandler);
                    this._interactable.onDragUpdate.add(this.onInteractableDragUpdateHandler);
                    this._interactable.onDragEnd.add(this.onInteractableDragEndHandler);
                }
            }
        }
        removeInteractableListeners() {
            if (this._interactableStateMachine) {
                this._interactableStateMachine.onDefault.remove(this.onInteractableDefaultHandler);
                this._interactableStateMachine.onHovered.remove(this.onInteractableHoveredHandler);
                this._interactableStateMachine.onTriggered.remove(this.onInteractableTriggeredHandler);
                this._interactableStateMachine.onToggledDefault.remove(this.onInteractableToggledDefaultHandler);
                this._interactableStateMachine.onToggledHovered.remove(this.onInteractableToggledHoveredHandler);
                this._interactableStateMachine.onToggledTriggered.remove(this.onInteractableToggledTriggeredHandler);
                if (this.isDraggable) {
                    this._interactable.onDragStart.remove(this.onInteractableDragStartHandler);
                    this._interactable.onDragUpdate.remove(this.onInteractableDragUpdateHandler);
                    this._interactable.onDragEnd.remove(this.onInteractableDragEndHandler);
                }
            }
        }
        onInteractableDefault(stateEvent) {
            this.setState(this._hasError ? StateName.error : StateName.default);
            if (stateEvent.event) {
                if (this._hoveringInteractors.has(stateEvent.event.interactor)) {
                    this.onHoverExitHandler(stateEvent);
                    this._hoveringInteractors.delete(stateEvent.event.interactor);
                }
                if (this._triggeringInteractors.has(stateEvent.event.interactor) && !stateEvent.event.interactor.isTriggering) {
                    log.d(`on ${this.sceneObject.name} trigger up outside`);
                    this._triggeringInteractors.delete(stateEvent.event.interactor);
                }
            }
        }
        onInteractableHovered(stateEvent) {
            this.setState(this._hasError ? StateName.errorHover : StateName.hover);
            if (stateEvent.event) {
                if (this._triggeringInteractors.has(stateEvent.event.interactor)) {
                    this.onTriggerUpHandler(stateEvent);
                    this._triggeringInteractors.delete(stateEvent.event.interactor);
                }
                else if (!this._hoveringInteractors.has(stateEvent.event.interactor)) {
                    this.onHoverEnterHandler(stateEvent);
                    this._hoveringInteractors.add(stateEvent.event.interactor);
                }
            }
        }
        onInteractableTriggered(stateEvent) {
            this.setState(StateName.triggered);
            if (stateEvent.event) {
                if (!this._triggeringInteractors.has(stateEvent.event.interactor)) {
                    this.onTriggerDownHandler(stateEvent);
                    this._triggeringInteractors.add(stateEvent.event.interactor);
                }
            }
        }
        onInteractableToggledDefault(stateEvent) {
            this.setState(StateName.toggledDefault);
            if (stateEvent.event) {
                if (this._hoveringInteractors.has(stateEvent.event.interactor)) {
                    this.onHoverExitHandler(stateEvent);
                    this._hoveringInteractors.delete(stateEvent.event.interactor);
                }
                if (this._triggeringInteractors.has(stateEvent.event.interactor) && !stateEvent.event.interactor.isTriggering) {
                    log.d(`on ${this.sceneObject.name} trigger up outside`);
                    this._triggeringInteractors.delete(stateEvent.event.interactor);
                }
            }
        }
        onInteractableToggledHovered(stateEvent) {
            this.setState(StateName.toggledHovered);
            if (stateEvent.event) {
                if (this._triggeringInteractors.has(stateEvent.event.interactor)) {
                    this.onTriggerUpHandler(stateEvent);
                    this._triggeringInteractors.delete(stateEvent.event.interactor);
                }
                else if (!this._hoveringInteractors.has(stateEvent.event.interactor)) {
                    this.onHoverEnterHandler(stateEvent);
                    this._hoveringInteractors.add(stateEvent.event.interactor);
                }
            }
        }
        onInteractableToggledTriggered(stateEvent) {
            this.setState(StateName.toggledTriggered);
            if (stateEvent.event) {
                if (!this._triggeringInteractors.has(stateEvent.event.interactor)) {
                    this.onTriggerDownHandler(stateEvent);
                    this._triggeringInteractors.add(stateEvent.event.interactor);
                }
            }
        }
        onHoverEnterHandler(_) {
            this.onHoverEnterEvent.invoke();
        }
        onHoverExitHandler(_) {
            this.onHoverExitEvent.invoke();
        }
        onTriggerDownHandler(stateEvent) {
            log.d(`${this.sceneObject.name} onTriggerDown by ${stateEvent.event.interactor.inputType}`);
            if (this._playTriggerDownAudio) {
                this.playAudioTrack(this._triggerStartAudioTrack, this._triggerStartAudioVolume);
            }
            this.onTriggerDownEvent.invoke();
        }
        onTriggerUpHandler(stateEvent) {
            log.d(`${this.sceneObject.name} onTriggerUp by ${stateEvent.event.interactor.inputType}`);
            if (this._playTriggerUpAudio) {
                this.playAudioTrack(this._triggerEndAudioTrack, this._triggerEndAudioVolume);
            }
            this.onTriggerUpEvent.invoke();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onInteractableDragStart(dragEvent) {
            if (this._colliderFitElement) {
                const delta = this.deltaPosition.div(this.deltaScale);
                this.colliderShape.size = this._size.add(delta).uniformScale(ENLARGE_COLLIDER_MULTIPLIER);
                this._collider.shape = this.colliderShape;
            }
            this._isDragged = true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onInteractableDragUpdate(dragEvent) { }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onInteractableDragEnd(dragEvent) {
            if (this._colliderFitElement) {
                const delta = this.deltaPosition.div(this.deltaScale);
                this.colliderShape.size = this._size.add(delta);
                this._collider.shape = this.colliderShape;
            }
            this._isDragged = false;
        }
        getInteractionPosition(interactor) {
            let currentInteractionPosition = null;
            if (interactor instanceof HandInteractor_1.HandInteractor) {
                const hand = interactor.hand;
                // Pinch drag update does not update the target hit position
                if (interactor.activeTargetingMode === Interactor_1.TargetingMode.Direct) {
                    currentInteractionPosition = this._transform
                        .getInvertedWorldTransform()
                        .multiplyPoint(hand.indexTip.position.add(hand.thumbTip.position).uniformScale(0.5));
                }
                else if (interactor.planecastPoint) {
                    currentInteractionPosition = this._transform
                        .getInvertedWorldTransform()
                        .multiplyPoint(interactor.planecastPoint);
                }
                else {
                    currentInteractionPosition = this._transform.getInvertedWorldTransform().multiplyPoint(hand.indexTip.position);
                }
            }
            else if (interactor.planecastPoint) {
                currentInteractionPosition = this._transform.getInvertedWorldTransform().multiplyPoint(interactor.planecastPoint);
            }
            return currentInteractionPosition;
        }
        /**
         * Plays the specified audio track at the given volume.
         *
         * @param audioTrack - The audio track asset to be played.
         * @param volume - The volume level at which the audio track should be played.
         */
        playAudioTrack(audioTrack, volume) {
            if (this._playAudio && audioTrack) {
                this._audioComponent.audioTrack = audioTrack;
                this._audioComponent.volume = volume;
                this._audioComponent.play(1);
            }
        }
        createAudioComponent() {
            if (this._playAudio && (this._playTriggerDownAudio || this._playTriggerUpAudio) && !this._audioComponent) {
                this._audioComponent = this.sceneObject.createComponent("Component.AudioComponent");
                this.managedComponents.add(this._audioComponent);
                this._audioComponent.playbackMode = Audio.PlaybackMode.LowPower;
            }
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(this.onStart);
            this.createEvent("UpdateEvent").bind(this.onUpdate);
            this.createEvent("OnDestroyEvent").bind(this.onDestroy);
            this.createEvent("OnEnableEvent").bind(this.onEnabled.bind(this));
            this.createEvent("OnDisableEvent").bind(this.onDisabled.bind(this));
        }
        onEnabled() {
            this.managedComponents.forEach((component) => {
                if (component) {
                    component.enabled = true;
                }
            });
        }
        onDisabled() {
            this.managedComponents.forEach((component) => {
                if (component) {
                    component.enabled = false;
                }
            });
        }
    };
    __setFunctionName(_classThis, "Element");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Element = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Element = _classThis;
})();
exports.Element = Element;
//# sourceMappingURL=Element.js.map