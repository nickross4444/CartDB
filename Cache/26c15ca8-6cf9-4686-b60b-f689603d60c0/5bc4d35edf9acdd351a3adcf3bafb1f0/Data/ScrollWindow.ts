import {
  Interactable,
  InteractableEventArgs
} from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable"
import {Interactor} from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor"
import {InteractorEvent} from "SpectaclesInteractionKit.lspkg/Core/Interactor/InteractorEvent"
import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"
import {SIK} from "SpectaclesInteractionKit.lspkg/SIK"
import animate, {CancelSet} from "SpectaclesInteractionKit.lspkg/Utils/animate"
import Event, {PublicApi} from "SpectaclesInteractionKit.lspkg/Utils/Event"
import ReplayEvent from "SpectaclesInteractionKit.lspkg/Utils/ReplayEvent"
import {SpringAnimate} from "SpectaclesInteractionKit.lspkg/Utils/springAnimate"
import {Frustum} from "../../Utility/Frustum"
import {findAllChildComponents} from "../../Utility/SceneUtilities"
import {getElement} from "../../Utility/UIKitUtilities"

// a small number
const EPSILON = 0.0025
// time window for additive gestures
const GESTURE_ACCUMULATION_TIME_MS = 300
// minimum velocity to be considered for spring
const SIGNIFICANT_VELOCITY_THRESHOLD = 0.1
// how much to decay velocity when accumulating
const VELOCITY_DECAY_FACTOR = 0.7
// how fast to fling
const FLING_MULTIPLIER = 1
// how fast to slow
const FRICTION_FACTOR = 0.95
// how much overshoot is allowed max
const MAX_OVERSHOOT_FACTOR = 0.45
// Minimum velocity before lerping is applied
const MINIMUM_SCROLLING_VELOCITY = 0.15

type ScrollEventArg = {
  startPosition: vec2
  dragAmount: vec2
}

export type VisibleWindow = {
  bottomLeft: vec2
  topRight: vec2
}

/**
 * A low-level scrolling interaction solution for Spectacles.
 *
 * Children of this Component's SceneObject will be masked into windowSize and scrollable by scrollDimensions
 */
@component
export class ScrollWindow extends BaseScriptComponent {
  // inputs
  @input
  @hint("Enable Vertical Scrolling")
  vertical: boolean = true
  @input
  @hint("Enable Horizontal Scrolling")
  horizontal: boolean = false
  @input("vec2", "{32,32}")
  @hint(
    "Size of masked window viewport in local space. <br><br>Note: to set dynamically, use <code>setWindowSize</code>"
  )
  private windowSize: vec2 = new vec2(32, 32)
  @input("vec2", "{32,100}")
  @hint("Size of total scrollable area. <br><br>Note: to set dynamically, use <code>setScrollDimensions</code>")
  private scrollDimensions: vec2 = new vec2(32, 100)

  @input
  private _scrollSnapping: boolean = false

  @input
  @showIf("_scrollSnapping")
  private _snapRegion: vec2 = new vec2(8, 8)

  @input
  @hint("Add black fade to edges <code>(rendering trick for transparency)</code>")
  private edgeFade: boolean = false

  private initialized: boolean = false

  private _scrollingPaused: boolean = false
  get scrollingPaused(): boolean {
    return this._scrollingPaused
  }
  set scrollingPaused(scrollingPaused: boolean) {
    // reset accumulated velocity
    if (this.initialized && scrollingPaused) {
      this.cancelCurrentInteractor()
      this.accumulatedVelocity = vec3.zero()
      this.lastGestureEndTime = 0
    }
    this._scrollingPaused = scrollingPaused
  }

  // world camera
  private camera: WorldCameraFinderProvider = WorldCameraFinderProvider.getInstance()
  private cameraComponent = this.camera.getComponent()

  // scene object stuff
  private transform: Transform
  private screenTransform: ScreenTransform
  private collider: ColliderComponent
  private _interactable: Interactable
  private maskingComponent: MaskingComponent
  private rmv: RenderMeshVisual
  private mesh: RenderMesh = requireAsset("../../../Meshes/Unit Plane.mesh") as RenderMesh
  private material: Material = requireAsset("../../../Materials/ScrollWindowFadeMask.mat") as Material

  private managedSceneObjects: SceneObject[] = []
  private managedComponents: Component[] = []

  private scroller: SceneObject

  /**
   * transform of the object that does scroll movement
   */
  private scrollerTransform: Transform

  /**
   * frustum that handles helper viewport logic
   * use this to test if your content is visible
   */
  readonly frustum: Frustum = new Frustum()

  // scroll logic
  private startPosition: vec3 = vec3.zero()
  private interactorOffset: vec3 = vec3.zero()
  private interactorUpdated: boolean = false
  /**
   * The currently active interactor controlling this scroll window
   */
  private activeInteractor: Interactor | null = null
  /**
   * is currently dragging
   */
  private isDragging: boolean = false
  /**
   * is currently bouncing back
   */
  private velocity: vec3 = vec3.zero()
  private accumulatedVelocity: vec3 = vec3.zero()
  private lastPosition: vec3 = this.startPosition
  private lastGestureEndTime: number = 0
  private dragAmount: vec2 = vec2.zero()
  private onInitializedEvent: ReplayEvent<void> = new ReplayEvent()
  private scrollDragEvent: Event<ScrollEventArg> = new Event()
  private onScrollDimensionsUpdatedEvent: Event<vec2> = new Event()
  private onScrollPositionUpdatedEvent: Event<vec2> = new Event()

