import { ProductManager } from './ProductManager';
import { CartService } from '../Services/CartService';
import { ProductService } from '../Services/ProductService';
import { Tables } from '../DatabaseTypes';

/**
 * CartItem with enriched product data
 */
export interface EnrichedCartItem {
    cartItem: Tables<"CartDB-Sample-Cart">;
    product: Tables<"CartDB-Product-List"> | null;
}

/**
 * CartManager Component
 * Manages cart state and orchestrates cart operations
 * Uses shared client from ProductManager (Option B pattern)
 * Provides public API for cart operations and state queries
 */
@component
export class CartManager extends BaseScriptComponent {
    // Reference to ProductManager (for shared client and services)
    @input
    @hint("Reference to ProductManager for shared Supabase client")
    public productManager: ProductManager;

    // UI Elements (optional)
    @input
    @allowUndefined
    @hint("Optional: Text component to display all cart items")
    public cartItemsText: Text;

    @input
    @allowUndefined
    @hint("Optional: Text component to display total price")
    public totalPriceText: Text;

    @input
    @allowUndefined
    @hint("Optional: Text component to display average nutrition score")
    public averageNutritionScoreText: Text;


    @input
    @allowUndefined
    @hint("Optional: Text component to display logs")
    public logText: Text;

    // Private state
    private cartService: CartService;
    private productService: ProductService;
    private cartState: EnrichedCartItem[] = [];
    private logMessages: string[] = [];
    private maxLogMessages: number = 15;

    // Callback functions for other components to listen to
    public onCartUpdatedCallback: (() => void) | null = null;
    public onItemAddedCallback: ((productId: number, quantity: number) => void) | null = null;
    public onItemRemovedCallback: ((cartItemId: number) => void) | null = null;

    onAwake() {
        this.createEvent("OnStartEvent").bind(() => {
            this.onStart();
        });
    }

    async onStart() {
        await this.initializeServices();
    }

