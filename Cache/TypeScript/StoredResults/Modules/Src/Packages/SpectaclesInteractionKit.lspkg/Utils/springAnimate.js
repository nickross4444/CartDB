"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpringAnimate1D = exports.SpringAnimate = void 0;
exports.step1DInstantDrop = step1DInstantDrop;
exports.step1DSnapWhenZero = step1DSnapWhenZero;
const FIXED_DELTA_TIME = 1.0 / 120.0;
const MAX_ACCUMULATION_TIME = 0.2;
const BOUNCE_SMOOTH = 0;
const BOUNCE_SNAPPY = 0.15;
const BOUNCE_BOUNCY = 0.3;
const DEFAULT_DURATION = 0.3;
const DEFAULT_DURATION_BOUNCY = 0.5;
/**
 * A 3D spring simulation class for smooth, physically-based animations of vectors.
 */
class SpringAnimate {
    /** Gets the spring constant (stiffness). */
    get k() {
        return this.xSpring.k;
    }
    /**
     * Sets the spring constant (stiffness).
     * @param value The spring constant k.
     */
    set k(value) {
        this.xSpring.k = value;
        this.ySpring.k = value;
        this.zSpring.k = value;
    }
    /** Gets the damping constant (resistance). */
    get damp() {
        return this.xSpring.damp;
    }
    /**
     * Sets the damping constant.
     * Higher values increase resistance and reduce oscillation.
     * @param value The damping coefficient.
     */
    set damp(value) {
        this.xSpring.damp = value;
        this.ySpring.damp = value;
        this.zSpring.damp = value;
    }
    /** Gets the mass of the object. */
    get mass() {
        return this.xSpring.mass;
    }
    /**
     * Sets the mass.
     * Higher mass slows acceleration and increases inertia.
     * @param value The mass value.
     */
    set mass(value) {
        this.xSpring.mass = value;
        this.ySpring.mass = value;
        this.zSpring.mass = value;
    }
    /**
     * Sets a callback that fires once all three axes of the spring have settled.
     */
    set onSettled(callback) {
        this.onSettledCallback = callback;
    }
    /** Gets the onSettled callback. */
    get onSettled() {
        return this.onSettledCallback;
    }
    /** Gets the x-component of the spring's velocity. */
    get velocityX() {
        return this.xSpring.velocity;
    }
    /** Gets the y-component of the spring's velocity. */
    get velocityY() {
        return this.ySpring.velocity;
    }
    /** Gets the z-component of the spring's velocity. */
    get velocityZ() {
        return this.zSpring.velocity;
    }
    /**
     * Sets the spring's velocity vector across x, y, and z axes.
     * @param newVelocity The velocity to apply to each axis.
     */
    set velocity(newVelocity) {
        this.xSpring.velocity = newVelocity.x;
        this.ySpring.velocity = newVelocity.y;
        this.zSpring.velocity = newVelocity.z;
    }
    /**
     * @deprecated in favor of using velocityX, velocityY, and velocityZ.
     * Returns the spring's velocity vector across x, y, and z axes.
     */
    get velocity() {
        return new vec3(this.xSpring.velocity, this.ySpring.velocity, this.zSpring.velocity);
    }
    /**
     * Creates a 3D spring animator.
     * @param k Spring constant (stiffness).
     * @param damp Damping coefficient.
     * @param mass Mass applied to each axis.
     */
    constructor(k, damp, mass) {
        this.onSettledCallback = null;
        this.hasFiredOnSettled = false;
        this.previousTargetValue = undefined;
        this.xSpring = new SpringAnimate1D(k, damp, mass);
        this.ySpring = new SpringAnimate1D(k, damp, mass);
        this.zSpring = new SpringAnimate1D(k, damp, mass);
    }
    /**
     * Evaluates the new position of the object based on the spring dynamics.
     * @param currentValue The current position of the object.
     * @param targetValue The target position of the object.
     * @param out The optional vector to store the updated position in.
     * @returns The updated position of the object.
     */
    evaluate(currentValue, targetValue, out) {
        if (!this.previousTargetValue ||
            targetValue.x !== this.previousTargetValue.x ||
            targetValue.y !== this.previousTargetValue.y ||
            targetValue.z !== this.previousTargetValue.z) {
            this.hasFiredOnSettled = false;
            this.previousTargetValue = targetValue.uniformScale(1); // clone
        }
        if (out === undefined) {
            out = new vec3(this.xSpring.evaluate(currentValue.x, targetValue.x), this.ySpring.evaluate(currentValue.y, targetValue.y), this.zSpring.evaluate(currentValue.z, targetValue.z));
        }
        else {
            out.x = this.xSpring.evaluate(currentValue.x, targetValue.x);
            out.y = this.ySpring.evaluate(currentValue.y, targetValue.y);
            out.z = this.zSpring.evaluate(currentValue.z, targetValue.z);
        }
        if (!this.hasFiredOnSettled && this.onSettledCallback && this.isSettled(out, targetValue)) {
            this.onSettledCallback();
            this.hasFiredOnSettled = true;
        }
        return out;
    }
    /**
     * Checks if the spring has effectively come to rest at the target value.
     * @param currentValue The current simulated value.
     * @param targetValue The value the spring is moving towards.
     * @param positionThreshold How close the value needs to be to the target.
     * @param velocityThreshold How low the velocity needs to be.
     * @returns True if the spring is settled, false otherwise.
     */
    isSettled(currentValue, targetValue, positionThreshold = 0.1, velocityThreshold = 0.1) {
        const isXSettled = this.xSpring.isSettled(currentValue.x, targetValue.x, positionThreshold, velocityThreshold);
        const isYSettled = this.ySpring.isSettled(currentValue.y, targetValue.y, positionThreshold, velocityThreshold);
        const isZSettled = this.zSpring.isSettled(currentValue.z, targetValue.z, positionThreshold, velocityThreshold);
        return isXSettled && isYSettled && isZSettled;
    }
    /**
     * Creates a new spring animation with the given duration and bounce.
     * @param duration - The perceptual duration of the animation in seconds.
     * @param bounce - How much bounce the spring should have. 0 is no bounce, 1 is infinite bounce.
     * @returns A new spring animation object.
     */
    static spring(duration, bounce) {
        const k = Math.pow((2 * Math.PI) / duration, 2);
        const damp = ((1 - bounce) * (4 * Math.PI)) / duration;
        return new SpringAnimate(k, damp, 1);
    }
    /**
     * Convenience factory for a smooth, critically-damped spring with no bounce.
     * @param duration Total perceptual duration in seconds (default: 0.3).
     * @returns A `SpringAnimate` configured for smooth motion.
     */
    static smooth(duration = DEFAULT_DURATION) {
        return SpringAnimate.spring(duration, BOUNCE_SMOOTH);
    }
    /**
     * Convenience factory for a snappy spring with slight bounce.
     * @param duration Total perceptual duration in seconds (default: 0.3).
     * @returns A `SpringAnimate` configured for snappy motion.
     */
    static snappy(duration = DEFAULT_DURATION) {
        return SpringAnimate.spring(duration, BOUNCE_SNAPPY);
    }
    /**
     * Convenience factory for a bouncy spring with noticeable overshoot.
     * @param duration Total perceptual duration in seconds (default: 0.5).
     * @returns A `SpringAnimate` configured for bouncy motion.
     */
    static bouncy(duration = DEFAULT_DURATION_BOUNCY) {
        return SpringAnimate.spring(duration, BOUNCE_BOUNCY);
    }
    /**
     * Retunes the internal springs to match a desired duration and bounce.
     * Preserves current velocities by default to maintain continuity.
     * @param duration Perceptual duration in seconds.
     * @param bounce Bounce factor in [0,1], default 0 (smooth/critically-damped).
     * @param preserveVelocity If false, zeroes velocities.
     */
    retuneWithDuration(duration, bounce = BOUNCE_SMOOTH, preserveVelocity = true) {
        this.k = Math.pow((2 * Math.PI) / duration, 2);
        this.damp = ((1 - bounce) * (4 * Math.PI)) / duration;
        if (!preserveVelocity) {
            this.reset();
        }
    }
    /**
     * Retunes to the smooth profile.
     * @param duration Perceptual duration in seconds.
     * @param preserveVelocity If false, zeroes velocities.
     */
    setDurationSmooth(duration, preserveVelocity = true) {
        this.retuneWithDuration(duration, BOUNCE_SMOOTH, preserveVelocity);
    }
    /**
     * Retunes to the snappy profile.
     * @param duration Perceptual duration in seconds.
     * @param preserveVelocity If false, zeroes velocities.
     */
    setDurationSnappy(duration, preserveVelocity = true) {
        this.retuneWithDuration(duration, BOUNCE_SNAPPY, preserveVelocity);
    }
    /**
     * Retunes to the bouncy profile.
     * @param duration Perceptual duration in seconds.
     * @param preserveVelocity If false, zeroes velocities.
     */
    setDurationBouncy(duration, preserveVelocity = true) {
        this.retuneWithDuration(duration, BOUNCE_BOUNCY, preserveVelocity);
    }
    /** Resets the spring's velocity and time accumulator to zero. */
    reset() {
        this.xSpring.reset();
        this.ySpring.reset();
        this.zSpring.reset();
        this.hasFiredOnSettled = false;
        this.previousTargetValue = undefined;
    }
}
exports.SpringAnimate = SpringAnimate;
/**
 * A 1D spring simulation class for smooth, physically-based animations of numbers.
 */