  private scrollTweenCancel = new CancelSet()

  readonly onInitialized: PublicApi<void> = this.onInitializedEvent.publicApi()
  /**
   * use this event to execute logic on drag
   */
  readonly onScrollDrag: PublicApi<ScrollEventArg> = this.scrollDragEvent.publicApi()

  /**
   * use this event to execute logic on scroll dimensions update
   */
  readonly onScrollDimensionsUpdated: PublicApi<vec2> = this.onScrollDimensionsUpdatedEvent.publicApi()

  /**
   * use this event to execute logic on scroll position update
   * - position is in local space
   */
  readonly onScrollPositionUpdated: PublicApi<vec2> = this.onScrollPositionUpdatedEvent.publicApi()

  /**
   * disable bounce back
   */
  hardStopAtEnds: boolean = false

  /**
   * When an Interactor hovers the ScrollWindow within this boundary (using normalized positions from -1 to 1),
   * all child ColliderComponents will be enabled.
   *
   * For example, if we provide a Rect with Rect.create(-1, 1, -0.8, 1),
   * hovering the bottom 10% of the ScrollWindow will not enable the child ColliderComponents.
   */
  enableChildCollidersBoundary: Rect = Rect.create(-1, 1, -1, 1)

  /**
   * turn on top secret debug visuals
   */
  private debugRender: boolean = false

  private colliderShape = Shape.createBoxShape()

  private spring = new SpringAnimate(150, 21, 1)

  private isSubscribedToEvents = false
  private eventUnsubscribes = []

  /**
   * get whether this scroll window is initialized
   */
  get isInitialized(): boolean {
    return this.initialized
  }

  /**
   * get the number of children in the content of scroll window
   */
  get children(): SceneObject[] {
    return this.scroller.children
  }

  /**
   * The Interactable component of this scroll window
   * @returns Interactable component
   */
  public get interactable(): Interactable {
    return this._interactable
  }

  /**
   * Whether this scroll window is using snap scrolling
   * @return true if snap scrolling is enabled, false otherwise
   */
  public get scrollSnapping(): boolean {
    return this._scrollSnapping
  }

  /**
   * Whether this scroll window is using snap scrolling
   * @param value - true to enable snap scrolling, false to disable
   */
  public set scrollSnapping(scrollSnapping: boolean) {
    if (scrollSnapping === undefined) {
      return
    }
    this._scrollSnapping = scrollSnapping
  }

  /**
   * The size of each snap segment in the scroll window
   * @returns vec2 of the size of each snap segment in local space.
   */
  public get snapRegion(): vec2 {
    return this._snapRegion
  }

  /**
   * The size of each snap segment in the scroll window
   * @param snapRegion - The size of each snap segment in local space.
   */
  public set snapRegion(snapRegion: vec2) {
    if (snapRegion === undefined) {
      return
    }
    this._snapRegion = snapRegion
  }

  /**
   * The scroll position in local space
   */
  get scrollPosition(): vec2 {
    const currentPosition = vec2.zero()
    const scrollerLocalPosition = this.scrollerTransform.getLocalPosition()
    currentPosition.x = scrollerLocalPosition.x
    currentPosition.y = scrollerLocalPosition.y
    return currentPosition
  }

  /**
   * The scroll position in local space
   */
  set scrollPosition(position: vec2) {
    if (position === undefined) {
      return
    }
    this.scrollTweenCancel()
    const scrollerLocalPosition = this.scrollerTransform.getLocalPosition()
    this.updateScrollerPosition(new vec3(position.x, position.y, scrollerLocalPosition.z))
  }

  /**
   * The scroll position in normalized space
   * -1, 1 on the x (left to right)
   * -1, 1 on the y (bottom to top)
   */
  get scrollPositionNormalized(): vec2 {
    const currentPosition = vec2.zero()
    const scrollerLocalPosition = this.scrollerTransform.getLocalPosition()

    currentPosition.x = scrollerLocalPosition.x / this.rightEdge
    currentPosition.y = scrollerLocalPosition.y / this.topEdge

    return currentPosition
  }

  /**
   * The scroll position in normalized space
   * -1, 1 on the x (left to right)
   * -1, 1 on the y (bottom to top)
   */
  set scrollPositionNormalized(position: vec2) {
    if (position === undefined) {
      return
    }
    this.scrollTweenCancel()
    const scrollerLocalPosition = this.scrollerTransform.getLocalPosition()
    scrollerLocalPosition.x = position.x * this.rightEdge
    scrollerLocalPosition.y = position.y * this.topEdge
    this.updateScrollerPosition(scrollerLocalPosition)
  }

