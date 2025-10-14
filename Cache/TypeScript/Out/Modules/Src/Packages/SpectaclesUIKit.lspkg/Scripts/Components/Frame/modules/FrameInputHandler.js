"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modes = void 0;
const InteractorCursor_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/InteractorCursor/InteractorCursor");
const Event_1 = require("SpectaclesInteractionKit.lspkg/Utils/Event");
/**
 *
 * Container Frame Input Modes
 * Auto ( no explicit mode )
 * Scaling ( with corners defined )
 * Rotating
 * Translating
 *
 */
var Modes;
(function (Modes) {
    Modes["Auto"] = "auto";
    Modes["ScaleTopLeft"] = "scaleTopLeft";
    Modes["ScaleBottomRight"] = "scaleBottomRight";
    Modes["ScaleTopRight"] = "scaleTopRight";
    Modes["ScaleBottomLeft"] = "scaleBottomLeft";
    Modes["Translating"] = "translating";
})(Modes || (exports.Modes = Modes = {}));
class FrameInputHandler {
    /**
     * Returns true if the frame was scaling last frame
     */
    get scalingLastFrame() {
        return this._scalingLastFrame;
    }
    constructor(options) {
        this.options = options;
        /**
         *
         * This class takes the inputs from the raycaster
         * and uses it to control the frame manipulations
         * as well as provide that information to visual affordance
         *
         */
        this.allowScaling = this.options.allowScaling;
        this.allowScalingTopLeft = this.options.allowScalingTopLeft ?? true;
        this.allowScalingTopRight = this.options.allowScalingTopRight ?? true;
        this.corner = vec2.one();
        this.frame = this.options.frame;
        this.manipulate = this.options.manipulate;
        this.lastHovered = false;
        this.cursorHandler = this.options.cursorHandler;
        this.mode = Modes.Auto;
        this.state = {
            rotating: false,
            scaling: false,
            translating: false,
            ignoring: false,
            hoveringInteractable: false,
            interacting: false
        };
        this.onTranslationStartEvent = new Event_1.default();
        /**
         * Callback for when translation begins
         *
         * NOTE: The reason we need to add this event in FrameInputHandler, instead of relying on the container frame's
         * internal InteractableManipulation component is because the way this class keeps track of state means that
         * we don't set the InteractableManipulation's canTranslate property until after the user has started translating,
         * which has the effect of causing InteractableManipulation to NOT invoke the onTranslationStart event.
         */
        this.onTranslationStart = this.onTranslationStartEvent.publicApi();
        this.onTranslationEndEvent = new Event_1.default();
        /**
         * Callback for when translation ends
         */
        this.onTranslationEnd = this.onTranslationEndEvent.publicApi();
        this._scalingLastFrame = false;
        this.isInZone = false;
        this.isInZoneLast = false;
        this.update = (inputState) => {
            this.state.hoveringInteractable = false;
            this.isInZoneLast = this.isInZone;
            if (!inputState.pinching)
                this.getMode(inputState);
            this.handleState(inputState);
            if ((this.frame.allowTranslation && this.state.translating) || this.frame.forceTranslate) {
                this.manipulate.setCanTranslate(true);
            }
            else if (this.manipulate.canTranslate()) {
                this.manipulate.setCanTranslate(false);
            }
            //
            // handle cursor swaps
            if (!this.state.scaling || !this.state.translating) {
                if (!this.state.interacting) {
                    if (this.mode === Modes.ScaleBottomLeft || this.mode === Modes.ScaleTopRight) {
                        this.cursorHandler.mode = InteractorCursor_1.CursorMode.ScaleTopRight;
                    }
                    else if (this.mode === Modes.ScaleBottomRight || this.mode === Modes.ScaleTopLeft) {
                        this.cursorHandler.mode = InteractorCursor_1.CursorMode.ScaleTopLeft;
                    }
                    else if (this.mode === Modes.Translating && (this.frame.allowTranslation || this.frame.forceTranslate)) {
                        this.cursorHandler.mode = InteractorCursor_1.CursorMode.Translate;
                    }
                    else {
                        this.cursorHandler.mode = InteractorCursor_1.CursorMode.Auto;
                    }
                }
                if (this.lastHovered === false && inputState.hovered) {
                    inputState.hovered = false;
                }
                if (this.lastHovered === true && !inputState.hovered) {
                    inputState.hovered = true;
                }
                this.lastHovered = false;
            }
        };
        /*eslint-disable @typescript-eslint/no-unused-vars */
        this.startScaling = (touchPosition) => {
            this.state.scaling = true;
            this.frame.scalingSizeStart = this.frame.innerSize.uniformScale(1);
            this.options.onScalingStartEvent.invoke();
        };
    }
    /*
     * Helper for programmatic components
     */
    get isInteractable() {
        return this.options.isInteractable;
    }
    set isInteractable(isInteractable) {
        if (isInteractable === undefined) {
            return;
        }
        this.options.isInteractable = isInteractable;
    }
    getMode(inputState) {
        const position = inputState.position;
        const xEdge = (this.frame.innerSize.x + this.frame.padding.x) * 0.5;
        const yEdge = (this.frame.innerSize.y + this.frame.padding.y) * 0.5;
        this.isInZone = this.frame.grabZones.length ? false : true;
        if (this.frame.grabZones.length && this.frame.grabZoneOnly) {
            for (let i = 0; i < this.frame.grabZones.length; i++) {
                const thisZone = this.frame.grabZones[i];
                if (position.x >= thisZone.x &&
                    position.y >= thisZone.y &&
                    position.x <= thisZone.z &&
                    position.y <= thisZone.w) {
                    this.isInZone = true;
                }
            }
        }
        else {
            this.isInZone = true;
        }
        if (inputState.innerInteractableActive || !inputState.hierarchyHovered || !this.isInZone) {
            this.mode = Modes.Auto;
        }
        else if (position.x < -xEdge && position.y < -yEdge && this.allowScaling) {
            this.mode = Modes.ScaleBottomLeft;
        }
        else if (position.x < -xEdge && position.y > yEdge && this.allowScaling) {
            if (this.allowScalingTopLeft) {
                this.mode = Modes.ScaleTopLeft;
            }
            else {
                this.state.ignoring = true;
                this.mode = Modes.Auto;
            }
        }
        else if (position.x > xEdge && position.y < -yEdge && this.allowScaling) {
            this.mode = Modes.ScaleBottomRight;
        }
        else if (position.x > xEdge && position.y > yEdge && this.allowScaling) {
            if (this.allowScalingTopRight) {
                this.mode = Modes.ScaleTopRight;
            }
            else {
                this.state.ignoring = true;
                this.mode = Modes.Auto;
            }
        }
        else if (position.x > xEdge) {
            // right edge
            this.mode = Modes.Translating;
        }
        else if (position.x < -xEdge) {
            // left edge
            this.mode = Modes.Translating;
        }
        else if (position.y < -yEdge) {
            // bottom edge
            this.mode = Modes.Translating;
        }
        else if (position.y > yEdge) {
            // top edge
            this.mode = Modes.Translating;
        }
        else {
            // not in corner or on edge
            if (this.isInteractable === false) {
                this.mode = Modes.Translating;
            }
            else if (!this.state.ignoring && !this.state.scaling && !this.state.translating) {
                // hovering interactable
                this.mode = Modes.Auto;
            }
        }
    }
    handleState(inputState) {
        this._scalingLastFrame = this.state.scaling;
        const position = inputState.position;
        if (inputState.pinching) {
            if (this.isInZone &&
                !this.state.ignoring &&
                !this.state.scaling &&
                !this.state.translating &&
                !this.state.rotating &&
                !this.state.interacting) {
                // if pinching and not already in am ode
                switch (this.mode) {
                    case Modes.ScaleBottomLeft:
                        this.corner.x = -1;
                        this.corner.y = -1;
                        this.startScaling(position);
                        break;
                    case Modes.ScaleTopLeft:
                        this.corner.x = -1;
                        this.corner.y = 1;
                        this.startScaling(position);
                        break;
                    case Modes.ScaleBottomRight:
                        this.corner.x = 1;
                        this.corner.y = -1;
                        this.startScaling(position);
                        break;
                    case Modes.ScaleTopRight:
                        this.corner.x = 1;
                        this.corner.y = 1;
                        this.startScaling(position);
                        break;
                    case Modes.Translating:
                        this.setStateTranslating(true);
                        break;
                    default:
                        // touching but not in corner or on edge
                        if (this.isInteractable === false) {
                            // content is not interactable, activating translation
                            this.setStateTranslating(true);
                        }
                        else {
                            // content is interactable
                            this.state.interacting = true;
                        }
                        break;
                }
            }
        }
        else {
            if (this.state.scaling) {
                // end scaling
                this.options.onScalingEndEvent.invoke();
            }
            this.setStateTranslating(false);
            this.state.scaling = false;
            this.state.rotating = false;
            this.state.ignoring = false;
            this.state.interacting = false;
        }
        if (this.frame.forceTranslate) {
            this.mode = Modes.Translating;
            this.setStateTranslating(true);
        }
    }
    setStateTranslating(isTranslating) {
        if (isTranslating === this.state.translating) {
            return;
        }
        this.state.translating = isTranslating;
        if (this.state.translating) {
            this.onTranslationStartEvent.invoke();
        }
        else {
            this.onTranslationEndEvent.invoke();
        }
    }
}
exports.default = FrameInputHandler;
//# sourceMappingURL=FrameInputHandler.js.map