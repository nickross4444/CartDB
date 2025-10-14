"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleButtonParameters = void 0;
const GhostGradients_1 = require("../Gradients/GhostGradients");
const PrimaryGradients_1 = require("../Gradients/PrimaryGradients");
const PrimaryNeutralGradients_1 = require("../Gradients/PrimaryNeutralGradients");
const SecondaryGradients_1 = require("../Gradients/SecondaryGradients");
const SpecialGradients_1 = require("../Gradients/SpecialGradients");
exports.RectangleButtonParameters = {
    PrimaryNeutral: {
        default: {
            isBaseGradient: true,
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.defaultBackground,
            borderSize: 0.125,
            borderType: "Gradient",
            hasBorder: true,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.defaultBorder,
            shouldScale: false,
            shouldPosition: true,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        hover: {
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.hoverBackground,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        triggered: {
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBackground,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        toggledDefault: {
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBackground,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        toggledHover: {
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBackground,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        toggledTriggered: {
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBackground,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        inactive: {
            baseGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.darkGrayBackground,
            borderGradient: PrimaryNeutralGradients_1.PrimaryNeutralGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        }
    },
    Primary: {
        default: {
            isBaseGradient: true,
            baseGradient: PrimaryGradients_1.PrimaryGradients.defaultBackground,
            borderSize: 0.1,
            hasBorder: true,
            borderType: "Gradient",
            borderGradient: PrimaryGradients_1.PrimaryGradients.defaultBorder,
            shouldScale: false,
            shouldPosition: true,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        hover: {
            baseGradient: PrimaryGradients_1.PrimaryGradients.hoverBackground,
            borderGradient: PrimaryGradients_1.PrimaryGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        triggered: {
            baseGradient: PrimaryGradients_1.PrimaryGradients.triggeredBackground,
            borderGradient: PrimaryGradients_1.PrimaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        toggledDefault: {
            baseGradient: PrimaryGradients_1.PrimaryGradients.triggeredBackground,
            borderGradient: PrimaryGradients_1.PrimaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        toggledHover: {
            baseGradient: PrimaryGradients_1.PrimaryGradients.triggeredBackground,
            borderGradient: PrimaryGradients_1.PrimaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        toggledTriggered: {
            baseGradient: PrimaryGradients_1.PrimaryGradients.triggeredBackground,
            borderGradient: PrimaryGradients_1.PrimaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        inactive: {
            baseGradient: PrimaryGradients_1.PrimaryGradients.darkGrayBackground,
            borderGradient: PrimaryGradients_1.PrimaryGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        }
    },
    Secondary: {
        default: {
            isBaseGradient: true,
            baseGradient: SecondaryGradients_1.SecondaryGradients.defaultBackground,
            borderSize: 0.1,
            hasBorder: true,
            borderType: "Gradient",
            borderGradient: SecondaryGradients_1.SecondaryGradients.defaultBorder,
            shouldScale: false,
            shouldPosition: true,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        hover: {
            baseGradient: SecondaryGradients_1.SecondaryGradients.hoverBackground,
            borderGradient: SecondaryGradients_1.SecondaryGradients.hoverBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        triggered: {
            baseGradient: SecondaryGradients_1.SecondaryGradients.triggeredBackground,
            borderGradient: SecondaryGradients_1.SecondaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        toggledDefault: {
            baseGradient: SecondaryGradients_1.SecondaryGradients.triggeredBackground,
            borderGradient: SecondaryGradients_1.SecondaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        toggledHover: {
            baseGradient: SecondaryGradients_1.SecondaryGradients.triggeredBackground,
            borderGradient: SecondaryGradients_1.SecondaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        toggledTriggered: {
            baseGradient: SecondaryGradients_1.SecondaryGradients.triggeredBackground,
            borderGradient: SecondaryGradients_1.SecondaryGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        inactive: {
            baseGradient: SecondaryGradients_1.SecondaryGradients.darkGrayBackground,
            borderGradient: SecondaryGradients_1.SecondaryGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        }
    },
    Special: {
        default: {
            isBaseGradient: true,
            baseGradient: SpecialGradients_1.SpecialGradients.defaultBackground,
            borderSize: 0.1,
            hasBorder: true,
            borderType: "Gradient",
            borderGradient: SpecialGradients_1.SpecialGradients.defaultBorder,
            shouldScale: false,
            shouldPosition: true,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        hover: {
            baseGradient: SpecialGradients_1.SpecialGradients.hoverBackground,
            borderGradient: SpecialGradients_1.SpecialGradients.hoverBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        triggered: {
            baseGradient: SpecialGradients_1.SpecialGradients.triggeredBackground,
            borderGradient: SpecialGradients_1.SpecialGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        toggledDefault: {
            baseGradient: SpecialGradients_1.SpecialGradients.triggeredBackground,
            borderGradient: SpecialGradients_1.SpecialGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        toggledHover: {
            baseGradient: SpecialGradients_1.SpecialGradients.triggeredBackground,
            borderGradient: SpecialGradients_1.SpecialGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        toggledTriggered: {
            baseGradient: SpecialGradients_1.SpecialGradients.triggeredBackground,
            borderGradient: SpecialGradients_1.SpecialGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        inactive: {
            baseGradient: SpecialGradients_1.SpecialGradients.darkGrayBackground,
            borderGradient: SpecialGradients_1.SpecialGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        }
    },
    Ghost: {
        default: {
            isBaseGradient: true,
            baseGradient: GhostGradients_1.GhostGradients.defaultBackground,
            hasBorder: true,
            borderSize: 0.15,
            borderType: "Gradient",
            borderGradient: GhostGradients_1.GhostGradients.defaultBorder,
            shouldScale: false,
            shouldPosition: true,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        hover: {
            baseGradient: GhostGradients_1.GhostGradients.hoverBackground,
            borderGradient: GhostGradients_1.GhostGradients.hoverBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        triggered: {
            baseGradient: GhostGradients_1.GhostGradients.triggeredBackground,
            borderGradient: GhostGradients_1.GhostGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        toggledDefault: {
            baseGradient: GhostGradients_1.GhostGradients.triggeredBackground,
            borderGradient: GhostGradients_1.GhostGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        },
        toggledHover: {
            baseGradient: GhostGradients_1.GhostGradients.triggeredBackground,
            borderGradient: GhostGradients_1.GhostGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 1)
        },
        toggledTriggered: {
            baseGradient: GhostGradients_1.GhostGradients.triggeredBackground,
            borderGradient: GhostGradients_1.GhostGradients.triggeredBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0.5)
        },
        inactive: {
            baseGradient: GhostGradients_1.GhostGradients.darkGrayBackground,
            borderGradient: GhostGradients_1.GhostGradients.defaultBorder,
            localScale: new vec3(1, 1, 1),
            localPosition: new vec3(0, 0, 0)
        }
    }
};
//# sourceMappingURL=RectangleButtonParameters.js.map