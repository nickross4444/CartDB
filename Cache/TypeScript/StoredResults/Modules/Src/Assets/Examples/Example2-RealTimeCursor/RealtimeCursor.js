"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeCursor = void 0;
var __selfType = requireType("./RealtimeCursor");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const supabase_snapcloud_1 = require("SupabaseClient.lspkg/supabase-snapcloud");
let RealtimeCursor = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var RealtimeCursor = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Supabase Configuration
            this.snapCloudRequirements = this.snapCloudRequirements;
            this.channelName = this.channelName;
            // Mode Toggle Button
            this.toggleModeButton = this.toggleModeButton;
            // Cursor Object
            this.cursorObject = this.cursorObject;
            // Status Display
            this.modeText = this.modeText;
            this.statusText = this.statusText;
            // Broadcasting Configuration
            this.broadcastInterval = this.broadcastInterval;
            // Following Configuration
            this.movementSpeed = this.movementSpeed;
            this.movementScale = this.movementScale;
            this.cursorZPosition = this.cursorZPosition;
            this.heightOffset = this.heightOffset;
            // Coordinate Mapping Parameters
            this.lsXRange = this.lsXRange;
            this.lsYRange = this.lsYRange;
            this.coordinateScale = this.coordinateScale;
            this.perspectiveScale = this.perspectiveScale;
            this.invertX = this.invertX;
            this.invertY = this.invertY;
            // Debug
            this.enableDebugLogs = this.enableDebugLogs;
            this.verboseLogging = this.verboseLogging;
            this.logFrequency = this.logFrequency;
            this.isInitialized = false;
            this.userColor = "#4ECDC4";
            // Mode management - DEFAULT IS BROADCAST
            this.isBroadcastMode = true; // true = broadcast, false = follow
            // Broadcast mode variables
            this.lastBroadcastTime = 0;
            this.broadcastCount = 0;
            // Follow mode variables
            this.targetPosition = vec3.zero();
            this.currentPosition = vec3.zero();
            this.lastCursorUpdate = 0;
            // Status
            this.statusMessages = [];
            this.maxStatusLines = 8;
        }
        __initialize() {
            super.__initialize();
            // Supabase Configuration
            this.snapCloudRequirements = this.snapCloudRequirements;
            this.channelName = this.channelName;
            // Mode Toggle Button
            this.toggleModeButton = this.toggleModeButton;
            // Cursor Object
            this.cursorObject = this.cursorObject;
            // Status Display
            this.modeText = this.modeText;
            this.statusText = this.statusText;
            // Broadcasting Configuration
            this.broadcastInterval = this.broadcastInterval;
            // Following Configuration
            this.movementSpeed = this.movementSpeed;
            this.movementScale = this.movementScale;
            this.cursorZPosition = this.cursorZPosition;
            this.heightOffset = this.heightOffset;
            // Coordinate Mapping Parameters
            this.lsXRange = this.lsXRange;
            this.lsYRange = this.lsYRange;
            this.coordinateScale = this.coordinateScale;
            this.perspectiveScale = this.perspectiveScale;
            this.invertX = this.invertX;
            this.invertY = this.invertY;
            // Debug
            this.enableDebugLogs = this.enableDebugLogs;
            this.verboseLogging = this.verboseLogging;
            this.logFrequency = this.logFrequency;
            this.isInitialized = false;
            this.userColor = "#4ECDC4";
            // Mode management - DEFAULT IS BROADCAST
            this.isBroadcastMode = true; // true = broadcast, false = follow
            // Broadcast mode variables
            this.lastBroadcastTime = 0;
            this.broadcastCount = 0;
            // Follow mode variables
            this.targetPosition = vec3.zero();
            this.currentPosition = vec3.zero();
            this.lastCursorUpdate = 0;
            // Status
            this.statusMessages = [];
            this.maxStatusLines = 8;
        }
        onAwake() {
            this.log("RealtimeCursor (Unified WebSocket) awakening...");
            // Initialize cursor position
            if (this.cursorObject) {
                this.currentPosition = this.cursorObject.getTransform().getLocalPosition();
                this.targetPosition = this.currentPosition;
            }
            // Get camera reference
            this.cameraTransform = this.getSceneObject().getParent()?.getTransform() ||
                this.getSceneObject().getTransform();
            this.createEvent("OnStartEvent").bind(() => {
                this.initializeSupabase();
            });
            // Create update event for follow mode
            let updateEventFrameCount = 0;
            this.createEvent("UpdateEvent").bind(() => {
                if (!this.isBroadcastMode) {
                    this.updateFollowMode();
                    // Log first few frames to confirm UpdateEvent is running
                    updateEventFrameCount++;
                    if (updateEventFrameCount <= 3) {
                        this.log(`UpdateEvent running in FOLLOW mode (frame ${updateEventFrameCount})`);
                    }
                }
                else {
                    updateEventFrameCount = 0; // Reset when in broadcast mode
                }
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this.cleanup();
            });
        }
        /**
         * Initialize Supabase client and realtime connection
         */
        async initializeSupabase() {
            if (!this.snapCloudRequirements || !this.snapCloudRequirements.isConfigured()) {
                this.log("SnapCloudRequirements not configured");
                return;
            }
            try {
                // Create Supabase client
                this.client = (0, supabase_snapcloud_1.createClient)(this.snapCloudRequirements.getSupabaseUrl(), this.snapCloudRequirements.getSupabasePublicToken());
                if (!this.client) {
                    this.log("Failed to create Supabase client");
                    return;
                }
                // Sign in user
                await this.signInUser();
                // Initialize user data
                this.userId = "spectacles_" + Math.random().toString(36).substr(2, 9);
                // Setup realtime channel
                await this.setupRealtimeChannel();
                this.isInitialized = true;
                this.log("Supabase WebSocket initialized");
                // Setup button interaction
                this.setupButtonInteraction();
                // Start in broadcast mode by default
                this.switchToBroadcastMode();
            }
            catch (error) {
                this.log(`Initialization error: ${error}`);
            }
        }
        /**
         * Sign in user with Snapchat provider
         */
        async signInUser() {
            const { data, error } = await this.client.auth.signInWithIdToken({
                provider: "snapchat",
                token: "spectacles-auth-token"
            });
            if (error) {
                this.log("Sign in warning: " + JSON.stringify(error));
            }
            else {
                this.log("User signed in successfully");
            }
        }
        /**
         * Setup Supabase Realtime channel
         */
        async setupRealtimeChannel() {
            this.realtimeChannel = this.client.channel(`cursor-${this.channelName}`, {
                config: {
                    broadcast: { self: false } // Don't receive own broadcasts
                }
            });
            // Listen for cursor movements from PC
            let cursorMessageCount = 0;
            this.realtimeChannel
                .on("broadcast", { event: "cursor-move" }, (msg) => {
                const fromPC = msg.payload.user_id && msg.payload.user_id.startsWith('pc_');
                // Only process if we're in follow mode and it's from PC
                if (!this.isBroadcastMode && fromPC) {
                    cursorMessageCount++;
                    // Log first few messages to confirm it's working
                    if (cursorMessageCount <= 3) {
                        this.log(`Received cursor from PC #${cursorMessageCount}`);
                    }
                    this.handleIncomingCursor(msg.payload);
                }
            })
                .on("broadcast", { event: "control-mode" }, (msg) => {
                this.log(`Control mode signal received: ${msg.payload.mode} from ${msg.payload.user_id}`);
            });
            // Subscribe to channel
            this.realtimeChannel.subscribe(async (status) => {
                this.log(`Channel status: ${status}`);
                if (status === "SUBSCRIBED") {
                    this.log("Subscribed to realtime channel!");
                }
                else if (status === "CLOSED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    this.log("Channel closed or error occurred");
                }
            });
        }
        /**
         * Setup button interaction for mode switching
         */
        setupButtonInteraction() {
            if (!this.toggleModeButton) {
                this.log("No toggle button assigned - mode switching disabled");
                this.log("Assign a RectangleButton from Spectacles UI Kit to enable toggling");
                return;
            }
            this.log(`Found RectangleButton for mode toggle`);
            // Use RectangleButton's onTriggerUp event (same as SupabaseConnector example)
            this.toggleModeButton.onTriggerUp.add(() => {
                this.log("MODE TOGGLE BUTTON PRESSED!");
                this.log(`Current mode before toggle: ${this.isBroadcastMode ? 'BROADCAST' : 'FOLLOW'}`);
                this.toggleMode();
                this.log(`Current mode after toggle: ${this.isBroadcastMode ? 'BROADCAST' : 'FOLLOW'}`);
            });
            this.log("Button interaction setup complete - ready to toggle!");
        }
        /**
         * Toggle between broadcast and follow modes
         */
        toggleMode() {
            if (this.isBroadcastMode) {
                this.switchToFollowMode();
            }
            else {
                this.switchToBroadcastMode();
            }
        }
        /**
         * Switch to broadcast mode (Spectacles → Web)
         */
        switchToBroadcastMode() {
            this.isBroadcastMode = true;
            this.log("SWITCHING TO BROADCAST MODE: Spectacles -> Web");
            // Update mode text
            if (this.modeText) {
                this.log(`Updating mode text to: "BROADCASTING"`);
                this.modeText.text = "BROADCASTING";
            }
            else {
                this.log("modeText component not assigned!");
            }
            // Stop following
            // (UpdateEvent will stop calling updateFollowMode)
            this.log("Stopped following mode");
            // Start broadcasting
            this.startBroadcasting();
            // Notify web
            this.sendModeSignal("spectacles_leader");
            this.log("Broadcast mode fully activated!");
        }
        /**
         * Switch to follow mode (Web → Spectacles)
         */
        switchToFollowMode() {
            this.isBroadcastMode = false;
            this.log("SWITCHING TO FOLLOW MODE: Web -> Spectacles");
            // Update mode text
            if (this.modeText) {
                this.log(`Updating mode text to: "FOLLOWING"`);
                this.modeText.text = "FOLLOWING";
            }
            else {
                this.log("modeText component not assigned!");
            }
            // Stop broadcasting
            if (this.broadcastTimer) {
                this.log("Stopping broadcast timer");
                this.broadcastTimer.enabled = false;
            }
            // Follow mode will be handled by UpdateEvent
            // (UpdateEvent will start calling updateFollowMode)
            this.log("UpdateEvent will now handle cursor following");
            // Initialize target position to current position for smooth transition
            if (this.cursorObject) {
                this.currentPosition = this.cursorObject.getTransform().getLocalPosition();
                this.targetPosition = this.currentPosition;
                this.log(`Initial follow position: ${this.currentPosition.x.toFixed(2)}, ${this.currentPosition.y.toFixed(2)}, ${this.currentPosition.z.toFixed(2)}`);
            }
            // Notify web
            this.sendModeSignal("pc_leader");
            this.log("Follow mode fully activated!");
        }
        /**
         * Send mode change signal
         */
        sendModeSignal(mode) {
            if (!this.isInitialized || !this.realtimeChannel)
                return;
            this.realtimeChannel.send({
                type: "broadcast",
                event: "control-mode",
                payload: {
                    mode: mode,
                    user_id: this.userId,
                    timestamp: Date.now()
                }
            });
            this.log(`Mode signal sent: ${mode}`);
        }
        /**
         * Start broadcasting cursor position
         */
        startBroadcasting() {
            if (!this.cursorObject) {
                this.log("No cursor object assigned to track!");
                return;
            }
            this.broadcastTimer = this.createEvent("DelayedCallbackEvent");
            this.broadcastCount = 0;
            const broadcast = () => {
                if (this.isBroadcastMode && this.cursorObject) {
                    // Get the actual world position of the cursor object
                    const transform = this.cursorObject.getTransform();
                    const worldPos = transform.getWorldPosition();
                    // Debug: Log cursor object name and position
                    if (this.broadcastCount === 0) {
                        this.log(`Tracking cursor object: "${this.cursorObject.name}"`);
                        this.log(`Initial world position: ${worldPos.x.toFixed(2)}, ${worldPos.y.toFixed(2)}, ${worldPos.z.toFixed(2)}`);
                        this.log(`Make sure this object is being moved by InteractionKit or HandTracking!`);
                    }
                    // Get camera transform for relative positioning
                    const cameraPos = this.cameraTransform.getWorldPosition();
                    const cameraForward = this.cameraTransform.forward;
                    const cameraRight = this.cameraTransform.right;
                    const cameraUp = this.cameraTransform.up;
                    // Calculate position relative to camera
                    const toObject = worldPos.sub(cameraPos);
                    // Project onto camera's right and up vectors to get 2D position
                    const rightComponent = toObject.dot(cameraRight);
                    const upComponent = toObject.dot(cameraUp);
                    const forwardComponent = toObject.dot(cameraForward);
                    // Convert from Lens Studio coordinate system to web percentage
                    const screenScale = this.perspectiveScale / Math.max(Math.abs(forwardComponent), 1.0);
                    let lsX = rightComponent * screenScale * this.coordinateScale;
                    let lsY = upComponent * screenScale * this.coordinateScale;
                    // Apply axis inversion if enabled
                    if (this.invertX)
                        lsX = -lsX;
                    if (this.invertY)
                        lsY = -lsY;
                    // Convert LS coordinates to web percentage
                    const webX = ((lsX + this.lsXRange) / (this.lsXRange * 2)) * 100;
                    const webY = ((this.lsYRange - lsY) / (this.lsYRange * 2)) * 100;
                    // Clamp to valid range
                    const clampedX = Math.max(0, Math.min(100, webX));
                    const clampedY = Math.max(0, Math.min(100, webY));
                    this.broadcastCount++;
                    // Log based on frequency setting
                    if (this.verboseLogging || (this.broadcastCount % this.logFrequency === 0)) {
                        this.log(`Broadcasting #${this.broadcastCount}: LS(${lsX.toFixed(1)}, ${lsY.toFixed(1)}) -> Web(${clampedX.toFixed(1)}, ${clampedY.toFixed(1)})`);
                    }
                    // Broadcast via WebSocket
                    this.broadcastCursorPosition(clampedX, clampedY);
                    this.broadcastTimer.reset(this.broadcastInterval);
                }
                else {
                    // Stop broadcasting if mode changed
                    if (this.broadcastTimer) {
                        this.broadcastTimer.enabled = false;
                    }
                }
            };
            this.broadcastTimer.bind(broadcast);
            broadcast(); // Start immediately
            this.log("Started broadcasting cursor position");
        }
        /**
         * Broadcast cursor position via Supabase Realtime
         */
        async broadcastCursorPosition(x, y) {
            if (!this.isInitialized || !this.realtimeChannel)
                return;
            const now = Date.now();
            // Throttle broadcasts
            if (now - this.lastBroadcastTime < (this.broadcastInterval * 1000)) {
                return;
            }
            this.lastBroadcastTime = now;
            this.realtimeChannel.send({
                type: "broadcast",
                event: "cursor-move",
                payload: {
                    channel_name: this.channelName,
                    user_id: this.userId,
                    user_name: "Spectacles",
                    x: x,
                    y: y,
                    color: this.userColor,
                    timestamp: now
                }
            });
            // Debug: Store sample positions to database (every 50th broadcast)
            if (this.broadcastCount % 50 === 0) {
                try {
                    await this.client.from('cursor_debug').insert({
                        user_id: this.userId,
                        x: x,
                        y: y,
                        timestamp: new Date().toISOString(),
                        channel_name: this.channelName
                    });
                }
                catch (error) {
                    // Silent fail - debug table might not exist yet
                    if (this.broadcastCount === 50) {
                        this.log(`Debug table 'cursor_debug' not available: ${error}`);
                    }
                }
            }
        }
        /**
         * Handle incoming cursor position data (follow mode)
         */
        handleIncomingCursor(cursorData) {
            const timestamp = cursorData.timestamp || Date.now();
            // Ignore old updates
            if (timestamp <= this.lastCursorUpdate) {
                return;
            }
            this.lastCursorUpdate = timestamp;
            // Convert web percentage (0-100) to Lens Studio coordinate system
            let lsX = (cursorData.x / 100) * (this.lsXRange * 2) - this.lsXRange;
            let lsY = this.lsYRange - (cursorData.y / 100) * (this.lsYRange * 2);
            // Apply axis inversion if enabled
            if (this.invertX)
                lsX = -lsX;
            if (this.invertY)
                lsY = -lsY;
            // Calculate new target position relative to camera
            this.targetPosition = new vec3((lsX / this.lsXRange) * this.movementScale, (lsY / this.lsYRange) * this.movementScale + this.heightOffset, this.cursorZPosition // Fixed Z position (default: -100)
            );
            this.log(`Received from ${cursorData.user_name}: Web(${cursorData.x.toFixed(1)}, ${cursorData.y.toFixed(1)}) -> Target(${this.targetPosition.x.toFixed(2)}, ${this.targetPosition.y.toFixed(2)}, Z=${this.cursorZPosition})`);
        }
        /**
         * Update cursor position in follow mode (called every frame)
         */
        updateFollowMode() {
            if (!this.cursorObject) {
                return;
            }
            if (!this.isConnected()) {
                return;
            }
            // Smoothly interpolate to target position
            const previousPosition = this.currentPosition;
            this.currentPosition = vec3.lerp(this.currentPosition, this.targetPosition, this.movementSpeed);
            // Apply position relative to camera
            const cameraPos = this.cameraTransform.getWorldPosition();
            const cameraRot = this.cameraTransform.getWorldRotation();
            // Transform relative position to world space
            const worldPosition = cameraPos.add(cameraRot.multiplyVec3(this.currentPosition));
            this.cursorObject.getTransform().setWorldPosition(worldPosition);
            // Log occasionally to show it's working
            const posChanged = previousPosition.distance(this.currentPosition) > 0.01;
            if (posChanged && Math.random() < 0.02) { // Log ~2% of frames when moving
                this.log(`Follow update: Current(${this.currentPosition.x.toFixed(2)}, ${this.currentPosition.y.toFixed(2)}) -> Target(${this.targetPosition.x.toFixed(2)}, ${this.targetPosition.y.toFixed(2)})`);
            }
        }
        /**
         * Cleanup connections
         */
        cleanup() {
            if (this.broadcastTimer) {
                this.broadcastTimer.enabled = false;
            }
            if (this.client) {
                this.client.removeAllChannels();
            }
            this.log("Disconnected");
        }
        /**
         * Logging helper
         */
        log(message) {
            if (this.enableDebugLogs) {
                print(`[RealtimeCursor] ${message}`);
            }
            this.updateStatusText(message);
        }
        /**
         * Update status text display
         */
        updateStatusText(message) {
            if (!this.statusText)
                return;
            const timestamp = new Date().toLocaleTimeString();
            const fullMessage = `[${timestamp}] ${message}`;
            this.statusMessages.push(fullMessage);
            if (this.statusMessages.length > this.maxStatusLines) {
                this.statusMessages = this.statusMessages.slice(-this.maxStatusLines);
            }
            const textComponent = this.statusText.getComponent("Component.Text");
            if (textComponent) {
                const statusHeader = `Mode: ${this.isBroadcastMode ? 'Broadcasting' : 'Following'}\n` +
                    `User: ${this.userId}\n` +
                    `Channel: ${this.channelName}\n` +
                    `---Recent Logs---\n`;
                textComponent.text = statusHeader + this.statusMessages.slice(-5).join('\n');
            }
        }
        /**
         * Check if connected
         */
        isConnected() {
            return this.isInitialized && this.realtimeChannel !== null;
        }
        /**
         * Public getters
         */
        isServiceInitialized() {
            return this.isInitialized;
        }
        getChannelName() {
            return this.channelName;
        }
        getCurrentMode() {
            return this.isBroadcastMode ? "broadcast" : "follow";
        }
    };
    __setFunctionName(_classThis, "RealtimeCursor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RealtimeCursor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RealtimeCursor = _classThis;
})();
exports.RealtimeCursor = RealtimeCursor;
//# sourceMappingURL=RealtimeCursor.js.map