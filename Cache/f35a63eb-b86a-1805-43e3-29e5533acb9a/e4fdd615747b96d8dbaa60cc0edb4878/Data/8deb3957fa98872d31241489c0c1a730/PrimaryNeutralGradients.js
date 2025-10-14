"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryNeutralGradients = void 0;
const Colors_1 = require("../Colors");
exports.PrimaryNeutralGradients = {
    defaultBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkestGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkGray
        }
    },
    defaultBorder: {
        type: "Linear",
        start: new vec2(-1, 0.8),
        end: new vec2(1, -0.8),
        stop0: {
            percent: 0,
            color: Colors_1.MediumDarkGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkerLessGray
        }
    },
    hoverBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkestGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.MediumDarkGray
        }
    },
    triggeredBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkestGray
        },
        stop1: {
            percent: 0.5,
            color: Colors_1.DarkGray
        },
        stop2: {
            percent: 1,
            color: Colors_1.MediumGray
        }
    },
    triggeredBorder: {
        type: "Linear",
        start: new vec2(-1, 0.8),
        end: new vec2(1, -0.8),
        stop0: {
            percent: 0,
            color: Colors_1.TriggeredBorderYellow
        },
        stop1: {
            percent: 0.5,
            color: Colors_1.DarkGray
        },
        stop2: {
            percent: 1,
            color: Colors_1.TriggeredBorderYellowDim
        }
    }
};
//# sourceMappingURL=PrimaryNeutralGradients.js.map