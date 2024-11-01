'use client'

import { useCart } from '@/contexts/CartContext'
import { useSupabase } from '@/components/SupabaseProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export function ShoppingCart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const supabase = useSupabase()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            updateQuantity(id, newQuantity)
        }
    }

    const handleRemoveItem = (id: string) => {
        removeFromCart(id)
    }

    const handleSubmitOrder = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            toast({
                title: "Please log in",
                description: "You need to be logged in to place an order.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        try {
            // Update the shopping_cart items to mark them as ordered
            const { error } = await supabase
                .from('shopping_cart')
                .update({ status: 'ordered' })
                .eq('user_id', user.id)
                .eq('status', 'in_cart')

            if (error) throw error

            clearCart()
            toast({
                title: "Order placed successfully",
                description: "Your order has been sent to Criss Cross LTD.",
            })
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

    if (cart.length === 0) {
        return (
            <Card className="w-full max-w-3xl mx-auto mt-8">
                <CardContent className="pt-6 flex flex-col items-center space-y-4">
                    <p className="text-center text-muted-foreground">Your cart is empty</p>
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
                {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-4 border-b">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={item.product_img}
                                alt={item.product_name}
                                width={50}
                                height={50}
                                className="rounded-md"
                            />
                            <div>
                                <p className="font-medium">{item.product_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                className="w-16 text-center"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                aria-label={`Remove ${item.product_name} from cart`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleSubmitOrder} disabled={isSubmitting}>
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
            </CardFooter>
        </Card>
    )
}