class SpringAnimate1D {
    /**
     * Creates a 1D spring animator.
     * @param k Spring constant (stiffness).
     * @param damp Damping coefficient.
     * @param mass Mass of the simulated value.
     */
    constructor(k, damp, mass) {
        /** A callback that fires once when the spring settles at its target. */
        this.onSettled = null;
        this.hasFiredOnSettled = false;
        this.previousTargetValue = undefined;
        this.accumulator = 0.0;
        this.k = k;
        this.damp = damp;
        this.mass = mass;
        this.velocity = 0;
    }
    /**
     * Evaluates the new value based on the spring dynamics.
     * @param currentValue The current value.
     * @param targetValue The target value.
     * @returns The updated value.
     */
    evaluate(currentValue, targetValue) {
        if (targetValue !== this.previousTargetValue) {
            this.hasFiredOnSettled = false;
            this.previousTargetValue = targetValue;
        }
        this.accumulator += getDeltaTime();
        if (this.accumulator > MAX_ACCUMULATION_TIME) {
            this.accumulator = MAX_ACCUMULATION_TIME;
        }
        let simulatedValue = currentValue;
        while (this.accumulator >= FIXED_DELTA_TIME) {
            // Calculate the spring force
            const force = -this.k * (simulatedValue - targetValue);
            // Damping force
            const damping = -this.damp * this.velocity;
            // Acceleration
            const acceleration = (force + damping) / this.mass;
            // Update velocity
            this.velocity += acceleration * FIXED_DELTA_TIME;
            // Update position
            simulatedValue += this.velocity * FIXED_DELTA_TIME;
            this.accumulator -= FIXED_DELTA_TIME;
        }
        if (!this.hasFiredOnSettled && this.onSettled && this.isSettled(simulatedValue, targetValue)) {
            this.onSettled();
            this.hasFiredOnSettled = true;
        }
        return simulatedValue;
    }
    /**
     * Checks if the spring has effectively come to rest at the target value.
     * @param currentValue The current simulated value.
     * @param targetValue The value the spring is moving towards.
     * @param positionThreshold How close the value needs to be to the target.
     * @param velocityThreshold How low the velocity needs to be.
     * @returns True if the spring is settled, false otherwise.
     */
    isSettled(currentValue, targetValue, positionThreshold = 0.1, velocityThreshold = 0.1) {
        const isPositionSettled = Math.abs(currentValue - targetValue) < positionThreshold;
        const isVelocitySettled = Math.abs(this.velocity) < velocityThreshold;
        return isPositionSettled && isVelocitySettled;
    }
    /**
     * Creates a new spring animation with the given duration and bounce.
     * @param duration - The perceptual duration of the animation in seconds.
     * @param bounce - How much bounce the spring should have. 0 is no bounce.
     * @returns A new 1D spring animation object.
     */
    static spring(duration, bounce) {
        const k = Math.pow((2 * Math.PI) / duration, 2);
        const damp = ((1 - bounce) * (4 * Math.PI)) / duration;
        return new SpringAnimate1D(k, damp, 1);
    }
    /**
     * Convenience factory for a smooth, critically-damped spring with no bounce.
     * @param duration Total perceptual duration in seconds (default: 0.3).
     * @returns A `SpringAnimate1D` configured for smooth motion.
     */
    static smooth(duration = DEFAULT_DURATION) {
        return SpringAnimate1D.spring(duration, BOUNCE_SMOOTH);
    }
    /**
     * Convenience factory for a snappy spring with slight bounce.
     * @param duration Total perceptual duration in seconds (default: 0.3).
     * @returns A `SpringAnimate1D` configured for snappy motion.
     */
    static snappy(duration = DEFAULT_DURATION) {
        return SpringAnimate1D.spring(duration, BOUNCE_SNAPPY);
    }
    /**
     * Convenience factory for a bouncy spring with noticeable overshoot.
     * @param duration Total perceptual duration in seconds (default: 0.5).
     * @returns A `SpringAnimate1D` configured for bouncy motion.
     */
    static bouncy(duration = DEFAULT_DURATION_BOUNCY) {
        return SpringAnimate1D.spring(duration, BOUNCE_BOUNCY);
    }
    /**
     * Retunes this spring to match a desired duration and bounce.
     * Preserves current velocity/accumulator by default to maintain continuity.
     * @param duration Perceptual duration in seconds.
     * @param bounce Bounce factor in [0,1], default 0 (smooth/critically-damped).
     * @param preserveVelocity If false, velocity/accumulator are reset.
     */
    retuneWithDuration(duration, bounce = BOUNCE_SMOOTH, preserveVelocity = true) {
        this.k = Math.pow((2 * Math.PI) / duration, 2);
        this.damp = ((1 - bounce) * (4 * Math.PI)) / duration;
        if (!preserveVelocity) {
            this.reset();
        }
    }
    /**
     * Retunes to the smooth profile.
     * @param duration Perceptual duration in seconds.
     * @param preserveVelocity If false, resets velocity/accumulator.
     */
    setDurationSmooth(duration, preserveVelocity = true) {
        this.retuneWithDuration(duration, BOUNCE_SMOOTH, preserveVelocity);
    }
    /**
     * Retunes to the snappy profile.
     * @param duration Perceptual duration in seconds.
     * @param preserveVelocity If false, resets velocity/accumulator.
     */
    setDurationSnappy(duration, preserveVelocity = true) {
        this.retuneWithDuration(duration, BOUNCE_SNAPPY, preserveVelocity);
    }
    /**
     * Retunes to the bouncy profile.
     * @param duration Perceptual duration in seconds.
     * @param preserveVelocity If false, resets velocity/accumulator.
     */
    setDurationBouncy(duration, preserveVelocity = true) {
        this.retuneWithDuration(duration, BOUNCE_BOUNCY, preserveVelocity);
    }
    /** Resets the spring's velocity and time accumulator to zero. */
    reset() {
        this.velocity = 0;
        this.accumulator = 0;
        this.hasFiredOnSettled = false;
        this.previousTargetValue = undefined;
    }
}
exports.SpringAnimate1D = SpringAnimate1D;
/**
 * Steps a 1D spring value toward a target with instant drop behavior.
 * If the target is below the current value, the value snaps to the target immediately
 * and the spring is reset. Otherwise, it advances using the spring.
 */
function step1DInstantDrop(current, target, spring) {
    if (target < current) {
        spring.reset();
        return target;
    }
    return spring.evaluate(current, target);
}
/**
 * Steps a 1D spring value toward a target, but snaps directly to the target when the driver is zero or less.
 * Useful for snapping distances when a visibility/alpha driver is fully hidden.
 */
function step1DSnapWhenZero(current, target, driver, spring) {
    if (driver <= 0) {
        spring.reset();
        return target;
    }
    return spring.evaluate(current, target);
}
//# sourceMappingURL=springAnimate.js.map