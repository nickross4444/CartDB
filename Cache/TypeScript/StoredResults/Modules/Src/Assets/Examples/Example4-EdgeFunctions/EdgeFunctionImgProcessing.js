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
exports.EdgeFunctionImgProcessing = void 0;
var __selfType = requireType("./EdgeFunctionImgProcessing");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let EdgeFunctionImgProcessing = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var EdgeFunctionImgProcessing = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Internet Module - Use require instead of @input
            this.internetModule = require('LensStudio:InternetModule');
            // Supabase Configuration - Centralized via SnapCloudRequirements
            this.snapCloudRequirements = this.snapCloudRequirements;
            this.functionName = this.functionName;
            // Function Parameters
            this.imageUrl = this.imageUrl;
            this.outputImage = this.outputImage;
            // Button Configuration
            this.processButton = this.processButton;
            this.enableDebugLogs = this.enableDebugLogs;
        }
        __initialize() {
            super.__initialize();
            // Internet Module - Use require instead of @input
            this.internetModule = require('LensStudio:InternetModule');
            // Supabase Configuration - Centralized via SnapCloudRequirements
            this.snapCloudRequirements = this.snapCloudRequirements;
            this.functionName = this.functionName;
            // Function Parameters
            this.imageUrl = this.imageUrl;
            this.outputImage = this.outputImage;
            // Button Configuration
            this.processButton = this.processButton;
            this.enableDebugLogs = this.enableDebugLogs;
        }
        onAwake() {
            this.log("EdgeFunctionImgProcessing initializing...");
            this.initializeService();
            this.setupProcessButton();
        }
        /**
         * Initialize the Edge Function service
         */
        initializeService() {
            if (!this.snapCloudRequirements || !this.snapCloudRequirements.isConfigured()) {
                this.log("SnapCloudRequirements not configured");
                return;
            }
            if (!this.functionName || this.functionName === "[your-function-name]") {
                this.log("Function name not configured");
                return;
            }
            const endpointUrl = `${this.snapCloudRequirements.getFunctionsApiUrl()}${this.functionName}`;
            this.log("Edge Function service initialized");
            this.log(`Endpoint: ${endpointUrl}`);
        }
        /**
         * Setup process button interaction using Spectacles UI Kit
         */
        setupProcessButton() {
            if (!this.processButton) {
                this.log("No process button assigned");
                this.log("You can also call callFunction() manually");
                return;
            }
            this.log(`Process button assigned: ${this.processButton.name}`);
            // Add the event listener to the process button onTriggerUp
            this.processButton.onTriggerUp.add(() => {
                this.log("PROCESS BUTTON PRESSED!");
                this.callEdgeFunction();
            });
            this.log("Process button interaction setup complete");
        }
        /**
         * Call the Supabase Edge Function with image processing
         */
        callEdgeFunction() {
            try {
                const endpointUrl = `${this.snapCloudRequirements.getFunctionsApiUrl()}${this.functionName}`;
                this.log("Processing image with Edge Function...");
                this.log(`Sending request to: ${endpointUrl}`);
                // For now, let's use a simple approach - download an image from Supabase Storage
                // and send it to the Edge Function for processing
                this.downloadAndProcessImage();
            }
            catch (error) {
                this.log(`Error preparing image: ${error}`);
            }
        }
        /**
         * Send image URL to Edge Function for processing
         */
        async downloadAndProcessImage() {
            try {
                this.log(`Sending image URL to Edge Function: ${this.imageUrl}`);
                // Send just the URL to the Edge Function - let it download the image
                const payload = {
                    imageUrl: this.imageUrl
                };
                const request = RemoteServiceHttpRequest.create();
                request.url = `${this.snapCloudRequirements.getFunctionsApiUrl()}${this.functionName}`;
                request.headers = this.snapCloudRequirements.getSupabaseHeaders();
                request.method = RemoteServiceHttpRequest.HttpRequestMethod.Post;
                request.body = JSON.stringify(payload);
                this.log("Sending image URL to Edge Function...");
                this.internetModule.performHttpRequest(request, (response) => {
                    this.log(`Response Status: ${response.statusCode}`);
                    if (response.statusCode === 200) {
                        this.log("Edge Function processed image successfully");
                        try {
                            // Parse the JSON response
                            const result = JSON.parse(response.body);
                            if (result.success && result.processedUrl) {
                                this.log(`Image processed and stored!`);
                                this.log(`Original size: ${result.originalSize} bytes`);
                                this.log(`Processed size: ${result.processedSize} bytes`);
                                this.log(`Processed URL: ${result.processedUrl}`);
                                this.log(`Storage path: ${result.storagePath}`);
                                this.log(`Operations: ${result.operations.join(', ')}`);
                                // Now download and display the processed image
                                this.downloadAndDisplayProcessedImage(result.processedUrl);
                            }
                            else {
                                this.log(`Unexpected response format: ${response.body}`);
                            }
                        }
                        catch (parseError) {
                            this.log(`Error parsing response: ${parseError}`);
                            this.log(`Raw response: ${response.body}`);
                        }
                    }
                    else {
                        this.log(`Edge Function Error (${response.statusCode}): ${response.body}`);
                    }
                });
            }
            catch (error) {
                this.log(`Error calling Edge Function: ${error}`);
            }
        }
        /**
         * Download and display the processed image from Supabase Storage
         */
        downloadAndDisplayProcessedImage(imageUrl) {
            try {
                this.log(`Downloading processed image from: ${imageUrl}`);
                // Use RemoteMediaModule to download and convert to texture (same pattern as SupabaseAssetLoader)
                const remoteMediaModule = require('LensStudio:RemoteMediaModule');
                // Create resource from URL using InternetModule (same as SupabaseAssetLoader.ts)
                const resource = this.internetModule.makeResourceFromUrl(imageUrl);
                if (!resource) {
                    this.log("Failed to create resource from URL");
                    return;
                }
                // Load as image texture (same pattern as SupabaseAssetLoader.ts line 465)
                remoteMediaModule.loadResourceAsImageTexture(resource, (texture) => {
                    this.log("Processed image downloaded successfully!");
                    this.applyProcessedTexture(texture);
                }, (error) => {
                    this.log(`Failed to download processed image: ${error}`);
                });
            }
            catch (error) {
                this.log(`Error downloading processed image: ${error}`);
            }
        }
        /**
         * Apply processed texture to output image
         */
        applyProcessedTexture(texture) {
            try {
                if (this.outputImage) {
                    this.outputImage.enabled = true;
                    this.outputImage.mainPass.baseTex = texture;
                    this.log("Processed image applied to output component");
                }
                else {
                    this.log("No output image component assigned");
                }
            }
            catch (error) {
                this.log(`Error applying processed texture: ${error}`);
            }
        }
        /**
         * Handle error response
         */
        onError(statusCode, errorBody) {
            this.log(`Edge Function call failed with status ${statusCode}`);
            this.log(`Error details: ${errorBody}`);
        }
        /**
         * Public method to call the function manually
         */
        callFunction() {
            this.callEdgeFunction();
        }
        /**
         * Call function with different image URL
         */
        callFunctionWithImageUrl(imageUrl) {
            this.imageUrl = imageUrl;
            this.callEdgeFunction();
        }
        /**
         * Logging helper
         */
        log(message) {
            if (this.enableDebugLogs) {
                print(`[EdgeFunctionImgProcessing] ${message}`);
            }
        }
    };
    __setFunctionName(_classThis, "EdgeFunctionImgProcessing");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EdgeFunctionImgProcessing = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EdgeFunctionImgProcessing = _classThis;
})();
exports.EdgeFunctionImgProcessing = EdgeFunctionImgProcessing;
//# sourceMappingURL=EdgeFunctionImgProcessing.js.map