  onAwake() {
    this.createEvent("OnEnableEvent").bind(() => {
      if (this.initialized) {
        this.subscribeToEvents(true)
        this.managedComponents.forEach((component) => {
          if (component) {
            component.enabled = true
          }
        })
      }
    })
    this.createEvent("OnDisableEvent").bind(() => {
      if (this.initialized) {
        this.subscribeToEvents(false)
        this.managedComponents.forEach((component) => {
          if (component) {
            component.enabled = false
          }
        })
        this.enableChildColliders(true)
      }
    })
    this.createEvent("OnDestroyEvent").bind(() => {
      this.scrollTweenCancel()
      this.scroller.children.forEach((child) => {
        child.setParent(this.sceneObject)
      })
      this.managedComponents.forEach((component) => {
        if (!isNull(component) && component) {
          component.destroy()
        }
      })
      this.managedComponents = []
      this.managedSceneObjects.forEach((sceneObject) => {
        if (!isNull(sceneObject) && sceneObject) {
          sceneObject.destroy()
        }
      })
      this.managedSceneObjects = []
    })
    this.createEvent("OnStartEvent").bind(this.initialize.bind(this))
    this.createEvent("LateUpdateEvent").bind(this.update.bind(this))
  }

  /*
   * adds object to this scroll window, sets parent to scroller
   */
  addObject(object: SceneObject): void {
    object.setParent(this.scroller ?? this.sceneObject)
  }

  /**
   *
   * @param size set masked window to this size in local space
   */
  setWindowSize = (size: vec2) => {
    this.windowSize = size
    this.screenTransform.anchors.left = this.windowSize.x * -0.5
    this.screenTransform.anchors.right = this.windowSize.x * 0.5
    this.screenTransform.anchors.bottom = this.windowSize.y * -0.5
    this.screenTransform.anchors.top = this.windowSize.y * 0.5
    if (this.edgeFade) {
      this.material.mainPass.windowSize = size
      this.material.mainPass.radius = this.maskingComponent.cornerRadius
    }
    this.colliderShape.size = new vec3(this.windowSize.x, this.windowSize.y, 1)
    this.collider.shape = this.colliderShape
  }

  /**
   *
   * @returns vec2 of this current window size
   */
  getWindowSize = (): vec2 => this.windowSize

  /**
   *
   * @param size set scrolling dimensions to this size in local space
   */
  setScrollDimensions = (size: vec2) => {
    this.scrollDimensions = size
    this.setWindowSize(this.windowSize)
    this.onScrollDimensionsUpdatedEvent.invoke(this.scrollDimensions)
  }

  /**
   *
   * @returns vec2 of current scroll dimensions
   */
  getScrollDimensions = (): vec2 => this.scrollDimensions

  /**
   *
   * @param enable enable or disable black fade masked edge
   */
  enableEdgeFade = (enable: boolean) => {
    this.edgeFade = enable
    if (enable && !this.rmv) {
      this.createEdgeFade()
    }
    this.rmv.enabled = enable
  }

  /**
   *
   * initializes script, runs once on creation
   */
  initialize = () => {
    if (this.initialized) return

    this.transform = this.sceneObject.getTransform()
    /**
     * when you create this, does it overwrite existing local transform?
     */
    this.screenTransform =
      this.sceneObject.getComponent("ScreenTransform") || this.sceneObject.createComponent("ScreenTransform")
    /**
     * like i gotta do this??
     */
    this.screenTransform.position = this.transform.getLocalPosition()
    this.collider =
      this.sceneObject.getComponent("ColliderComponent") || this.sceneObject.createComponent("ColliderComponent")
    this.managedComponents.push(this.collider)
    this.maskingComponent =
      this.sceneObject.getComponent("MaskingComponent") || this.sceneObject.createComponent("MaskingComponent")
    this.managedComponents.push(this.maskingComponent)
    this._interactable =
      this.sceneObject.getComponent(Interactable.getTypeName()) ||
      this.sceneObject.createComponent(Interactable.getTypeName())
    this.managedComponents.push(this._interactable)
    this._interactable.isScrollable = true

    if (this.edgeFade) {
      this.createEdgeFade()
    }

    this.setWindowSize(this.windowSize)

    this.collider.shape = this.colliderShape
    this.collider.fitVisual = false
    this.collider.debugDrawEnabled = this.debugRender

    this._interactable.enableInstantDrag = true

    const currentChildren = [...this.sceneObject.children]

    this.scroller = global.scene.createSceneObject("Scroller")
    this.managedSceneObjects.push(this.scroller)
    this.scroller.layer = this.sceneObject.layer
    this.scroller.setParent(this.sceneObject)
    this.scrollerTransform = this.scroller.getTransform()

    // move children under this.scroller
    for (let i = 0; i < currentChildren.length; i++) {
      const thisChild = currentChildren[i]
      thisChild.setParent(this.scroller)
    }

    this.subscribeToEvents(this.enabled)

    this.initialized = true
    this.onInitializedEvent.invoke()
  }

