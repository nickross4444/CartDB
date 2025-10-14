import {ObjectPool} from "./ObjectPool"
import {findComponentInChildren} from "./SceneObjectUtils"

type AABB = {
  min: vec3
  max: vec3
}

export type BoundingSphere = {
  center: vec3
  radius: number
}

interface TransformSnapshot {
  worldPosition: vec3
  worldScale: vec3
  worldRotation: quat
  worldTransform: mat4
  inverseWorldTransform: mat4
}

interface CachedColliderData {
  aabb?: AABB
  transformSnapshot: TransformSnapshot
  worldSphere?: BoundingSphere

  fitVisual?: boolean
  size?: vec3
  radius?: number
  length?: number
  localSphere?: BoundingSphere
}

type ClosestPointToPointCalculator = (
  shape: Shape,
  queryPoint: vec3,
  cachedData: CachedColliderData,
  collider: ColliderComponent
) => vec3

type ClosestPointToSegmentCalculator = (
  collider: ColliderComponent,
  cachedData: CachedColliderData,
  segmentStart: vec3,
  segmentEnd: vec3
) => vec3

const MAX_AABB_CACHE_SIZE = 500
const EPSILON = 1e-6
const EPSILON_SQUARED = EPSILON * EPSILON

/**
 * A collection of utility functions for collider calculations.
 *
 * Note: Closest point calculations are local AABB-based approximations, not precise collider geometry.
 */
export class ColliderUtils {
  private static aabbCache = new Map<ColliderComponent, CachedColliderData>()
  private static closestPointToPointCalculators = new Map<string, ClosestPointToPointCalculator>()
  private static closestPointToSegmentCalculators = new Map<string, ClosestPointToSegmentCalculator>()

  static {
    this.closestPointToPointCalculators.set("BoxShape", this.closestBoxPointToPoint.bind(this))
    this.closestPointToPointCalculators.set("SphereShape", this.closestSpherePointToPoint.bind(this))
    this.closestPointToPointCalculators.set("CylinderShape", this.closestCylinderPointToPoint.bind(this))
    this.closestPointToPointCalculators.set("CapsuleShape", this.closestCapsulePointToPoint.bind(this))
    this.closestPointToPointCalculators.set("ConeShape", this.closestConePointToPoint.bind(this))

    this.closestPointToSegmentCalculators.set("BoxShape", this.closestBoxPointToSegment.bind(this))
    this.closestPointToSegmentCalculators.set("SphereShape", this.closestSpherePointToSegment.bind(this))
    this.closestPointToSegmentCalculators.set("CylinderShape", this.closestCylinderPointToSegment.bind(this))
    this.closestPointToSegmentCalculators.set("CapsuleShape", this.closestCapsulePointToSegment.bind(this))
    this.closestPointToSegmentCalculators.set("ConeShape", this.closestConePointToSegment.bind(this))
  }

  /**
   * Calculates the closest point on a collider's surface to a given point in world space.
   *
   * @param collider The collider component to calculate the closest point on.
   * @param queryPoint The query point in world space.
   * @returns The closest point on the collider surface in world space.
   */
  static getClosestPointOnColliderToPoint(collider: ColliderComponent, queryPoint: vec3): vec3 {
    this.resetPools()

    const cachedData = this.getOrCreateCacheEntry(collider)
    if (!cachedData) {
      return queryPoint
    }

    const calculator = this.closestPointToPointCalculators.get(collider.shape.getTypeName())
    if (calculator) {
      return calculator(collider.shape, queryPoint, cachedData, collider)
    }

    if (cachedData.aabb) {
      return this.getClosestPointInLocalSpace(queryPoint, cachedData.aabb, cachedData)
    }

    return queryPoint
  }

  /**
   * Computes a fast, approximate world-space bounding sphere for a collider using its cached local AABB and transform.
   * Returns null if no cached AABB data is available.
   */
  static getColliderWorldBoundingSphere(collider: ColliderComponent): BoundingSphere | null {
    const cachedData = this.getOrCreateCacheEntry(collider)
    if (!cachedData) {
      return null
    }

    if (cachedData.worldSphere) {
      return cachedData.worldSphere
    }

    if (!cachedData.localSphere) {
      return null
    }

    const {localSphere, transformSnapshot} = cachedData
    const {worldTransform, worldScale} = transformSnapshot

    const worldCenter = worldTransform.multiplyPoint(localSphere.center)

    const maxScale = Math.max(worldScale.x, worldScale.y, worldScale.z)
    const worldRadius = localSphere.radius * maxScale

    const worldSphere: BoundingSphere = {
      center: new vec3(worldCenter.x, worldCenter.y, worldCenter.z),
      radius: worldRadius
    }

    cachedData.worldSphere = worldSphere

    return worldSphere
  }

  /**
   * Removes a collider's cached AABB data from the internal cache.
   */
  static invalidateCacheEntry(collider: ColliderComponent): void {
    this.aabbCache.delete(collider)
  }

  /**
   * Gets statistics about the vector object pools for debugging and monitoring.
   */
  static getPoolStats() {
    return {
      vec2Pool: this.vec2Pool.getStats(),
      vec3Pool: this.vec3Pool.getStats()
    }
  }

  private static vec2Pool = new ObjectPool({
    factory: () => new vec2(0, 0),
    onRelease: (v) => {
      v.x = 0
      v.y = 0
    },
    initialCapacity: 32,
    parentTag: "ColliderUtils"
  })

  private static vec3Pool = new ObjectPool({
    factory: () => new vec3(0, 0, 0),
    onRelease: (v) => {
      v.x = 0
      v.y = 0
      v.z = 0
    },
    initialCapacity: 32,
    parentTag: "ColliderUtils"
  })

  private static getVec2(x: number, y: number): vec2 {
    const v = this.vec2Pool.pop()
    v.x = x
    v.y = y
    return v
  }

  private static getVec3(x: number, y: number, z: number): vec3 {
    const v = this.vec3Pool.pop()
    v.x = x
    v.y = y
    v.z = z
    return v
  }

  private static resetPools(): void {
    this.vec2Pool.reset()
    this.vec3Pool.reset()
  }

