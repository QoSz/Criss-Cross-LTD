'use client'

import { useCart } from '@/contexts/CartContext'
import { useSupabase } from '@/components/SupabaseProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { sendOrderEmail } from '@/app/actions/sendOrderEmail'

type CartProduct = {
    quantity: number
    products: {
        id: string
        product_name: string
        product_img: string
    }
}

export function ShoppingCart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const supabase = useSupabase()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const [localCart, setLocalCart] = useState(cart)
    const router = useRouter()

    useEffect(() => {
        setLocalCart(cart)
    }, [cart])

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            setLocalCart(prevCart =>
                prevCart.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            )
            updateQuantity(id, newQuantity)
        }
    }

    const handleRemoveItem = (id: string) => {
        setLocalCart(prevCart => prevCart.filter(item => item.id !== id))
        removeFromCart(id)
    }

    const handleClearCart = () => {
        clearCart()
        setLocalCart([])
        toast({
            title: "Cart cleared",
            description: "All items have been removed from your cart.",
        })
    }

    const handleSubmitOrder = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast({
                title: "Login Required",
                description: "Please log in to your account to place an order.",
                variant: "destructive",
                className: "bg-destructive/90 text-destructive-foreground",
                duration: 3000,
            })
            router.push('/auth/login')
            return
        }

        setIsSubmitting(true)
        try {
            // Start a transaction by getting cart items with product details
            const { data: cartWithProducts, error: cartError } = await supabase
                .from('shopping_cart')
                .select(`
                    quantity,
                    products (
                        id,
                        product_name,
                        product_img
                    )
                `)
                .eq('user_id', user.id) as { 
                    data: CartProduct[] | null
                    error: any 
                }

            if (cartError) throw cartError
            if (!cartWithProducts?.length) throw new Error('Cart is empty')

            // Prepare orders data
            const ordersData = cartWithProducts.map(item => ({
                user_id: user.id,
                product_id: item.products.id,
                product_name: item.products.product_name,
                product_img: item.products.product_img,
                quantity: item.quantity,
            }))

            // Insert into orders table
            const { error: orderError } = await supabase
                .from('orders')
                .insert(ordersData)

            if (orderError) throw orderError

            // Clear shopping cart after successful order
            const { error: deleteError } = await supabase
                .from('shopping_cart')
                .delete()
                .eq('user_id', user.id)

            if (deleteError) throw deleteError

            // Send order email
            const { success, error } = await sendOrderEmail(user.id, localCart)
            if (!success) throw new Error('Failed to send order email')

            // Clear local cart state
            clearCart()
            setLocalCart([])
            
            toast({
                title: "Order placed successfully",
                description: "Your order has been sent to Criss Cross LTD.",
            })

            // Optionally redirect to orders page
            router.push('/orders')
        } catch (error) {
            console.error('Error submitting order:', error)
            toast({
                title: "Error",
                description: "There was a problem placing your order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (localCart.length === 0) {
        return (
            <Card className="w-full max-w-3xl mx-auto mt-8">
                <CardContent className="pt-6 flex flex-col items-center space-y-4">
                    <div className="text-center space-y-2">
                        <p className="text-2xl font-semibold text-muted-foreground">Your cart is empty</p>
                        <p className="text-muted-foreground">Looks like you haven't added any items yet.</p>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Shopping Cart ({localCart.length} items)</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            Clear Cart
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Clear shopping cart?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will remove all items from your cart. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClearCart}>
                                Clear Cart
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>
            <CardContent className="space-y-6">
                {localCart.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex items-center gap-6">
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <Image
                                    src={item.product_img}
                                    alt={item.product_name}
                                    fill
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex-grow space-y-1">
                                <h3 className="font-semibold text-lg">{item.product_name}</h3>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                className="flex-shrink-0"
                            >
                                <Trash2 className="h-5 w-5" />
                                <span className="sr-only">Remove {item.product_name} from cart</span>
                            </Button>
                        </div>
                        {index < localCart.length - 1 && <Separator className="my-6" />}
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-6">
                <Button variant="outline" asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
                <Button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    size="lg"
                    className="min-w-[150px]"
                >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
            </CardFooter>
        </Card>
    )
}