  private subscribeToEvents = (subscribe: boolean) => {
    const onHoverStart = (event: InteractorEvent) => {
      if (this.scrollingPaused) {
        return
      }
      const intersection = event.interactor.raycastPlaneIntersection(this._interactable)
      if (intersection) {
        const localIntersection = this.screenTransform.worldPointToLocalPoint(intersection)
        if (
          localIntersection.x < this.enableChildCollidersBoundary.left ||
          localIntersection.x > this.enableChildCollidersBoundary.right ||
          localIntersection.y < this.enableChildCollidersBoundary.bottom ||
          localIntersection.y > this.enableChildCollidersBoundary.top
        ) {
          event.stopPropagation()
        } else {
          this.enableChildColliders(true)
        }
      } else {
        this.enableChildColliders(false)
      }
    }

    const onHoverUpdate = (event: InteractorEvent) => {
      if (this.scrollingPaused) {
        return
      }
      const intersection = event.interactor.raycastPlaneIntersection(this._interactable)
      if (intersection) {
        const localIntersection = this.screenTransform.worldPointToLocalPoint(intersection)
        if (
          localIntersection.x < this.enableChildCollidersBoundary.left ||
          localIntersection.x > this.enableChildCollidersBoundary.right ||
          localIntersection.y < this.enableChildCollidersBoundary.bottom ||
          localIntersection.y > this.enableChildCollidersBoundary.top
        ) {
          event.stopPropagation()
        } else {
          this.enableChildColliders(true)
        }
      } else {
        this.enableChildColliders(false)
      }
    }

    const onHoverEnd = () => {
      this.enableChildColliders(false)
    }

    const onTriggerStart = (event: InteractorEvent) => {
      if (this.scrollingPaused) {
        return
      }

      // If there's already an active interactor, cancel it first
      if (this.activeInteractor && this.activeInteractor !== event.interactor) {
        this.cancelCurrentInteractor()
      }

      // Set new active interactor
      this.activeInteractor = event.interactor

      // Reset state for new interaction
      this.startPosition = this.scrollerTransform.getLocalPosition()
      this.lastPosition = this.startPosition
      this.interactorOffset = vec3.zero()
      this.velocity = vec3.zero()
      this.interactorUpdated = false
      this.dragAmount = vec2.zero()
    }

    const onTriggerCanceled = (event: InteractorEvent) => {
      // Only process cancellation from the active interactor
      if (this.activeInteractor !== event.interactor) {
        return
      }

      this.cancelCurrentInteractor()

      // Apply any accumulated velocity from previous gestures if we have momentum
      if (this.accumulatedVelocity.length > 0) {
        // Use existing accumulated velocity for continued scrolling
        this.spring.velocity = this.accumulatedVelocity.uniformScale(FLING_MULTIPLIER)
      } else {
        // No accumulated velocity, stop completely
        this.spring.velocity = vec3.zero()
      }
    }

    const onDragUpdate = (event: InteractorEvent) => {
      if (this.scrollingPaused) {
        return
      }

      if (this.activeInteractor?.inputType !== event.interactor.inputType) {
        return
      }

      if (event.interactor) {
        const interactedElement = getElement(event.interactor.currentInteractable.sceneObject)
        if (interactedElement && interactedElement.isDraggable && !interactedElement.inactive) {
          return
        }

        const raycastToWindow = event.interactor.raycastPlaneIntersection(this._interactable)
        if (raycastToWindow) {
          this.scrollTweenCancel()

          const interactorPos = this.transform
            .getInvertedWorldTransform()
            .multiplyPoint(event.interactor.raycastPlaneIntersection(this._interactable))

          if (!this.interactorUpdated) {
            this.interactorOffset = interactorPos
            this.interactorUpdated = true
            this.isDragging = true
            this.cancelChildInteraction(event)
          }

          this.dragAmount = interactorPos.sub(this.interactorOffset)

          let newPosition = this.startPosition.add(interactorPos.sub(this.interactorOffset))
          newPosition.z = 0

          // Overscroll logic for rubber band effect
          if (!this.hardStopAtEnds && this.isOutOfBounds(newPosition)) {
            const clampedBounds = this.getClampedBounds(newPosition)
            const overshootAmount = newPosition.sub(clampedBounds)
            const overshootWithResistance = this.applyOverscrollResistance(overshootAmount)
            newPosition = clampedBounds.add(overshootWithResistance)
          }

          this.updateScrollerPosition(newPosition)

          this.scrollDragEvent.invoke({
            startPosition: this.startPosition,
            dragAmount: this.dragAmount
          })

          if (event.target.sceneObject === this.sceneObject || event.propagationPhase === "BubbleUp") {
            const newVelocity = newPosition.sub(this.lastPosition)
            newVelocity.z = 0
            if (
              Math.abs(newVelocity.x) > SIGNIFICANT_VELOCITY_THRESHOLD ||
              Math.abs(newVelocity.y) > SIGNIFICANT_VELOCITY_THRESHOLD
            ) {
              this.velocity = newVelocity
            }
            this.lastPosition = newPosition
          }
        }
        const cursor = SIK.CursorController.getCursorByInteractor(event.interactor)
        if (cursor) {
          cursor.cursorPosition = event.interactor.planecastPoint
        }
      }
    }

    const onDragEnd = (event: InteractorEvent) => {
      if (this.activeInteractor !== event.interactor) {
        return
      }

      this.activeInteractor = null
      this.isDragging = false

      if (event.target.sceneObject !== this.sceneObject) {
        const interactedElement = getElement(event.target.sceneObject)
        if (!interactedElement?.isDraggable) {
          event.stopPropagation()
        }
      }

      const currentTime = getTime() * 1000 // Convert to milliseconds
      const timeSinceLastGesture = currentTime - this.lastGestureEndTime
      // Check if this gesture is within the accumulation time window
      if (timeSinceLastGesture <= GESTURE_ACCUMULATION_TIME_MS) {
        // Check if velocities are in the same direction
        const currentDirection = {
          x: Math.sign(this.velocity.x),
          y: Math.sign(this.velocity.y)
        }
        const accumulatedDirection = {
          x: Math.sign(this.accumulatedVelocity.x),
          y: Math.sign(this.accumulatedVelocity.y)
        }

        // Only accumulate if directions match (or accumulated velocity is zero)
        const shouldAccumulateX = this.accumulatedVelocity.x === 0 || currentDirection.x === accumulatedDirection.x
        const shouldAccumulateY = this.accumulatedVelocity.y === 0 || currentDirection.y === accumulatedDirection.y

        if (shouldAccumulateX || shouldAccumulateY) {
          // Apply decay to previous accumulated velocity based on time
          const timeFactor = 1 - timeSinceLastGesture / GESTURE_ACCUMULATION_TIME_MS
          const decayFactor = VELOCITY_DECAY_FACTOR * timeFactor

          // Accumulate velocities for matching directions
          const newAccumulatedVelocity = vec3.zero()

          if (shouldAccumulateX) {
            newAccumulatedVelocity.x = this.accumulatedVelocity.x * decayFactor + this.velocity.x
          } else {
            newAccumulatedVelocity.x = this.velocity.x
          }

          if (shouldAccumulateY) {
            newAccumulatedVelocity.y = this.accumulatedVelocity.y * decayFactor + this.velocity.y
          } else {
            newAccumulatedVelocity.y = this.velocity.y
          }

          this.accumulatedVelocity = newAccumulatedVelocity
        } else {
          // Direction changed, start fresh
          this.accumulatedVelocity = this.velocity
        }
      } else {
        // Too much time passed, start fresh
        this.accumulatedVelocity = this.velocity
      }

      // Apply the accumulated velocity to spring
      this.spring.velocity = this.accumulatedVelocity.uniformScale(FLING_MULTIPLIER)
      this.lastGestureEndTime = currentTime

      const cursor = SIK.CursorController.getCursorByInteractor(event.interactor)
      if (cursor) {
        cursor.cursorPosition = null
      }
    }

    if (this.isSubscribedToEvents === subscribe) return
    this.isSubscribedToEvents = subscribe
    if (subscribe) {
      this.eventUnsubscribes = [
        this._interactable.onHoverEnter.add(onHoverStart.bind(this)),
        this._interactable.onHoverUpdate.add(onHoverUpdate.bind(this)),
        this._interactable.onHoverExit.add(onHoverEnd.bind(this)),
        this._interactable.onInteractorTriggerStart.add(onTriggerStart.bind(this)),
        this._interactable.onTriggerCanceled.add(onTriggerCanceled.bind(this)),
        this._interactable.onDragUpdate.add(onDragUpdate.bind(this)),
        this._interactable.onDragEnd.add(onDragEnd.bind(this))
      ]
    } else {
      this.eventUnsubscribes.forEach((unsubscribe) => unsubscribe())
      this.eventUnsubscribes = []
    }
  }

