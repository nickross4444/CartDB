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
exports.SnapCloudRequirements = void 0;
var __selfType = requireType("./SnapCloudRequirements");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let SnapCloudRequirements = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var SnapCloudRequirements = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Core Snap Cloud Requirement - Only SupabaseProject needs to be centralized
            // For InternetModule, use: private internetModule: InternetModule = require('LensStudio:InternetModule');
            this.supabaseProject = this.supabaseProject;
            // Warning Configuration
            this.text = this.text;
            this.disableWarningsWhenConfigured = this.disableWarningsWhenConfigured;
            this.showSetupInstructions = this.showSetupInstructions;
            this.enableDebugLogs = this.enableDebugLogs;
            // Status tracking
            this.isFullyConfigured = false;
            this.hasShownWarning = false;
            this.warningMessage = "Snap Cloud Requirements not configured! Please assign Supabase Project.";
        }
        __initialize() {
            super.__initialize();
            // Core Snap Cloud Requirement - Only SupabaseProject needs to be centralized
            // For InternetModule, use: private internetModule: InternetModule = require('LensStudio:InternetModule');
            this.supabaseProject = this.supabaseProject;
            // Warning Configuration
            this.text = this.text;
            this.disableWarningsWhenConfigured = this.disableWarningsWhenConfigured;
            this.showSetupInstructions = this.showSetupInstructions;
            this.enableDebugLogs = this.enableDebugLogs;
            // Status tracking
            this.isFullyConfigured = false;
            this.hasShownWarning = false;
            this.warningMessage = "Snap Cloud Requirements not configured! Please assign Supabase Project.";
        }
        onAwake() {
            this.validateConfiguration();
            if (this.showSetupInstructions && !this.isFullyConfigured) {
                this.displaySetupInstructions();
            }
            this.createEvent("OnStartEvent").bind(() => {
                this.onStart();
            });
        }
        onStart() {
            if (this.isFullyConfigured) {
                this.log("SnapCloudRequirements fully configured and ready!");
                this.log(`Supabase Project: ${this.supabaseProject ? this.supabaseProject.url : 'Missing'}`);
                // Disable text component when configured
                if (this.text) {
                    this.text.enabled = false;
                }
            }
            else {
                // Show warning on text component
                this.updateWarningText();
            }
        }
        /**
         * Validate that all required components are configured
         */
        validateConfiguration() {
            const hasSupabaseProject = this.supabaseProject !== null && this.supabaseProject !== undefined;
            this.isFullyConfigured = hasSupabaseProject;
            if (!this.isFullyConfigured && !this.hasShownWarning) {
                this.showWarning();
                this.hasShownWarning = true;
            }
            else if (this.isFullyConfigured && this.disableWarningsWhenConfigured) {
                this.log("All requirements configured - warnings disabled");
            }
        }
        /**
         * Display warning message when configuration is incomplete
         */
        showWarning() {
            const warningPrefix = "SnapCloudRequirements Warning:";
            print("=".repeat(60));
            print(warningPrefix);
            print(this.warningMessage);
            print("");
            if (!this.supabaseProject) {
                print("Missing: Supabase Project");
                print("   → Create via Window > Supabase > Import Credentials");
            }
            print("For InternetModule, use in your script:");
            print("   private internetModule: InternetModule = require('LensStudio:InternetModule');");
            print("=".repeat(60));
            // Update text component with warning
            this.updateWarningText();
        }
        /**
         * Update warning text on Text component
         */
        updateWarningText() {
            if (!this.text) {
                return;
            }
            this.text.enabled = true;
            let warningText = this.warningMessage + "\n\n";
            if (!this.supabaseProject) {
                warningText += "Missing: Supabase Project\n";
                warningText += "→ Create via Window > Supabase > Import Credentials";
            }
            this.text.text = warningText;
        }
        /**
         * Display detailed setup instructions
         */
        displaySetupInstructions() {
            print("\nSnapCloudRequirements Setup Instructions:");
            print("─".repeat(60));
            print("");
            print("1. SUPABASE PROJECT:");
            print("   • Go to Window > Supabase");
            print("   • Login to Supabase Plugin");
            print("   • Create/Import a Supabase Project");
            print("   • Click 'Import Credentials' to create SupabaseProject asset");
            print("   • Drag the SupabaseProject asset to this script's input");
            print("");
            print("2. REFERENCE IN YOUR SCRIPTS:");
            print("   Add this to centralize Supabase Project:");
            print("");
            print("   @input");
            print("   public snapCloudRequirements: SnapCloudRequirements;");
            print("");
            print("3. INTERNET MODULE IN YOUR SCRIPTS:");
            print("   Add this directly in each script (no input needed):");
            print("");
            print("   private internetModule: InternetModule = require('LensStudio:InternetModule');");
            print("");
            print("4. USE IN YOUR CODE:");
            print("   const supabase = this.snapCloudRequirements.getSupabaseProject();");
            print("   const url = this.snapCloudRequirements.getRestApiUrl() + 'table_name';");
            print("   const response = await this.internetModule.fetch(url, {...});");
            print("");
            print("─".repeat(60));
            print("");
        }
        /**
         * PUBLIC API - Get Supabase Project
         * Other scripts can call this to get the configured Supabase Project
         */
        getSupabaseProject() {
            if (!this.supabaseProject) {
                this.log("Supabase Project not configured!");
                if (!this.hasShownWarning) {
                    this.showWarning();
                    this.hasShownWarning = true;
                }
            }
            return this.supabaseProject;
        }
        /**
         * PUBLIC API - Check if all requirements are configured
         */
        isConfigured() {
            return this.isFullyConfigured;
        }
        /**
         * PUBLIC API - Get Supabase URL
         * Convenience method to get the Supabase project URL
         */
        getSupabaseUrl() {
            if (!this.supabaseProject) {
                this.log("Cannot get URL - Supabase Project not configured!");
                return "";
            }
            return this.supabaseProject.url;
        }
        /**
         * PUBLIC API - Get Supabase Public Token
         * Convenience method to get the Supabase public API token
         */
        getSupabasePublicToken() {
            if (!this.supabaseProject) {
                this.log("Cannot get token - Supabase Project not configured!");
                return "";
            }
            return this.supabaseProject.publicToken;
        }
        /**
         * PUBLIC API - Get HTTP headers for Supabase requests
         * Convenience method to get pre-configured headers
         */
        getSupabaseHeaders() {
            if (!this.supabaseProject) {
                this.log("Cannot get headers - Supabase Project not configured!");
                return {};
            }
            return {
                "Content-Type": "application/json",
                "apikey": this.supabaseProject.publicToken,
                "Authorization": `Bearer ${this.supabaseProject.publicToken}`
            };
        }
        /**
         * PUBLIC API - Get Storage API URL
         * Convenience method to get the Supabase Storage base URL
         */
        getStorageApiUrl() {
            if (!this.supabaseProject) {
                this.log("Cannot get Storage URL - Supabase Project not configured!");
                return "";
            }
            return this.supabaseProject.url.replace(/\/$/, '') + "/storage/v1/object/public/";
        }
        /**
         * PUBLIC API - Get REST API URL
         * Convenience method to get the Supabase REST API base URL
         */
        getRestApiUrl() {
            if (!this.supabaseProject) {
                this.log("Cannot get REST URL - Supabase Project not configured!");
                return "";
            }
            return this.supabaseProject.url.replace(/\/$/, '') + "/rest/v1/";
        }
        /**
         * PUBLIC API - Get Functions API URL
         * Convenience method to get the Supabase Edge Functions base URL
         */
        getFunctionsApiUrl() {
            if (!this.supabaseProject) {
                this.log("Cannot get Functions URL - Supabase Project not configured!");
                return "";
            }
            return this.supabaseProject.url.replace(/\/$/, '') + "/functions/v1/";
        }
        /**
         * Logging helper
         */
        log(message) {
            if (this.enableDebugLogs) {
                print(`[SnapCloudRequirements] ${message}`);
            }
        }
        /**
         * PUBLIC API - Enable/Disable debug logging at runtime
         */
        setDebugLogging(enabled) {
            this.enableDebugLogs = enabled;
            this.log(`Debug logging ${enabled ? 'enabled' : 'disabled'}`);
        }
        /**
         * PUBLIC API - Manually trigger validation
         * Useful if configuration is set programmatically
         */
        revalidate() {
            this.validateConfiguration();
        }
    };
    __setFunctionName(_classThis, "SnapCloudRequirements");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SnapCloudRequirements = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SnapCloudRequirements = _classThis;
})();
exports.SnapCloudRequirements = SnapCloudRequirements;
//# sourceMappingURL=SnapCloudRequirements.js.map