// Lens Studio Script: WelcomeScreenManager.JS
// Manages a welcome screen with diet selection and acknowledge button that switches to main UI container.

// ----- INPUTS -----
// @ui {"widget":"group_start", "label":"Welcome Screen"}
// @input SceneObject welcomePrefab {"label":"Welcome Prefab"}
// @input Component.ScriptComponent veganButton {"label":"Vegan Button"}
// @input Component.ScriptComponent vegetarianButton {"label":"Vegetarian Button"}
// @input Component.ScriptComponent everythingButton {"label":"Everything Button"}
// @input Component.ScriptComponent acknowledgeButton {"label":"Let's Shop Button"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Main UI"}
// @input SceneObject containerFrameUI {"label":"Container Frame UI"}
// @ui {"widget":"group_end"}

// ----- SCRIPT LOGIC -----

const STATES = { 
    WELCOME: "welcome", 
    MAIN_UI: "main_ui"
};
Object.freeze(STATES);
var currentState = STATES.WELCOME;
var dietSelected = false;

// --- Helper Functions ---

function validateInputs() {
    var valid = true;
    const inputsToCheck = [
        {obj: script.welcomePrefab, name: "Welcome Prefab"},
        {obj: script.veganButton, name: "Vegan Button"},
        {obj: script.vegetarianButton, name: "Vegetarian Button"},
        {obj: script.everythingButton, name: "Everything Button"},
        {obj: script.acknowledgeButton, name: "Let's Shop Button"},
        {obj: script.containerFrameUI, name: "Container Frame UI"}
    ];
    
    inputsToCheck.forEach(function(input) {
        if (!input.obj) {
            print("ERROR: WelcomeScreenManager - Input missing: " + input.name);
            valid = false;
        }
    });
    
    return valid;
}

function disableAllUI() {
    print("Disabling all UI elements...");
    if (script.welcomePrefab) script.welcomePrefab.enabled = false;
    if (script.containerFrameUI) script.containerFrameUI.enabled = false;
}

// Central function to switch between states
function switchToState(newState) {
    print("DEBUG: Switching from state '" + currentState + "' to '" + newState + "'");
    
    if (!STATES[newState.toUpperCase()]) {
        print("ERROR: Invalid target state: " + newState);
        return;
    }

    // --- Disable Current State ---
    if (currentState === STATES.WELCOME && script.welcomePrefab) {
        script.welcomePrefab.enabled = false;
    } else if (currentState === STATES.MAIN_UI && script.containerFrameUI) {
        script.containerFrameUI.enabled = false;
    }

    // --- Enable New State ---
    if (newState === STATES.WELCOME && script.welcomePrefab) {
        script.welcomePrefab.enabled = true;
    } else if (newState === STATES.MAIN_UI && script.containerFrameUI) {
        script.containerFrameUI.enabled = true;
    }

    currentState = newState;
    print("Successfully switched to state: " + currentState);
}

// Function to show/hide the Let's Shop button
function updateLetsShopButtonVisibility() {
    if (!script.acknowledgeButton) return;
    
    var buttonObject = script.acknowledgeButton.getSceneObject();
    if (buttonObject) {
        buttonObject.enabled = dietSelected;
        print("Let's Shop button visibility: " + dietSelected);
    }
}