  /**
   * helper function to tween scroll
   * @param position final position
   * @param time duration of tweened scroll in milliseconds
   */
  tweenTo = (position: vec2, time: number) => {
    this.scrollTweenCancel()
    this.spring.velocity = vec3.zero()
    const scrollerLocalPosition = this.scrollerTransform.getLocalPosition()
    const finalPosition = new vec3(position.x, position.y, scrollerLocalPosition.z)

    animate({
      duration: time * 0.001,
      update: (t) => {
        this.updateScrollerPosition(vec3.lerp(scrollerLocalPosition, finalPosition, t))
      },
      cancelSet: this.scrollTweenCancel,
      easing: "ease-in-out-quad"
    })
  }

  /**
   * get viewable window of local space at zero depth
   * -windowSize.x/2, windowSize.x/2 on the x (left to right)
   * -windowSize.y/2, windowSize.=/2 on the x (bottom to top)
   * @returns vec4 where x,y are bottom left corner, and z, w are top right corner
   */
  getVisibleWindow(): VisibleWindow {
    const visibleWindow: VisibleWindow = {
      bottomLeft: vec2.zero(),
      topRight: vec2.zero()
    }
    const scrollerLocalPosition = this.scrollerTransform.getLocalPosition()
    visibleWindow.bottomLeft.x = -scrollerLocalPosition.x - this.windowSize.x * 0.5
    visibleWindow.bottomLeft.y = -scrollerLocalPosition.y - this.windowSize.y * 0.5
    visibleWindow.topRight.x = -scrollerLocalPosition.x + this.windowSize.x * 0.5
    visibleWindow.topRight.y = -scrollerLocalPosition.y + this.windowSize.y * 0.5
    return visibleWindow
  }

  /**
   * get viewable window of local space at zero depth
   * -1, 1 on the x (left to right)
   * -1, 1 on the x (bottom to top)
   * @returns vec4 where x,y are bottom left corner, and z, w are top right corner
   */
  getVisibleWindowNormalized(): VisibleWindow {
    const visibleWindow: VisibleWindow = this.getVisibleWindow()
    visibleWindow.bottomLeft.x /= this.scrollDimensions.x * 0.5
    visibleWindow.bottomLeft.y /= this.scrollDimensions.y * 0.5
    visibleWindow.topRight.x /= this.scrollDimensions.x * 0.5
    visibleWindow.topRight.y /= this.scrollDimensions.y * 0.5
    return visibleWindow
  }

