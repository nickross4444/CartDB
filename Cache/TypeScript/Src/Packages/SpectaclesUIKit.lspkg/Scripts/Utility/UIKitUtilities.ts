import {Element} from "../Components/Element"
import {GradientParameters} from "../Visuals/RoundedRectangle/RoundedRectangle"

/**
 * Retrieves the first `Element` instance found among the `ScriptComponent`s attached to the given `SceneObject`.
 *
 * @param root - The root `SceneObject` to search for an `Element` component.
 * @returns The first `Element` found, or `null` if none is present.
 */
export function getElement(root: SceneObject): Element | null {
  const components = root.getComponents("ScriptComponent")
  for (let i = 0; i < components.length; i++) {
    const component = components[i]
    if (component instanceof Element) {
      return component
    }
  }
  return null
}

/**
 * Creates a deep clone of a given `GradientParameters` object.
 *
 * This function copies all defined properties from the input gradient,
 * including shallow copies of the `stop0` through `stop4` properties (if present),
 * ensuring that the returned object is a new instance with the same values.
 *
 * @param gradient - The `GradientParameters` object to clone.
 * @returns A new `GradientParameters` object with the same properties as the input.
 */
export function gradientParameterClone(gradient: GradientParameters): GradientParameters {
  const newGradient: GradientParameters = {}
  if (gradient.type !== undefined) newGradient.type = gradient.type
  if (gradient.start !== undefined) newGradient.start = gradient.start
  if (gradient.end !== undefined) newGradient.end = gradient.end
  if (gradient.enabled !== undefined) newGradient.enabled = gradient.enabled
  if (gradient.stop0 !== undefined) newGradient.stop0 = {...gradient.stop0}
  if (gradient.stop1 !== undefined) newGradient.stop1 = {...gradient.stop1}
  if (gradient.stop2 !== undefined) newGradient.stop2 = {...gradient.stop2}
  if (gradient.stop3 !== undefined) newGradient.stop3 = {...gradient.stop3}
  if (gradient.stop4 !== undefined) newGradient.stop4 = {...gradient.stop4}

  return newGradient
}

/**
 * Converts an HSV color to RGB.
 * This function takes a color in HSV format (Hue, Saturation, Value)
 * and converts it to RGB format (Red, Green, Blue).
 * The function can accept either a vec4 representing the HSV color or a number representing the hue.
 * @param colHSV - A vec4 representing the HSV color (hue, saturation, value, alpha) or a number representing the hue.
 * If a number is provided, saturation, value, and alpha must also be provided.
 * @param saturation - The saturation component (0 to 1).
 * @param value - The value (brightness) component (0 to 1).
 * @param alpha - The alpha (opacity) component (0 to 1).
 * @returns A vec4 representing the RGB color (red, green, blue, alpha).
 */
export function HSVtoRGB(colHSV: vec4 | number, saturation?: number, value?: number, alpha?: number): vec4 {
  let h, s, v
  if (typeof colHSV === "object") {
    h = colHSV.x
    s = colHSV.y
    v = colHSV.z
  } else {
    if (saturation === undefined || value === undefined || alpha === undefined) {
      throw new Error("If colHSV is a number, saturation, value, and alpha must be provided.")
    }
    h = colHSV
    s = saturation
    v = value
  }
  h = h / 360
  let r: number, g: number, b: number

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
    default:
      throw new Error("Invalid input value for HSVtoRGB function.")
  }

  if (typeof colHSV === "object") {
    return new vec4(r, g, b, colHSV.a)
  } else {
    return new vec4(r, g, b, alpha)
  }
}

/**
 * Performs a deep equality check between two values of the same type.
 * Handles primitives, objects, arrays, vec2, vec3, vec4, and other complex types.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns `true` if the values are deeply equal, `false` otherwise.
 */
export function isEqual<T>(a: T, b: T): boolean {
  // Handle strict equality (primitives, same reference)
  if (a === b) {
    return true
  }

  // Handle null/undefined cases
  if (a == null || b == null) {
    return a === b
  }

  // Handle different types
  if (typeof a !== typeof b) {
    return false
  }

  // Handle vec2, vec3, vec4 types (Lens Studio specific)
  if (isVectorType(a) && isVectorType(b)) {
    return compareVectors(a as any, b as any)
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false
      }
    }
    return true
  }

  // Handle objects
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as any)
    const keysB = Object.keys(b as any)

    if (keysA.length !== keysB.length) {
      return false
    }

    for (const key of keysA) {
      if (!keysB.includes(key)) {
        return false
      }
      if (!isEqual((a as any)[key], (b as any)[key])) {
        return false
      }
    }
    return true
  }

  return false
}

/**
 * Helper function to check if a value is a Lens Studio vector type (vec2, vec3, vec4).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a vector type, `false` otherwise.
 */
function isVectorType(value: any): boolean {
  return value instanceof vec2 || value instanceof vec3 || value instanceof vec4
}

/**
 * Helper function to compare vector types (vec2, vec3, vec4).
 *
 * @param a - First vector.
 * @param b - Second vector.
 * @returns `true` if vectors are equal, `false` otherwise.
 */
function compareVectors(a: any, b: any): boolean {
  // Check x, y components (present in vec2, vec3, vec4)
  if (a.x !== b.x || a.y !== b.y) {
    return false
  }

  // Check z component (present in vec3, vec4)
  if ((a.z !== undefined || b.z !== undefined) && a.z !== b.z) {
    return false
  }

  // Check w component (present in vec4)
  if ((a.w !== undefined || b.w !== undefined) && a.w !== b.w) {
    return false
  }

  // Check a component (alpha in vec4 colors)
  if ((a.a !== undefined || b.a !== undefined) && a.a !== b.a) {
    return false
  }

  return true
}

/**
 * Shallow equality check for better performance when deep equality is not needed.
 * Only compares the first level of properties.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns `true` if the values are shallowly equal, `false` otherwise.
 */
export function isShallowEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true
  }

  if (a == null || b == null) {
    return a === b
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (typeof a === "object") {
    const keysA = Object.keys(a as any)
    const keysB = Object.keys(b as any)

    if (keysA.length !== keysB.length) {
      return false
    }

    for (const key of keysA) {
      if (!keysB.includes(key) || (a as any)[key] !== (b as any)[key]) {
        return false
      }
    }
    return true
  }

  return false
}
