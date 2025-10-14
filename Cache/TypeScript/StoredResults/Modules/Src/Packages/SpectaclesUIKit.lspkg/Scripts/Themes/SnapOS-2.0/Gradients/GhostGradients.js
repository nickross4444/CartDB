"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostGradients = void 0;
const Colors_1 = require("../Colors");
exports.GhostGradients = {
    defaultBackground: {
        type: "Linear",
        start: new vec2(-0.6, 1),
        end: new vec2(0.6, -1),
        stop0: {
            percent: 0,
            color: Colors_1.Transparent
        },
        stop1: {
            percent: 1,
            color: Colors_1.Transparent
        }
    },
    defaultBorder: {
        type: "Linear",
        start: new vec2(-0.8, 1),
        end: new vec2(0.8, -1),
        stop0: {
            percent: 0,
            color: Colors_1.Transparent
        },
        stop1: {
            percent: 1,
            color: Colors_1.Transparent
        }
    },
    hoverBackground: {
        type: "Linear",
        start: new vec2(-0.6, 1),
        end: new vec2(0.6, -1),
        stop0: {
            percent: 0,
            color: Colors_1.Transparent
        },
        stop1: {
            percent: 1,
            color: Colors_1.Transparent
        }
    },
    hoverBorder: {
        type: "Linear",
        start: new vec2(-0.8, 1),
        end: new vec2(0.8, -1),
        stop0: {
            percent: 0,
            color: Colors_1.MediumGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.MediumGray
        }
    },
    triggeredBackground: {
        type: "Linear",
        start: new vec2(-0.6, 1),
        end: new vec2(0.6, -1),
        stop0: {
            percent: 0,
            color: Colors_1.Transparent
        },
        stop1: {
            percent: 1,
            color: Colors_1.Transparent
        }
    },
    triggeredBorder: {
        type: "Linear",
        start: new vec2(-0.8, 1),
        end: new vec2(0.8, -1),
        stop0: {
            percent: 0,
            color: Colors_1.BrightYellow
        },
        stop1: {
            percent: 1,
            color: Colors_1.BrightYellow
        }
    }
};
//# sourceMappingURL=GhostGradients.js.map