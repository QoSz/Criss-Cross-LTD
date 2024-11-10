export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    first_name: string | null
                    last_name: string | null
                    email: string
                    role: string | null
                    created_at: string
                    updated_at: string
                    phone_number: string | null
                }
                Insert: {
                    id?: string
                    first_name?: string | null
                    last_name?: string | null
                    email: string
                    role?: string | null
                    created_at?: string
                    updated_at?: string
                    phone_number?: string | null
                }
                Update: {
                    id?: string
                    first_name?: string | null
                    last_name?: string | null
                    email?: string
                    role?: string | null
                    created_at?: string
                    updated_at?: string
                    phone_number?: string | null
                }
            }
            products: {
                Row: {
                    id: string
                    product_name: string
                    product_description: string | null
                    product_img: string
                    category: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    product_name: string
                    product_description?: string | null
                    product_img: string
                    category?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    product_name?: string
                    product_description?: string | null
                    product_img?: string
                    category?: string | null
                    updated_at?: string | null
                }
            }
            shopping_cart: {
                Row: {
                    id: number
                    user_id: string
                    product_id: string
                    quantity: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    product_id: string
                    quantity?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    product_id?: string
                    quantity?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            orders: {
                Row: {
                    id: number
                    user_id: string
                    product_id: string
                    product_name: string
                    product_img: string
                    quantity: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    product_id: string
                    product_name: string
                    product_img: string
                    quantity: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    product_id?: string
                    product_name?: string
                    product_img?: string
                    quantity?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_unique_categories: {
                Args: Record<string, never>
                Returns: { category: string }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
    }
}