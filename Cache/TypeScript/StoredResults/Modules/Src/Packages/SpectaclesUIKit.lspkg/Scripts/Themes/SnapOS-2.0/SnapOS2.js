"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapOS2 = exports.SnapOS2Styles = void 0;
const CapsuleButtonParameters_1 = require("./Styles/CapsuleButtonParameters");
const RectangleButtonParameters_1 = require("./Styles/RectangleButtonParameters");
const RoundButtonParameters_1 = require("./Styles/RoundButtonParameters");
var SnapOS2Styles;
(function (SnapOS2Styles) {
    SnapOS2Styles["PrimaryNeutral"] = "PrimaryNeutral";
    SnapOS2Styles["Primary"] = "Primary";
    SnapOS2Styles["Secondary"] = "Secondary";
    SnapOS2Styles["Special"] = "Special";
    SnapOS2Styles["Ghost"] = "Ghost";
    SnapOS2Styles["Custom"] = "Custom";
})(SnapOS2Styles || (exports.SnapOS2Styles = SnapOS2Styles = {}));
exports.SnapOS2 = {
    get name() {
        return "SnapOS2";
    },
    get styles() {
        return {
            RoundButton: RoundButtonParameters_1.RoundButtonParameters,
            RectangleButton: RectangleButtonParameters_1.RectangleButtonParameters,
            CapsuleButton: CapsuleButtonParameters_1.CapsuleButtonParameters
        };
    }
};
//# sourceMappingURL=SnapOS2.js.map