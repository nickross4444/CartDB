"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InteractorCursor_1 = require("SpectaclesInteractionKit.lspkg/Components/Interaction/InteractorCursor/InteractorCursor");
const EPSILON_VEC3 = new vec3(0.000001, 0.000001, 0.000001);
const ZERO = new vec3(0, 0, 0);
class CursorHandler {
    constructor(options) {
        this.options = options;
        /**
         *
         * Manages custom cursor states
         * used for indicating contextual functionality
         * swaps textures
         * animates effects
         *
         */
        /**
         * mode is used to select the current active texture
         * updated in Frame update loop to match the FrameInputController state
         */
        this.mode = InteractorCursor_1.CursorMode.Auto;
        this.lastMode = this.mode;
        this.frame = this.options.frame;
        this.lockMode = false;
        this.lockPosition = vec3.zero();
        this.lockSize = vec3.zero();
        this.interactorCursor = null;
        /**
         * update
         * @param inputState
         * @param frameState
         *
         * method called in main loop
         * watches for changed CursorModes to swap textures
         * updates position and triggers animations
         */
        this.update = (inputState, frameState) => {
            if (!this.interactorCursor) {
                return;
            }
            if (this.lockMode) {
                const tempWorld = this.frame.transform?.getWorldTransform();
                if (this.lockSize.equal(ZERO))
                    this.lockSize = EPSILON_VEC3;
                const lockedPosition = tempWorld.multiplyPoint(this.lockPosition.div(this.lockSize).mult(new vec3(this.frame.totalSize.x, this.frame.totalSize.y, 1)));
                this.interactorCursor.cursorPosition = lockedPosition;
            }
            else {
                // use default position, without override
                this.interactorCursor.cursorPosition = null;
            }
            // handle switching cursors
            if (this.mode !== this.lastMode && !this.lockMode) {
                this.interactorCursor.cursorMode = this.mode;
                this.lastMode = this.mode;
            }
            if (frameState.scaling && !this.lockMode) {
                this.lockMode = true;
                this.lockPosition = inputState.position;
                this.lockSize = new vec3(this.frame.totalSize.x, this.frame.totalSize.y, 1);
            }
            if (!frameState.scaling && this.lockMode) {
                this.lockMode = false;
                this.resetCursor();
            }
        };
        this.interactorCursor = options.interactorCursor ?? null;
    }
    /**
     * sets current position of cursor
     * ignored if cursor is in lockMode
     */
    set position(pos) {
        if (pos === undefined) {
            return;
        }
        if (!this.lockMode && this.interactorCursor) {
            this.interactorCursor.cursorPosition = pos;
        }
    }
    /**
     * Sets the InteractorCursor for the handler to control.
     * @param cursor
     */
    setCursor(cursor) {
        if (cursor === undefined) {
            return;
        }
        if (this.interactorCursor !== cursor && this.interactorCursor) {
            this.resetCursor();
        }
        this.interactorCursor = cursor;
    }
    /**
     * Reset the position override & mode of the interactor cursor.
     */
    resetCursor() {
        if (this.interactorCursor) {
            this.interactorCursor.cursorMode = InteractorCursor_1.CursorMode.Auto;
            this.interactorCursor.cursorPosition = null;
        }
        this.lastMode = InteractorCursor_1.CursorMode.Auto;
        this.mode = InteractorCursor_1.CursorMode.Auto;
    }
}
exports.default = CursorHandler;
//# sourceMappingURL=CursorHandler.js.map