  private static getOrCreateCacheEntry(collider: ColliderComponent): CachedColliderData | undefined {
    const sceneObject = collider.getSceneObject()
    if (!sceneObject) {
      return undefined
    }

    const transform = sceneObject.getTransform()
    let cachedData = this.aabbCache.get(collider)

    if (cachedData && !this.isCacheEntryValid(collider, cachedData, transform)) {
      this.aabbCache.delete(collider)
      cachedData = undefined
    }

    if (!cachedData) {
      cachedData = this.createCacheEntry(collider, transform)
    } else {
      // Mark as recently used for LRU cache policy by re-inserting it.
      this.aabbCache.delete(collider)
      this.aabbCache.set(collider, cachedData)
    }

    return cachedData
  }

  private static createCacheEntry(collider: ColliderComponent, transform: Transform): CachedColliderData {
    const shape = collider.shape
    const shapeType = shape.getTypeName()

    const transformSnapshot = this.captureTransformSnapshot(transform)
    const cachedData: CachedColliderData = {
      transformSnapshot: transformSnapshot,
      fitVisual: collider.fitVisual
    }

    let localSphereCenter = new vec3(0, 0, 0)
    let localSphereRadius = 0

    const isBoxOrSphere = shapeType === "BoxShape" || shapeType === "SphereShape"
    const useEffectiveFitVisual = isBoxOrSphere && collider.fitVisual
    const needsAABBFromVisual = useEffectiveFitVisual || shapeType === "MeshShape"

    if (needsAABBFromVisual) {
      let visualAABB: AABB | undefined
      const visualComponent = this.findRenderMeshVisualInHierarchy(collider.getSceneObject())

      if (useEffectiveFitVisual && visualComponent) {
        visualAABB = {min: visualComponent.localAabbMin(), max: visualComponent.localAabbMax()}
      } else if (shapeType === "MeshShape") {
        const meshShape = shape as MeshShape
        if (meshShape.mesh) {
          const aabbMin = meshShape.mesh.aabbMin
          const aabbMax = meshShape.mesh.aabbMax
          visualAABB = {min: new vec3(aabbMin.x, aabbMin.y, aabbMin.z), max: new vec3(aabbMax.x, aabbMax.y, aabbMax.z)}
        }
      }

      if (visualAABB) {
        const min = visualAABB.min
        const max = visualAABB.max
        cachedData.aabb = {min: new vec3(min.x, min.y, min.z), max: new vec3(max.x, max.y, max.z)}

        localSphereCenter = new vec3((min.x + max.x) * 0.5, (min.y + max.y) * 0.5, (min.z + max.z) * 0.5)
        const dx = max.x - localSphereCenter.x
        const dy = max.y - localSphereCenter.y
        const dz = max.z - localSphereCenter.z
        localSphereRadius = Math.sqrt(dx * dx + dy * dy + dz * dz)
      }
    } else {
      switch (shapeType) {
        case "BoxShape": {
          const box = shape as BoxShape
          cachedData.size = box.size
          localSphereRadius = box.size.uniformScale(0.5).length
          break
        }
        case "SphereShape": {
          const sphere = shape as SphereShape
          cachedData.radius = sphere.radius
          localSphereRadius = sphere.radius
          break
        }
        case "CylinderShape": {
          const cylinder = shape as CylinderShape
          cachedData.radius = cylinder.radius
          cachedData.length = cylinder.length
          const halfLength = cylinder.length * 0.5
          localSphereRadius = Math.sqrt(cylinder.radius * cylinder.radius + halfLength * halfLength)
          break
        }
        case "CapsuleShape": {
          const capsule = shape as CapsuleShape
          cachedData.radius = capsule.radius
          cachedData.length = capsule.length
          localSphereRadius = capsule.length * 0.5 + capsule.radius
          break
        }
        case "ConeShape": {
          const cone = shape as ConeShape
          cachedData.radius = cone.radius
          cachedData.length = cone.length
          const halfLength = cone.length * 0.5
          localSphereRadius = Math.sqrt(cone.radius * cone.radius + halfLength * halfLength)
          break
        }
      }
    }

    if (localSphereRadius > 0) {
      cachedData.localSphere = {center: localSphereCenter, radius: localSphereRadius}
    }

    if (!cachedData.aabb) {
      cachedData.aabb = this.calculateLocalColliderAABB(collider)
    }

    this.addToCache(collider, cachedData)
    return cachedData
  }

  private static getAxisAlignedCylinderAABB(radius: number, length: number, axis: Axis): AABB {
    const halfLen = length * 0.5
    const r = radius

    if (axis === Axis.X) {
      return {min: new vec3(-halfLen, -r, -r), max: new vec3(halfLen, r, r)}
    } else if (axis === Axis.Z) {
      return {min: new vec3(-r, -r, -halfLen), max: new vec3(r, r, halfLen)}
    } else {
      // Axis.Y
      return {min: new vec3(-r, -halfLen, -r), max: new vec3(r, halfLen, r)}
    }
  }

  private static calculateLocalColliderAABB(collider: ColliderComponent): AABB {
    const shape = collider.shape

    switch (shape.getTypeName()) {
      case "BoxShape": {
        const boxShape = shape as BoxShape
        const halfSize = boxShape.size.uniformScale(0.5)
        return {min: halfSize.uniformScale(-1), max: halfSize}
      }
      case "SphereShape": {
        const sphere = shape as SphereShape
        const r = sphere.radius
        return {min: new vec3(-r, -r, -r), max: new vec3(r, r, r)}
      }
      case "CylinderShape": {
        const s = shape as CylinderShape
        return this.getAxisAlignedCylinderAABB(s.radius, s.length, s.axis)
      }
      case "CapsuleShape": {
        const s = shape as CapsuleShape
        return this.getAxisAlignedCylinderAABB(s.radius, s.length, s.axis)
      }
      case "ConeShape": {
        const s = shape as ConeShape
        return this.getAxisAlignedCylinderAABB(s.radius, s.length, s.axis)
      }
      case "MeshShape": {
        const meshShape = shape as MeshShape
        if (meshShape.mesh) {
          const aabbMin = meshShape.mesh.aabbMin
          const aabbMax = meshShape.mesh.aabbMax
          return {
            min: new vec3(aabbMin.x, aabbMin.y, aabbMin.z),
            max: new vec3(aabbMax.x, aabbMax.y, aabbMax.z)
          }
        } else {
          return {min: new vec3(0, 0, 0), max: new vec3(0, 0, 0)}
        }
      }
      default:
        return {min: new vec3(0, 0, 0), max: new vec3(0, 0, 0)}
    }
  }