  private get topEdge(): number {
    return this.scrollDimensions.y * -0.5 + this.windowSize.y * 0.5
  }

  private get bottomEdge(): number {
    return this.scrollDimensions.y * 0.5 - this.windowSize.y * 0.5
  }

  private get leftEdge(): number {
    return this.scrollDimensions.x * 0.5 - this.windowSize.x * 0.5
  }

  private get rightEdge(): number {
    return this.scrollDimensions.x * -0.5 + this.windowSize.x * 0.5
  }

  private getClampedBounds(scrollPos: vec3): vec3 {
    return new vec3(
      this.scrollDimensions.x > this.windowSize.x
        ? MathUtils.clamp(scrollPos.x, this.rightEdge, this.leftEdge)
        : scrollPos.x,
      this.scrollDimensions.y > this.windowSize.y
        ? MathUtils.clamp(scrollPos.y, this.topEdge, this.bottomEdge)
        : scrollPos.y,
      0
    )
  }

  private isOutOfBounds(scrollPos: vec3): boolean {
    const clamped = this.getClampedBounds(scrollPos)
    return (
      Math.abs(scrollPos.x - clamped.x) > EPSILON ||
      Math.abs(scrollPos.y - clamped.y) > EPSILON ||
      Math.abs(scrollPos.z - clamped.z) > EPSILON
    )
  }

  /**
   *
   * @returns current fling velocity
   */
  readonly getVelocity = (): vec3 => this.spring.velocity

  setVelocity = (velocity: vec2): void => {
    this.spring.velocity = new vec3(velocity.x, velocity.y, this.spring.velocityZ)
  }

  private enableChildColliders = (enable: boolean): void => {
    const childColliders: ColliderComponent[] = findAllChildComponents(
      this.sceneObject,
      "ColliderComponent"
    ) as ColliderComponent[]

    for (let i = 0; i < childColliders.length; i++) {
      const collider = childColliders[i]
      if (collider === this.collider) continue
      collider.enabled = enable
    }
  }

  private cancelCurrentInteractor = () => {
    this.activeInteractor = null
    this.isDragging = false
    this.interactorUpdated = false
    this.velocity = vec3.zero()
    this.dragAmount = vec2.zero()
    this.interactorOffset = vec3.zero()
    this.enableChildColliders(false)
    this.scrollTweenCancel()

    // Reset spring state to prevent overflow corruption during pause
    this.spring.velocity = vec3.zero()

    // If we're out of bounds, snap back to clamped position immediately
    if (!this.hardStopAtEnds) {
      const currentPosition = this.scrollerTransform.getLocalPosition()
      if (this.isOutOfBounds(currentPosition)) {
        const clampedPosition = this.getClampedBounds(currentPosition)
        this.updateScrollerPosition(clampedPosition)
      }
    }
  }

  private cancelChildInteraction = (e: InteractableEventArgs) => {
    const childInteractables: Interactable[] = findAllChildComponents(
      this.sceneObject,
      Interactable.getTypeName() as unknown as keyof ComponentNameMap
    ) as Interactable[]

    for (let i = 0; i < childInteractables.length; i++) {
      const interactable = childInteractables[i]
      if (interactable === this._interactable) continue
      interactable.triggerCanceled(e)
    }
  }

  private createEdgeFade = () => {
    this.rmv = this.sceneObject.getComponent("RenderMeshVisual") || this.sceneObject.createComponent("RenderMeshVisual")
    this.managedComponents.push(this.rmv)
    this.rmv.mesh = this.mesh
    this.material = this.material.clone()
    this.rmv.mainMaterial = this.material
  }

  private updateScrollerPosition = (newPosition: vec3): vec3 => {
    const currentPos = this.scrollerTransform.getLocalPosition()
    if (this.hardStopAtEnds) {
      if (this.scrollDimensions.y !== -1 && (newPosition.y < this.topEdge || newPosition.y > this.bottomEdge)) {
        newPosition.y = currentPos.y
      }
      if (this.scrollDimensions.x !== -1 && (newPosition.x > this.leftEdge || newPosition.x < this.rightEdge)) {
        newPosition.x = currentPos.x
      }
    }
    if (!this.horizontal) newPosition.x = currentPos.x
    if (!this.vertical) newPosition.y = currentPos.y
    this.scrollerTransform.setLocalPosition(newPosition)
    this.onScrollPositionUpdatedEvent.invoke(new vec2(newPosition.x, newPosition.y))
    return newPosition
  }

  private applyOverscrollResistance(displacement: vec3): vec3 {
    const maxOverscroll = new vec2(this.windowSize.x * MAX_OVERSHOOT_FACTOR, this.windowSize.y * MAX_OVERSHOOT_FACTOR)

    const resistedX = (maxOverscroll.x * displacement.x) / (maxOverscroll.x + Math.abs(displacement.x))
    const resistedY = (maxOverscroll.y * displacement.y) / (maxOverscroll.y + Math.abs(displacement.y))

    return new vec3(resistedX, resistedY, 0)
  }

