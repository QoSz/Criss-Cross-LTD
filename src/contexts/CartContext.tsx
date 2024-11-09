'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLoading } from '@/components/LoadingProvider'
import { debounce } from 'lodash'


// Database Table Types
type ShoppingCartTable = {
    id: number
    user_id: string
    product_id: string
    quantity: number
    created_at: string
    updated_at: string
}

// Join result type (what we get from the Supabase query)
type CartJoinResult = {
    quantity: number
    product_id: string
    products: {
        id: string
        product_name: string
        product_img: string
    }
}

// Application Types
type CartItem = {
    id: string               // This is the product_id
    product_name: string
    quantity: number
    product_img: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>
    removeFromCart: (id: string) => Promise<void>
    updateQuantity: (id: string, quantity: number) => Promise<void>
    clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, supabase } = useSupabaseAuth()
    const queryClient = useQueryClient()
    const { setIsLoading } = useLoading()

    // Fetch cart data with proper typing
    const { data: cart = [] } = useQuery<CartItem[]>({
        queryKey: ['cart', user?.id],
        queryFn: async () => {
            if (!user) {
                const storedCart = localStorage.getItem('cart')
                return storedCart ? JSON.parse(storedCart) : []
            }

            const { data, error } = await supabase
                .from('shopping_cart')
                .select(`
                    quantity,
                    product_id,
                    products (
                        id,
                        product_name,
                        product_img
                    )
                `)
                .eq('user_id', user.id)
                .returns<CartJoinResult[]>()

            if (error) throw error
            if (!data) return []

            return data.map(item => ({
                id: item.product_id,
                product_name: item.products.product_name,
                quantity: item.quantity,
                product_img: item.products.product_img
            }))
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    // Merge local storage cart with database cart on login
    useEffect(() => {
        const mergeLocalStorageCart = async () => {
            if (user) {
                const storedCart = localStorage.getItem('cart')
                if (storedCart) {
                    const localCart: CartItem[] = JSON.parse(storedCart)
                    const mergedCart = [...cart]

                    localCart.forEach(localItem => {
                        const existingItem = mergedCart.find(item => item.id === localItem.id)
                        if (existingItem) {
                            existingItem.quantity += localItem.quantity
                        } else {
                            mergedCart.push(localItem)
                        }
                    })

                    await saveCart(mergedCart)
                    localStorage.removeItem('cart')
                }
            }
        }

        mergeLocalStorageCart()
    }, [user])

    // Clear cart and local storage on logout
    useEffect(() => {
        if (!user) {
            localStorage.removeItem('cart')
            queryClient.setQueryData(['cart', null], [])
        }
    }, [user])

    // Save cart changes with proper typing
    const saveCart = async (newCart: CartItem[]) => {
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(newCart))
            queryClient.setQueryData(['cart', null], newCart)
            return
        }

        const cartData: Omit<ShoppingCartTable, 'id' | 'created_at' | 'updated_at'>[] = newCart.map(item => ({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity
        }))

        await supabase
            .from('shopping_cart')
            .upsert(cartData, {
                onConflict: 'user_id,product_id'
            })

        queryClient.setQueryData(['cart', user.id], newCart)
    }

    // Cart operations with proper typing
    const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
        const existingItem = cart.find(i => i.id === item.id)
        const updatedCart = existingItem
            ? cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            : [...cart, { ...item, quantity: 1 }]
        
        await saveCart(updatedCart)
    }

    const removeFromCart = async (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id)
        await saveCart(updatedCart)
    }

    const debouncedSaveCart = useRef(debounce((newCart: CartItem[]) => {
        saveCart(newCart)
    }, 300)).current

    const updateQuantity = async (id: string, quantity: number) => {
        if (quantity < 1) return
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
        debouncedSaveCart(updatedCart)
    }

    const clearCart = async () => {
        setIsLoading(true)
        try {
            if (user) {
                await supabase
                    .from('shopping_cart')
                    .delete()
                    .eq('user_id', user.id)
            }
            localStorage.removeItem('cart')
            queryClient.setQueryData(['cart', user?.id], [])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}