  private static getClosestPointInLocalSpace(
    worldQueryPoint: vec3,
    localAABB: AABB,
    cachedData: CachedColliderData
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const localQueryPoint = inverseWorldTransform.multiplyPoint(worldQueryPoint)
    const localClosestPoint = this.closestPointOnAABB(localAABB, localQueryPoint)
    return worldTransform.multiplyPoint(localClosestPoint)
  }

  private static isCacheEntryValid(
    collider: ColliderComponent,
    cachedData: CachedColliderData,
    transform: Transform
  ): boolean {
    const previousSnapshot = cachedData.transformSnapshot
    if (previousSnapshot.worldPosition.distanceSquared(transform.getWorldPosition()) > EPSILON_SQUARED) {
      return false
    }
    if (previousSnapshot.worldScale.distanceSquared(transform.getWorldScale()) > EPSILON_SQUARED) {
      return false
    }
    const dotProduct = previousSnapshot.worldRotation.dot(transform.getWorldRotation())
    if (Math.abs(dotProduct) < 1 - EPSILON) {
      return false
    }

    const shape = collider.shape

    if (cachedData.fitVisual !== collider.fitVisual) {
      return false
    }

    switch (shape.getTypeName()) {
      case "BoxShape":
        if (cachedData.size && !cachedData.size.equal((shape as BoxShape).size)) {
          return false
        }
        break
      case "SphereShape":
        if (cachedData.radius !== (shape as SphereShape).radius) {
          return false
        }
        break
      case "CylinderShape": {
        const cylinder = shape as CylinderShape
        if (cachedData.radius !== cylinder.radius || cachedData.length !== cylinder.length) {
          return false
        }
        break
      }
      case "CapsuleShape": {
        const capsule = shape as CapsuleShape
        if (cachedData.radius !== capsule.radius || cachedData.length !== capsule.length) {
          return false
        }
        break
      }
      case "ConeShape": {
        const cone = shape as ConeShape
        if (cachedData.radius !== cone.radius || cachedData.length !== cone.length) {
          return false
        }
        break
      }
    }

    return true
  }

  private static captureTransformSnapshot(transform: Transform): TransformSnapshot {
    const worldTransform = transform.getWorldTransform()
    return {
      worldPosition: transform.getWorldPosition(),
      worldScale: transform.getWorldScale(),
      worldRotation: transform.getWorldRotation(),
      worldTransform: worldTransform,
      inverseWorldTransform: worldTransform.inverse()
    }
  }

  private static orientPointToYAxis(point: vec3, axis: Axis): vec3 {
    switch (axis) {
      case Axis.X:
        return this.getVec3(point.y, point.x, point.z)
      case Axis.Z:
        return this.getVec3(point.x, point.z, point.y)
      default:
        return this.getVec3(point.x, point.y, point.z)
    }
  }

  private static reorientPointFromYAxis(point: vec3, axis: Axis): vec3 {
    switch (axis) {
      case Axis.X:
        return this.getVec3(point.y, point.x, point.z)
      case Axis.Z:
        return this.getVec3(point.x, point.z, point.y)
      default:
        return this.getVec3(point.x, point.y, point.z)
    }
  }

  private static calculateClosestPointOnSphereSurface(center: vec3, radius: number, queryPoint: vec3): vec3 {
    const direction = queryPoint.sub(center)
    if (direction.lengthSquared < EPSILON_SQUARED) {
      // Query point is at the center, return an arbitrary point on the surface.
      return center.add(this.getVec3(0, radius, 0))
    }
    return center.add(direction.normalize().uniformScale(radius))
  }

  private static closestPointOnAABB(aabb: AABB, queryPoint: vec3): vec3 {
    const x = Math.max(aabb.min.x, Math.min(queryPoint.x, aabb.max.x))
    const y = Math.max(aabb.min.y, Math.min(queryPoint.y, aabb.max.y))
    const z = Math.max(aabb.min.z, Math.min(queryPoint.z, aabb.max.z))
    return this.getVec3(x, y, z)
  }

  private static findRenderMeshVisualInHierarchy(sceneObject: SceneObject): RenderMeshVisual | null {
    const visual = sceneObject.getComponent("Component.RenderMeshVisual") as RenderMeshVisual
    if (visual) {
      return visual
    }

    return findComponentInChildren<RenderMeshVisual>(sceneObject, "Component.RenderMeshVisual")
  }

  private static addToCache(collider: ColliderComponent, dataToCache: CachedColliderData): void {
    if (this.aabbCache.size >= MAX_AABB_CACHE_SIZE) {
      const firstKey = this.aabbCache.keys().next().value
      if (firstKey) {
        this.aabbCache.delete(firstKey)
      }
    }
    this.aabbCache.set(collider, dataToCache)
  }

  private static calculateClosestPointOnCylinder(
    axis: Axis,
    radius: number,
    halfLength: number,
    queryPoint: vec3,
    cachedData: CachedColliderData
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const localQueryPoint = inverseWorldTransform.multiplyPoint(queryPoint)
    const orientedPoint = this.orientPointToYAxis(localQueryPoint, axis)

    const clampedY = Math.max(-halfLength, Math.min(orientedPoint.y, halfLength))
    const radialDistSq = orientedPoint.x * orientedPoint.x + orientedPoint.z * orientedPoint.z

    let radialX = orientedPoint.x
    let radialZ = orientedPoint.z

    const isBeyondEnds = orientedPoint.y > halfLength || orientedPoint.y < -halfLength

    if (!isBeyondEnds || radialDistSq > radius * radius) {
      if (radialDistSq > EPSILON_SQUARED) {
        const scale = radius / Math.sqrt(radialDistSq)
        radialX *= scale
        radialZ *= scale
      } else {
        radialX = radius
        radialZ = 0
      }
    }

    const orientedClosest = this.getVec3(radialX, clampedY, radialZ)
    const finalLocalClosest = this.reorientPointFromYAxis(orientedClosest, axis)
    return worldTransform.multiplyPoint(finalLocalClosest)
  }

