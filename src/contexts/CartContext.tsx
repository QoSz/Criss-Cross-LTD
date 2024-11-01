'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSupabase } from '@/components/SupabaseProvider'

type CartItem = {
    id: string
    product_name: string
    quantity: number
    product_img: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
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
    const [cart, setCart] = useState<CartItem[]>([])
    const supabase = useSupabase()

    useEffect(() => {
        const loadCart = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // Load cart from database
                const { data, error } = await supabase
                    .from('shopping_cart')
                    .select('quantity, products(id, product_name, product_img)')
                    .eq('user_id', user.id)
                if (data && !error) {
                    const cartItems: CartItem[] = data.map((item: any) => ({
                        id: item.products.id,
                        product_name: item.products.product_name,
                        quantity: item.quantity,
                        product_img: item.products.product_img
                    }))
                    setCart(cartItems)
                }
            } else {
                // Load cart from local storage
                const storedCart = localStorage.getItem('cart')
                if (storedCart) {
                    setCart(JSON.parse(storedCart))
                }
            }
        }
        loadCart()
    }, [supabase])

    const saveCart = async (newCart: CartItem[]) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            // Save cart to database
            const cartData = newCart.map(item => ({
                user_id: user.id,
                product_id: item.id,
                quantity: item.quantity
            }))
            await supabase.from('shopping_cart').upsert(cartData, {
                onConflict: 'user_id,product_id'
            })
        } else {
            // Save cart to local storage
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
        setCart(newCart)
    }

    const addToCart = (item: CartItem) => {
        const existingItem = cart.find(i => i.id === item.id)
        if (existingItem) {
            const updatedCart = cart.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
            saveCart(updatedCart)
        } else {
            saveCart([...cart, { ...item, quantity: 1 }])
        }
    }

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id)
        saveCart(updatedCart)
    }

    const updateQuantity = (id: string, quantity: number) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
        saveCart(updatedCart)
    }

    const clearCart = () => {
        saveCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}