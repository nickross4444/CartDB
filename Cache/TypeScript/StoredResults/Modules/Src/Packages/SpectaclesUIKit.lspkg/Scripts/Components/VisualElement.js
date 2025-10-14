"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualElement = void 0;
const FunctionTimingUtils_1 = require("SpectaclesInteractionKit.lspkg/Utils/FunctionTimingUtils");
const SnapOS2_1 = require("../Themes/SnapOS-2.0/SnapOS2");
const Tooltip_1 = require("../Tooltip");
const SceneUtilities_1 = require("../Utility/SceneUtilities");
const UIKitUtilities_1 = require("../Utility/UIKitUtilities");
const Element_1 = require("./Element");
/**
 * This constant determines how long the user must hover or interact with an element before the tooltip appears.
 */
const TOOLTIP_ACTIVATION_DELAY = 50; //in milliseconds
/**
 * Represents an abstract base class for visual elements in the UI framework.
 * This class extends the `Element` class and provides functionality for managing
 * a visual representation (`Visual`) and handles initialization and event binding for the visual element.
 *
 * @abstract
 */
class VisualElement extends Element_1.Element {
    constructor() {
        super();
        this._style = this._style;
        this.visualEventHandlerUnsubscribes = [];
    }
    __initialize() {
        super.__initialize();
        this._style = this._style;
        this.visualEventHandlerUnsubscribes = [];
    }
    get typeString() {
        return this.constructor.name;
    }
    /**
     * Gets the associated `Visual` instance for this component.
     *
     * @returns {Visual} The `Visual` instance linked to this component.
     */
    get visual() {
        return this._visual;
    }
    /**
     * The style of the visual element.
     *
     * @returns {string} The style of the visual element.
     */
    get style() {
        return this._style;
    }
    /**
     * Sets the visual element for this component. If a previous visual element exists,
     * it will be destroyed before assigning the new one. Ensures that the new visual
     * element is only set if it differs from the current one.
     *
     * @param value - The new `Visual` instance to be assigned.
     */
    set visual(value) {
        if (value === undefined) {
            return;
        }
        if ((0, UIKitUtilities_1.isEqual)(this._visual, value)) {
            return;
        }
        this.destroyVisual();
        this._visual = value;
        if (this._initialized) {
            this.configureVisual();
            this.setState(this.stateName); // set the new visual to current state
        }
    }
    /**
     * Gets the size of the visual element.
     *
     * @returns {vec3} The size of the visual element.
     */
    get size() {
        return this._size;
    }
    /**
     * @returns current size
     */
    set size(size) {
        if (size === undefined) {
            return;
        }
        super.size = size;
        if (this._initialized) {
            this._visual.size = size;
        }
    }
    /**
     * The render order of the visual element.
     */
    get renderOrder() {
        return this._renderOrder;
    }
    /**
     * The render order of the visual element.
     */
    set renderOrder(value) {
        if (value === undefined) {
            return;
        }
        this._renderOrder = value;
        if (this._initialized) {
            this._visual.renderMeshVisual.renderOrder = value;
        }
    }
    /**
     * Initializes the visual element and its associated properties and events.
     *
     * @override
     */
    initialize() {
        if (this._initialized) {
            return;
        }
        this.createDefaultVisual();
        this._visual.renderMeshVisual.renderOrder = this._renderOrder;
        super.initialize();
        this.configureVisual();
        this.visual.onPositionChanged.add((args) => {
            this.currentPosition = args.current;
            this.updateCollider();
        });
        this.visual.onScaleChanged.add((args) => {
            this.currentScale = args.current;
            this.updateCollider();
        });
        if (!this.tooltip) {
            const tooltipComponents = (0, SceneUtilities_1.findAllChildComponents)(this.sceneObject, Tooltip_1.Tooltip.getTypeName());
            if (tooltipComponents.length > 0) {
                this.registerTooltip(tooltipComponents[0]);
            }
        }
        this.setState(this.stateName);
    }
    /**
     * Registers a tooltip instance with the current component
     *
     * @param tooltip - The Tooltip instance to associate with this component.
     */
    registerTooltip(tooltip) {
        this.tooltip = tooltip;
        this.tooltip.setOn(false);
    }
    /**
     * Sets the tooltip text for the visual element.
     *
     * @param text - The text to be displayed in the tooltip.
     */
    setTooltip(text) {
        if (this.tooltip) {
            if (this.tooltip.tip !== text) {
                this.tooltip.tip = text;
            }
        }
    }
    configureVisual() {
        if (this._visual) {
            this.visualEventHandlerUnsubscribes.push(this._visual.onDestroyed.add(() => {
                this._visual = null;
            }));
            this._visual.initialize();
            this._visual.size = this._size;
            this._visual.collider = this.collider;
        }
    }
    onEnabled() {
        super.onEnabled();
        if (this._initialized) {
            this.visual.enable();
        }
    }
    onDisabled() {
        super.onDisabled();
        if (this._initialized) {
            this.visual.disable();
        }
    }
    destroyVisual() {
        if (this._visual) {
            this._visual.destroy();
        }
        this.visualEventHandlerUnsubscribes.forEach((unsubscribe) => unsubscribe());
        this.visualEventHandlerUnsubscribes = [];
    }
    release() {
        this._visual?.destroy();
        super.release();
    }
    setState(stateName) {
        this._visual?.setState(stateName);
        super.setState(stateName);
    }
    onHoverEnterHandler(stateEvent) {
        this.setTooltipState(true);
        super.onHoverEnterHandler(stateEvent);
    }
    onHoverExitHandler(stateEvent) {
        this.setTooltipState(false);
        super.onHoverExitHandler(stateEvent);
    }
    updateCollider() {
        if (this._colliderFitElement) {
            const delta = this.deltaPosition.div(this.deltaScale);
            this.colliderShape.size = this._size.add(delta);
            this.collider.shape = this.colliderShape;
            this.colliderTransform.setLocalPosition(delta.uniformScale(-1 / 2));
        }
    }
    setTooltipState(isOn) {
        if (this.tooltip) {
            if (isOn) {
                this.tooltipCancelToken = (0, FunctionTimingUtils_1.setTimeout)(() => {
                    if (this.tooltipCancelToken && !this.tooltipCancelToken.cancelled) {
                        this.tooltip.setOn(true);
                    }
                }, TOOLTIP_ACTIVATION_DELAY);
            }
            else {
                (0, FunctionTimingUtils_1.clearTimeout)(this.tooltipCancelToken);
                this.tooltip.setOn(false);
            }
            const unsubscribe = this.tooltip.onDestroy.add(() => {
                (0, FunctionTimingUtils_1.clearTimeout)(this.tooltipCancelToken);
                this.tooltipCancelToken = null;
                this.tooltip = null;
                unsubscribe();
            });
        }
    }
}
exports.VisualElement = VisualElement;
//# sourceMappingURL=VisualElement.js.map