  private static calculateClosestPointOnCapsule(
    axis: Axis,
    radius: number,
    halfLength: number,
    queryPoint: vec3,
    cachedData: CachedColliderData
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const localQueryPoint = inverseWorldTransform.multiplyPoint(queryPoint)
    const orientedPoint = this.orientPointToYAxis(localQueryPoint, axis)

    let orientedClosest: vec3

    if (orientedPoint.y < -halfLength) {
      const hemisphereCenter = this.getVec3(0, -halfLength, 0)
      orientedClosest = this.calculateClosestPointOnSphereSurface(hemisphereCenter, radius, orientedPoint)
    } else if (orientedPoint.y > halfLength) {
      const hemisphereCenter = this.getVec3(0, halfLength, 0)
      orientedClosest = this.calculateClosestPointOnSphereSurface(hemisphereCenter, radius, orientedPoint)
    } else {
      let radialVec = this.getVec3(orientedPoint.x, 0, orientedPoint.z)
      if (radialVec.lengthSquared > EPSILON_SQUARED) {
        radialVec = radialVec.normalize().uniformScale(radius)
      } else {
        radialVec.x = radius
      }
      orientedClosest = this.getVec3(radialVec.x, orientedPoint.y, radialVec.z)
    }

    const finalLocalClosest = this.reorientPointFromYAxis(orientedClosest, axis)
    return worldTransform.multiplyPoint(finalLocalClosest)
  }

  private static calculateClosestPointOnCone(
    axis: Axis,
    radius: number,
    length: number,
    queryPoint: vec3,
    cachedData: CachedColliderData
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const localQueryPoint = inverseWorldTransform.multiplyPoint(queryPoint)
    const orientedPoint = this.orientPointToYAxis(localQueryPoint, axis)
    const halfLength = length * 0.5

    const radialDist = Math.sqrt(orientedPoint.x * orientedPoint.x + orientedPoint.z * orientedPoint.z)
    const queryPoint2D = this.getVec2(radialDist, orientedPoint.y)
    const segA = this.getVec2(radius, -halfLength)
    const segB = this.getVec2(0, halfLength)
    const segVec = segB.sub(segA)
    let t = 0
    if (segVec.lengthSquared > EPSILON_SQUARED) {
      t = queryPoint2D.sub(segA).dot(segVec) / segVec.lengthSquared
    }
    const clampedT = Math.max(0, Math.min(1, t))
    const closestPointOnHull2D = segA.add(segVec.uniformScale(clampedT))

    let closestPointOnHull3D: vec3

    if (radialDist > EPSILON) {
      const scale = closestPointOnHull2D.x / radialDist
      closestPointOnHull3D = this.getVec3(orientedPoint.x * scale, closestPointOnHull2D.y, orientedPoint.z * scale)
    } else {
      closestPointOnHull3D = this.getVec3(closestPointOnHull2D.x, closestPointOnHull2D.y, 0)
    }

    if (orientedPoint.y < -halfLength) {
      const pointOnBaseDisk = this.getVec3(orientedPoint.x, -halfLength, orientedPoint.z)
      const baseDiskRadiusSq = pointOnBaseDisk.x * pointOnBaseDisk.x + pointOnBaseDisk.z * pointOnBaseDisk.z
      if (baseDiskRadiusSq > radius * radius) {
        const baseScale = radius / Math.sqrt(baseDiskRadiusSq)
        pointOnBaseDisk.x *= baseScale
        pointOnBaseDisk.z *= baseScale
      }

      if (orientedPoint.distanceSquared(pointOnBaseDisk) < orientedPoint.distanceSquared(closestPointOnHull3D)) {
        closestPointOnHull3D = pointOnBaseDisk
      }
    }

    const finalLocalClosest = this.reorientPointFromYAxis(closestPointOnHull3D, axis)
    return worldTransform.multiplyPoint(finalLocalClosest)
  }

  private static closestBoxPointToPoint(
    shape: Shape,
    queryPoint: vec3,
    cachedData: CachedColliderData,
    collider: ColliderComponent
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    let localAABB: AABB

    // Determine the box's AABB
    if (collider.fitVisual && cachedData.aabb) {
      localAABB = cachedData.aabb
    } else {
      const boxShape = shape as BoxShape
      const halfSize = boxShape.size.uniformScale(0.5)
      localAABB = {min: halfSize.uniformScale(-1), max: halfSize}
    }

    // Transform the query point into the box's local space
    const localQueryPoint = inverseWorldTransform.multiplyPoint(queryPoint)
    // The closest point is found by clamping the local query point to the box's AABB
    const localClosestPoint = this.closestPointOnAABB(localAABB, localQueryPoint)

    return worldTransform.multiplyPoint(localClosestPoint)
  }

  private static closestSpherePointToPoint(
    shape: Shape,
    queryPoint: vec3,
    cachedData: CachedColliderData,
    collider: ColliderComponent
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot

    const localQueryPoint = inverseWorldTransform.multiplyPoint(queryPoint)

    const sphereShape = shape as SphereShape
    let localCenter = this.getVec3(0, 0, 0)
    let localRadius = sphereShape.radius

    // If fitting to visual, derive sphere properties from the AABB
    if (collider.fitVisual && cachedData.aabb) {
      const aabb = cachedData.aabb
      localCenter = aabb.min.add(aabb.max).uniformScale(0.5)
      const aabbSize = aabb.max.sub(aabb.min)
      localRadius = Math.max(aabbSize.x, aabbSize.y, aabbSize.z) * 0.5
    }

    // Project the query point from the sphere's center onto its surface
    const direction = localQueryPoint.sub(localCenter)
    let localClosestPoint: vec3

    if (direction.lengthSquared < EPSILON_SQUARED) {
      // The query point is at the center, return an arbitrary point on the surface
      localClosestPoint = localCenter.add(this.getVec3(0, localRadius, 0))
    } else {
      localClosestPoint = localCenter.add(direction.normalize().uniformScale(localRadius))
    }

    return worldTransform.multiplyPoint(localClosestPoint)
  }

