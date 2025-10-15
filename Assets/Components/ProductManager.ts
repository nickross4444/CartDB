import { SnapCloudRequirements } from '../Examples/SnapCloudRequirements';
import { createClient, SupabaseClient } from 'SupabaseClient.lspkg/supabase-snapcloud';
import { ProductService } from '../Services/ProductService';
import { Tables } from '../DatabaseTypes';
import { RectangleButton } from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/RectangleButton';
import { PinchButton } from 'SpectaclesInteractionKit.lspkg/Components/UI/PinchButton/PinchButton';

/**
 * ProductManager Component
 * Orchestrates product lookup and display
 * Receives barcode from BarcodeScanner, fetches product data, and displays it
 * Provides interface for adding products to cart
 */
@component
export class ProductManager extends BaseScriptComponent {
    // Supabase Configuration
    @input
    @hint("Reference to SnapCloudRequirements for centralized Supabase configuration")
    public snapCloudRequirements: SnapCloudRequirements;

    // UI Elements (optional)
    @input
    @allowUndefined
    @hint("Optional: Text component to display product name")
    public productNameText: Text;

    @input
    @allowUndefined
    @hint("Optional: Text component to display product price")
    public productPriceText: Text;

    @input
    @allowUndefined
    @hint("Optional: Text component to display nutrition score")
    public nutritionScoreText: Text;

    @input
    @allowUndefined
    @hint("Optional: Text component to display product details")
    public productDetailsText: Text;

    @input
    @allowUndefined
    @hint("Optional: Text component to display logs on device")
    public logText: Text;

    @input
    @allowUndefined
    @hint("Optional: CartManager reference for automatic add-to-cart integration")
    public cartManager: any; // Using 'any' to avoid circular dependency, will be CartManager type

    @input
    @allowUndefined
    @hint("Optional: Button to add current product to cart")
    public addToCartButton: PinchButton;

    @input
    @allowUndefined
    @hint("Optional: Button to cancel/clear current product selection")
    public cancelButton: PinchButton;

    @input
    @allowUndefined
    @hint("Optional: Component to enable on scan")
    public infoPanel: Component;    //needs more implementation

    // Private state
    private client: SupabaseClient;
    private productService: ProductService;
    private uid: string;
    private currentProduct: Tables<"CartDB-Product-List"> | null = null;
    private logMessages: string[] = [];
    private maxLogMessages: number = 15;

    // Callback functions for other components to listen to
    public onProductFoundCallback: (() => void) | null = null;
    public onProductNotFoundCallback: (() => void) | null = null;
    public onAddToCartRequestedCallback: ((productId: number, quantity: number) => void) | null = null;

    onAwake() {
        this.setupButtons();
        this.createEvent("OnStartEvent").bind(() => {
            this.onStart();
        });
        if (this.infoPanel) {
            this.infoPanel.enabled = false;
        }
    }

    /**
     * Setup button interactions
     */
    private setupButtons() {
        // Add to Cart button
        if (this.addToCartButton) {
            this.addToCartButton.onButtonPinched.add(async () => {
                if (!this.currentProduct) {
                    this.log("No product selected - scan a barcode first");
                    return;
                }
                this.log("Add to cart button pressed!");
                await this.addToCart(1);
            });
        }

        // Cancel button
        if (this.cancelButton) {
            this.cancelButton.onButtonPinched.add(() => {
                this.log("Cancel button pressed!");
                this.clearCurrentProduct();
            });
        }
    }

    async onStart() {
        await this.initSupabase();
    }

    /**
     * Initialize Supabase client and authenticate user
     */
    async initSupabase() {
        if (!this.snapCloudRequirements || !this.snapCloudRequirements.isConfigured()) {
            this.log("SnapCloudRequirements not configured");
            return;
        }

        const supabaseProject = this.snapCloudRequirements.getSupabaseProject();
        this.client = createClient(supabaseProject.url, supabaseProject.publicToken);

        if (this.client) {
            try {
                await this.signInUser();
            } catch (error) {
                this.log("Sign in error: " + JSON.stringify(error));
            }

            // Initialize ProductService after client is ready
            try {
                this.productService = new ProductService(this.client);
                this.log("ProductManager initialized successfully");
            } catch (error) {
                this.log("ProductService error: " + JSON.stringify(error));
            }
        }
    }

