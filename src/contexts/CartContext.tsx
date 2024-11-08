'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'

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
    const { user, supabase } = useSupabaseAuth()
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        const loadCart = async () => {
            // Load local cart first (for potential merging)
            const storedCart = localStorage.getItem('cart')
            const localCart: CartItem[] = storedCart ? JSON.parse(storedCart) : []
            
            if (user) {
                // Load cart from database
                const { data, error } = await supabase
                    .from('shopping_cart')
                    .select('quantity, products(id, product_name, product_img)')
                    .eq('user_id', user.id)

                if (data && !error) {
                    const dbCart: CartItem[] = data.map((item: any) => ({
                        id: item.products.id,
                        product_name: item.products.product_name,
                        quantity: item.quantity,
                        product_img: item.products.product_img
                    }))

                    // Merge local cart with database cart
                    if (localCart.length > 0) {
                        const mergedCart = [...dbCart]
                        
                        localCart.forEach(localItem => {
                            const existingItem = mergedCart.find(item => item.id === localItem.id)
                            if (existingItem) {
                                existingItem.quantity += localItem.quantity
                            } else {
                                mergedCart.push(localItem)
                            }
                        })

                        // Save merged cart to database and clear localStorage
                        await saveCart(mergedCart)
                        localStorage.removeItem('cart')
                    } else {
                        setCart(dbCart)
                    }
                }
            } else {
                // For guest users, just use local cart
                setCart(localCart)
            }
        }
        loadCart()
    }, [user, supabase])

    const saveCart = async (newCart: CartItem[]) => {
        if (user) {
            // Get the current cart items from the database
            const { data: currentDbCart } = await supabase
                .from('shopping_cart')
                .select('product_id')
                .eq('user_id', user.id)

            // Identify items to be deleted (in DB but not in newCart)
            const itemsToDelete = currentDbCart
                ?.filter(dbItem => !newCart.some(newItem => newItem.id === dbItem.product_id))
                .map(item => item.product_id) || []

            // Delete removed items
            if (itemsToDelete.length > 0) {
                await supabase
                    .from('shopping_cart')
                    .delete()
                    .eq('user_id', user.id)
                    .in('product_id', itemsToDelete)
            }

            // Upsert remaining items
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

    const clearCart = async () => {
        if (user) {
            await supabase
                .from('shopping_cart')
                .delete()
                .eq('user_id', user.id)
        }
        localStorage.removeItem('cart')
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}