  private static closestCylinderPointToPoint(
    shape: Shape,
    queryPoint: vec3,
    cachedData: CachedColliderData,
    _collider: ColliderComponent
  ): vec3 {
    const cylinderShape = shape as CylinderShape
    return this.calculateClosestPointOnCylinder(
      cylinderShape.axis,
      cylinderShape.radius,
      cylinderShape.length * 0.5,
      queryPoint,
      cachedData
    )
  }

  private static closestCapsulePointToPoint(
    shape: Shape,
    queryPoint: vec3,
    cachedData: CachedColliderData,
    _collider: ColliderComponent
  ): vec3 {
    const capsuleShape = shape as CapsuleShape
    return this.calculateClosestPointOnCapsule(
      capsuleShape.axis,
      capsuleShape.radius,
      capsuleShape.length * 0.5,
      queryPoint,
      cachedData
    )
  }

  private static closestConePointToPoint(
    shape: Shape,
    queryPoint: vec3,
    cachedData: CachedColliderData,
    _collider: ColliderComponent
  ): vec3 {
    const coneShape = shape as ConeShape
    return this.calculateClosestPointOnCone(coneShape.axis, coneShape.radius, coneShape.length, queryPoint, cachedData)
  }

  /**
   * Calculates an approximate closest point on a collider's surface to a line segment.
   *
   * This provides a fast, plausible result but is an approximation. Accuracy decreases for colliders with non-uniform
   * scaling, as the underlying math simplifies the geometry for performance.
   *
   * @param collider The collider component to calculate the closest point on.
   * @param segmentStart The start point of the line segment in world space.
   * @param segmentEnd The end point of the line segment in world space.
   * @returns The closest point on the collider's surface. A new vec3 instance.
   */
  static getClosestPointOnColliderToSegment(collider: ColliderComponent, segmentStart: vec3, segmentEnd: vec3): vec3 {
    this.resetPools()

    const cachedData = this.getOrCreateCacheEntry(collider)
    if (!cachedData) {
      return segmentStart
    }

    const calculator = this.closestPointToSegmentCalculators.get(collider.shape.getTypeName())
    if (calculator) {
      const result = calculator(collider, cachedData, segmentStart, segmentEnd)
      return new vec3(result.x, result.y, result.z)
    }

    const pos = cachedData.transformSnapshot.worldPosition
    return new vec3(pos.x, pos.y, pos.z)
  }

  private static closestBoxPointToSegment(
    collider: ColliderComponent,
    cachedData: CachedColliderData,
    segmentStart: vec3,
    segmentEnd: vec3
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const shape = collider.shape as BoxShape

    // For a BoxShape, the AABB is the box itself
    let localAABB: AABB
    if (collider.fitVisual && cachedData.aabb) {
      localAABB = cachedData.aabb
    } else {
      const halfSize = (cachedData.size ?? shape.size).uniformScale(0.5)
      localAABB = {min: halfSize.uniformScale(-1), max: halfSize}
    }

    // Transform segment into the box's local space
    const localSegmentStart = inverseWorldTransform.multiplyPoint(segmentStart)
    const localSegmentEnd = inverseWorldTransform.multiplyPoint(segmentEnd)
    const localSegmentVec = localSegmentEnd.sub(localSegmentStart)

    // Find line-AABB intersection using slab-clipping
    let tmin = 0.0
    let tmax = Infinity

    const segmentStartArr = [localSegmentStart.x, localSegmentStart.y, localSegmentStart.z]
    const segmentVecArr = [localSegmentVec.x, localSegmentVec.y, localSegmentVec.z]
    const aabbMinArr = [localAABB.min.x, localAABB.min.y, localAABB.min.z]
    const aabbMaxArr = [localAABB.max.x, localAABB.max.y, localAABB.max.z]

    for (let i = 0; i < 3; i++) {
      const startI = segmentStartArr[i]
      const dirI = segmentVecArr[i]
      const minI = aabbMinArr[i]
      const maxI = aabbMaxArr[i]

      if (Math.abs(dirI) < EPSILON) {
        // Line is parallel to slab, check if start point is inside
        if (startI < minI || startI > maxI) {
          tmin = 1 // Guarantees a miss
          tmax = 0
          break
        }
        continue
      }

      const invDir = 1.0 / dirI
      let t1 = (minI - startI) * invDir
      let t2 = (maxI - startI) * invDir

      // Ensure t1 is intersection with near plane, t2 with far plane
      if (t1 > t2) {
        const temp = t1
        t1 = t2
        t2 = temp
      }

      tmin = Math.max(tmin, t1)
      tmax = Math.min(tmax, t2)

      // Exit early if intersection interval is empty
      if (tmin > tmax) {
        break
      }
    }

    let localClosestPoint: vec3
    // Check if segment t-range [0,1] overlaps with line-box intersection t-range
    const segmentIntersects = tmin <= 1.0 && tmax >= 0.0 && tmin <= tmax

    if (segmentIntersects) {
      // Segment intersects box, closest point is the entry point
      const entry_t = Math.max(0, tmin)
      localClosestPoint = localSegmentStart.add(localSegmentVec.uniformScale(entry_t))
    } else {
      // Segment does not intersect box; find point on segment closest to the box
      let t_closest_on_segment: number
      if (tmax < 0) {
        // Box is "behind" segment start
        t_closest_on_segment = 0
      } else if (tmin > 1) {
        // Box is "ahead" of segment end
        t_closest_on_segment = 1
      } else {
        // Segment is alongside the box
        t_closest_on_segment = tmin > 0 ? tmin : tmax
      }

      const pointOnSegment = localSegmentStart.add(localSegmentVec.uniformScale(t_closest_on_segment))
      localClosestPoint = this.closestPointOnAABB(localAABB, pointOnSegment)
    }

    // Transform result back to world space
    return worldTransform.multiplyPoint(localClosestPoint)
  }