    /**
     * Authenticate user with Snap Cloud
     */
    async signInUser() {
        const { data, error } = await this.client.auth.signInWithIdToken({
            provider: 'snapchat',
            token: ''
        });

        if (error) {
            this.log("Sign in error: " + JSON.stringify(error));
        } else {
            const { user } = data;
            this.uid = JSON.stringify(user.id);
            this.log("User authenticated");
        }
    }

    /**
     * Look up a product by barcode (called by BarcodeScanner)
     * @param barcode - The scanned barcode
     */
    public async lookupProduct(barcode: string) {
        if (!this.productService) {
            this.log("ERROR: ProductService not initialized - please wait for initialization");
            this.log("Tip: Increase autoScanDelay or disable autoScanOnStart in BarcodeScanner");
            return;
        }

        this.log(`Looking up product with barcode: ${barcode}`);

        const product = await this.productService.getProductByBarcode(barcode);

        if (product) {
            this.currentProduct = product;
            this.displayProduct(product);
            if (this.onProductFoundCallback) {
                this.onProductFoundCallback();
            }
        } else {
            this.log(`Product not found for barcode: ${barcode}`);
            this.currentProduct = null;
            this.displayNoData();
            if (this.onProductNotFoundCallback) {
                this.onProductNotFoundCallback();
            }
        }
    }

    /**
     * Look up a product by its ID
     * @param productId - The product ID
     */
    public async lookupProductById(productId: number) {
        if (!this.productService) {
            this.log("ProductService not initialized");
            return;
        }

        this.log(`Looking up product with ID: ${productId}`);

        const product = await this.productService.getProductById(productId);

        if (product) {
            this.currentProduct = product;
            this.displayProduct(product);
            if (this.onProductFoundCallback) {
                this.onProductFoundCallback();
            }
        } else {
            this.log(`Product not found for ID: ${productId}`);
            this.currentProduct = null;
            this.displayNoData();
            if (this.onProductNotFoundCallback) {
                this.onProductNotFoundCallback();
            }
        }
    }

    /**
     * Display product information in UI components
     */
    private displayProduct(product: Tables<"CartDB-Product-List">) {
        this.log(`Product found: ${product.name || 'Unknown'}`);

        // Update UI components if they exist
        if (this.productNameText) {
            this.productNameText.text = product.name || "Unknown Product";
        }

        if (this.productPriceText) {
            const price = product.price !== null ? `$${product.price.toFixed(2)}` : "Price unavailable";
            this.productPriceText.text = price;
        }

        if (this.nutritionScoreText) {
            const score = product.nutri_score || "N/A";
            this.nutritionScoreText.text = `Nutri-Score: ${score}`;
        }

        if (this.productDetailsText) {
            const details = this.formatProductDetails(product);
            this.productDetailsText.text = details;
        }

        // Log product info
        this.log(`  Name: ${product.name || 'N/A'}`);
        this.log(`  Price: ${product.price !== null ? '$' + product.price.toFixed(2) : 'N/A'}`);
        this.log(`  Nutri-Score: ${product.nutri_score || 'N/A'}`);
        this.log(`  Dietary: ${product.dietary_preference || 'N/A'}`);
    }

    /**
     * Format product details for display
     */
    private formatProductDetails(product: Tables<"CartDB-Product-List">): string {
        const details: string[] = [];

        if (product.weight !== null) {
            details.push(`Weight: ${product.weight}g`);
        }

        if (product.nutri_score) {
            details.push(`Nutri-Score: ${product.nutri_score}`);
        }

        if (product.dietary_preference) {
            details.push(`Dietary: ${product.dietary_preference}`);
        }

        // Nutrition info
        const nutrition: string[] = [];
        if (product.protein !== null) nutrition.push(`Protein: ${product.protein}g`);
        if (product.fat !== null) nutrition.push(`Fat: ${product.fat}g`);
        if (product.sugar !== null) nutrition.push(`Sugar: ${product.sugar}g`);
        if (product.sodium !== null) nutrition.push(`Sodium: ${product.sodium}mg`);

        if (nutrition.length > 0) {
            details.push(nutrition.join(', '));
        }

        return details.join('\n');
    }

    /**
     * Display "No data" when product not found
     */
    private displayNoData() {
        if (this.productNameText) {
            this.productNameText.text = "No data";
        }
        if (this.productPriceText) {
            this.productPriceText.text = "";
        }
        if (this.nutritionScoreText) {
            this.nutritionScoreText.text = "";
        }
        if (this.productDetailsText) {
            this.productDetailsText.text = "Product not found in database";
        }
    }

