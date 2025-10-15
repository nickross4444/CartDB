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

    // SCANDIT
    @input
    @hint("With port eg. 0.0.0.0:8000")
    scanditServer: String = "10.223.60.197";
    @input internetModule: InternetModule;
    private isBusy: boolean = false;
    private cameraModule: CameraModule = require('LensStudio:CameraModule');
    private cameraRequest: CameraModule.CameraRequest;
    private cameraTexture: Texture;
    private cameraTextureProvider: CameraTextureProvider;

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

        this.setupCameraScanner();
    }

    /**
     * Setup camera to send image to server (Scandit)
     */
    private setupCameraScanner() {
        this.cameraRequest = CameraModule.createCameraRequest();
        this.cameraRequest.cameraId = CameraModule.CameraId.Default_Color;
        this.cameraTexture = this.cameraModule.requestCamera(this.cameraRequest);
        this.cameraTextureProvider = this.cameraTexture.control as CameraTextureProvider;
        this.cameraTextureProvider.onNewFrame.add((cameraFrame) => {
            if (this.isBusy) {
                return; 
            }
            this.isBusy = true;
            this.sendImageToServer();
        });
    }

    private async sendImageToServer(): Promise<String> {
        const payload = {
            image_data: await this.encodeTextureToBase64(this.cameraTexture),
        };
        let request = new Request(`http://${this.scanditServer}/predict`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let response = await this.internetModule.fetch(request);

        if (response.status !== 200) {
            print(`Failure: Server returned status code ${response.status}`);
            try {
                const errorBody = await response.text();
                print(`Server Error Body: ${errorBody}`);
            } catch (e) {
                print("Could not read error body.");
            }
            return;
        }

        let contentTypeHeader = response.headers.get('Content-Type');
        if (!contentTypeHeader || !contentTypeHeader.includes('application/json')) {
            print('Failure: wrong content type in response (expected application/json)');
            print(`Received Content-Type: ${contentTypeHeader}`);
            return;
        }

        let responseJson: any;
        try {
            responseJson = await response.json();
        } catch (e) {
            print(`Failure: Could not parse response as JSON. Error: ${e.message}`);
            return;
        }

        if (responseJson.barcodes && responseJson.barcodes.length > 0) {
            for (const barcode of responseJson.barcodes) {
                const data = barcode.data;
                const location = barcode.location;
                const centerX = (location.top_left.x + location.top_right.x + location.bottom_right.x + location.bottom_left.x) / 4;
                const centerY = (location.top_left.y + location.top_right.y + location.bottom_right.y + location.bottom_left.y) / 4;
                print(`Barcode: ${data}, Average Position: ${centerX.toFixed(2)}, ${centerY.toFixed(2)}`);
                this.scanBarcode(data); // Trigger product lookup
                this.isBusy = false;
                return;
            }
        }
        //print(`Full Response: ${JSON.stringify(responseJson, null, 2)}`);
        this.isBusy = false;
    }

    /**
     * Encode texture to Base64 (async)
     */
    private async encodeTextureToBase64(texture: Texture): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            Base64.encodeTextureAsync(texture, resolve, reject, CompressionQuality.MaximumQuality, EncodingType.Png);
        });
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