  private static closestSpherePointToSegment(
    collider: ColliderComponent,
    cachedData: CachedColliderData,
    segmentStart: vec3,
    segmentEnd: vec3
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot

    // Transform segment into the sphere's local space
    let localSegmentStart = inverseWorldTransform.multiplyPoint(segmentStart)
    let localSegmentEnd = inverseWorldTransform.multiplyPoint(segmentEnd)

    const shape = collider.shape as SphereShape

    // Determine local center and radius
    let localSphereCenter = vec3.zero()
    let sphereRadius = cachedData.radius ?? shape.radius

    if (collider.fitVisual && cachedData.aabb) {
      const aabb = cachedData.aabb
      const aabbSize = aabb.max.sub(aabb.min)
      sphereRadius = Math.max(aabbSize.x, aabbSize.y, aabbSize.z) * 0.5
      localSphereCenter = aabb.min.add(aabb.max).uniformScale(0.5)
      // Re-center segment relative to sphere's local center
      localSegmentStart = localSegmentStart.sub(localSphereCenter)
      localSegmentEnd = localSegmentEnd.sub(localSphereCenter)
    }

    // Find closest point on the segment to the sphere's center
    const segmentVec = localSegmentEnd.sub(localSegmentStart)
    const startToCenter = localSegmentStart.uniformScale(-1)

    // Parametric t for the closest point on the line
    const segmentLenSq = segmentVec.lengthSquared
    const t =
      segmentLenSq < EPSILON_SQUARED ? 0.0 : Math.max(0.0, Math.min(1.0, startToCenter.dot(segmentVec) / segmentLenSq))

    const closestPointOnSegment = segmentVec.uniformScale(t).add(localSegmentStart)
    const direction = closestPointOnSegment.uniformScale(1)

    // Project point onto sphere surface
    let localClosestPoint: vec3
    if (direction.lengthSquared < EPSILON_SQUARED) {
      // Closest point is the center, push out along an arbitrary axis
      if (segmentVec.lengthSquared > EPSILON_SQUARED) {
        localClosestPoint = segmentVec.normalize().uniformScale(sphereRadius)
      } else {
        localClosestPoint = this.getVec3(0, sphereRadius, 0)
      }
    } else {
      localClosestPoint = direction.normalize().uniformScale(sphereRadius)
    }

    // Add back center offset and transform to world space
    const localWithCenter =
      collider.fitVisual && cachedData.aabb ? localClosestPoint.add(localSphereCenter) : localClosestPoint
    return worldTransform.multiplyPoint(localWithCenter)
  }

  private static closestCylinderPointToSegment(
    collider: ColliderComponent,
    cachedData: CachedColliderData,
    segmentStart: vec3,
    segmentEnd: vec3
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const shape = collider.shape as CylinderShape
    let radius = cachedData.radius ?? shape.radius
    let halfLength = (cachedData.length ?? shape.length) * 0.5

    // Transform segment to local space
    const localSegmentStart = inverseWorldTransform.multiplyPoint(segmentStart)
    const localSegmentEnd = inverseWorldTransform.multiplyPoint(segmentEnd)

    // For fitVisual, derive dimensions from AABB and find center offset
    let orientedCenter = this.getVec3(0, 0, 0)
    if (collider.fitVisual && cachedData.aabb) {
      const aabb = cachedData.aabb
      const size = aabb.max.sub(aabb.min)
      switch (shape.axis) {
        case Axis.X:
          radius = Math.max(size.y, size.z) * 0.5
          halfLength = size.x * 0.5
          break
        case Axis.Z:
          radius = Math.max(size.x, size.y) * 0.5
          halfLength = size.z * 0.5
          break
        default:
          radius = Math.max(size.x, size.z) * 0.5
          halfLength = size.y * 0.5
          break
      }
      const localCenter = aabb.min.add(aabb.max).uniformScale(0.5)
      orientedCenter = this.orientPointToYAxis(localCenter, shape.axis)
    }

    // Orient segment to Y-axis and apply center offset
    let orientedSegmentStart = this.orientPointToYAxis(localSegmentStart, shape.axis)
    let orientedSegmentEnd = this.orientPointToYAxis(localSegmentEnd, shape.axis)
    if (collider.fitVisual && cachedData.aabb) {
      orientedSegmentStart = orientedSegmentStart.sub(orientedCenter)
      orientedSegmentEnd = orientedSegmentEnd.sub(orientedCenter)
    }

    // Handle degenerate segment
    const segmentVec = orientedSegmentEnd.sub(orientedSegmentStart)
    if (segmentVec.lengthSquared < EPSILON_SQUARED) {
      const orientedPoint = orientedSegmentStart
      const clampedY = Math.max(-halfLength, Math.min(orientedPoint.y, halfLength))
      let radialX = orientedPoint.x
      let radialZ = orientedPoint.z
      const radialDistSq = radialX * radialX + radialZ * radialZ
      if (radialDistSq > radius * radius || (orientedPoint.y >= -halfLength && orientedPoint.y <= halfLength)) {
        if (radialDistSq > EPSILON_SQUARED) {
          const scale = radius / Math.sqrt(radialDistSq)
          radialX *= scale
          radialZ *= scale
        } else {
          radialX = radius
        }
      }
      const orientedClosest = this.getVec3(radialX, clampedY, radialZ)
      const finalLocalClosest = this.reorientPointFromYAxis(orientedClosest, shape.axis)
      return worldTransform.multiplyPoint(finalLocalClosest)
    }

    // Define the cylinder's axis
    const axisStart = this.getVec3(0, -halfLength, 0)
    const axisEnd = this.getVec3(0, halfLength, 0)
    const axisVec = axisEnd.sub(axisStart)

    // Find closest point between query segment and cylinder axis
    const r = orientedSegmentStart.sub(axisStart)
    const a = segmentVec.lengthSquared
    const c = axisVec.lengthSquared
    const b = segmentVec.dot(axisVec)
    const d = segmentVec.dot(r)
    const det = a * c - b * b

    let t = 0
    if (det > EPSILON_SQUARED) {
      const e = axisVec.dot(r)
      const s = (b * d - a * e) / det
      if (s < 0) {
        t = -d / a
      } else if (s > 1) {
        t = (b - d) / a
      } else {
        t = (b * s - d) / a
      }
    } else {
      // Segments are parallel
      t = -d / a
    }

    // Find point on query segment and project it onto solid cylinder
    const clampedT = Math.max(0, Math.min(1, t))
    const orientedPoint = orientedSegmentStart.add(segmentVec.uniformScale(clampedT))
    const clampedY = Math.max(-halfLength, Math.min(orientedPoint.y, halfLength))
    const radialDistSq = orientedPoint.x * orientedPoint.x + orientedPoint.z * orientedPoint.z

    let radialX = orientedPoint.x
    let radialZ = orientedPoint.z

    // Push point to surface if it's outside cylinder radius or not on an end cap
    const isBeyondEnds = orientedPoint.y > halfLength || orientedPoint.y < -halfLength
    if (!isBeyondEnds || radialDistSq > radius * radius) {
      if (radialDistSq > EPSILON_SQUARED) {
        const scale = radius / Math.sqrt(radialDistSq)
        radialX *= scale
        radialZ *= scale
      } else {
        radialX = radius
        radialZ = 0
      }
    }

    const orientedClosest = this.getVec3(radialX, clampedY, radialZ)

    // Re-orient, add center offset, and transform to world space
    let finalLocalClosest = this.reorientPointFromYAxis(orientedClosest, shape.axis)
    if (collider.fitVisual && cachedData.aabb) {
      const localCenter = this.reorientPointFromYAxis(orientedCenter, shape.axis)
      finalLocalClosest = finalLocalClosest.add(localCenter)
    }
    return worldTransform.multiplyPoint(finalLocalClosest)
  }