    /**
     * Clear product display
     */
    private clearDisplay() {
        if (this.productNameText) {
            this.productNameText.text = "";
        }
        if (this.productPriceText) {
            this.productPriceText.text = "";
        }
        if (this.nutritionScoreText) {
            this.nutritionScoreText.text = "";
        }
        if (this.productDetailsText) {
            this.productDetailsText.text = "";
        }
    }

    /**
     * Clear current product selection (used by cancel button)
     */
    public clearCurrentProduct() {
        this.log("Clearing current product selection");
        this.currentProduct = null;
        this.clearDisplay();
    }

    /**
     * Request to add current product to cart
     * This will notify CartManager via callback or directly call it if connected
     */
    public async addToCart(quantity: number = 1) {
        if (!this.currentProduct) {
            this.log("No product selected to add to cart");
            return;
        }

        this.log(`Adding to cart: ${this.currentProduct.name} (x${quantity})`);

        // If CartManager is connected, call it directly
        if (this.cartManager && typeof this.cartManager.addItem === 'function') {
            await this.cartManager.addItem(this.currentProduct.id, quantity);
        }

        // Also trigger callback if set (for custom integrations)
        if (this.onAddToCartRequestedCallback) {
            this.onAddToCartRequestedCallback(this.currentProduct.id, quantity);
        }
    }

    /**
     * Get the currently displayed product
     */
    public getCurrentProduct(): Tables<"CartDB-Product-List"> | null {
        return this.currentProduct;
    }

    /**
     * Get the ProductService instance (for other components to use)
     */
    public getProductService(): ProductService {
        return this.productService;
    }

    /**
     * Get the Supabase client (for other components to use)
     */
    public getClient(): SupabaseClient {
        return this.client;
    }

    /**
     * Get the authenticated user ID
     */
    public getUserId(): string {
        return this.uid;
    }

    /**
     * Check if ProductManager is fully initialized
     */
    public isInitialized(): boolean {
        return this.client !== undefined && this.productService !== undefined && this.uid !== undefined;
    }

    /**
     * Test method to verify product fetching works
     */
    public async testProductFetching() {
        if (!this.productService) {
            this.log("ProductService not initialized");
            return;
        }

        this.log("=== Testing Product Fetching ===");

        // Test: Get all products
        this.log("Fetching all products...");
        const allProducts = await this.productService.getAllProducts(5);
        this.log(`Found ${allProducts.length} products`);

        allProducts.forEach((product, index) => {
            this.log(`  ${index + 1}. ${product.name} (ID: ${product.id}, Barcode: ${product.barcode})`);
        });

        // Test: Get product by ID (if we have any products)
        if (allProducts.length > 0) {
            const firstProduct = allProducts[0];
            this.log(`\nTesting fetch by ID: ${firstProduct.id}`);
            const productById = await this.productService.getProductById(firstProduct.id);
            if (productById) {
                this.log(`  ✓ Successfully fetched: ${productById.name}`);
            } else {
                this.log(`  ✗ Failed to fetch product by ID`);
            }

            // Test: Get product by barcode (if barcode exists)
            if (firstProduct.barcode) {
                this.log(`\nTesting fetch by barcode: ${firstProduct.barcode}`);
                const productByBarcode = await this.productService.getProductByBarcode(firstProduct.barcode);
                if (productByBarcode) {
                    this.log(`  ✓ Successfully fetched: ${productByBarcode.name}`);
                } else {
                    this.log(`  ✗ Failed to fetch product by barcode`);
                }
            }

            // Test: Get multiple products by IDs
            const ids = allProducts.slice(0, 3).map(p => p.id);
            this.log(`\nTesting fetch multiple by IDs: [${ids.join(', ')}]`);
            const multipleProducts = await this.productService.getProductsByIds(ids);
            this.log(`  ✓ Fetched ${multipleProducts.length} products`);
        }

        this.log("=== Product Fetching Test Complete ===");
    }

    /**
     * Custom logging method
     */
    private log(message: string) {
        print(`[ProductManager] ${message}`);

        if (this.logText) {
            this.logMessages.push(message);

            if (this.logMessages.length > this.maxLogMessages) {
                this.logMessages = this.logMessages.slice(-this.maxLogMessages);
            }

            this.logText.text = this.logMessages.join('\n');
        }
    }

    /**
     * Clear logs
     */
    public clearLogs() {
        this.logMessages = [];
        if (this.logText) {
            this.logText.text = "";
        }
    }

    onDestroy() {
        if (this.client) {
            this.client.removeAllChannels();
        }
    }
}

