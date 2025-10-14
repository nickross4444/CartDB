import {Style} from "../../Style"
import {GhostGradients} from "../Gradients/GhostGradients"
import {PrimaryGradients} from "../Gradients/PrimaryGradients"
import {PrimaryNeutralGradients} from "../Gradients/PrimaryNeutralGradients"
import {SecondaryGradients} from "../Gradients/SecondaryGradients"
import {SpecialGradients} from "../Gradients/SpecialGradients"
import {SnapOS2Styles} from "../SnapOS2"

export const RectangleButtonParameters: Partial<Record<SnapOS2Styles, Style>> = {
  PrimaryNeutral: {
    default: {
      isBaseGradient: true,
      baseGradient: PrimaryNeutralGradients.defaultBackground,
      borderSize: 0.125,
      borderType: "Gradient",
      hasBorder: true,
      borderGradient: PrimaryNeutralGradients.defaultBorder,
      shouldScale: false,
      shouldPosition: true,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    hover: {
      baseGradient: PrimaryNeutralGradients.hoverBackground,
      borderGradient: PrimaryNeutralGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    triggered: {
      baseGradient: PrimaryNeutralGradients.triggeredBackground,
      borderGradient: PrimaryNeutralGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    toggledDefault: {
      baseGradient: PrimaryNeutralGradients.triggeredBackground,
      borderGradient: PrimaryNeutralGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    toggledHover: {
      baseGradient: PrimaryNeutralGradients.triggeredBackground,
      borderGradient: PrimaryNeutralGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    toggledTriggered: {
      baseGradient: PrimaryNeutralGradients.triggeredBackground,
      borderGradient: PrimaryNeutralGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    inactive: {
      baseGradient: PrimaryNeutralGradients.darkGrayBackground,
      borderGradient: PrimaryNeutralGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    }
  },
  Primary: {
    default: {
      isBaseGradient: true,
      baseGradient: PrimaryGradients.defaultBackground,
      borderSize: 0.1,
      hasBorder: true,
      borderType: "Gradient",
      borderGradient: PrimaryGradients.defaultBorder,
      shouldScale: false,
      shouldPosition: true,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    hover: {
      baseGradient: PrimaryGradients.hoverBackground,
      borderGradient: PrimaryGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    triggered: {
      baseGradient: PrimaryGradients.triggeredBackground,
      borderGradient: PrimaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    toggledDefault: {
      baseGradient: PrimaryGradients.triggeredBackground,
      borderGradient: PrimaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    toggledHover: {
      baseGradient: PrimaryGradients.triggeredBackground,
      borderGradient: PrimaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    toggledTriggered: {
      baseGradient: PrimaryGradients.triggeredBackground,
      borderGradient: PrimaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    inactive: {
      baseGradient: PrimaryGradients.darkGrayBackground,
      borderGradient: PrimaryGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    }
  },
  Secondary: {
    default: {
      isBaseGradient: true,
      baseGradient: SecondaryGradients.defaultBackground,
      borderSize: 0.1,
      hasBorder: true,
      borderType: "Gradient",
      borderGradient: SecondaryGradients.defaultBorder,
      shouldScale: false,
      shouldPosition: true,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    hover: {
      baseGradient: SecondaryGradients.hoverBackground,
      borderGradient: SecondaryGradients.hoverBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    triggered: {
      baseGradient: SecondaryGradients.triggeredBackground,
      borderGradient: SecondaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    toggledDefault: {
      baseGradient: SecondaryGradients.triggeredBackground,
      borderGradient: SecondaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    toggledHover: {
      baseGradient: SecondaryGradients.triggeredBackground,
      borderGradient: SecondaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    toggledTriggered: {
      baseGradient: SecondaryGradients.triggeredBackground,
      borderGradient: SecondaryGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    inactive: {
      baseGradient: SecondaryGradients.darkGrayBackground,
      borderGradient: SecondaryGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    }
  },
  Special: {
    default: {
      isBaseGradient: true,
      baseGradient: SpecialGradients.defaultBackground,
      borderSize: 0.1,
      hasBorder: true,
      borderType: "Gradient",
      borderGradient: SpecialGradients.defaultBorder,
      shouldScale: false,
      shouldPosition: true,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    hover: {
      baseGradient: SpecialGradients.hoverBackground,
      borderGradient: SpecialGradients.hoverBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    triggered: {
      baseGradient: SpecialGradients.triggeredBackground,
      borderGradient: SpecialGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    toggledDefault: {
      baseGradient: SpecialGradients.triggeredBackground,
      borderGradient: SpecialGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    toggledHover: {
      baseGradient: SpecialGradients.triggeredBackground,
      borderGradient: SpecialGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    toggledTriggered: {
      baseGradient: SpecialGradients.triggeredBackground,
      borderGradient: SpecialGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    inactive: {
      baseGradient: SpecialGradients.darkGrayBackground,
      borderGradient: SpecialGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    }
  },
  Ghost: {
    default: {
      isBaseGradient: true,
      baseGradient: GhostGradients.defaultBackground,
      hasBorder: true,
      borderSize: 0.15,
      borderType: "Gradient",
      borderGradient: GhostGradients.defaultBorder,
      shouldScale: false,
      shouldPosition: true,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    hover: {
      baseGradient: GhostGradients.hoverBackground,
      borderGradient: GhostGradients.hoverBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    triggered: {
      baseGradient: GhostGradients.triggeredBackground,
      borderGradient: GhostGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    toggledDefault: {
      baseGradient: GhostGradients.triggeredBackground,
      borderGradient: GhostGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    },
    toggledHover: {
      baseGradient: GhostGradients.triggeredBackground,
      borderGradient: GhostGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 1)
    },
    toggledTriggered: {
      baseGradient: GhostGradients.triggeredBackground,
      borderGradient: GhostGradients.triggeredBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0.5)
    },
    inactive: {
      baseGradient: GhostGradients.darkGrayBackground,
      borderGradient: GhostGradients.defaultBorder,
      localScale: new vec3(1, 1, 1),
      localPosition: new vec3(0, 0, 0)
    }
  }
}
