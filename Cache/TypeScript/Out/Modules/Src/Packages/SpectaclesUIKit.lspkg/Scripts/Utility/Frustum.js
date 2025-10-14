"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frustum = void 0;
/**
 * helper internal plane class for frustum calculations
 */
class Plane {
    constructor(normal, constant) {
        this.normal = normal;
        this.constant = constant;
        this.name = "";
        this.coplanarPoint = (target) => {
            target = this.normal;
            return target.uniformScale(-this.constant);
        };
        this.setFromCoplanarPoints = (a, b, c) => {
            const normal = c.sub(b).cross(a.sub(b)).normalize();
            this.setFromNormalAndCoplanarPoint(normal, a);
        };
        this.projectPoint = (point) => {
            return point.add(this.normal.uniformScale(-1 * this.distanceToPoint(point)));
        };
    }
    distanceToPoint(point) {
        return this.normal.dot(point) + this.constant;
    }
    setFromNormalAndCoplanarPoint(normal, point) {
        this.normal = normal.uniformScale(1);
        this.constant = -point.dot(this.normal);
        return this;
    }
}
/**
 * Simple Frustum for calculating 3D visibility in a frustum with an spatially arbitrary near plane
 */
const FRUSTUM_PLANE_COUNT = 6;
class Frustum {
    constructor() {
        this.planes = [];
        this.corners = [];
        this.names = ["left", "right", "top", "bottom", "near", "far"];
        /**
         *
         * @param point position in world space
         * @returns whether or not given vector is visible through frustum
         */
        this.isPointInside = (point) => {
            for (let i = 0; i < this.planes.length; i++) {
                const plane = this.planes[i];
                if (plane.distanceToPoint(point) < 0) {
                    return false;
                }
            }
            return true;
        };
        /**
         *
         * @param aabbMin minimum extent
         * @param aabbMax maximum extent
         * @returns whether or not a box defined by aabbMin and aabbMax is visible in frustum
         */
        this.isAABBInside = (aabbMin, aabbMax) => {
            const center = aabbMin.add(aabbMax).uniformScale(0.5);
            const halfExtents = aabbMax.sub(aabbMin).uniformScale(0.5);
            for (const plane of this.planes) {
                const d = plane.normal.dot(center) + plane.constant;
                const r = halfExtents.x * Math.abs(plane.normal.x) +
                    halfExtents.y * Math.abs(plane.normal.y) +
                    halfExtents.z * Math.abs(plane.normal.z);
                if (d + r < 0) {
                    return false;
                }
            }
            return true;
        };
        /**
         *
         * @param position position of sphere
         * @param radius radius of sphere
         * @returns whether or not sphere is visible in frustum
         */
        this.isSphereInside = (position, radius) => {
            for (const plane of this.planes) {
                const d = plane.normal.dot(position) + plane.constant;
                const r = radius * Math.abs(plane.normal.x) + radius * Math.abs(plane.normal.y) + radius * Math.abs(plane.normal.z);
                if (d + r < 0) {
                    // Cube is entirely outside this plane
                    return false;
                }
            }
            // Cube is inside or intersects all planes
            return true;
        };
        /**
         * Debug Rendering
         */
        this.render = () => {
            // corners
            global.debugRenderSystem.drawSphere(this.farTopLeft, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.farTopRight, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.farBottomRight, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.farBottomLeft, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.nearTopLeft, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.nearTopRight, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.nearBottomRight, 3, new vec4(0, 1, 0, 1));
            global.debugRenderSystem.drawSphere(this.nearBottomLeft, 3, new vec4(0, 1, 0, 1));
            // near plane lines
            global.debugRenderSystem.drawLine(this.nearTopLeft, this.nearTopRight, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.nearTopRight, this.nearBottomRight, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.nearBottomRight, this.nearBottomLeft, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.nearBottomLeft, this.nearTopLeft, new vec4(1, 0, 0, 1));
            // far plane lines
            global.debugRenderSystem.drawLine(this.farTopLeft, this.farTopRight, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.farTopRight, this.farBottomRight, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.farBottomRight, this.farBottomLeft, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.farBottomLeft, this.farTopLeft, new vec4(1, 0, 0, 1));
            // lines between
            global.debugRenderSystem.drawLine(this.nearTopLeft, this.farTopLeft, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.nearTopRight, this.farTopRight, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.nearBottomRight, this.farBottomRight, new vec4(1, 0, 0, 1));
            global.debugRenderSystem.drawLine(this.nearBottomLeft, this.farBottomLeft, new vec4(1, 0, 0, 1));
            // plane normals between
            const nearCenterLeft = this.nearBottomLeft.add(this.nearTopLeft.sub(this.nearBottomLeft).uniformScale(0.5));
            const nearCenterRight = this.nearBottomRight.add(this.nearTopRight.sub(this.nearBottomRight).uniformScale(0.5));
            const nearCenterTop = this.nearTopRight.add(this.nearTopLeft.sub(this.nearTopRight).uniformScale(0.5));
            const nearCenterBottom = this.nearBottomRight.add(this.nearBottomLeft.sub(this.nearBottomRight).uniformScale(0.5));
            global.debugRenderSystem.drawLine(nearCenterLeft, nearCenterLeft.add(this.left.normal.uniformScale(3)), new vec4(0, 1, 1, 1));
            global.debugRenderSystem.drawLine(nearCenterRight, nearCenterRight.add(this.right.normal.uniformScale(3)), new vec4(0, 1, 1, 1));
            global.debugRenderSystem.drawLine(nearCenterTop, nearCenterTop.add(this.top.normal.uniformScale(3)), new vec4(0, 1, 1, 1));
            global.debugRenderSystem.drawLine(nearCenterBottom, nearCenterBottom.add(this.bottom.normal.uniformScale(3)), new vec4(0, 1, 1, 1));
        };
        for (let i = 0; i < FRUSTUM_PLANE_COUNT; i++) {
            const newPlane = new Plane(vec3.one(), 0);
            newPlane.name = this.names[i];
            this.planes.push(newPlane);
        }
    }
    /**
     * get left plane
     */
    get left() {
        return this.planes[0];
    }
    /**
     * set left plane
     */
    set left(plane) {
        this.planes[0] = plane;
    }
    /**
     * get right plane
     */
    get right() {
        return this.planes[1];
    }
    /**
     * set right plane
     */
    set right(plane) {
        this.planes[1] = plane;
    }
    /**
     * get top plane
     */
    get top() {
        return this.planes[2];
    }
    /**
     * set top plane
     */
    set top(plane) {
        this.planes[2] = plane;
    }
    /**
     * get bottom plane
     */
    get bottom() {
        return this.planes[3];
    }
    /**
     * set bottom plane
     */
    set bottom(plane) {
        this.planes[3] = plane;
    }
    /**
     * get near plane
     */
    get near() {
        return this.planes[4];
    }
    /**
     * set near plane
     */
    set near(plane) {
        this.planes[4] = plane;
    }
    /**
     * get far plane
     */
    get far() {
        return this.planes[5];
    }
    /**
     * set far plane
     */
    set far(plane) {
        this.planes[5] = plane;
    }
    /**
     * get vec3 point of nearTopLeft Corner
     */
    get nearTopLeft() {
        return this.corners[0];
    }
    /**
     * set vec3 point of nearTopLeft Corner
     */
    set nearTopLeft(corner) {
        this.corners[0] = corner;
    }
    /**
     * get vec3 point of nearTopRight Corner
     */
    get nearTopRight() {
        return this.corners[1];
    }
    /**
     * set vec3 point of nearTopRight Corner
     */
    set nearTopRight(corner) {
        this.corners[1] = corner;
    }
    /**
     * get vec3 point of nearBottomRight Corner
     */
    get nearBottomRight() {
        return this.corners[2];
    }
    /**
     * set vec3 point of nearBottomRight Corner
     */
    set nearBottomRight(corner) {
        this.corners[2] = corner;
    }
    /**
     * get vec3 point of nearBottomLeft Corner
     */
    get nearBottomLeft() {
        return this.corners[3];
    }
    /**
     * set vec3 point of nearBottomLeft Corner
     */
    set nearBottomLeft(corner) {
        this.corners[3] = corner;
    }
    /**
     * get vec3 point of farTopLeft Corner
     */
    get farTopLeft() {
        return this.corners[4];
    }
    /**
     * set vec3 point of farTopLeft Corner
     */
    set farTopLeft(corner) {
        this.corners[4] = corner;
    }
    /**
     * get vec3 point of farTopRight Corner
     */
    get farTopRight() {
        return this.corners[5];
    }
    /**
     * set vec3 point of farTopRight Corner
     */
    set farTopRight(corner) {
        this.corners[5] = corner;
    }
    /**
     * get vec3 point of farBottomRight Corner
     */
    get farBottomRight() {
        return this.corners[6];
    }
    /**
     * set vec3 point of farBottomRight Corner
     */
    set farBottomRight(corner) {
        this.corners[6] = corner;
    }
    /**
     * get vec3 point of farBottomLeft Corner
     */
    get farBottomLeft() {
        return this.corners[7];
    }
    /**
     * set vec3 point of farBottomLeft Corner
     */
    set farBottomLeft(corner) {
        this.corners[7] = corner;
    }
    /**
     *
     * @param cameraProvider from WorldCameraFinderProvider
     * @param cameraFar camera far render distance
     * @param size of near plane
     * @param transform of near plane
     */
    setFromNearPlane(cameraProvider, cameraFar, size, transform) {
        const cameraPosition = cameraProvider.getWorldPosition();
        // position of near plane
        const position = transform.getWorldPosition();
        // up of near plane
        const up = transform.up;
        //distance to near plane from camera
        const camDist = cameraPosition.distance(position);
        //direction to camera
        const camDir = cameraPosition.sub(position).normalize();
        // aspect ratio of near plane
        const aspectRatio = size.x / size.y;
        // from nearPlaneHeight = 2 * tan( fov / 2 ) * nearPlaneDistance
        // nearPlaneHeight / ( 2 * nearPlaneDistance ) = tan( fov / 2 )
        // fov = 2 * atan( nearPlaneHeight / ( 2 * nearPlaneDistance ) )
        const fov = 2 * Math.atan(size.y / (2 * camDist));
        const thisFar = cameraFar * 0.5;
        // far plane in world space
        const farPosition = position.add(position.sub(cameraPosition).normalize().uniformScale(thisFar));
        // size of far plane
        const farHeight = 2 * Math.tan(fov / 2) * (thisFar + camDist);
        const farWidth = farHeight * aspectRatio;
        // corners
        this.farTopLeft = farPosition
            .add(transform.right.uniformScale(-0.5 * farWidth))
            .add(up.uniformScale(0.5 * farHeight));
        this.farTopRight = farPosition
            .add(transform.right.uniformScale(0.5 * farWidth))
            .add(up.uniformScale(0.5 * farHeight));
        this.farBottomLeft = farPosition
            .add(transform.right.uniformScale(-0.5 * farWidth))
            .add(up.uniformScale(-0.5 * farHeight));
        this.farBottomRight = farPosition
            .add(transform.right.uniformScale(0.5 * farWidth))
            .add(up.uniformScale(-0.5 * farHeight));
        this.nearTopLeft = position.add(transform.right.uniformScale(-0.5 * size.x)).add(up.uniformScale(0.5 * size.y));
        this.nearTopRight = position.add(transform.right.uniformScale(0.5 * size.x)).add(up.uniformScale(0.5 * size.y));
        this.nearBottomLeft = position.add(transform.right.uniformScale(-0.5 * size.x)).add(up.uniformScale(-0.5 * size.y));
        this.nearBottomRight = position.add(transform.right.uniformScale(0.5 * size.x)).add(up.uniformScale(-0.5 * size.y));
        // set planes
        this.left.setFromCoplanarPoints(this.nearTopLeft, this.nearBottomLeft, this.farTopLeft);
        if (this.left.normal.dot(camDir.cross(transform.down)) < 0) {
            this.left.normal = this.left.normal.uniformScale(-1);
            this.left.constant *= -1;
        }
        this.right.setFromCoplanarPoints(this.nearTopRight, this.nearBottomRight, this.farTopRight);
        if (this.right.normal.dot(camDir.cross(transform.up)) < 0) {
            this.right.normal = this.right.normal.uniformScale(-1);
            this.right.constant *= -1;
        }
        this.top.setFromCoplanarPoints(this.nearTopLeft, this.nearTopRight, this.farTopRight);
        if (this.top.normal.dot(camDir.cross(transform.left)) < 0) {
            this.top.normal = this.top.normal.uniformScale(-1);
            this.top.constant *= -1;
        }
        this.bottom.setFromCoplanarPoints(this.nearBottomLeft, this.nearBottomRight, this.farBottomRight);
        if (this.bottom.normal.dot(camDir.cross(transform.right)) < 0) {
            this.bottom.normal = this.bottom.normal.uniformScale(-1);
            this.bottom.constant *= -1;
        }
        this.near.setFromCoplanarPoints(this.nearBottomLeft, this.nearTopRight, this.nearBottomRight);
        if (this.near.normal.dot(transform.back) < 0) {
            this.near.normal = this.near.normal.uniformScale(-1);
            this.near.constant *= -1;
        }
        this.far.setFromCoplanarPoints(this.farTopLeft, this.farTopRight, this.farBottomRight);
        if (this.far.normal.dot(transform.forward) < 0.5) {
            this.far.normal = this.far.normal.uniformScale(-1);
            this.far.constant *= -1;
        }
    }
}
exports.Frustum = Frustum;
//# sourceMappingURL=Frustum.js.map