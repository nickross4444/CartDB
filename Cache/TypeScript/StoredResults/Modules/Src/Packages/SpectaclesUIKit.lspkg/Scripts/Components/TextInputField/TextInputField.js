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
exports.TextInputField = exports.BORDER_GRADIENT_PARAMETERS = void 0;
var __selfType = requireType("./TextInputField");
function component(target) { target.getTypeName = function () { return __selfType; }; }
require("LensStudio:TextInputModule"); // eslint-disable-line @typescript-eslint/no-require-imports
const Interactable_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable");
const Interactor_1 = require("SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor");
const animate_1 = require("SpectaclesInteractionKit.lspkg/Utils/animate");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
const FunctionTimingUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/FunctionTimingUtils");
const NativeLogger_1 = require("SpectaclesInteractionKit.lspkg/Utils/NativeLogger");
const SnapOS2_1 = require("../../Themes/SnapOS-2.0/SnapOS2");
const SceneUtilities_1 = require("../../Utility/SceneUtilities");
const RoundedRectangleVisual_1 = require("../../Visuals/RoundedRectangle/RoundedRectangleVisual");
const Visual_1 = require("../../Visuals/Visual");
const Element_1 = require("../Element");
const VisualElement_1 = require("../VisualElement");
const TextInputFieldManager_1 = require("./TextInputFieldManager");
const log = new NativeLogger_1.default("TextInputField");
const DEBUG_RENDER = false;
const PLACEHOLDER_TEXT_COLOR = new vec4(0.6, 0.6, 0.6, 1);
const DEFAULT_TEXT_COLOR = new vec4(1, 1, 1, 1);
// meshes
const UNIT_PLANE = requireAsset("../../../Meshes/Unit Plane.mesh");
// textures
const EYE_ICON = requireAsset("../../../Textures/eye-icon.png");
const EYE_OFF_ICON = requireAsset("../../../Textures/eye-off-icon.png");
const OVERFLOW_WIDTH = 2.1;
var IconState;
(function (IconState) {
    IconState[IconState["default"] = 0] = "default";
    IconState[IconState["alternate"] = 1] = "alternate";
})(IconState || (IconState = {}));
/**
 * helper for internal keyboard dev
 */
const DEFAULT_BEHAVIOR = true;
exports.BORDER_GRADIENT_PARAMETERS = {
    default: {
        enabled: true,
        type: "Linear",
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.lightGray },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.darkGray },
        stop2: { enabled: true, percent: 1, color: Visual_1.COLORS.lightGray }
    },
    toggled: {
        enabled: true,
        type: "Linear",
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.brightYellow },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.brightYellow },
        stop2: { enabled: true, percent: 1, color: Visual_1.COLORS.brightYellow }
    },
    toggledHovered: {
        enabled: true,
        type: "Linear",
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.brightYellow },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.brightYellow },
        stop2: { enabled: true, percent: 1, color: Visual_1.COLORS.brightYellow }
    }
};
const BACKGROUND_GRADIENT_PARAMETERS = {
    toggled: {
        enabled: true,
        type: "Rectangle",
        stop0: { enabled: true, percent: -1, color: Visual_1.COLORS.brightYellow.uniformScale(0.3) },
        stop1: { enabled: true, percent: -1, color: Visual_1.COLORS.brightYellow.uniformScale(0.3) },
        stop2: { enabled: true, percent: -1, color: Visual_1.COLORS.brightYellow.uniformScale(0.3) },
        stop3: { enabled: true, percent: 3, color: Visual_1.COLORS.brightYellow.uniformScale(0.9) }
    },
    default: {
        enabled: true,
        type: "Rectangle",
        stop0: { enabled: true, percent: 0, color: Visual_1.COLORS.darkGray },
        stop1: { enabled: true, percent: 0.5, color: Visual_1.COLORS.darkGray },
        stop2: { enabled: true, percent: 0.95, color: Visual_1.COLORS.darkGray },
        stop3: { enabled: true, percent: 0.99, color: Visual_1.COLORS.darkGray }
    }
};
/**
 * TextInputField
 * Component to add a TextField to a Spectacles Lens
 * Uses text input system under the hood
 * Automatically writes text into a mesh that is adjustable by scale and size
 */
