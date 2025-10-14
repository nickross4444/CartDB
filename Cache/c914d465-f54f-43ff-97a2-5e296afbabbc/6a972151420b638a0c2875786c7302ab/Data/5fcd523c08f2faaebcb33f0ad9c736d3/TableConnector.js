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
exports.TableConnector = void 0;
var __selfType = requireType("./TableConnector");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const supabase_snapcloud_1 = require("SupabaseClient.lspkg/supabase-snapcloud");
let TableConnector = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var TableConnector = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Supabase Configuration - Centralized via SnapCloudRequirements
            this.snapCloudRequirements = this.snapCloudRequirements;
            // Interactive Elements
            this.dataRetrievalButton = this.dataRetrievalButton;
            this.logText = this.logText;
            this.isConnected = false;
            this.logMessages = [];
            this.maxLogMessages = 20;
            // The three tables in your database
            this.tableName = "test_table";
        }
        __initialize() {
            super.__initialize();
            // Supabase Configuration - Centralized via SnapCloudRequirements
            this.snapCloudRequirements = this.snapCloudRequirements;
            // Interactive Elements
            this.dataRetrievalButton = this.dataRetrievalButton;
            this.logText = this.logText;
            this.isConnected = false;
            this.logMessages = [];
            this.maxLogMessages = 20;
            // The three tables in your database
            this.tableName = "test_table";
        }
        onAwake() {
            this.setupInteractions();
            this.createEvent("OnStartEvent").bind(() => {
                this.onStart();
            });
        }
        onStart() {
            this.initSupabase();
        }
        async initSupabase() {
            if (!this.snapCloudRequirements || !this.snapCloudRequirements.isConfigured()) {
                this.log("SnapCloudRequirements not configured");
                return;
            }
            const supabaseProject = this.snapCloudRequirements.getSupabaseProject();
            this.client = (0, supabase_snapcloud_1.createClient)(supabaseProject.url, supabaseProject.publicToken);
            print("Client is ready");
            if (this.client) {
                await this.signInUser();
                print("User is authenticated");
            }
        }
        async signInUser() {
            const { data, error } = await this.client.auth.signInWithIdToken();
            print("Sign in user");
            if (error) {
                this.log("Sign in error: " + JSON.stringify(error));
            }
            else {
                const { user, session } = data;
                print(`User: ${JSON.stringify(user)}`);
                print(`Session: ${JSON.stringify(session)}`);
                this.uid = JSON.stringify(user.id);
            }
        }
        async testConnectionAndRun() {
            if (!this.uid) {
                this.log("Not authenticated");
                return;
            }
            this.log("Testing connection...");
            await this.testConnection();
        }
        onDestroy() {
            if (this.client) {
                this.client.removeAllChannels();
            }
        }
        /**
         * Custom logging method that outputs to both console and UI text
         */
        log(message) {
            // Always log to console
            print(message);
            // Also log to UI if text component is available
            if (this.logText) {
                this.logMessages.push(message);
                // Keep only the most recent messages
                if (this.logMessages.length > this.maxLogMessages) {
                    this.logMessages = this.logMessages.slice(-this.maxLogMessages);
                }
                // Update the text component
                this.logText.text = this.logMessages.join('\n');
            }
        }
        /**
         * Clear the log display
         */
        clearLogs() {
            this.logMessages = [];
            if (this.logText) {
                this.logText.text = "";
            }
        }
        /**
         * Setup interactive elements (button only)
         */
        setupInteractions() {
            // Setup button interaction if provided
            if (this.dataRetrievalButton) {
                this.dataRetrievalButton.onTriggerUp.add(() => {
                    this.log("Data retrieval button pressed!");
                    this.retrieveLatestData();
                });
                this.log("Button interaction configured");
            }
            else {
                this.log("No data retrieval button assigned. You can manually call retrieveLatestData()");
            }
        }
        /**
         * Test the connection to Supabase
         */
        async testConnection() {
            if (!this.client) {
                this.log("Client not initialized");
                return;
            }
            if (!this.uid) {
                this.log("User not authenticated - cannot test connection");
                this.log("Authentication is required for Snap Cloud");
                return;
            }
            this.log("Testing Supabase connection...");
            try {
                // Try to fetch from the main table (this will work even if table is empty)
                const { data, error } = await this.client
                    .from(this.tableName)
                    .select("*")
                    .limit(1);
                if (error) {
                    this.log(`Connection failed: ${JSON.stringify(error)}`);
                    this.log(`Make sure table '${this.tableName}' exists in your Snap Cloud project`);
                    this.log(`Check RLS (Row Level Security) policies in the dashboard`);
                    return;
                }
                this.isConnected = true;
                this.log("Successfully connected to Snap Cloud!");
                this.log(`Table '${this.tableName}' is accessible`);
                // Test inserting a sample record
                await this.insertTestRecord();
                // Test selecting records
                await this.getAllRecords();
                // Test all other tables
                await this.testAllTables();
            }
            catch (error) {
                this.log(`Connection error: ${error}`);
            }
        }
        /**
         * Test all tables to verify they exist and are accessible
         */
        async testAllTables() {
            this.log("Testing all database tables...");
            const tables = ["user_interactions", "user_preferences"];
            for (const table of tables) {
                try {
                    const { data, error } = await this.client
                        .from(table)
                        .select("*")
                        .limit(3);
                    if (error) {
                        this.log(`Table '${table}': ${error.message} - May not exist or need RLS policies`);
                    }
                    else {
                        this.log(`Table '${table}': ${data.length} records found`);
                        // Show sample data if available
                        if (data.length > 0) {
                            const sample = data[0];
                            const keys = Object.keys(sample).slice(0, 3); // Show first 3 columns
                            this.log(`   Sample: ${keys.map(key => `${key}=${JSON.stringify(sample[key]).substring(0, 30)}`).join(', ')}`);
                        }
                    }
                }
                catch (error) {
                    this.log(`Table '${table}': Error - ${error}`);
                }
            }
            // Test inserting into other tables
            await this.testOtherTableInserts();
        }
        /**
         * Test inserting data into other tables
         */
        async testOtherTableInserts() {
            this.log("Testing inserts into other tables...");
            // Test user_interactions
            try {
                await this.logUserInteraction("test_connection", {
                    source: "supabase_connector",
                    test: true
                });
            }
            catch (error) {
                this.log(`User interaction test failed: ${error}`);
            }
            // Test user_preferences (if not exists, create sample)
            try {
                const testUserId = `test_user_${Date.now()}`;
                const preferences = {
                    audio: { volume: 0.7, sound_effects: true },
                    display: { brightness: 0.8, color_mode: "vivid" },
                    test_mode: true
                };
                const { data, error } = await this.client
                    .from("user_preferences")
                    .insert({
                    user_id: testUserId,
                    preferences: JSON.stringify(preferences),
                    updated_at: new Date().toISOString()
                })
                    .select();
                if (error) {
                    this.log(`User preferences test: ${error.message}`);
                }
                else {
                    this.log(`User preferences test: Sample user created`);
                }
            }
            catch (error) {
                this.log(`User preferences test failed: ${error}`);
            }
        }
        /**
         * Insert a test record to verify database write access
         */
        async insertTestRecord() {
            this.log("Inserting test record...");
            const testData = {
                message: "Hello from Lens Studio!",
                sender: "Spectacles User",
                timestamp: new Date().toISOString(),
                lens_session_id: `session_${Date.now()}`
            };
            try {
                const { data, error } = await this.client
                    .from(this.tableName)
                    .insert(testData)
                    .select();
                if (error) {
                    this.log(`Insert failed: ${error.message}`);
                    this.log(`Error: ${JSON.stringify(error)}`);
                }
                else {
                    this.log("Test record inserted successfully!");
                    this.log(`Inserted data: ${JSON.stringify(data)}`);
                }
            }
            catch (error) {
                this.log(`Insert error: ${error}`);
            }
        }
        /**
         * Retrieve all records from the test table
         */
        async getAllRecords() {
            this.log("Fetching all records...");
            try {
                const { data, error } = await this.client
                    .from(this.tableName)
                    .select("*")
                    .limit(5);
                if (error) {
                    this.log(`Select failed: ${error.message}`);
                    this.log(`   Error details: ${JSON.stringify(error)}`);
                }
                else {
                    this.log(`Retrieved ${data.length} records:`);
                    data.forEach((record, index) => {
                        this.log(`  ${index + 1}. ${record.message || 'No message'} (${record.sender || 'Unknown'})`);
                    });
                }
            }
            catch (error) {
                this.log(`Select error: ${error}`);
            }
        }
        /**
         * Generic method to insert data into any table
         */
        async insertIntoTable(table, data) {
            const { data: result, error } = await this.client
                .from(table)
                .insert(data)
                .select();
            return { data: result, error };
        }
        /**
         * Generic method to select data from any table
         */
        async selectFromTable(table, columns = "*") {
            const { data, error } = await this.client
                .from(table)
                .select(columns);
            return { data, error };
        }
        /**
         * Generic method to update data in any table
         * @param table - Table name
         * @param data - Data to update
         * @param matchColumn - Column to match (e.g., "id")
         * @param matchValue - Value to match
         */
        async updateTable(table, data, matchColumn, matchValue) {
            const { data: result, error } = await this.client
                .from(table)
                .update(data)
                .eq(matchColumn, matchValue)
                .select();
            return { data: result, error };
        }
        /**
         * Generic method to delete data from any table
         * @param table - Table name
         * @param matchColumn - Column to match (e.g., "id")
         * @param matchValue - Value to match
         */
        async deleteFromTable(table, matchColumn, matchValue) {
            const { data, error } = await this.client
                .from(table)
                .delete()
                .eq(matchColumn, matchValue)
                .select();
            return { data, error };
        }
        /**
         * Example: Log user interaction for analytics
         */
        async logUserInteraction(action, data = {}) {
            const interactionData = {
                action: action,
                data: JSON.stringify(data),
                timestamp: new Date().toISOString(),
                session_id: `lens_${Date.now()}`
            };
            try {
                await this.insertIntoTable("user_interactions", interactionData);
                this.log(`Logged interaction: ${action}`);
            }
            catch (error) {
                this.log(`Failed to log interaction: ${error}`);
            }
        }
        /**
         * Example: Get user preferences
         */
        async getUserPreferences(userId) {
            try {
                const { data, error } = await this.client
                    .from("user_preferences")
                    .select("*")
                    .eq("user_id", userId);
                if (error) {
                    this.log(`Failed to get user preferences: ${error.message}`);
                    return null;
                }
                return data.length > 0 ? data[0] : null;
            }
            catch (error) {
                this.log(`Failed to get user preferences: ${error}`);
            }
            return null;
        }
        /**
         * Retrieve and display latest data from all tables (triggered by button/pinch)
         */
        async retrieveLatestData() {
            this.log("Retrieving latest data from all tables...");
            // Get latest messages
            await this.getLatestMessages();
            // Get recent user interactions
            await this.getRecentInteractions();
            // Get user preferences
            await this.getRandomUserPreferences();
            this.log("Data retrieval completed!");
        }
        /**
         * Get latest messages from main messages table
         */
        async getLatestMessages() {
            try {
                const { data, error } = await this.client
                    .from(this.tableName)
                    .select("*")
                    .limit(3);
                if (error) {
                    this.log(`Could not retrieve messages: ${error.message}`);
                    this.log(`   Error details: ${JSON.stringify(error)}`);
                }
                else {
                    this.log(`Latest Messages (${data.length}):`);
                    data.forEach((msg, index) => {
                        this.log(`  ${index + 1}. "${msg.message || 'No message'}" by ${msg.sender || 'Unknown'}`);
                    });
                }
            }
            catch (error) {
                this.log(`Error retrieving messages: ${error}`);
            }
        }
        /**
         * Get recent user interactions
         */
        async getRecentInteractions() {
            try {
                const { data, error } = await this.client
                    .from("user_interactions")
                    .select("*")
                    .limit(3);
                if (error) {
                    this.log(`Could not retrieve interactions: ${error.message}`);
                    if (error.code === 'PGRST116') {
                        this.log(`   Create the 'user_interactions' table using the provided CSV data`);
                    }
                }
                else {
                    this.log(`Recent Interactions (${data.length}):`);
                    data.forEach((interaction, index) => {
                        this.log(`  ${index + 1}. ${interaction.action || 'Unknown action'}`);
                    });
                }
            }
            catch (error) {
                this.log(`Error retrieving interactions: ${error}`);
            }
        }
        /**
         * Get a random user's preferences
         */
        async getRandomUserPreferences() {
            try {
                const { data, error } = await this.client
                    .from("user_preferences")
                    .select("*")
                    .limit(1);
                if (error) {
                    this.log(`Could not retrieve user preferences: ${error.message}`);
                }
                else if (data.length > 0) {
                    const user = data[0];
                    this.log(`Sample User Preferences:`);
                    this.log(`  User: ${user.user_id}`);
                    try {
                        const prefs = JSON.parse(user.preferences);
                        if (prefs.audio) {
                            this.log(`  Audio: Volume ${prefs.audio.volume}, SFX ${prefs.audio.sound_effects}`);
                        }
                        if (prefs.display) {
                            this.log(`  Display: Brightness ${prefs.display.brightness}, Mode ${prefs.display.color_mode}`);
                        }
                    }
                    catch (parseError) {
                        this.log(`  Preferences: ${user.preferences.substring(0, 100)}...`);
                    }
                }
                else {
                    this.log(`No user preferences found`);
                }
            }
            catch (error) {
                this.log(`Error retrieving user preferences: ${error}`);
            }
        }
        /**
         * Public methods for external scripts to use
         */
        isSupabaseConnected() {
            return this.isConnected;
        }
        getClient() {
            return this.client;
        }
        getUserId() {
            return this.uid;
        }
        /**
         * Public method to manually trigger data retrieval
         */
        async manualDataRetrieval() {
            await this.retrieveLatestData();
        }
        /**
         * Get current log messages as a string
         */
        getLogMessages() {
            return this.logMessages.join('\n');
        }
    };
    __setFunctionName(_classThis, "TableConnector");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TableConnector = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TableConnector = _classThis;
})();
exports.TableConnector = TableConnector;
//# sourceMappingURL=TableConnector.js.map