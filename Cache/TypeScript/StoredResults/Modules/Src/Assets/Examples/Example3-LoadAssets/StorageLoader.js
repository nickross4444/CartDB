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
exports.StorageLoader = void 0;
var __selfType = requireType("./StorageLoader");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let StorageLoader = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var StorageLoader = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Internet Module - Use require instead of @input
            this.internetModule = require('LensStudio:InternetModule');
            // Supabase Configuration - Centralized via SnapCloudRequirements
            this.snapCloudRequirements = this.snapCloudRequirements;
            this.storageBucket = this.storageBucket;
            // Asset Configuration
            this.modelFileName = this.modelFileName;
            this.imageFileName = this.imageFileName;
            this.audioFileName = this.audioFileName;
            // Scene Objects for Asset Display
            this.cameraObject = this.cameraObject;
            this.modelParent = this.modelParent;
            this.imageDisplay = this.imageDisplay;
            this.audioPlayer = this.audioPlayer;
            this.defaultMaterial = this.defaultMaterial;
            // Button Configuration
            this.loadButton = this.loadButton;
            // Loading Configuration
            this.enableProgressLogs = this.enableProgressLogs;
            this.enableDebugLogs = this.enableDebugLogs;
            this.modelDistance = this.modelDistance;
            this.modelScale = this.modelScale;
            // Status Display
            this.statusText = this.statusText;
            this.isInitialized = false;
            this.isLoading = false;
            this.loadedAssets = {};
        }
        __initialize() {
            super.__initialize();
            // Internet Module - Use require instead of @input
            this.internetModule = require('LensStudio:InternetModule');
            // Supabase Configuration - Centralized via SnapCloudRequirements
            this.snapCloudRequirements = this.snapCloudRequirements;
            this.storageBucket = this.storageBucket;
            // Asset Configuration
            this.modelFileName = this.modelFileName;
            this.imageFileName = this.imageFileName;
            this.audioFileName = this.audioFileName;
            // Scene Objects for Asset Display
            this.cameraObject = this.cameraObject;
            this.modelParent = this.modelParent;
            this.imageDisplay = this.imageDisplay;
            this.audioPlayer = this.audioPlayer;
            this.defaultMaterial = this.defaultMaterial;
            // Button Configuration
            this.loadButton = this.loadButton;
            // Loading Configuration
            this.enableProgressLogs = this.enableProgressLogs;
            this.enableDebugLogs = this.enableDebugLogs;
            this.modelDistance = this.modelDistance;
            this.modelScale = this.modelScale;
            // Status Display
            this.statusText = this.statusText;
            this.isInitialized = false;
            this.isLoading = false;
            this.loadedAssets = {};
        }
        onAwake() {
            this.log("StorageLoader initializing...");
            this.checkInternetAvailability();
            this.initializeSupabase();
            this.initializeRemoteModules();
            this.setupLoadButton();
            this.updateStatus("Initialized - Ready to load assets");
        }
        /**
         * Check internet availability
         */
        checkInternetAvailability() {
            const isInternetAvailable = global.deviceInfoSystem.isInternetAvailable();
            this.log(`Internet available: ${isInternetAvailable}`);
            if (!isInternetAvailable) {
                this.log("No internet connection - asset loading will fail");
                this.updateStatus("No internet connection");
            }
            // Listen for internet status changes
            global.deviceInfoSystem.onInternetStatusChanged.add((args) => {
                this.log(`Internet status changed: ${args.isInternetAvailable}`);
                if (args.isInternetAvailable) {
                    this.updateStatus("Internet connected");
                }
                else {
                    this.updateStatus("Internet disconnected");
                }
            });
        }
        /**
         * Initialize Supabase connection parameters
         */
        initializeSupabase() {
            if (!this.snapCloudRequirements || !this.snapCloudRequirements.isConfigured()) {
                this.log("SnapCloudRequirements not configured");
                this.updateStatus("Snap Cloud not configured");
                return;
            }
            // Supabase Storage API URL format
            this.storageApiUrl = this.snapCloudRequirements.getStorageApiUrl();
            this.isInitialized = true;
            this.log("Supabase asset loader initialized");
            this.log(`Storage URL: ${this.storageApiUrl}`);
        }
        /**
         * Initialize remote service modules for media loading
         */
        initializeRemoteModules() {
            try {
                this.remoteServiceModule = require('LensStudio:RemoteServiceModule');
                this.remoteMediaModule = require('LensStudio:RemoteMediaModule');
                if (!this.remoteServiceModule || !this.remoteMediaModule) {
                    this.log("Remote modules not available");
                    return;
                }
                this.log("Remote modules initialized");
            }
            catch (error) {
                this.log(`Error initializing remote modules: ${error}`);
            }
        }
        /**
         * Setup load button interaction using Spectacles UI Kit
         */
        setupLoadButton() {
            if (!this.loadButton) {
                this.log("No load button assigned");
                this.log("You can also call loadAllAssets() manually");
                return;
            }
            this.log(`Load button assigned: ${this.loadButton.name}`);
            // Add the event listener to the load button onTriggerUp
            this.loadButton.onTriggerUp.add(() => {
                this.log("LOAD BUTTON PRESSED!");
                this.loadAllAssets();
            });
            this.log("Load button interaction setup complete");
        }
        /**
         * Load all assets (3D model, image, and audio)
         */
        async loadAllAssets() {
            if (!this.isInitialized) {
                this.log("Cannot load assets - not initialized");
                this.updateStatus("Not initialized");
                return;
            }
            if (this.isLoading) {
                this.log("⏳ Assets are already loading...");
                return;
            }
            // Check internet connectivity first
            if (!global.deviceInfoSystem.isInternetAvailable()) {
                this.log("No internet connection available");
                this.updateStatus("No internet connection");
                return;
            }
            this.isLoading = true;
            this.updateStatus("Loading assets...");
            this.log("Starting asset loading process...");
            // Test URLs first to debug connectivity issues
            await this.testAssetUrls();
            try {
                // Load assets in parallel for better performance
                const loadPromises = [];
                if (this.modelFileName && this.cameraObject) {
                    loadPromises.push(this.load3DModel());
                }
                if (this.imageFileName && this.imageDisplay) {
                    loadPromises.push(this.loadImage());
                }
                if (this.audioFileName && this.audioPlayer) {
                    loadPromises.push(this.loadAudio());
                }
                // Wait for all assets to load (using Promise.all with manual error handling)
                let successCount = 0;
                let failureCount = 0;
                const totalAssets = loadPromises.length;
                // Handle each promise individually to avoid Promise.allSettled compatibility issues
                for (let i = 0; i < loadPromises.length; i++) {
                    try {
                        await loadPromises[i];
                        successCount++;
                        this.log(`Asset ${i + 1}/${totalAssets} loaded successfully`);
                    }
                    catch (error) {
                        failureCount++;
                        this.log(`Asset ${i + 1}/${totalAssets} failed: ${error}`);
                    }
                }
                this.log(`Asset loading complete: ${successCount} succeeded, ${failureCount} failed`);
                this.updateStatus(`Loaded ${successCount}/${totalAssets} assets`);
            }
            catch (error) {
                this.log(`Asset loading error: ${error}`);
                this.updateStatus("Loading failed");
            }
            finally {
                this.isLoading = false;
            }
        }
        /**
         * Load a 3D model from Supabase Storage
         */
        async load3DModel() {
            return new Promise((resolve, reject) => {
                try {
                    this.log(`Loading 3D model: ${this.modelFileName}`);
                    // Validate camera object (required like DownloadModel.ts)
                    if (!this.cameraObject) {
                        this.log("cameraObject is not assigned!");
                        reject("cameraObject is null or undefined. Please assign the camera object in the inspector.");
                        return;
                    }
                    this.log(`Camera object: ${this.cameraObject.name}`);
                    // Check material
                    if (this.defaultMaterial) {
                        this.log(`Default material: ${this.defaultMaterial.name}`);
                    }
                    else {
                        this.log(`No default material assigned (will use model's materials)`);
                    }
                    const modelUrl = `${this.storageApiUrl}${this.storageBucket}/${this.modelFileName}`;
                    this.log(`Model URL: ${modelUrl}`);
                    // Create resource from URL
                    // Note: Using 'as any' type assertion because makeResourceFromUrl may not be in InternetModule types yet
                    const resource = this.internetModule.makeResourceFromUrl(modelUrl);
                    if (!resource) {
                        reject("Failed to create resource from model URL");
                        return;
                    }
                    // Load as GLTF asset
                    this.remoteMediaModule.loadResourceAsGltfAsset(resource, (gltfAsset) => {
                        this.log("GLTF asset loaded successfully!");
                        // Use the exact same pattern as DownloadModel.ts
                        // Important: Instantiate to script's own sceneObject first, then reparent
                        let gltfSettings = GltfSettings.create();
                        gltfSettings.convertMetersToCentimeters = true;
                        gltfAsset.tryInstantiateAsync(this.sceneObject, // Use script's object like DownloadModel.ts does
                        this.defaultMaterial, (sceneObj) => {
                            this.log("GLTF model instantiated successfully!");
                            // Position in front of camera (same as DownloadModel.ts)
                            this.finalizeModelInstantiation(sceneObj);
                            resolve();
                        }, (error) => {
                            this.log(`Error instantiating GLTF: ${error}`);
                            reject(error);
                        }, (progress) => {
                            if (this.enableProgressLogs) {
                                this.log(`Progress: ${Math.round(progress * 100)}%`);
                            }
                        }, gltfSettings);
                    }, (error) => {
                        this.log(`Error loading GLTF asset: ${error}`);
                        reject(error);
                    });
                }
                catch (error) {
                    this.log(`Error in load3DModel: ${error}`);
                    reject(error);
                }
            });
        }
        /**
         * Helper method: Finalize model instantiation (positioning, scaling, storing)
         * Uses camera positioning like DownloadModel.ts
         */
        finalizeModelInstantiation(sceneObj) {
            try {
                this.log("Finalizing model instantiation...");
                const transform = sceneObj.getTransform();
                // If modelParent is assigned, make the model a child of it
                if (this.modelParent) {
                    sceneObj.setParent(this.modelParent);
                    this.log(`Model parented to: ${this.modelParent.name}`);
                    // Set local position to zero
                    transform.setLocalPosition(vec3.zero());
                    // Rotate the model 90 degrees on LOCAL Y-axis
                    const currentRotation = transform.getLocalRotation();
                    const yRotation = quat.angleAxis(Math.PI / 4, vec3.up()); // 90 degrees = PI/2 radians
                    transform.setLocalRotation(currentRotation.multiply(yRotation));
                }
                else {
                    // Original behavior: position in front of camera if no parent is assigned
                    let cameraPosition = this.cameraObject
                        .getTransform()
                        .getWorldPosition();
                    transform.setWorldPosition(new vec3(cameraPosition.x, cameraPosition.y, cameraPosition.z - this.modelDistance));
                    this.log("Model positioned in front of camera (no parent assigned)");
                }
                // Scale the model
                const currentScale = transform.getLocalScale();
                transform.setLocalScale(currentScale.uniformScale(this.modelScale));
                // Store reference
                this.loadedAssets.model = sceneObj;
                this.log("3D model loaded successfully");
                this.log(`Local Position: ${sceneObj.getTransform().getLocalPosition()}`);
                this.log(`Local Scale: ${sceneObj.getTransform().getLocalScale()}`);
                this.log(`Local Rotation: Y-axis rotated 90 degrees`);
                // Try to find and log AnimationPlayer info (if exists)
                this.handleAnimationPlayer(sceneObj);
            }
            catch (error) {
                this.log(`Error during finalization: ${error}`);
            }
        }
        /**
         * Helper method: Safely handle AnimationPlayer if present
         */
        handleAnimationPlayer(sceneObj) {
            try {
                // Try to find AnimationPlayer - use optional chaining for safety
                let animationPlayer = sceneObj
                    .getChild(0)
                    ?.getChild(0)
                    ?.getComponent('AnimationPlayer');
                if (animationPlayer) {
                    this.log('Animation Player found!');
                    const activeClips = animationPlayer.getActiveClips();
                    const inactiveClips = animationPlayer.getInactiveClips();
                    this.log(`Active Clips: ${activeClips.length}`);
                    this.log(`Inactive Clips: ${inactiveClips.length}`);
                    if (inactiveClips.length > 0) {
                        inactiveClips.forEach((clip, index) => {
                            this.log(`Clip ${index}: ${clip}`);
                        });
                        // Optionally play the first clip
                        // animationPlayer.playClipAt(inactiveClips[0], 0);
                    }
                }
                else {
                    this.log('No Animation Player found in GLTF model');
                }
            }
            catch (error) {
                this.log(`Error checking AnimationPlayer: ${error}`);
            }
        }
        /**
         * Load an image from Supabase Storage
         */
        async loadImage() {
            return new Promise((resolve, reject) => {
                try {
                    this.log(`Loading image: ${this.imageFileName}`);
                    const imageUrl = `${this.storageApiUrl}${this.storageBucket}/${this.imageFileName}`;
                    this.log(`Image URL: ${imageUrl}`);
                    // Create resource from URL
                    // Note: Using 'as any' type assertion because makeResourceFromUrl may not be in InternetModule types yet
                    const resource = this.internetModule.makeResourceFromUrl(imageUrl);
                    if (!resource) {
                        reject("Failed to create resource from image URL");
                        return;
                    }
                    // Load as image texture
                    this.remoteMediaModule.loadResourceAsImageTexture(resource, (texture) => {
                        this.log("Image texture loaded successfully");
                        // Apply texture to the display object
                        this.applyTextureToObject(texture);
                        // Store reference
                        this.loadedAssets.texture = texture;
                        resolve();
                    }, (error) => {
                        this.log(`Error loading image texture: ${error}`);
                        reject(error);
                    });
                }
                catch (error) {
                    this.log(`Error in loadImage: ${error}`);
                    reject(error);
                }
            });
        }
        /**
         * Load audio from Supabase Storage
         */
        async loadAudio() {
            return new Promise((resolve, reject) => {
                try {
                    this.log(`Loading audio: ${this.audioFileName}`);
                    const audioUrl = `${this.storageApiUrl}${this.storageBucket}/${this.audioFileName}`;
                    this.log(`Audio URL: ${audioUrl}`);
                    // Create resource from URL
                    // Note: Using 'as any' type assertion because makeResourceFromUrl may not be in InternetModule types yet
                    const resource = this.internetModule.makeResourceFromUrl(audioUrl);
                    if (!resource) {
                        reject("Failed to create resource from audio URL");
                        return;
                    }
                    // Load as audio track asset
                    this.remoteMediaModule.loadResourceAsAudioTrackAsset(resource, (audioAsset) => {
                        this.log("Audio asset loaded successfully");
                        // Apply audio to the player object
                        this.applyAudioToObject(audioAsset);
                        // Store reference
                        this.loadedAssets.audio = audioAsset;
                        resolve();
                    }, (error) => {
                        this.log(`Error loading audio asset: ${error}`);
                        reject(error);
                    });
                }
                catch (error) {
                    this.log(`Error in loadAudio: ${error}`);
                    reject(error);
                }
            });
        }
        /**
         * Apply loaded texture to the image display component
         * Using the same pattern as AI Playground ImageGenerator
         */
        applyTextureToObject(texture) {
            try {
                if (!this.imageDisplay) {
                    this.log("No image display component assigned");
                    return;
                }
                // Enable the image component and set the texture (AI Playground pattern)
                this.imageDisplay.enabled = true;
                this.imageDisplay.mainPass.baseTex = texture;
                this.log("Texture applied to Image component");
            }
            catch (error) {
                this.log(`Error applying texture: ${error}`);
            }
        }
        /**
         * Apply loaded audio to the audio player object
         */
        applyAudioToObject(audioAsset) {
            try {
                let audioComponent = this.audioPlayer.getComponent("Component.AudioComponent");
                if (!audioComponent) {
                    // Create AudioComponent if it doesn't exist
                    audioComponent = this.audioPlayer.createComponent("Component.AudioComponent");
                    this.log("Created AudioComponent on audio player object");
                }
                // Set the audio track
                audioComponent.audioTrack = audioAsset;
                // Configure audio settings
                audioComponent.volume = 0.8;
                audioComponent.play(1);
                this.log("Audio applied and playing on audio player object");
            }
            catch (error) {
                this.log(`Error applying audio: ${error}`);
            }
        }
        /**
         * Test asset URLs accessibility
         */
        async testAssetUrls() {
            if (!this.isInitialized) {
                this.log("Cannot test URLs - not initialized");
                return;
            }
            this.log("Testing asset URL accessibility...");
            // Try both URL formats
            const baseUrl = this.snapCloudRequirements.getSupabaseUrl().replace(/\/$/, '');
            const altStorageUrl = baseUrl.replace('.supabase.co', '.storage.supabase.co');
            const urls = [
                { name: "3D Model", url: `${this.storageApiUrl}${this.storageBucket}/${this.modelFileName}` },
                { name: "3D Model (Alt)", url: `${altStorageUrl}/${this.storageBucket}/${this.modelFileName}` },
                { name: "Image", url: `${this.storageApiUrl}${this.storageBucket}/${this.imageFileName}` },
                { name: "Image (Alt)", url: `${altStorageUrl}/${this.storageBucket}/${this.imageFileName}` },
                { name: "Audio", url: `${this.storageApiUrl}${this.storageBucket}/${this.audioFileName}` },
                { name: "Audio (Alt)", url: `${altStorageUrl}/${this.storageBucket}/${this.audioFileName}` }
            ];
            for (const asset of urls) {
                try {
                    this.log(`Testing: ${asset.url}`);
                    // Try GET request instead of HEAD for better compatibility
                    const response = await this.internetModule.fetch(asset.url, {
                        method: "GET"
                        // Don't include auth headers for public storage
                    });
                    if (response.ok) {
                        const contentLength = response.headers.get("content-length");
                        this.log(`${asset.name} accessible (${response.status}) - Size: ${contentLength || 'unknown'} bytes`);
                    }
                    else {
                        const errorText = await response.text();
                        this.log(`${asset.name} not accessible (${response.status}): ${errorText}`);
                        this.log(`URL: ${asset.url}`);
                    }
                }
                catch (error) {
                    this.log(`Error testing ${asset.name} URL: ${error}`);
                    this.log(`Failed URL: ${asset.url}`);
                }
            }
        }
        /**
         * Clear all loaded assets
         */
        clearLoadedAssets() {
            this.log("Clearing loaded assets...");
            // Remove loaded 3D model
            if (this.loadedAssets.model) {
                this.loadedAssets.model.destroy();
                this.loadedAssets.model = undefined;
                this.log("3D model cleared");
            }
            // Clear texture (note: texture cleanup is handled by Lens Studio)
            if (this.loadedAssets.texture) {
                this.loadedAssets.texture = undefined;
                this.log("Texture reference cleared");
            }
            // Stop and clear audio
            if (this.loadedAssets.audio) {
                const audioComponent = this.audioPlayer ? this.audioPlayer.getComponent("Component.AudioComponent") : null;
                if (audioComponent) {
                    audioComponent.stop(true);
                    audioComponent.audioTrack = null;
                }
                this.loadedAssets.audio = undefined;
                this.log("Audio cleared");
            }
            this.updateStatus("Assets cleared");
        }
        /**
         * Get loading status
         */
        getLoadingStatus() {
            if (!this.isInitialized)
                return "Not initialized";
            if (this.isLoading)
                return "Loading...";
            const loadedCount = Object.values(this.loadedAssets).filter(asset => asset !== undefined).length;
            return `${loadedCount} assets loaded`;
        }
        /**
         * Logging helper
         */
        log(message) {
            if (this.enableDebugLogs) {
                print(`[StorageLoader] ${message}`);
            }
        }
        /**
         * Update status text if available
         */
        updateStatus(status) {
            if (this.statusText) {
                this.statusText.text = status;
            }
        }
        /**
         * Public getters
         */
        isServiceInitialized() {
            return this.isInitialized;
        }
        getStorageBucket() {
            return this.storageBucket;
        }
        getLoadedAssets() {
            return { ...this.loadedAssets };
        }
    };
    __setFunctionName(_classThis, "StorageLoader");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StorageLoader = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StorageLoader = _classThis;
})();
exports.StorageLoader = StorageLoader;
//# sourceMappingURL=StorageLoader.js.map