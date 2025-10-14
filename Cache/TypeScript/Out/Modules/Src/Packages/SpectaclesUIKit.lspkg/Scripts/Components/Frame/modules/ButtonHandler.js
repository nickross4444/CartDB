"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("SpectaclesInteractionKit.lspkg/Utils/color");
const RoundButton_1 = require("../../Button/RoundButton");
const FrameButton_1 = require("./FrameButton");
const closeIcon = requireAsset("../../../../Textures/close-icon-1.png");
const followIcon = requireAsset("../../../../Textures/follow-white.png");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unfollowIcon = requireAsset("../../../../Textures/follow-black.png");
const imageButtonPrefab = requireAsset("../../../../Prefabs/FrameButton.prefab");
const ButtonManagerConstants = {
    Large: {
        buttonSize: 3.25,
        offset: 0.75,
        iconScale: new vec3(1.75, 1.75, 1)
    },
    Small: {
        buttonSize: 2.25,
        offset: 0.375,
        iconScale: new vec3(1.15, 1.15, 1)
    }
};
/**
 * TODO Add methods for setting the button icons dynamically
 * TODO ADD methods for swapping the buttons out
 */
/**
 * ButtonHandler is a utility class that manages the close and follow buttons
 */
class ButtonHandler {
    set closeButtonOffset(value) {
        if (value === undefined) {
            return;
        }
        this._closeButtonOffset = value;
        this.resize();
    }
    get closeButtonOffset() {
        return this._closeButtonOffset;
    }
    set followButtonOffset(value) {
        if (value === undefined) {
            return;
        }
        this._followButtonOffset = value;
        this.resize();
    }
    get followButtonOffset() {
        return this._followButtonOffset;
    }
    constructor(options) {
        this.options = options;
        this._closeButtonOffset = vec3.zero();
        this._followButtonOffset = vec3.zero();
        this.frame = this.options.frame;
        this.inputState = this.options.state;
    }
    /**
     *
     * @param enable - Whether to enable or disable the close button.
     */
    enableCloseButton(enable) {
        if (enable && !this.closeButton) {
            this.createButton({
                button: this.closeButton,
                type: "close",
                imageTexture: closeIcon
            });
        }
        if (this.closeButton)
            this.closeButton.sceneObject.enabled = enable;
    }
    /**
     *
     * @param enable - Whether to enable or disable the follow button.
     */
    enableFollowButton(enable) {
        if (enable && !this.followButton) {
            this.createButton({
                button: this.followButton,
                type: "follow",
                imageTexture: followIcon,
                isToggle: true
            });
        }
        if (this.followButton)
            this.followButton.sceneObject.enabled = enable;
    }
    createButton(config) {
        const buttonObject = imageButtonPrefab.instantiate(this.frame.frameObject);
        buttonObject.layer = this.frame.frameObject.layer;
        this[config.type + "Button"] = buttonObject.getComponent(RoundButton_1.RoundButton.getTypeName());
        const thisButton = this[config.type + "Button"];
        thisButton.onTriggerUp.add(() => {
            this.inputState.pinching = false;
        });
        if (config.isToggle)
            thisButton.setIsToggleable(true);
        thisButton.initialize();
        thisButton.width = ButtonManagerConstants[this.frame.appearance].buttonSize;
        const frameButton = buttonObject.getComponent(FrameButton_1.FrameButton.getTypeName());
        frameButton.initialize(config.imageTexture);
        frameButton.image.getTransform().setLocalScale(ButtonManagerConstants[this.frame.appearance].iconScale);
        this[config.type + "Icon"] = frameButton.image;
        this.resize();
    }
    /**
     * Resizes the buttons based on the frame size and offsets.
     */
    resize() {
        if (this.closeButton) {
            const width = ButtonManagerConstants[this.frame.appearance].buttonSize;
            const offset = ButtonManagerConstants[this.frame.appearance].offset;
            this.closeButton.width = width;
            this.closeButton.transform.setLocalPosition(new vec3(this.frame.totalSize.x * -0.5 + width * 0.5 + offset, this.frame.totalSize.y * 0.5 - width * 0.5 - offset, 0.1).add(this._closeButtonOffset));
        }
        if (this.followButton) {
            const width = ButtonManagerConstants[this.frame.appearance].buttonSize;
            const offset = ButtonManagerConstants[this.frame.appearance].offset;
            this.followButton.width = width;
            this.followButton.transform.setLocalPosition(new vec3(this.frame.totalSize.x * 0.5 - width * 0.5 - offset, this.frame.totalSize.y * 0.5 - width * 0.5 - offset, 0.1).add(this._followButtonOffset));
        }
    }
    set opacity(alpha) {
        if (alpha === undefined) {
            return;
        }
        if (this.closeButton) {
            this.closeButton.visual.renderMeshVisual.mainPass.opacityFactor = alpha;
            this.closeIcon.mainPass.baseColor = (0, color_1.withAlpha)(this.closeIcon.mainPass.baseColor, alpha);
        }
        if (this.followButton) {
            this.followButton.visual.renderMeshVisual.mainPass.opacityFactor = alpha;
            this.followIcon.mainPass.baseColor = (0, color_1.withAlpha)(this.followIcon.mainPass.baseColor, alpha);
        }
    }
    set renderOrder(renderOrder) {
        if (renderOrder === undefined) {
            return;
        }
        if (this.closeButton) {
            this.closeButton.renderOrder = renderOrder;
            this.closeIcon.renderOrder = renderOrder + 1;
        }
        if (this.followButton) {
            this.followButton.renderOrder = renderOrder;
            this.followIcon.renderOrder = renderOrder + 1;
        }
    }
}
exports.default = ButtonHandler;
//# sourceMappingURL=ButtonHandler.js.map