let TextInputField = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = VisualElement_1.VisualElement;
    var TextInputField = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.inputType = this.inputType;
            this.formatType = this.formatType;
            this.placeholderText = this.placeholderText;
            this.fontFamily = this.fontFamily;
            this.useIcon = this.useIcon;
            this.icon = this.icon;
            this.changeIconOnFocus = this.changeIconOnFocus;
            this.alternateIcon = this.alternateIcon;
            this.contentRequiredOnDeactivate = this.contentRequiredOnDeactivate;
            this.addCallbacks = this.addCallbacks;
            this.onTextChangedCallbacks = this.onTextChangedCallbacks;
            this.onKeyboardStateChangedCallbacks = this.onKeyboardStateChangedCallbacks;
            this._style = SnapOS2_1.SnapOS2Styles.Custom;
            /**
             * do scale animation on hover
             */
            this.scaleOnHover = true;
            /**
             * custom font size
             * if not set, it will automatically scale from size.y
             */
            this.fontSize = null;
            this.leftIconObject = null;
            this.leftIconScreenTransform = null;
            this._leftIconRMV = null;
            this.rightIconObject = null;
            this.rightIconScreenTransform = null;
            this.rightIconRMV = null;
            this.rightIconInteractable = null;
            this.rightIconCollider = null;
            this.rightIconColliderShape = null;
            this.passwordSide = "right";
            this.iconSide = "left";
            this.textCache = "";
            this.renderedTextCache = "";
            this.isEditing = false;
            this.textInputFieldManager = TextInputFieldManager_1.TextInputFieldManager.getInstance();
            this.keyboardOptions = new TextInputSystem.KeyboardOptions();
            this.hidePassword = true;
            this.stateCancelSet = new animate_1.CancelSet();
            this.typingEvent = new Event_1.default();
            /**
             * called when the keyboard calls onTextChanged
             * ie: anytime there is typing on the keyboard
             */
            this.onTyping = this.typingEvent.publicApi();
            this.textChanged = new Event_1.default();
            /**
             * called when the underlying text value of this component changes
             * uses the current value of the keyboard as its parameter
             */
            this.onTextChanged = this.textChanged.publicApi();
            this.returnKeyPressed = new Event_1.default();
            /**
             * called when the return key is pressed on the keyboard
             * uses the current value of the keyboard as its parameter
             */
            this.onReturnKeyPressed = this.returnKeyPressed.publicApi();
            this.keyboardStateChanged = new Event_1.default();
            /**
             * called when the keyboard state changes
             * uses a boolean isOpen to indicate if the keyboard is open or closed
             */
            this.onKeyboardStateChanged = this.keyboardStateChanged.publicApi();
            this.editModeEvent = new Event_1.default();
            /**
             * called when this component enters edit mode
             */
            this.onEditMode = this.editModeEvent.publicApi();
            this.isPlaceholder = true;
            this._textOffset = null;
            this._lastScale = vec3.one();
            this._textInputFieldStates = new Map([
                [
                    Element_1.StateName.default,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => this.originalSize
                    }
                ],
                [
                    Element_1.StateName.hover,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.triggered,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.toggledDefault,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.alternate
                    }
                ],
                [
                    Element_1.StateName.toggledHovered,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.alternate,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.error,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default
                    }
                ],
                [
                    Element_1.StateName.errorHover,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.inactive,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default
                    }
                ]
            ]);
            this.checkForEmptyText = () => {
                if (this.text === "") {
                    this.isPlaceholder = true;
                    this.updateText(this.placeholderText);
                    this.textComponent.textFill.color = PLACEHOLDER_TEXT_COLOR;
                    if (this.contentRequiredOnDeactivate) {
                        this._hasError = true;
                    }
                }
            };
            this.calculateHoverScale = () => {
                return this.originalSize.uniformScale(1.05);
            };
            this.updateText = (text) => {
                this.textComponent.text =
                    this.inputType === "password" && !this.isPlaceholder && this.hidePassword ? "*".repeat(text.length) : text;
            };
            /**
             *
             * @param text set current visible text
             * bypasses setting underlying *value* of this TextInputField
             */
            this.setVisibleText = (text) => {
                this.updateText(text);
                this.renderedTextCache = text;
                // Need to reset alignment and overflow to default to get the correct width
                this.textComponent.horizontalAlignment = HorizontalAlignment.Left;
                this.textComponent.horizontalOverflow = HorizontalOverflow.Overflow;
                const width = (this.textComponent.getBoundingBox().getSize().x / this.textParentScreenTransform.anchors.getSize().x) * 2;
                if (width > OVERFLOW_WIDTH) {
                    // is overflowing
                    this.textComponent.horizontalAlignment = HorizontalAlignment.Right;
                    this.textComponent.horizontalOverflow = HorizontalOverflow.TruncateFront;
                }
                else {
                    // not overflowing
                    this.textComponent.horizontalAlignment = HorizontalAlignment.Left;
                    this.textComponent.horizontalOverflow = HorizontalOverflow.Truncate;
                }
            };
            /**
             *
             * @param editing start or stop editing
             */
            this.editMode = (editing) => {
                this.editModeEvent.invoke(editing);
                if (DEFAULT_BEHAVIOR) {
                    if (editing && !this.isEditing) {
                        // start editing
                        this._interactableStateMachine.toggle = true;
                        this.textComponent.textFill.color = DEFAULT_TEXT_COLOR;
                        if (this.isPlaceholder) {
                            // first click on editing
                            this.isPlaceholder = false;
                            this.keyboardOptions.initialText = "";
                            this.textCache = "";
                            this.updateText("");
                            this.textChanged.invoke(this.text);
                        }
                        else {
                            this.keyboardOptions.initialText = this.text;
                        }
                        global.textInputSystem.requestKeyboard(this.keyboardOptions);
                        this.isEditing = true;
                        this.textInputFieldManager.registerActive(this);
                    }
                    else if (editing === false) {
                        if (this._interactableStateMachine.toggle) {
                            this._interactableStateMachine.toggle = false;
                            this.isEditing = false;
                            this.textInputFieldManager.deregisterActive(this);
                            global.textInputSystem.dismissKeyboard();
                        }
                        this.checkForEmptyText();
                        this.cancelRequestKeyboard();
                    }
                }
            };
            /**
             * applies current text offset
             */
            this.updateTextOffset = () => {
                if (this.textOffset) {
                    this.textObjectScreenTransform.offsets.left = this.textOffset.x;
                    this.textObjectScreenTransform.offsets.right = this.textOffset.y;
                }
                else {
                    // reset according to icon position
                    this.setUseIcon(this.useIcon);
                    this.setUsePassword(this.inputType === "password");
                }
            };
            this.cancelRequestKeyboard = () => {
                log.d(`cancelling timeout ${this.sceneObject.name}`);
                (0, FunctionTimingUtils_1.clearTimeout)(this.keyboardTimeoutCancelToken);
            };
            this._updateSize = (size) => {
                this._visual.size = size;
                this._visual.cornerRadius = size.y * 0.25; // scale corner radius based on height
                // use functions to do resizing
                this.setUseIcon(this.useIcon);
                this.setUsePassword(this.inputType === "password");
                this.textParentScreenTransform.position = new vec3(0, 0, 0.01);
                this.updateScale(size);
            };
            /**
             *
             * @param size vec3 set rendering size
             * @param setBaseSize vec3 overwrite cached starting size
             */
            this.setSize = (size, setBaseSize = true) => {
                super.size = size;
                this._updateSize(size);
                if (setBaseSize)
                    this.originalSize = size;
            };
            /**
             *
             * @returns vec3 of current size
             */
            this.getSize = () => {
                return this._size;
            };
            /**
             *
             * @param type set type of TextInputField
             * "default", "password", "numeric  " or "format"
             */
            this.setInputType = (type) => {
                this.inputType = type;
                this.setUsePassword(this.inputType === "password");
                this.setVisibleText(this.textCache);
            };
            /**
             *
             * @param side set side of icon and password ui
             */
            this.setIconSide = (side) => {
                if (side === "left") {
                    this.iconSide = "left";
                    this.passwordSide = "right";
                }
                else {
                    this.iconSide = "right";
                    this.passwordSide = "left";
                }
                // call with current values to reposition
                this.setUseIcon(this.useIcon);
                this.setInputType(this.inputType);
            };
            /**
             *
             * @param useIcon turn on whether or not to use the icon
             * note: still requires an icon set to .icon!
             */
            this.setUseIcon = (useIcon) => {
                this.useIcon = useIcon;
                if (this.useIcon) {
                    if (!this.leftIconObject) {
                        this.leftIconObject = global.scene.createSceneObject("LeftIcon");
                        this.managedSceneObjects.add(this.leftIconObject);
                        this.leftIconObject.layer = this.sceneObject.layer;
                        this.leftIconObject.setParent(this.textParent);
                        this.leftIconScreenTransform = this.leftIconObject.createComponent("ScreenTransform");
                        this.leftIconScreenTransform.offsets = Rect.create(-0, this._size.y * 0.5, -0, 0);
                        this.leftIconScreenTransform.anchors = Rect.create(-1, -1, -0.5, 0.5);
                        this._leftIconRMV = this.leftIconObject.createComponent("RenderMeshVisual");
                        this.managedComponents.add(this._leftIconRMV);
                        this._leftIconRMV.mesh = UNIT_PLANE;
                        this._leftIconRMV.mainMaterial = Element_1.IMAGE_MATERIAL_ASSET.clone();
                        this._leftIconRMV.mainMaterial.mainPass.baseTex = this.icon;
                        this._leftIconRMV.mainMaterial.mainPass.depthTest = true;
                    }
                    this.leftIconObject.enabled = true;
                    this.leftIconScreenTransform.enableDebugRendering = DEBUG_RENDER;
                    const inset = this._size.y * 0.15; // position side icon based on height
                    this.textObjectScreenTransform.offsets[this.iconSide] =
                        this.iconSide === "right" ? this._size.y * -0.5 - inset : this._size.y * 0.5 + inset;
                    if (this.iconSide === "right") {
                        this.leftIconScreenTransform.offsets["left"] = this._size.y * -0.5;
                        this.leftIconScreenTransform.offsets["right"] = 0;
                    }
                    if (this.iconSide === "left") {
                        this.leftIconScreenTransform.offsets["right"] = this._size.y * 0.5;
                        this.leftIconScreenTransform.offsets["left"] = 0;
                    }
                    this.leftIconScreenTransform.anchors =
                        this.iconSide === "right" ? Rect.create(1, 1, -0.5, 0.5) : Rect.create(-1, -1, -0.5, 0.5);
                }
                else {
                    if (this.leftIconObject) {
                        this.leftIconObject.enabled = false;
                        this.leftIconScreenTransform.enableDebugRendering = false;
                        this.textObjectScreenTransform.offsets[this.iconSide] = 0;
                    }
                }
                if (this.textOffset)
                    this.updateTextOffset();
            };
            /**
             *
             * @returns SceneObject of "left" icon
             */
            this.getIcon = () => this.leftIconObject;
            /**
             *
             * @returns SceneObject of right icon
             */
            this.getPasswordIcon = () => this.rightIconObject;
            this.setUsePassword = (isPassword) => {
                if (isPassword) {
                    if (!this.rightIconObject) {
                        this.rightIconObject = global.scene.createSceneObject("RightIcon");
                        this.managedSceneObjects.add(this.rightIconObject);
                        this.rightIconObject.layer = this.sceneObject.layer;
                        this.rightIconObject.setParent(this.textParent);
                        this.rightIconScreenTransform = this.rightIconObject.createComponent("ScreenTransform");
                        this.rightIconScreenTransform.offsets = Rect.create(this._size.y * -0.5, 0, -0, 0);
                        this.rightIconScreenTransform.anchors = Rect.create(1, 1, -0.5, 0.5);
                        this.rightIconRMV = this.rightIconObject.createComponent("RenderMeshVisual");
                        this.managedComponents.add(this.rightIconRMV);
                        this.rightIconRMV.mesh = UNIT_PLANE;
                        this.rightIconRMV.mainMaterial = Element_1.IMAGE_MATERIAL_ASSET.clone();
                        this.rightIconRMV.mainMaterial.mainPass.baseTex = EYE_OFF_ICON;
                        this.rightIconRMV.mainMaterial.mainPass.depthTest = true;
                        this.rightIconCollider = this.rightIconObject.createComponent("ColliderComponent");
                        this.managedComponents.add(this.rightIconCollider);
                        this.rightIconColliderShape = Shape.createBoxShape();
                        this.rightIconCollider.fitVisual = false;
                        this.rightIconColliderShape.size = new vec3(this._size.y * 0.5, this._size.y * 0.5, 1);
                        this.rightIconCollider.shape = this.rightIconColliderShape;
                        this.rightIconInteractable = this.rightIconObject.createComponent(Interactable_1.Interactable.getTypeName());
                        this.managedComponents.add(this.rightIconInteractable);
                        this.rightIconInteractable.targetingMode = Interactor_1.TargetingMode.All;
                        this.rightIconInteractable.onTriggerEnd.add(() => {
                            this.hidePassword = !this.hidePassword;
                            if (this.hidePassword) {
                                this.rightIconRMV.mainMaterial.mainPass.baseTex = EYE_OFF_ICON;
                            }
                            else {
                                this.rightIconRMV.mainMaterial.mainPass.baseTex = EYE_ICON;
                            }
                            this.setVisibleText(this.textCache);
                        });
                    }
                    this.rightIconObject.enabled = true;
                    this.rightIconCollider.debugDrawEnabled = DEBUG_RENDER;
                    this.rightIconScreenTransform.enableDebugRendering = DEBUG_RENDER;
                    const inset = this._size.y * 0.15; // position side icon based on height
                    this.textObjectScreenTransform.offsets[this.passwordSide] =
                        this.passwordSide === "right" ? this._size.y * -0.5 - inset : this._size.y * 0.5 + inset;
                    if (this.passwordSide === "right") {
                        this.rightIconScreenTransform.offsets["left"] = this._size.y * -0.5;
                        this.rightIconScreenTransform.offsets["right"] = 0;
                    }
                    if (this.passwordSide === "left") {
                        this.rightIconScreenTransform.offsets["right"] = this._size.y * 0.5;
                        this.rightIconScreenTransform.offsets["left"] = 0;
                    }
                    this.rightIconScreenTransform.anchors =
                        this.passwordSide === "right" ? Rect.create(1, 1, -0.5, 0.5) : Rect.create(-1, -1, -0.5, 0.5);
                }
                else {
                    this.textObjectScreenTransform.offsets[this.passwordSide] = 0;
                    if (this.rightIconObject) {
                        this.rightIconCollider.debugDrawEnabled = false;
                        this.rightIconScreenTransform.enableDebugRendering = false;
                        this.rightIconObject.enabled = false;
                    }
                }
                if (this.textOffset)
                    this.updateTextOffset();
            };
        }
        __initialize() {
            super.__initialize();
            this.inputType = this.inputType;
            this.formatType = this.formatType;
            this.placeholderText = this.placeholderText;
            this.fontFamily = this.fontFamily;
            this.useIcon = this.useIcon;
            this.icon = this.icon;
            this.changeIconOnFocus = this.changeIconOnFocus;
            this.alternateIcon = this.alternateIcon;
            this.contentRequiredOnDeactivate = this.contentRequiredOnDeactivate;
            this.addCallbacks = this.addCallbacks;
            this.onTextChangedCallbacks = this.onTextChangedCallbacks;
            this.onKeyboardStateChangedCallbacks = this.onKeyboardStateChangedCallbacks;
            this._style = SnapOS2_1.SnapOS2Styles.Custom;
            /**
             * do scale animation on hover
             */
            this.scaleOnHover = true;
            /**
             * custom font size
             * if not set, it will automatically scale from size.y
             */
            this.fontSize = null;
            this.leftIconObject = null;
            this.leftIconScreenTransform = null;
            this._leftIconRMV = null;
            this.rightIconObject = null;
            this.rightIconScreenTransform = null;
            this.rightIconRMV = null;
            this.rightIconInteractable = null;
            this.rightIconCollider = null;
            this.rightIconColliderShape = null;
            this.passwordSide = "right";
            this.iconSide = "left";
            this.textCache = "";
            this.renderedTextCache = "";
            this.isEditing = false;
            this.textInputFieldManager = TextInputFieldManager_1.TextInputFieldManager.getInstance();
            this.keyboardOptions = new TextInputSystem.KeyboardOptions();
            this.hidePassword = true;
            this.stateCancelSet = new animate_1.CancelSet();
            this.typingEvent = new Event_1.default();
            /**
             * called when the keyboard calls onTextChanged
             * ie: anytime there is typing on the keyboard
             */
            this.onTyping = this.typingEvent.publicApi();
            this.textChanged = new Event_1.default();
            /**
             * called when the underlying text value of this component changes
             * uses the current value of the keyboard as its parameter
             */
            this.onTextChanged = this.textChanged.publicApi();
            this.returnKeyPressed = new Event_1.default();
            /**
             * called when the return key is pressed on the keyboard
             * uses the current value of the keyboard as its parameter
             */
            this.onReturnKeyPressed = this.returnKeyPressed.publicApi();
            this.keyboardStateChanged = new Event_1.default();
            /**
             * called when the keyboard state changes
             * uses a boolean isOpen to indicate if the keyboard is open or closed
             */
            this.onKeyboardStateChanged = this.keyboardStateChanged.publicApi();
            this.editModeEvent = new Event_1.default();
            /**
             * called when this component enters edit mode
             */
            this.onEditMode = this.editModeEvent.publicApi();
            this.isPlaceholder = true;
            this._textOffset = null;
            this._lastScale = vec3.one();
            this._textInputFieldStates = new Map([
                [
                    Element_1.StateName.default,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => this.originalSize
                    }
                ],
                [
                    Element_1.StateName.hover,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.triggered,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.toggledDefault,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.alternate
                    }
                ],
                [
                    Element_1.StateName.toggledHovered,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.alternate,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.error,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default
                    }
                ],
                [
                    Element_1.StateName.errorHover,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default,
                        size: () => {
                            return this.calculateHoverScale();
                        }
                    }
                ],
                [
                    Element_1.StateName.inactive,
                    {
                        textColor: DEFAULT_TEXT_COLOR,
                        icon: IconState.default
                    }
                ]
            ]);
            this.checkForEmptyText = () => {
                if (this.text === "") {
                    this.isPlaceholder = true;
                    this.updateText(this.placeholderText);
                    this.textComponent.textFill.color = PLACEHOLDER_TEXT_COLOR;
                    if (this.contentRequiredOnDeactivate) {
                        this._hasError = true;
                    }
                }
            };
            this.calculateHoverScale = () => {
                return this.originalSize.uniformScale(1.05);
            };
            this.updateText = (text) => {
                this.textComponent.text =
                    this.inputType === "password" && !this.isPlaceholder && this.hidePassword ? "*".repeat(text.length) : text;
            };
            /**
             *
             * @param text set current visible text
             * bypasses setting underlying *value* of this TextInputField
             */
            this.setVisibleText = (text) => {
                this.updateText(text);
                this.renderedTextCache = text;
                // Need to reset alignment and overflow to default to get the correct width
                this.textComponent.horizontalAlignment = HorizontalAlignment.Left;
                this.textComponent.horizontalOverflow = HorizontalOverflow.Overflow;
                const width = (this.textComponent.getBoundingBox().getSize().x / this.textParentScreenTransform.anchors.getSize().x) * 2;
                if (width > OVERFLOW_WIDTH) {
                    // is overflowing
                    this.textComponent.horizontalAlignment = HorizontalAlignment.Right;
                    this.textComponent.horizontalOverflow = HorizontalOverflow.TruncateFront;
                }
                else {
                    // not overflowing
                    this.textComponent.horizontalAlignment = HorizontalAlignment.Left;
                    this.textComponent.horizontalOverflow = HorizontalOverflow.Truncate;
                }
            };
            /**
             *
             * @param editing start or stop editing
             */
            this.editMode = (editing) => {
                this.editModeEvent.invoke(editing);
                if (DEFAULT_BEHAVIOR) {
                    if (editing && !this.isEditing) {
                        // start editing
                        this._interactableStateMachine.toggle = true;
                        this.textComponent.textFill.color = DEFAULT_TEXT_COLOR;
                        if (this.isPlaceholder) {
                            // first click on editing
                            this.isPlaceholder = false;
                            this.keyboardOptions.initialText = "";
                            this.textCache = "";
                            this.updateText("");
                            this.textChanged.invoke(this.text);
                        }
                        else {
                            this.keyboardOptions.initialText = this.text;
                        }
                        global.textInputSystem.requestKeyboard(this.keyboardOptions);
                        this.isEditing = true;
                        this.textInputFieldManager.registerActive(this);
                    }
                    else if (editing === false) {
                        if (this._interactableStateMachine.toggle) {
                            this._interactableStateMachine.toggle = false;
                            this.isEditing = false;
                            this.textInputFieldManager.deregisterActive(this);
                            global.textInputSystem.dismissKeyboard();
                        }
                        this.checkForEmptyText();
                        this.cancelRequestKeyboard();
                    }
                }
            };
            /**
             * applies current text offset
             */
            this.updateTextOffset = () => {
                if (this.textOffset) {
                    this.textObjectScreenTransform.offsets.left = this.textOffset.x;
                    this.textObjectScreenTransform.offsets.right = this.textOffset.y;
                }
                else {
                    // reset according to icon position
                    this.setUseIcon(this.useIcon);
                    this.setUsePassword(this.inputType === "password");
                }
            };
            this.cancelRequestKeyboard = () => {
                log.d(`cancelling timeout ${this.sceneObject.name}`);
                (0, FunctionTimingUtils_1.clearTimeout)(this.keyboardTimeoutCancelToken);
            };
            this._updateSize = (size) => {
                this._visual.size = size;
                this._visual.cornerRadius = size.y * 0.25; // scale corner radius based on height
                // use functions to do resizing
                this.setUseIcon(this.useIcon);
                this.setUsePassword(this.inputType === "password");
                this.textParentScreenTransform.position = new vec3(0, 0, 0.01);
                this.updateScale(size);
            };
            /**
             *
             * @param size vec3 set rendering size
             * @param setBaseSize vec3 overwrite cached starting size
             */
            this.setSize = (size, setBaseSize = true) => {
                super.size = size;
                this._updateSize(size);
                if (setBaseSize)
                    this.originalSize = size;
            };
            /**
             *
             * @returns vec3 of current size
             */
            this.getSize = () => {
                return this._size;
            };
            /**
             *
             * @param type set type of TextInputField
             * "default", "password", "numeric  " or "format"
             */
            this.setInputType = (type) => {
                this.inputType = type;
                this.setUsePassword(this.inputType === "password");
                this.setVisibleText(this.textCache);
            };
            /**
             *
             * @param side set side of icon and password ui
             */
            this.setIconSide = (side) => {
                if (side === "left") {
                    this.iconSide = "left";
                    this.passwordSide = "right";
                }
                else {
                    this.iconSide = "right";
                    this.passwordSide = "left";
                }
                // call with current values to reposition
                this.setUseIcon(this.useIcon);
                this.setInputType(this.inputType);
            };
            /**
             *
             * @param useIcon turn on whether or not to use the icon
             * note: still requires an icon set to .icon!
             */
            this.setUseIcon = (useIcon) => {
                this.useIcon = useIcon;
                if (this.useIcon) {
                    if (!this.leftIconObject) {
                        this.leftIconObject = global.scene.createSceneObject("LeftIcon");
                        this.managedSceneObjects.add(this.leftIconObject);
                        this.leftIconObject.layer = this.sceneObject.layer;
                        this.leftIconObject.setParent(this.textParent);
                        this.leftIconScreenTransform = this.leftIconObject.createComponent("ScreenTransform");
                        this.leftIconScreenTransform.offsets = Rect.create(-0, this._size.y * 0.5, -0, 0);
                        this.leftIconScreenTransform.anchors = Rect.create(-1, -1, -0.5, 0.5);
                        this._leftIconRMV = this.leftIconObject.createComponent("RenderMeshVisual");
                        this.managedComponents.add(this._leftIconRMV);
                        this._leftIconRMV.mesh = UNIT_PLANE;
                        this._leftIconRMV.mainMaterial = Element_1.IMAGE_MATERIAL_ASSET.clone();
                        this._leftIconRMV.mainMaterial.mainPass.baseTex = this.icon;
                        this._leftIconRMV.mainMaterial.mainPass.depthTest = true;
                    }
                    this.leftIconObject.enabled = true;
                    this.leftIconScreenTransform.enableDebugRendering = DEBUG_RENDER;
                    const inset = this._size.y * 0.15; // position side icon based on height
                    this.textObjectScreenTransform.offsets[this.iconSide] =
                        this.iconSide === "right" ? this._size.y * -0.5 - inset : this._size.y * 0.5 + inset;
                    if (this.iconSide === "right") {
                        this.leftIconScreenTransform.offsets["left"] = this._size.y * -0.5;
                        this.leftIconScreenTransform.offsets["right"] = 0;
                    }
                    if (this.iconSide === "left") {
                        this.leftIconScreenTransform.offsets["right"] = this._size.y * 0.5;
                        this.leftIconScreenTransform.offsets["left"] = 0;
                    }
                    this.leftIconScreenTransform.anchors =
                        this.iconSide === "right" ? Rect.create(1, 1, -0.5, 0.5) : Rect.create(-1, -1, -0.5, 0.5);
                }
                else {
                    if (this.leftIconObject) {
                        this.leftIconObject.enabled = false;
                        this.leftIconScreenTransform.enableDebugRendering = false;
                        this.textObjectScreenTransform.offsets[this.iconSide] = 0;
                    }
                }
                if (this.textOffset)
                    this.updateTextOffset();
            };
            /**
             *
             * @returns SceneObject of "left" icon
             */
            this.getIcon = () => this.leftIconObject;
            /**
             *
             * @returns SceneObject of right icon
             */
            this.getPasswordIcon = () => this.rightIconObject;
            this.setUsePassword = (isPassword) => {
                if (isPassword) {
                    if (!this.rightIconObject) {
                        this.rightIconObject = global.scene.createSceneObject("RightIcon");
                        this.managedSceneObjects.add(this.rightIconObject);
                        this.rightIconObject.layer = this.sceneObject.layer;
                        this.rightIconObject.setParent(this.textParent);
                        this.rightIconScreenTransform = this.rightIconObject.createComponent("ScreenTransform");
                        this.rightIconScreenTransform.offsets = Rect.create(this._size.y * -0.5, 0, -0, 0);
                        this.rightIconScreenTransform.anchors = Rect.create(1, 1, -0.5, 0.5);
                        this.rightIconRMV = this.rightIconObject.createComponent("RenderMeshVisual");
                        this.managedComponents.add(this.rightIconRMV);
                        this.rightIconRMV.mesh = UNIT_PLANE;
                        this.rightIconRMV.mainMaterial = Element_1.IMAGE_MATERIAL_ASSET.clone();
                        this.rightIconRMV.mainMaterial.mainPass.baseTex = EYE_OFF_ICON;
                        this.rightIconRMV.mainMaterial.mainPass.depthTest = true;
                        this.rightIconCollider = this.rightIconObject.createComponent("ColliderComponent");
                        this.managedComponents.add(this.rightIconCollider);
                        this.rightIconColliderShape = Shape.createBoxShape();
                        this.rightIconCollider.fitVisual = false;
                        this.rightIconColliderShape.size = new vec3(this._size.y * 0.5, this._size.y * 0.5, 1);
                        this.rightIconCollider.shape = this.rightIconColliderShape;
                        this.rightIconInteractable = this.rightIconObject.createComponent(Interactable_1.Interactable.getTypeName());
                        this.managedComponents.add(this.rightIconInteractable);
                        this.rightIconInteractable.targetingMode = Interactor_1.TargetingMode.All;
                        this.rightIconInteractable.onTriggerEnd.add(() => {
                            this.hidePassword = !this.hidePassword;
                            if (this.hidePassword) {
                                this.rightIconRMV.mainMaterial.mainPass.baseTex = EYE_OFF_ICON;
                            }
                            else {
                                this.rightIconRMV.mainMaterial.mainPass.baseTex = EYE_ICON;
                            }
                            this.setVisibleText(this.textCache);
                        });
                    }
                    this.rightIconObject.enabled = true;
                    this.rightIconCollider.debugDrawEnabled = DEBUG_RENDER;
                    this.rightIconScreenTransform.enableDebugRendering = DEBUG_RENDER;
                    const inset = this._size.y * 0.15; // position side icon based on height
                    this.textObjectScreenTransform.offsets[this.passwordSide] =
                        this.passwordSide === "right" ? this._size.y * -0.5 - inset : this._size.y * 0.5 + inset;
                    if (this.passwordSide === "right") {
                        this.rightIconScreenTransform.offsets["left"] = this._size.y * -0.5;
                        this.rightIconScreenTransform.offsets["right"] = 0;
                    }
                    if (this.passwordSide === "left") {
                        this.rightIconScreenTransform.offsets["right"] = this._size.y * 0.5;
                        this.rightIconScreenTransform.offsets["left"] = 0;
                    }
                    this.rightIconScreenTransform.anchors =
                        this.passwordSide === "right" ? Rect.create(1, 1, -0.5, 0.5) : Rect.create(-1, -1, -0.5, 0.5);
                }
                else {
                    this.textObjectScreenTransform.offsets[this.passwordSide] = 0;
                    if (this.rightIconObject) {
                        this.rightIconCollider.debugDrawEnabled = false;
                        this.rightIconScreenTransform.enableDebugRendering = false;
                        this.rightIconObject.enabled = false;
                    }
                }
                if (this.textOffset)
                    this.updateTextOffset();
            };
        }
        get leftIconRMV() {
            return this._leftIconRMV;
        }
        get isToggle() {
            return true;
        }
        onAwake() {
            this.textParent = global.scene.createSceneObject("textParent");
            this.managedSceneObjects.add(this.textParent);
            this.textParent.layer = this.sceneObject.layer;
            this.textParentScreenTransform = this.textParent.createComponent("ScreenTransform");
            this.textParentTransform = this.textParent.getTransform();
            this.textObject = global.scene.createSceneObject("textObject");
            this.textObject.layer = this.sceneObject.layer;
            this.textObjectScreenTransform = this.textObject.createComponent("ScreenTransform");
            this.textComponent = this.textObject.getComponent("Text") || this.textObject.createComponent("Text");
            this.managedComponents.add(this.textComponent);
            this.textInputFieldManager.addField(this);
            super.onAwake();
        }
        /**
         * function to setup text field
         * call manually if creating dynamically and seeing a frame without the parameters you assign
         */
        initialize() {
            if (this._initialized) {
                return;
            }
            this.originalSize = this._size;
            if (!this._visual) {
                const parameters = {
                    default: {
                        isBaseGradient: true,
                        baseGradient: BACKGROUND_GRADIENT_PARAMETERS.default,
                        hasBorder: true,
                        borderSize: 0.1,
                        borderType: "Gradient",
                        borderGradient: exports.BORDER_GRADIENT_PARAMETERS.default
                    },
                    hover: {
                        borderGradient: exports.BORDER_GRADIENT_PARAMETERS.toggledHovered
                    },
                    triggered: {
                        baseGradient: BACKGROUND_GRADIENT_PARAMETERS.toggled,
                        borderGradient: exports.BORDER_GRADIENT_PARAMETERS.toggled
                    }
                };
                const defaultVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual({
                    sceneObject: this.sceneObject,
                    style: parameters
                });
                defaultVisual.cornerRadius = this._size.y * 0.25;
                this._visual = defaultVisual;
            }
            super.initialize();
            this.updateScale(this.transform.getWorldScale());
            // setup text
            this.textParent.setParent(this.sceneObject);
            this.textObject.setParent(this.textParent);
            this.textParentScreenTransform.position = new vec3(0, 0, 0.01);
            this.textCache = this.placeholderText;
            this.setVisibleText(this.textCache);
            this.textComponent.textFill.color = PLACEHOLDER_TEXT_COLOR;
            this.textComponent.depthTest = true;
            this.textComponent.horizontalAlignment = HorizontalAlignment.Left;
            if (this.fontFamily)
                this.textComponent.font = this.fontFamily;
            this.textObjectScreenTransform.anchors = Rect.create(-1, 1, -1, 1);
            this.textObjectScreenTransform.offsets = Rect.create(0, 0, 0, 0);
            this.textObjectScreenTransform.enableDebugRendering = DEBUG_RENDER;
            this.textParentScreenTransform.enableDebugRendering = DEBUG_RENDER;
            // icons
            this.setUseIcon(this.useIcon);
            this.setUsePassword(this.inputType === "password");
            let keyboardType = TextInputSystem.KeyboardType.Text;
            switch (this.inputType) {
                case "numeric":
                    keyboardType = TextInputSystem.KeyboardType.Num;
                    break;
                case "password":
                    keyboardType = TextInputSystem.KeyboardType.Password;
                    break;
                case "pin":
                    keyboardType = TextInputSystem.KeyboardType.Pin;
                    break;
            }
            // prepare keyboard
            this.keyboardOptions.enablePreview = true;
            this.keyboardOptions.keyboardType = keyboardType;
            this.keyboardOptions.returnKeyType = TextInputSystem.ReturnKeyType.Done;
            this.keyboardOptions.onTextChanged = (text) => {
                this.isEditing = true;
                this.text = text;
                this.typingEvent.invoke();
            };
            this.keyboardOptions.onKeyboardStateChanged = (isOpen) => {
                this.keyboardStateChanged.invoke(isOpen);
                if (DEFAULT_BEHAVIOR) {
                    if (!isOpen) {
                        this._hasError = false;
                        this.editMode(false);
                    }
                }
            };
            this.keyboardOptions.onReturnKeyPressed = () => {
                this.returnKeyPressed.invoke(this.text);
            };
            this._interactableStateMachine.untoggleOnClick = false;
            this.setSize(this.getSize());
        }
        createDefaultVisual() {
            if (!this._visual) {
                const defaultVisual = new RoundedRectangleVisual_1.RoundedRectangleVisual(this);
                defaultVisual.cornerRadius = this._size.y * 0.25;
                defaultVisual.isBaseGradient = true;
                defaultVisual.setBaseGradientPositions(new vec2(0, 0), new vec2(0.5, 0));
                defaultVisual.defaultGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
                defaultVisual.hoverGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
                defaultVisual.triggeredGradient = BACKGROUND_GRADIENT_PARAMETERS.toggled;
                defaultVisual.inactiveGradient = BACKGROUND_GRADIENT_PARAMETERS.default;
                defaultVisual.hasBorder = true;
                defaultVisual.borderSize = 0.2;
                defaultVisual.isBorderGradient = true;
                defaultVisual.setBorderGradientPositions(new vec2(-1, 0.5), new vec2(1, 0.5));
                defaultVisual.borderDefaultGradient = exports.BORDER_GRADIENT_PARAMETERS.default;
                defaultVisual.borderHoverGradient = exports.BORDER_GRADIENT_PARAMETERS.toggledHovered;
                defaultVisual.borderTriggeredGradient = exports.BORDER_GRADIENT_PARAMETERS.toggled;
                defaultVisual.borderInactiveGradient = exports.BORDER_GRADIENT_PARAMETERS.default;
                this._visual = defaultVisual;
            }
        }
        setUpEventCallbacks() {
            if (this.addCallbacks) {
                this.onTextChanged.add((0, SceneUtilities_1.createCallbacks)(this.onTextChangedCallbacks));
                this.onKeyboardStateChanged.add((0, SceneUtilities_1.createCallbacks)(this.onKeyboardStateChangedCallbacks));
                super.setUpEventCallbacks();
            }
        }
        onTriggerUpHandler(stateEvent) {
            if (stateEvent.event.target !== this.interactable)
                return;
            if (!this.isEditing) {
                if (this.textInputFieldManager.active.size > 0 || this.textInputFieldManager.recentlyClosed) {
                    this.textInputFieldManager.deselectAll().then(() => {
                        this.keyboardTimeoutCancelToken = (0, FunctionTimingUtils_1.setTimeout)(() => {
                            this.editMode(true);
                        }, 750);
                    });
                }
                else {
                    this.keyboardTimeoutCancelToken = (0, FunctionTimingUtils_1.setTimeout)(() => {
                        this.editMode(true);
                    }, 16);
                }
            }
        }
        /**
         * set current text displayed in
         */
        set text(text) {
            if (text === undefined) {
                return;
            }
            this.textCache = text;
            if (text === "") {
                this.isPlaceholder = true;
                // this.textCache = this.placeholderText
                this.setVisibleText(this.textCache);
                this.textComponent.textFill.color = PLACEHOLDER_TEXT_COLOR;
            }
            else {
                this.isPlaceholder = false;
                this.setVisibleText(text);
                this.textComponent.textFill.color = DEFAULT_TEXT_COLOR;
            }
            if (!this.isEditing)
                this.checkForEmptyText();
            this.textChanged.invoke(text);
        }
        /**
         * Full string in the input
         */
        get text() {
            return this.textCache;
        }
        /**
         * @returns vec2 current text offset override
         */
        get textOffset() {
            return this._textOffset;
        }
        /**
         * @param offset set current text offset override
         * to "unset" set this to undefined
         */
        set textOffset(offset) {
            if (offset === undefined) {
                return;
            }
            this._textOffset = offset;
            this.updateTextOffset();
        }
        updateScale(thisScale) {
            const inset = this._size.y * 0.3; // offset from side based on height
            this.textComponent.size = this.fontSize ? this.fontSize * (this._size.y / this.originalSize.y) : this._size.y * 16; // scale text based on height
            this.textParentScreenTransform.anchors.top = this._size.y * 0.5;
            this.textParentScreenTransform.anchors.bottom = this._size.y * -0.5;
            this.textParentScreenTransform.anchors.left = this._size.x * -0.5 + inset;
            this.textParentScreenTransform.anchors.right = this._size.x * 0.5 - inset;
            this._lastScale = thisScale.uniformScale(1);
        }
        /**
         *
         * @param state set current state of TextInputField (usually handled automatically)
         */
        setState(stateName) {
            this.stateCancelSet();
            super.setState(stateName);
            const state = this._textInputFieldStates.get(stateName);
            if (this._leftIconRMV) {
                if (state.icon === IconState.alternate && this.changeIconOnFocus) {
                    this._leftIconRMV.mainMaterial.mainPass.baseTex = this.alternateIcon;
                }
                else if (this.icon && this.useIcon) {
                    if (this._leftIconRMV.mainMaterial.mainPass.baseTex !== this.icon) {
                        this._leftIconRMV.mainMaterial.mainPass.baseTex = this.icon;
                    }
                }
            }
            (0, animate_1.default)({
                cancelSet: this.stateCancelSet,
                duration: 0.333,
                easing: "ease-in-quart",
                update: (t) => {
                    if (this.scaleOnHover) {
                        const newSize = state.size ? state.size() : this.originalSize;
                        this.setSize(vec3.lerp(this._size, newSize, t), false);
                    }
                }
            });
        }
        update() {
            const thisScale = this.transform.getWorldScale();
            if (!thisScale.equal(this._lastScale)) {
                this.updateScale(thisScale);
            }
            super.update();
        }
        release() {
            this.stateCancelSet();
            this.textInputFieldManager.removeField(this);
            super.release();
        }
    };
    __setFunctionName(_classThis, "TextInputField");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TextInputField = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TextInputField = _classThis;
})();
exports.TextInputField = TextInputField;
//# sourceMappingURL=TextInputField.js.map