  private static closestCapsulePointToSegment(
    collider: ColliderComponent,
    cachedData: CachedColliderData,
    segmentStart: vec3,
    segmentEnd: vec3
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const shape = collider.shape as CapsuleShape
    let radius = cachedData.radius ?? shape.radius
    let halfLength = (cachedData.length ?? shape.length) * 0.5

    // Transform segment to local space
    const localSegmentStart = inverseWorldTransform.multiplyPoint(segmentStart)
    const localSegmentEnd = inverseWorldTransform.multiplyPoint(segmentEnd)

    // For fitVisual, derive dimensions from AABB and find center offset
    let orientedCenter = this.getVec3(0, 0, 0)
    if (collider.fitVisual && cachedData.aabb) {
      const aabb = cachedData.aabb
      const size = aabb.max.sub(aabb.min)
      switch (shape.axis) {
        case Axis.X:
          radius = Math.max(size.y, size.z) * 0.5
          halfLength = size.x * 0.5
          break
        case Axis.Z:
          radius = Math.max(size.x, size.y) * 0.5
          halfLength = size.z * 0.5
          break
        default:
          radius = Math.max(size.x, size.z) * 0.5
          halfLength = size.y * 0.5
          break
      }
      const localCenter = aabb.min.add(aabb.max).uniformScale(0.5)
      orientedCenter = this.orientPointToYAxis(localCenter, shape.axis)
    }

    // Orient segment to Y-axis and apply center offset
    let orientedSegmentStart = this.orientPointToYAxis(localSegmentStart, shape.axis)
    let orientedSegmentEnd = this.orientPointToYAxis(localSegmentEnd, shape.axis)
    if (collider.fitVisual && cachedData.aabb) {
      orientedSegmentStart = orientedSegmentStart.sub(orientedCenter)
      orientedSegmentEnd = orientedSegmentEnd.sub(orientedCenter)
    }

    // Define capsule axis and query segment
    const axisStart = this.getVec3(0, -halfLength, 0)
    const axisEnd = this.getVec3(0, halfLength, 0)
    const segmentVec = orientedSegmentEnd.sub(orientedSegmentStart)
    const axisVec = axisEnd.sub(axisStart)

    let orientedPoint: vec3
    const segmentLenSq = segmentVec.lengthSquared
    if (segmentLenSq < EPSILON_SQUARED) {
      // Handle degenerate query segment
      orientedPoint = orientedSegmentStart
    } else {
      // Find closest point between query segment and capsule axis
      const r = orientedSegmentStart.sub(axisStart)
      const a = segmentLenSq
      const c = axisVec.lengthSquared
      const b = segmentVec.dot(axisVec)
      const d = segmentVec.dot(r)
      const det = a * c - b * b

      let t = 0
      if (det > EPSILON_SQUARED) {
        // Lines are not parallel
        const e = axisVec.dot(r)
        const s = (b * d - a * e) / det
        if (s < 0) {
          t = -d / a
        } else if (s > 1) {
          const rEnd = orientedSegmentStart.sub(axisEnd)
          t = -segmentVec.dot(rEnd) / a
        } else {
          t = (b * s - d) / a
        }
      } else {
        // Lines are parallel
        t = -d / a
      }

      const clampedT = Math.max(0, Math.min(1, t))
      orientedPoint = orientedSegmentStart.add(segmentVec.uniformScale(clampedT))
    }

    // Project this point onto the solid capsule surface
    let orientedClosest: vec3
    if (orientedPoint.y < -halfLength) {
      // Closest to bottom hemisphere
      const hemisphereCenter = this.getVec3(0, -halfLength, 0)
      orientedClosest = this.calculateClosestPointOnSphereSurface(hemisphereCenter, radius, orientedPoint)
    } else if (orientedPoint.y > halfLength) {
      // Closest to top hemisphere
      const hemisphereCenter = this.getVec3(0, halfLength, 0)
      orientedClosest = this.calculateClosestPointOnSphereSurface(hemisphereCenter, radius, orientedPoint)
    } else {
      // Closest to the central cylinder part
      let radialVec = this.getVec3(orientedPoint.x, 0, orientedPoint.z)
      if (radialVec.lengthSquared > EPSILON_SQUARED) {
        radialVec = radialVec.normalize().uniformScale(radius)
      } else {
        radialVec.x = radius // Point is on the axis, push it out
      }
      orientedClosest = this.getVec3(radialVec.x, orientedPoint.y, radialVec.z)
    }

    // Re-orient, add center offset, and transform to world space
    let finalLocalClosest = this.reorientPointFromYAxis(orientedClosest, shape.axis)
    if (collider.fitVisual && cachedData.aabb) {
      const localCenter = this.reorientPointFromYAxis(orientedCenter, shape.axis)
      finalLocalClosest = finalLocalClosest.add(localCenter)
    }
    return worldTransform.multiplyPoint(finalLocalClosest)
  }