    /**
     * Initialize services using shared client from ProductManager
     */
    private async initializeServices() {
        if (!this.productManager) {
            this.log("ERROR: ProductManager not assigned");
            return;
        }

        // Wait for ProductManager to initialize
        const maxAttempts = 50; // 5 seconds max wait
        let attempts = 0;

        while (!this.productManager.isInitialized() && attempts < maxAttempts) {
            await this.delay(100); // Wait 100ms
            attempts++;
        }

        if (!this.productManager.isInitialized()) {
            this.log("ERROR: ProductManager failed to initialize");
            return;
        }

        // Get shared client and services from ProductManager
        const client = this.productManager.getClient();
        this.productService = this.productManager.getProductService();

        // Create CartService with shared client
        this.cartService = new CartService(client);

        this.log("✓ CartManager initialized with shared client");
        this.log("✓ CartService created");
        this.log("✓ ProductService obtained from ProductManager");

        // Load initial cart state
        await this.refreshCartState();
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
     * Add item to cart
     * @param productId - Product ID to add
     * @param quantity - Quantity to add
     */
    public async addItem(productId: number, quantity: number = 1) {
        if (!this.cartService) {
            this.log("CartService not initialized");
            return;
        }

        this.log(`Adding to cart: Product ${productId} x${quantity}`);

        // Check if product already exists in cart
        const existingItem = await this.cartService.getCartItemByProductId(productId);

        if (existingItem) {
            // Update quantity
            const newQuantity = (existingItem.quantity || 0) + quantity;
            await this.updateQuantity(existingItem.id, newQuantity);
            this.log(`Updated existing item to quantity: ${newQuantity}`);
        } else {
            // Add new item
            const cartItem = await this.cartService.addCartItem(productId, quantity);

            if (cartItem) {
                this.log(`✓ Item added to cart (ID: ${cartItem.id})`);
                await this.refreshCartState();

                if (this.onItemAddedCallback) {
                    this.onItemAddedCallback(productId, quantity);
                }
            } else {
                this.log("✗ Failed to add item to cart");
            }
        }
    }

    /**
     * Remove item from cart
     * @param cartItemId - Cart item ID to remove
     */
    public async removeItem(cartItemId: number) {
        if (!this.cartService) {
            this.log("CartService not initialized");
            return;
        }

        this.log(`Removing cart item: ${cartItemId}`);

        const success = await this.cartService.removeCartItem(cartItemId);

        if (success) {
            this.log(`✓ Item removed from cart`);
            await this.refreshCartState();

            if (this.onItemRemovedCallback) {
                this.onItemRemovedCallback(cartItemId);
            }
        } else {
            this.log("✗ Failed to remove item");
        }
    }

    /**
     * Update item quantity
     * @param cartItemId - Cart item ID
     * @param quantity - New quantity
     */
    public async updateQuantity(cartItemId: number, quantity: number) {
        if (!this.cartService) {
            this.log("CartService not initialized");
            return;
        }

        if (quantity <= 0) {
            // Remove if quantity is 0 or negative
            await this.removeItem(cartItemId);
            return;
        }

        this.log(`Updating cart item ${cartItemId} to quantity: ${quantity}`);

        const updatedItem = await this.cartService.updateCartItemQuantity(cartItemId, quantity);

        if (updatedItem) {
            this.log(`✓ Quantity updated`);
            await this.refreshCartState();
        } else {
            this.log("✗ Failed to update quantity");
        }
    }

    /**
     * Clear entire cart
     */
    public async clearCart() {
        if (!this.cartService) {
            this.log("CartService not initialized");
            return;
        }

        this.log("Clearing cart...");

        const success = await this.cartService.clearCart();

        if (success) {
            this.log("✓ Cart cleared");
            await this.refreshCartState();
        } else {
            this.log("✗ Failed to clear cart");
        }
    }

    /**
     * Refresh cart state from database and enrich with product data
     */
    public async refreshCartState() {
        if (!this.cartService || !this.productService) {
            this.log("Services not initialized");
            return;
        }

        // Get all cart items from database
        const cartItems = await this.cartService.getCartItems();

        // Get product IDs
        const productIds = cartItems
            .map(item => item.product_id)
            .filter(id => id !== null) as number[];

        // Fetch all products in one query
        const products = await this.productService.getProductsByIds(productIds);

        // Enrich cart items with product data
        this.cartState = cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.product_id) || null;
            return { cartItem, product };
        });

        this.log(`Cart updated: ${this.cartState.length} items`);
        this.updateDisplay();

        if (this.onCartUpdatedCallback) {
            this.onCartUpdatedCallback();
        }
    }

    /**
     * Get current cart state (enriched with product data)
     */
    public getCartState(): EnrichedCartItem[] {
        return this.cartState;
    }

    /**
     * Get total price of all items in cart
     */
    public getTotalPrice(): number {
        return this.cartState.reduce((total, item) => {
            const price = item.product?.price || 0;
            const quantity = item.cartItem.quantity || 0;
            return total + (price * quantity);
        }, 0);
    }

    /**
     * Get total number of items in cart
     */
    public getItemCount(): number {
        return this.cartState.reduce((total, item) => {
            return total + (item.cartItem.quantity || 0);
        }, 0);
    }

    /**
     * Get number of unique products in cart
     */
    public getUniqueProductCount(): number {
        return this.cartState.length;
    }

    /**
     * Check if a product is in the cart
     */
    public hasProduct(productId: number): boolean {
        return this.cartState.some(item => item.cartItem.product_id === productId);
    }

    /**
     * Get cart item by product ID
     */
    public getCartItemByProductId(productId: number): EnrichedCartItem | null {
        return this.cartState.find(item => item.cartItem.product_id === productId) || null;
    }

    /**
     * Calculate average nutrition score of cart items
     * Converts letter grades (A-E) to numerical values (4.0-0.0) like school grades
     * @returns Formatted grade (e.g., "B+") or "N/A" if no items
     */
    public getAverageNutritionScore(): string {
        if (this.cartState.length === 0) {
            return "N/A";
        }

        // Filter items with valid nutri_score
        const itemsWithScore = this.cartState.filter(item =>
            item.product && item.product.nutri_score
        );

        if (itemsWithScore.length === 0) {
            return "N/A";
        }

        // Convert letter grades to GPA scale
        const gradeToGPA: { [key: string]: number } = {
            'A': 4.0,
            'B': 3.0,
            'C': 2.0,
            'D': 1.0,
            'E': 0.0
        };

        // Calculate weighted average (by quantity)
        let totalPoints = 0;
        let totalQuantity = 0;

        itemsWithScore.forEach(item => {
            const score = item.product!.nutri_score!;
            const quantity = item.cartItem.quantity || 1;
            const points = gradeToGPA[score] || 0;

            totalPoints += points * quantity;
            totalQuantity += quantity;
        });

        const averageGPA = totalPoints / totalQuantity;

        // Convert GPA back to letter grade with +/-
        return this.gpaToLetterGrade(averageGPA);
    }

    /**
     * Convert numerical GPA to letter grade with +/-
     * @param gpa - Grade point average (0.0 - 4.0)
     * @returns Letter grade (e.g., "A", "B+", "C-")
     */
    private gpaToLetterGrade(gpa: number): string {
        if (gpa >= 3.7) return "A";
        if (gpa >= 3.3) return "A-";
        if (gpa >= 3.0) return "B+";
        if (gpa >= 2.7) return "B";
        if (gpa >= 2.3) return "B-";
        if (gpa >= 2.0) return "C+";
        if (gpa >= 1.7) return "C";
        if (gpa >= 1.3) return "C-";
        if (gpa >= 1.0) return "D+";
        if (gpa >= 0.7) return "D";
        if (gpa >= 0.3) return "D-";
        return "E";
    }

    /**
     * Update UI display components
     */
    private updateDisplay() {
        // Cart items list
        if (this.cartItemsText) {
            const itemsList = this.formatCartItems();
            this.cartItemsText.text = itemsList;
        }

        // Total price
        if (this.totalPriceText) {
            const total = this.getTotalPrice();
            this.totalPriceText.text = `$${total.toFixed(2)}`;
        }

        // Average nutrition score
        if (this.averageNutritionScoreText) {
            const avgScore = this.getAverageNutritionScore();
            this.averageNutritionScoreText.text = avgScore;
        }
    }

    /**
     * Format cart items as a simple list
     */
    private formatCartItems(): string {
        if (this.cartState.length === 0) {
            return "Cart is empty";
        }

        const lines: string[] = [];

        this.cartState.forEach((item, index) => {
            const product = item.product;
            const quantity = item.cartItem.quantity || 0;

            if (product) {
                const price = product.price || 0;
                const lineTotal = price * quantity;
                const nutriScore = product.nutri_score ? ` [${product.nutri_score}]` : '';
                lines.push(`${index + 1}. ${product.name} (x${quantity})${nutriScore} - $${lineTotal.toFixed(2)}`);
            } else {
                lines.push(`${index + 1}. Unknown Product (ID: ${item.cartItem.product_id})`);
            }
        });

        return lines.join('\n');
    }
    /**
     * Custom logging
     */
    private log(message: string) {
        print(`[CartManager] ${message}`);

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
        // No cleanup needed - using shared client
    }
}

