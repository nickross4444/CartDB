import { ProductManager } from './ProductManager';
import { RectangleButton } from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/RectangleButton';

/**
 * BarcodeScanner Component
 * Mock scanner that simulates barcode detection
 * Minimal logic - just passes barcode to ProductManager
 * 
 * For production: Replace hardcoded barcode with actual scanner integration
 */
@component
export class BarcodeScanner extends BaseScriptComponent {
    // Reference to ProductManager
    @input
    @hint("Reference to ProductManager to trigger product lookups")
    public productManager: ProductManager;

    // Test barcode for mock scanning
    @input
    @hint("Hardcoded test barcode for testing (replace with real scanner later)")
    public testBarcode: string = "8901234567890";


    @input
    @hint("Enable auto-scan on start (for testing)")
    public autoScanOnStart: boolean = false;

    @input
    @hint("Delay before auto-scan (seconds)")
    public autoScanDelay: number = 2.0;

    private logMessages: string[] = [];
    private maxLogMessages: number = 10;

    onAwake() {
        this.createEvent("OnStartEvent").bind(() => {
            this.onStart();
        });
    }

    async onStart() {
        this.log("BarcodeScanner ready");

        if (!this.productManager) {
            this.log("ERROR: ProductManager not assigned!");
            return;
        }

        if (this.autoScanOnStart) {
            this.log("Waiting for ProductManager to initialize...");
            await this.waitForProductManager();

            // Now that ProductManager is ready, start the delay timer
            this.log(`ProductManager ready! Auto-scan will trigger in ${this.autoScanDelay}s...`);
            this.scheduleAutoScan();
        }
    }

    /**
     * Wait for ProductManager to be fully initialized before scanning
     */
    private async waitForProductManager() {
        const maxAttempts = 100; // 10 seconds max wait
        let attempts = 0;

        while (!this.productManager.isInitialized() && attempts < maxAttempts) {
            await this.delay(100); // Wait 100ms
            attempts++;
        }

        if (this.productManager.isInitialized()) {
            this.log("ProductManager ready - proceeding with auto-scan");
        } else {
            this.log("ERROR: ProductManager failed to initialize in time");
        }
    }

    /**
     * Helper to delay execution
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => {
            const delayedEvent = this.createEvent("DelayedCallbackEvent") as DelayedCallbackEvent;
            delayedEvent.bind(() => resolve());
            delayedEvent.reset(ms / 1000); // Convert to seconds
        });
    }

    /**
     * Schedule auto-scan for testing
     */
    private scheduleAutoScan() {
        const delayedEvent = this.createEvent("DelayedCallbackEvent") as DelayedCallbackEvent;
        delayedEvent.bind(() => {
            this.log("Auto-scan triggered!");
            this.scanBarcode();
        });
        delayedEvent.reset(this.autoScanDelay);
    }

    public scanBarcode(customBarcode?: string) {
        const barcode = customBarcode || this.testBarcode;

        if (!barcode || barcode.trim() === "") {
            this.log("ERROR: No barcode to scan");
            return;
        }

        if (!this.productManager) {
            this.log("ERROR: ProductManager not assigned");
            return;
        }

        this.log(`📷 Scanning barcode: ${barcode}`);

        // Pass barcode to ProductManager
        this.productManager.lookupProduct(barcode);

    }

    /**
     * Public method to scan custom barcode (for other components)
     */
    public triggerScan(barcode: string) {
        this.scanBarcode(barcode);
    }

    /**
     * Custom logging
     */
    private log(message: string) {
        print(`[BarcodeScanner] ${message}`);

        this.logMessages.push(message);

        if (this.logMessages.length > this.maxLogMessages) {
            this.logMessages = this.logMessages.slice(-this.maxLogMessages);
        }
    }

    /**
     * Get log messages as string
     */
    public getLogMessages(): string {
        return this.logMessages.join('\n');
    }
}

