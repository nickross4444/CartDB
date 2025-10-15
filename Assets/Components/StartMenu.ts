import { PinchButton } from 'SpectaclesInteractionKit.lspkg/Components/UI/PinchButton/PinchButton';
import { BarcodeScanner } from './BarcodeScanner';
import { ProductManager } from './ProductManager';

/**
 * StartMenu Component
 * Handles initial user flow: dietary preference selection and starting the shopping experience
 */
@component
export class StartMenu extends BaseScriptComponent {
    // References to other components
    @input
    @hint("Reference to BarcodeScanner to start scanning")
    public barcodeScanner: BarcodeScanner;

    @input
    @hint("Reference to ProductManager")
    public productManager: ProductManager;

    // Dietary preference buttons
    @input
    @allowUndefined
    @hint("Button to select Vegetarian preference")
    public vegetarianButton: PinchButton;

    @input
    @allowUndefined
    @hint("Button to select Vegan preference")
    public veganButton: PinchButton;

    @input
    @allowUndefined
    @hint("Button to select Everything (no dietary restriction)")
    public everythingButton: PinchButton;

    // Start shopping button
    @input
    @hint("Button to start shopping (begins scanning)")
    public letsShopButton: PinchButton;

    // UI Elements
    @input
    @allowUndefined
    @hint("Optional: Text to display selected dietary preference")
    public selectedPreferenceText: Text;

    @input
    @allowUndefined
    @hint("Optional: Component to disable when shopping starts (the start menu itself)")
    public startMenuPanel: Component;

    // State
    private selectedDietaryPreference: "vegetarian" | "vegan" | "everything" | null = null;
    private logMessages: string[] = [];
    private maxLogMessages: number = 10;

    onAwake() {
        this.setupButtons();
    }

    /**
     * Setup all button interactions
     */
    private setupButtons() {
        // Dietary preference buttons
        if (this.vegetarianButton) {
            this.vegetarianButton.onButtonPinched.add(() => {
                this.selectDietaryPreference("vegetarian");
            });
        }

        if (this.veganButton) {
            this.veganButton.onButtonPinched.add(() => {
                this.selectDietaryPreference("vegan");
            });
        }

        if (this.everythingButton) {
            this.everythingButton.onButtonPinched.add(() => {
                this.selectDietaryPreference("everything");
            });
        }

        // Let's Shop button
        if (this.letsShopButton) {
            this.letsShopButton.onButtonPinched.add(() => {
                this.startShopping();
            });
        }
    }

    /**
     * Handle dietary preference selection
     */
    private selectDietaryPreference(preference: "vegetarian" | "vegan" | "everything") {
        this.selectedDietaryPreference = preference;
        this.log(`Dietary preference selected: ${preference}`);

        // Update UI to show selection
        if (this.selectedPreferenceText) {
            const displayText = preference === "everything" ? "No restrictions" : preference.charAt(0).toUpperCase() + preference.slice(1);
            this.selectedPreferenceText.text = `Selected: ${displayText}`;
        }

        // TODO: You could also visually highlight the selected button here
        // by modifying button states or colors
    }

    /**
     * Start shopping flow
     * - Closes start menu
     * - Ensures info panel is closed
     * - Opens cart panel
     * - Starts scanning
     */
    private startShopping() {
        this.log("Starting shopping experience!");

        if (this.selectedDietaryPreference) {
            this.log(`Shopping with preference: ${this.selectedDietaryPreference}`);
        } else {
            this.log("Shopping with no dietary preference selected");
        }

        // Close start menu
        if (this.startMenuPanel) {
            this.startMenuPanel.enabled = false;
            this.log("Start menu closed");
        }

        // Ensure info panel is closed
        if (this.productManager && typeof this.productManager.closeInfoPanel === 'function') {
            this.productManager.closeInfoPanel();
        }

        // Start scanning (this will automatically open cart panel)
        if (this.barcodeScanner && typeof this.barcodeScanner.startScanning === 'function') {
            this.barcodeScanner.startScanning();
            this.log("Barcode scanning started");
        } else {
            this.log("ERROR: BarcodeScanner not assigned or startScanning not available");
        }
    }

    /**
     * Get the selected dietary preference (for other components to use)
     */
    public getSelectedDietaryPreference(): "vegetarian" | "vegan" | "everything" | null {
        return this.selectedDietaryPreference;
    }

    /**
     * Reset the start menu (useful for returning to start screen)
     */
    public resetMenu() {
        this.selectedDietaryPreference = null;

        if (this.selectedPreferenceText) {
            this.selectedPreferenceText.text = "Select your preference";
        }

        if (this.startMenuPanel) {
            this.startMenuPanel.enabled = true;
        }

        this.log("Start menu reset");
    }

    /**
     * Custom logging
     */
    private log(message: string) {
        print(`[StartMenu] ${message}`);

        this.logMessages.push(message);

        if (this.logMessages.length > this.maxLogMessages) {
            this.logMessages = this.logMessages.slice(-this.maxLogMessages);
        }
    }
}