  private update = () => {
    const scale = this.transform.getWorldScale()

    // calculate frustum visible through scroll window
    this.frustum.setFromNearPlane(
      this.camera,
      this.cameraComponent.far,
      new vec2(
        (this.screenTransform.anchors.right - this.screenTransform.anchors.left) * scale.x,
        (this.screenTransform.anchors.top - this.screenTransform.anchors.bottom) * scale.y
      ),
      this.transform
    )

    if (this.debugRender) {
      this.frustum.render()
    }

    /**
     * If the scroll window is scrollingPaused, don't update the scroll position
     * and do not update the scroller position or velocity
     */
    if (this.scrollingPaused) return

    if (
      (this.horizontal && (this.scrollDimensions.x === -1 || this.scrollDimensions.x > this.windowSize.x)) ||
      (this.vertical && (this.scrollDimensions.y === -1 || this.scrollDimensions.y > this.windowSize.y))
    ) {
      // overshoot logic
      if (!this.isDragging && !this.hardStopAtEnds) {
        let cScrollPosition = this.scrollerTransform.getLocalPosition()
        const clamped = this.getClampedBounds(cScrollPosition)

        const isOutOfBounds = this.isOutOfBounds(cScrollPosition)

        if (isOutOfBounds) {
          this.spring.evaluate(cScrollPosition, clamped, cScrollPosition)

          const isNowInBounds = !this.isOutOfBounds(cScrollPosition)
          if (isNowInBounds) {
            this.updateScrollerPosition(clamped)
            this.spring.velocity = vec3.zero()
          } else {
            this.updateScrollerPosition(cScrollPosition)
          }
        } else {
          let scrollPositionUpdated = false
          if (this.horizontal) {
            if (this.scrollSnapping && this.snapRegion.x > 0) {
              // Calculate current page index (handle negative positions correctly)
              const currentPageFloat = this.scrollPosition.x / this.snapRegion.x
              let currentPageIndex = Math.round(currentPageFloat)
              if (this.spring.velocityX > 0) {
                currentPageIndex = Math.floor(currentPageFloat)
              } else if (this.spring.velocityX < 0) {
                currentPageIndex = Math.ceil(currentPageFloat)
              }

              // Calculate how far the current velocity can take us
              let targetPageIndex = currentPageIndex
              if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY) {
                // Calculate maximum reachable distance with current velocity
                const initialVelocity = Math.abs(this.spring.velocityX)
                const totalReachableDistance = initialVelocity / (1 - FRICTION_FACTOR)

                // Determine how many pages we can reach
                const reachablePages = Math.floor(totalReachableDistance / this.snapRegion.x)

                // Set target based on velocity direction
                if (this.spring.velocityX > 0) {
                  // Moving right - target the farthest reachable page in that direction
                  targetPageIndex = currentPageIndex + Math.max(1, reachablePages)
                } else {
                  // Moving left - target the farthest reachable page in that direction
                  targetPageIndex = currentPageIndex - Math.max(1, reachablePages)
                }
              } else if (Math.abs(this.spring.velocityX) > 0) {
                // Low velocity - snap to nearest page
                if (this.spring.velocityX > 0) {
                  targetPageIndex = Math.ceil(currentPageFloat)
                } else if (this.spring.velocityX < 0) {
                  targetPageIndex = Math.floor(currentPageFloat)
                }
              }

              const targetPos = targetPageIndex * this.snapRegion.x
              const distanceToTarget = targetPos - this.scrollPosition.x
              const absDistanceToTarget = Math.abs(distanceToTarget)

              if (
                Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY &&
                absDistanceToTarget > this.snapRegion.x
              ) {
                // Use proportional velocity reduction to prevent overshooting
                let adjustedVelocity = this.spring.velocityX * FRICTION_FACTOR

                // If we're close to the target, reduce velocity more aggressively
                if (absDistanceToTarget < this.snapRegion.x) {
                  const proximityFactor = absDistanceToTarget / this.snapRegion.x
                  adjustedVelocity *= proximityFactor
                }

                // Ensure we don't overshoot the target
                if (Math.abs(adjustedVelocity) > absDistanceToTarget) {
                  adjustedVelocity = Math.sign(distanceToTarget) * absDistanceToTarget
                }

                this.spring.velocity = new vec3(adjustedVelocity, this.spring.velocityY, this.spring.velocityZ)
                cScrollPosition = cScrollPosition.add(new vec3(adjustedVelocity, 0, 0))
                scrollPositionUpdated = true
              } else if (Math.abs(this.spring.velocityX) > 0 || absDistanceToTarget > 0) {
                // Low velocity or very close to target - tween for smooth finish
                // Stop current velocity to prevent conflicts
                this.spring.velocity = new vec3(0, this.spring.velocityY, this.spring.velocityZ)

                // Calculate appropriate tween duration based on remaining distance
                const baseDuration = 250 // Base duration in ms
                const maxDuration = 500 // Maximum duration
                const minDuration = 100 // Minimum duration

                const duration = MathUtils.clamp(
                  baseDuration * (absDistanceToTarget / this.snapRegion.x),
                  minDuration,
                  maxDuration
                )

                // Tween to the exact target position
                this.tweenTo(new vec2(targetPos, this.scrollPosition.y), duration)
                scrollPositionUpdated = true
              }
            } else {
              if (Math.abs(this.spring.velocityX) > MINIMUM_SCROLLING_VELOCITY) {
                const velX = this.spring.velocityX * FRICTION_FACTOR
                this.spring.velocity = new vec3(velX, this.spring.velocityY, this.spring.velocityZ)
                cScrollPosition = cScrollPosition.add(new vec3(velX, 0, 0))
                scrollPositionUpdated = true
              } else if (Math.abs(this.spring.velocityX) > 0) {
                this.spring.velocity = new vec3(0, this.spring.velocityY, this.spring.velocityZ)
                cScrollPosition = new vec3(clamped.x, cScrollPosition.y, cScrollPosition.z)
                scrollPositionUpdated = true
              }
            }
          }
          if (this.vertical) {
            if (this.scrollSnapping && this.snapRegion.y > 0) {
              // Calculate current page index (handle negative positions correctly)
              const currentPageFloat = this.scrollPosition.y / this.snapRegion.y
              let currentPageIndex = Math.round(currentPageFloat)
              if (this.spring.velocityY > 0) {
                currentPageIndex = Math.floor(currentPageFloat)
              } else if (this.spring.velocityY < 0) {
                currentPageIndex = Math.ceil(currentPageFloat)
              }

              // Calculate how far the current velocity can take us
              let targetPageIndex = currentPageIndex
              if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY) {
                // Calculate maximum reachable distance with current velocity
                const initialVelocity = Math.abs(this.spring.velocityY)
                const totalReachableDistance = initialVelocity / (1 - FRICTION_FACTOR)

                // Determine how many pages we can reach
                const reachablePages = Math.floor(totalReachableDistance / this.snapRegion.y)

                // Set target based on velocity direction
                if (this.spring.velocityY > 0) {
                  // Moving up - target the farthest reachable page in that direction
                  targetPageIndex = currentPageIndex + Math.max(1, reachablePages)
                } else {
                  // Moving down - target the farthest reachable page in that direction
                  targetPageIndex = currentPageIndex - Math.max(1, reachablePages)
                }
              } else if (Math.abs(this.spring.velocityY) > 0) {
                // Low velocity - snap to nearest page
                if (this.spring.velocityY > 0) {
                  targetPageIndex = Math.ceil(currentPageFloat)
                } else if (this.spring.velocityY < 0) {
                  targetPageIndex = Math.floor(currentPageFloat)
                }
              }

              const targetPos = targetPageIndex * this.snapRegion.y
              const distanceToTarget = targetPos - this.scrollPosition.y
              const absDistanceToTarget = Math.abs(distanceToTarget)

              if (
                Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY &&
                absDistanceToTarget > this.snapRegion.y
              ) {
                // Use proportional velocity reduction to prevent overshooting
                let adjustedVelocity = this.spring.velocityY * FRICTION_FACTOR

                // If we're close to the target, reduce velocity more aggressively
                if (absDistanceToTarget < this.snapRegion.y) {
                  const proximityFactor = absDistanceToTarget / this.snapRegion.y
                  adjustedVelocity *= proximityFactor
                }
                // Ensure we don't overshoot the target
                if (Math.abs(adjustedVelocity) > absDistanceToTarget) {
                  adjustedVelocity = Math.sign(distanceToTarget) * absDistanceToTarget
                }
                this.spring.velocity = new vec3(this.spring.velocityX, adjustedVelocity, this.spring.velocityZ)
                cScrollPosition = cScrollPosition.add(new vec3(0, adjustedVelocity, 0))
                scrollPositionUpdated = true
              } else if (Math.abs(this.spring.velocityY) > 0 || absDistanceToTarget > 0) {
                // Low velocity or very close to target - tween for smooth finish
                // Stop current velocity to prevent conflicts
                this.spring.velocity = new vec3(this.spring.velocityX, 0, this.spring.velocityZ)

                // Calculate appropriate tween duration based on remaining distance
                const baseDuration = 250 // Base duration in ms
                const maxDuration = 500 // Maximum duration
                const minDuration = 100 // Minimum duration

                const duration = MathUtils.clamp(
                  baseDuration * (absDistanceToTarget / this.snapRegion.y),
                  minDuration,
                  maxDuration
                )

                // Tween to the exact target position
                this.tweenTo(new vec2(this.scrollPosition.x, targetPos), duration)
                scrollPositionUpdated = true
              }
            } else {
              if (Math.abs(this.spring.velocityY) > MINIMUM_SCROLLING_VELOCITY) {
                const velY = this.spring.velocityY * FRICTION_FACTOR
                this.spring.velocity = new vec3(this.spring.velocityX, velY, this.spring.velocityZ)
                cScrollPosition = cScrollPosition.add(new vec3(0, velY, 0))
                scrollPositionUpdated = true
              } else if (Math.abs(this.spring.velocityY) > 0) {
                this.spring.velocity = new vec3(this.spring.velocityX, 0, this.spring.velocityZ)
                cScrollPosition = new vec3(cScrollPosition.x, clamped.y, cScrollPosition.z)
                scrollPositionUpdated = true
              }
            }
          }

          if (scrollPositionUpdated) {
            this.updateScrollerPosition(cScrollPosition)
          }
        }
      }
    }
  }
}
