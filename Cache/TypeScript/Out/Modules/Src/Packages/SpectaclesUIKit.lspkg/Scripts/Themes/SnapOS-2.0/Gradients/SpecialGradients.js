"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialGradients = void 0;
const Colors_1 = require("../Colors");
exports.SpecialGradients = {
    defaultBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkRed
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkRed
        }
    },
    defaultBorder: {
        type: "Linear",
        start: new vec2(-0.8, 1),
        end: new vec2(0.8, -1),
        stop0: {
            percent: 0,
            color: Colors_1.MediumDarkRed
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkestRed
        }
    },
    hoverBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.DarkWarmRed
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkWarmRed
        }
    },
    hoverBorder: {
        type: "Linear",
        start: new vec2(-0.8, 1),
        end: new vec2(0.8, -1),
        stop0: {
            percent: 0,
            color: Colors_1.MediumLightRed
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkRed
        }
    },
    triggeredBackground: {
        type: "Linear",
        start: new vec2(-2, 1),
        end: new vec2(2, -1),
        stop0: {
            percent: 0,
            color: Colors_1.MediumRed
        },
        stop1: {
            percent: 1,
            color: Colors_1.MediumRed
        }
    },
    triggeredBorder: {
        type: "Linear",
        start: new vec2(-0.8, 1),
        end: new vec2(0.8, -1),
        stop0: {
            percent: 0,
            color: Colors_1.LightRed
        },
        stop1: {
            percent: 1,
            color: Colors_1.DarkWarmRed
        }
    }
};
//# sourceMappingURL=SpecialGradients.js.map