  private static closestConePointToSegment(
    collider: ColliderComponent,
    cachedData: CachedColliderData,
    segmentStart: vec3,
    segmentEnd: vec3
  ): vec3 {
    const {transformSnapshot} = cachedData
    const {worldTransform, inverseWorldTransform} = transformSnapshot
    const shape = collider.shape as ConeShape
    let radius = cachedData.radius ?? shape.radius
    let length = cachedData.length ?? shape.length
    let halfLength = length * 0.5

    // Transform segment to local space
    const localSegmentStart = inverseWorldTransform.multiplyPoint(segmentStart)
    const localSegmentEnd = inverseWorldTransform.multiplyPoint(segmentEnd)

    // For fitVisual, derive dimensions from AABB and find center offset
    let orientedCenter = this.getVec3(0, 0, 0)
    if (collider.fitVisual && cachedData.aabb) {
      const aabb = cachedData.aabb
      const size = aabb.max.sub(aabb.min)
      switch (shape.axis) {
        case Axis.X:
          radius = Math.max(size.y, size.z) * 0.5
          length = size.x
          break
        case Axis.Z:
          radius = Math.max(size.x, size.y) * 0.5
          length = size.z
          break
        default:
          radius = Math.max(size.x, size.z) * 0.5
          length = size.y
          break
      }
      halfLength = length * 0.5
      const localCenter = aabb.min.add(aabb.max).uniformScale(0.5)
      orientedCenter = this.orientPointToYAxis(localCenter, shape.axis)
    }

    // Orient segment to Y-axis and apply center offset
    let orientedSegmentStart = this.orientPointToYAxis(localSegmentStart, shape.axis)
    let orientedSegmentEnd = this.orientPointToYAxis(localSegmentEnd, shape.axis)
    if (collider.fitVisual && cachedData.aabb) {
      orientedSegmentStart = orientedSegmentStart.sub(orientedCenter)
      orientedSegmentEnd = orientedSegmentEnd.sub(orientedCenter)
    }

    // Define cone axis (base to apex) and query segment
    const axisStart = this.getVec3(0, -halfLength, 0)
    const axisEnd = this.getVec3(0, halfLength, 0)
    const segmentVec = orientedSegmentEnd.sub(orientedSegmentStart)
    const axisVec = axisEnd.sub(axisStart)

    let orientedPoint: vec3
    const segmentLenSq = segmentVec.lengthSquared
    if (segmentLenSq < EPSILON_SQUARED) {
      // Handle degenerate query segment
      orientedPoint = orientedSegmentStart
    } else {
      // Find closest point between query segment and cone axis
      const r = orientedSegmentStart.sub(axisStart)
      const a = segmentLenSq
      const c = axisVec.lengthSquared
      const b = segmentVec.dot(axisVec)
      const d = segmentVec.dot(r)
      const det = a * c - b * b

      let t = 0
      if (det > EPSILON_SQUARED) {
        const e = axisVec.dot(r)
        const s = (b * d - a * e) / det
        if (s < 0) {
          t = -d / a
        } else if (s > 1) {
          const rEnd = orientedSegmentStart.sub(axisEnd)
          t = -segmentVec.dot(rEnd) / a
        } else {
          t = (b * s - d) / a
        }
      } else {
        t = -d / a
      }

      const clampedT = Math.max(0, Math.min(1, t))
      orientedPoint = orientedSegmentStart.add(segmentVec.uniformScale(clampedT))
    }

    // Project this point onto the solid cone surface
    // Reduce to 2D to find closest point on cone's hull profile
    const radialDist = Math.sqrt(orientedPoint.x * orientedPoint.x + orientedPoint.z * orientedPoint.z)
    const queryPoint2D = this.getVec2(radialDist, orientedPoint.y)
    const segA = this.getVec2(radius, -halfLength)
    const segB = this.getVec2(0, halfLength)
    const segVec2D = segB.sub(segA)

    let t2D = 0
    if (segVec2D.lengthSquared > EPSILON_SQUARED) {
      t2D = queryPoint2D.sub(segA).dot(segVec2D) / segVec2D.lengthSquared
    }
    const clampedT2D = Math.max(0, Math.min(1, t2D))
    const closestPointOnHull2D = segA.add(segVec2D.uniformScale(clampedT2D))

    // Reconstruct 3D point from 2D projection
    let closestPointOnHull3D: vec3
    if (radialDist > EPSILON) {
      const scale = closestPointOnHull2D.x / radialDist
      closestPointOnHull3D = this.getVec3(orientedPoint.x * scale, closestPointOnHull2D.y, orientedPoint.z * scale)
    } else {
      closestPointOnHull3D = this.getVec3(closestPointOnHull2D.x, closestPointOnHull2D.y, 0)
    }

    // Check if point is closer to the base disk
    if (orientedPoint.y < -halfLength) {
      const pointOnBaseDisk = this.getVec3(orientedPoint.x, -halfLength, orientedPoint.z)
      const baseDiskRadiusSq = pointOnBaseDisk.x * pointOnBaseDisk.x + pointOnBaseDisk.z * pointOnBaseDisk.z
      if (baseDiskRadiusSq > radius * radius) {
        const baseScale = radius / Math.sqrt(baseDiskRadiusSq)
        pointOnBaseDisk.x *= baseScale
        pointOnBaseDisk.z *= baseScale
      }

      if (orientedPoint.distanceSquared(pointOnBaseDisk) < orientedPoint.distanceSquared(closestPointOnHull3D)) {
        closestPointOnHull3D = pointOnBaseDisk
      }
    }

    // Re-orient, add center offset, and transform to world space
    let finalLocalClosest = this.reorientPointFromYAxis(closestPointOnHull3D, shape.axis)
    if (collider.fitVisual && cachedData.aabb) {
      const localCenter = this.reorientPointFromYAxis(orientedCenter, shape.axis)
      finalLocalClosest = finalLocalClosest.add(localCenter)
    }
    return worldTransform.multiplyPoint(finalLocalClosest)
  }
}
