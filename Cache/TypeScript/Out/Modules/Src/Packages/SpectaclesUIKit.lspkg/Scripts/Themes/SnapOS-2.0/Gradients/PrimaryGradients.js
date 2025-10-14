"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryGradients = void 0;
const Colors_1 = require("../Colors");
exports.PrimaryGradients = {
    defaultBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkestYellow
        },
        stop1: {
            percent: 0.5,
            color: Colors_1.DarkYellow
        },
        stop2: {
            percent: 1,
            color: Colors_1.DarkMediumYellow
        }
    },
    defaultBorder: {
        type: "Linear",
        start: new vec2(-1, 0.8),
        end: new vec2(1, -0.8),
        stop0: {
            percent: 0,
            color: Colors_1.MediumYellow
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkerYellow
        }
    },
    hoverBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkerYellow
        },
        stop1: {
            percent: 1,
            color: Colors_1.MediumYellow
        }
    },
    triggeredBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkYellow
        },
        stop1: {
            percent: 0.5,
            color: Colors_1.BrightWarmYellow
        },
        stop2: {
            percent: 1,
            color: Colors_1.BrightYellow
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
            color: Colors_1.DarkYellow
        },
        stop2: {
            percent: 1,
            color: Colors_1.TriggeredBorderYellowDim
        }
    }
};
//# sourceMappingURL=PrimaryGradients.js.map