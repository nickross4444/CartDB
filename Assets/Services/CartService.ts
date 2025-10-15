import { Tables, TablesInsert, TablesUpdate } from '../DatabaseTypes';
import { SupabaseClient } from 'SupabaseClient.lspkg/supabase-snapcloud';

/**
 * Handles all operations on the CartDB-Sample-Cart table
 * Provides CRUD operations for cart items
 */
export class CartService {
    private client: SupabaseClient;
    private readonly TABLE_NAME = "CartDB-Sample-Cart";

    constructor(supabaseClient: SupabaseClient) {
        this.client = supabaseClient;
    }

    /**
     * Add a new item to the cart
     * @param productId - The product ID to add
     * @param quantity - Quantity of the product
     * @returns The created cart item or null on error
     */
    async addCartItem(productId: number, quantity: number): Promise<Tables<"CartDB-Sample-Cart"> | null> {
        try {
            const insertData: TablesInsert<"CartDB-Sample-Cart"> = {
                product_id: productId,
                quantity: quantity
            };

            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .insert(insertData)
                .select()
                .single();

            if (error) {
                print(`[CartService] Error adding cart item: ${error.message}`);
                return null;
            }

            return data as Tables<"CartDB-Sample-Cart">;
        } catch (error) {
            print(`[CartService] Exception adding cart item: ${error}`);
            return null;
        }
    }

    /**
     * Update the quantity of a cart item
     * @param cartItemId - The cart item ID to update
     * @param quantity - New quantity value
     * @returns The updated cart item or null on error
     */
    async updateCartItemQuantity(cartItemId: number, quantity: number): Promise<Tables<"CartDB-Sample-Cart"> | null> {
        try {
            const updateData: TablesUpdate<"CartDB-Sample-Cart"> = {
                quantity: quantity
            };

            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .update(updateData)
                .eq("id", cartItemId)
                .select()
                .single();

            if (error) {
                print(`[CartService] Error updating cart item quantity: ${error.message}`);
                return null;
            }

            return data as Tables<"CartDB-Sample-Cart">;
        } catch (error) {
            print(`[CartService] Exception updating cart item quantity: ${error}`);
            return null;
        }
    }

    /**
     * Remove an item from the cart
     * @param cartItemId - The cart item ID to remove
     * @returns True if successful, false otherwise
     */
    async removeCartItem(cartItemId: number): Promise<boolean> {
        try {
            const { error } = await this.client
                .from(this.TABLE_NAME)
                .delete()
                .eq("id", cartItemId);

            if (error) {
                print(`[CartService] Error removing cart item: ${error.message}`);
                return false;
            }

            return true;
        } catch (error) {
            print(`[CartService] Exception removing cart item: ${error}`);
            return false;
        }
    }

    /**
     * Get all cart items
     * @returns Array of cart items
     */
    async getCartItems(): Promise<Tables<"CartDB-Sample-Cart">[]> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*");

            if (error) {
                print(`[CartService] Error fetching cart items: ${error.message}`);
                return [];
            }

            return (data || []) as Tables<"CartDB-Sample-Cart">[];
        } catch (error) {
            print(`[CartService] Exception fetching cart items: ${error}`);
            return [];
        }
    }

    /**
     * Get a specific cart item by ID
     * @param cartItemId - The cart item ID
     * @returns Cart item or null if not found
     */
    async getCartItemById(cartItemId: number): Promise<Tables<"CartDB-Sample-Cart"> | null> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .eq("id", cartItemId)
                .single();

            if (error) {
                print(`[CartService] Error fetching cart item by ID: ${error.message}`);
                return null;
            }

            return data as Tables<"CartDB-Sample-Cart">;
        } catch (error) {
            print(`[CartService] Exception fetching cart item by ID: ${error}`);
            return null;
        }
    }

    /**
     * Check if a product is already in the cart
     * @param productId - The product ID to check
     * @returns Cart item if exists, null otherwise
     */
    async getCartItemByProductId(productId: number): Promise<Tables<"CartDB-Sample-Cart"> | null> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .eq("product_id", productId)
                .single();

            if (error) {
                // Not found is expected, don't log as error
                if (error.code === 'PGRST116') {
                    return null;
                }
                print(`[CartService] Error checking cart for product: ${error.message}`);
                return null;
            }

            return data as Tables<"CartDB-Sample-Cart">;
        } catch (error) {
            print(`[CartService] Exception checking cart for product: ${error}`);
            return null;
        }
    }

    /**
     * Clear all items from the cart
     * @returns True if successful, false otherwise
     */
    async clearCart(): Promise<boolean> {
        try {
            const { error } = await this.client
                .from(this.TABLE_NAME)
                .delete()
                .neq("id", 0); // Delete all rows (neq matches everything)

            if (error) {
                print(`[CartService] Error clearing cart: ${error.message}`);
                return false;
            }

            return true;
        } catch (error) {
            print(`[CartService] Exception clearing cart: ${error}`);
            return false;
        }
    }

    /**
     * Get the total count of items in the cart
     * @returns Total quantity of all items
     */
    async getCartItemCount(): Promise<number> {
        try {
            const items = await this.getCartItems();
            return items.reduce((total, item) => total + (item.quantity || 0), 0);
        } catch (error) {
            print(`[CartService] Exception getting cart item count: ${error}`);
            return 0;
        }
    }
}