// Function to initialize all buttons
function initializeButtons() {
    print("=== INITIALIZING BUTTONS ===");
    
    // Store current enabled states
    var welcomeWasEnabled = script.welcomePrefab ? script.welcomePrefab.enabled : false;
    var uiWasEnabled = script.containerFrameUI ? script.containerFrameUI.enabled : false;
    
    // Temporarily enable both containers to ensure button scripts initialize properly
    if (script.welcomePrefab) script.welcomePrefab.enabled = true;
    if (script.containerFrameUI) script.containerFrameUI.enabled = true;
    
    print("Temporarily enabled all containers for button initialization");
    
    // Wait a frame for initialization to complete
    var initEvent = script.createEvent("UpdateEvent");
    var frameCounter = 0;
    
    initEvent.bind(function() {
        frameCounter++;
        
        if (frameCounter >= 2) {
            print("Proceeding with button binding after " + frameCounter + " frames");
            
            script.removeEvent(initEvent);
            
            // Bind all buttons
            bindButton(script.veganButton, "Vegan");
            bindButton(script.vegetarianButton, "Vegetarian");
            bindButton(script.everythingButton, "Everything");
            bindButton(script.acknowledgeButton, "Acknowledge");
            
            // Restore original states
            if (script.welcomePrefab) script.welcomePrefab.enabled = welcomeWasEnabled;
            if (script.containerFrameUI) script.containerFrameUI.enabled = uiWasEnabled;
            
            // Set the correct initial state
            currentState = STATES.WELCOME;
            if (script.welcomePrefab) script.welcomePrefab.enabled = true;
            if (script.containerFrameUI) script.containerFrameUI.enabled = false;
            
            // Hide Let's Shop button initially
            updateLetsShopButtonVisibility();
            
            print("Button initialization complete. Current state: " + currentState);
        }
    });
}

// Bind button function
function bindButton(buttonScriptComponent, buttonName) {
    if (!buttonScriptComponent) {
        print("ERROR: WelcomeScreenManager - Button ScriptComponent input not assigned for: " + buttonName);
        return;
    }

    var targetComponent = buttonScriptComponent;
    print("--- Attempting to bind button: " + buttonName + " ---");

    try {
        if (targetComponent.onButtonPinched === undefined) {
            print("ERROR: WelcomeScreenManager - Input ScriptComponent for '" + buttonName + "' is missing 'onButtonPinched'");
            return;
        }

        // Standard binding logic
        if (typeof targetComponent.onButtonPinched.subscribe === 'function') {
            targetComponent.onButtonPinched.subscribe(function(eventData) {
                handlePinchEvent(buttonName);
            });
            print("Binding successful using subscribe() for button: " + buttonName);
        } 
        else if (typeof targetComponent.onButtonPinched.add === 'function') {
            targetComponent.onButtonPinched.add(function() {
                handlePinchEvent(buttonName);
            });
            print("Binding successful using add() for button: " + buttonName);
        } 
        else {
            print("ERROR: WelcomeScreenManager - Could not bind button: " + buttonName);
        }
    } catch (e) {
        print("ERROR: WelcomeScreenManager - Failed during binding for " + buttonName + ": " + e);
    }
}

// Handler for pinch events
function handlePinchEvent(buttonName) {
    print("DEBUG: Pinch event RECEIVED for button: " + buttonName);
    print("DEBUG: Current state: " + currentState);
    
    // Handle diet selection buttons
    if ((buttonName === "Vegan" || buttonName === "Vegetarian" || buttonName === "Everything") && currentState === STATES.WELCOME) {
        print("EVENT: Diet selected - " + buttonName);
        dietSelected = true;
        updateLetsShopButtonVisibility();
    }
    // Handle Let's Shop button
    else if (buttonName === "Acknowledge" && currentState === STATES.WELCOME && dietSelected) {
        print("EVENT: Switching to main UI");
        switchToState(STATES.MAIN_UI);
    } else {
        print("INFO: Pinch event ignored - button not relevant for current state");
    }
}

// --- Initialization ---
function initialize() {
    print("Initializing WelcomeScreenManager...");
    
    if (!validateInputs()) {
        print("ERROR: WelcomeScreenManager initialization failed due to missing inputs.");
        return;
    }

    // Disable all UI elements first
    disableAllUI();
    
    print("Starting button initialization process...");
    
    // Initialize buttons with proper container activation
    initializeButtons();
    
    print("WelcomeScreenManager initialized successfully. Awaiting user interaction.");
}

// --- Script Entry Point & Cleanup ---
initialize();

script.destroy = function() {
    print("Destroying WelcomeScreenManager...");
    disableAllUI();
    print("WelcomeScreenManager destroyed.");
};