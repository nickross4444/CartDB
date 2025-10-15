import { Tables } from '../DatabaseTypes';
import { SupabaseClient } from 'SupabaseClient.lspkg/supabase-snapcloud';

/**
 * Handles all queries to the CartDB-Product-List table
 * Can be used by multiple components (ProductManager, CartManager, etc.)
 */
export class ProductService {
    private client: SupabaseClient;
    private readonly TABLE_NAME = "CartDB-Product-List";

    constructor(supabaseClient: SupabaseClient) {
        this.client = supabaseClient;
    }

    /**
     * Fetch a product by its barcode
     * @param barcode - The barcode string to search for
     * @returns Product object or null if not found
     */
    async getProductByBarcode(barcode: string): Promise<Tables<"CartDB-Product-List"> | null> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .eq("barcode", barcode)
                .single();

            if (error) {
                print(`[ProductService] Error fetching product by barcode ${barcode}: ${error.message}`);
                return null;
            }

            return data as Tables<"CartDB-Product-List">;
        } catch (error) {
            print(`[ProductService] Exception fetching product by barcode: ${error}`);
            return null;
        }
    }

    /**
     * Fetch a product by its ID
     * @param id - The product ID
     * @returns Product object or null if not found
     */
    async getProductById(id: number): Promise<Tables<"CartDB-Product-List"> | null> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                print(`[ProductService] Error fetching product by ID ${id}: ${error.message}`);
                return null;
            }

            return data as Tables<"CartDB-Product-List">;
        } catch (error) {
            print(`[ProductService] Exception fetching product by ID: ${error}`);
            return null;
        }
    }

    /**
     * Fetch multiple products by their IDs (useful for cart enrichment)
     * @param ids - Array of product IDs
     * @returns Array of product objects
     */
    async getProductsByIds(ids: number[]): Promise<Tables<"CartDB-Product-List">[]> {
        if (ids.length === 0) {
            return [];
        }

        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .in("id", ids);

            if (error) {
                print(`[ProductService] Error fetching products by IDs: ${error.message}`);
                return [];
            }

            return (data || []) as Tables<"CartDB-Product-List">[];
        } catch (error) {
            print(`[ProductService] Exception fetching products by IDs: ${error}`);
            return [];
        }
    }

    /**
     * Get all products (useful for browsing/testing)
     * @param limit - Maximum number of products to fetch
     * @returns Array of product objects
     */
    async getAllProducts(limit: number = 50): Promise<Tables<"CartDB-Product-List">[]> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .limit(limit);

            if (error) {
                print(`[ProductService] Error fetching all products: ${error.message}`);
                return [];
            }

            return (data || []) as Tables<"CartDB-Product-List">[];
        } catch (error) {
            print(`[ProductService] Exception fetching all products: ${error}`);
            return [];
        }
    }

    /**
     * Search products by name (partial match)
     * @param searchTerm - Text to search for in product names
     * @param limit - Maximum number of results
     * @returns Array of matching products
     */
    async searchProductsByName(searchTerm: string, limit: number = 10): Promise<Tables<"CartDB-Product-List">[]> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .ilike("name", `%${searchTerm}%`)
                .limit(limit);

            if (error) {
                print(`[ProductService] Error searching products: ${error.message}`);
                return [];
            }

            return (data || []) as Tables<"CartDB-Product-List">[];
        } catch (error) {
            print(`[ProductService] Exception searching products: ${error}`);
            return [];
        }
    }

    /**
     * Filter products by dietary preference
     * @param preference - Dietary preference enum value
     * @param limit - Maximum number of results
     * @returns Array of matching products
     */
    async getProductsByDietaryPreference(
        preference: "vegan" | "vegetarian" | "eggs" | "milk" | "kosher" | "fish" | "meat" | "nuts",
        limit: number = 50
    ): Promise<Tables<"CartDB-Product-List">[]> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .eq("dietary_preference", preference)
                .limit(limit);

            if (error) {
                print(`[ProductService] Error fetching products by dietary preference: ${error.message}`);
                return [];
            }

            return (data || []) as Tables<"CartDB-Product-List">[];
        } catch (error) {
            print(`[ProductService] Exception fetching products by dietary preference: ${error}`);
            return [];
        }
    }

    /**
     * Filter products by Nutri-Score
     * @param score - Nutri-Score grade (A-E)
     * @param limit - Maximum number of results
     * @returns Array of matching products
     */
    async getProductsByNutriScore(
        score: "A" | "B" | "C" | "D" | "E",
        limit: number = 50
    ): Promise<Tables<"CartDB-Product-List">[]> {
        try {
            const { data, error } = await this.client
                .from(this.TABLE_NAME)
                .select("*")
                .eq("nutri_score", score)
                .limit(limit);

            if (error) {
                print(`[ProductService] Error fetching products by Nutri-Score: ${error.message}`);
                return [];
            }

            return (data || []) as Tables<"CartDB-Product-List">[];
        } catch (error) {
            print(`[ProductService] Exception fetching products by Nutri-Score: ${error}`);
            return [];
        }
    }
}

