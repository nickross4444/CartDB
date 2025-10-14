"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondaryGradients = void 0;
const Colors_1 = require("../Colors");
exports.SecondaryGradients = {
    defaultBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkWarmGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkWarmGray
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
            color: Colors_1.DarkerGray
        }
    },
    hoverBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.MediumWarmGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.MediumWarmGray
        }
    },
    hoverBorder: {
        type: "Linear",
        start: new vec2(-1, 0.8),
        end: new vec2(1, -0.8),
        stop0: {
            percent: 0,
            color: Colors_1.MediumGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkGray
        }
    },
    triggeredBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.MediumWarmGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.MediumWarmGray
        }
    },
    triggeredBorder: {
        type: "Linear",
        start: new vec2(-1, 0.8),
        end: new vec2(1, -0.8),
        stop0: {
            percent: 0,
            color: Colors_1.MediumGray
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkGray
        }
    }
};
//# sourceMappingURL=SecondaryGradients.js.map