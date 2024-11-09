'use client'

import { useCart } from '@/contexts/CartContext'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import { useLoading } from '@/components/LoadingProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2 } from 'lucide-react'

// Simplified utility function that only enforces minimum value
const ensureMinQuantity = (value: number): number => {
    return Math.max(1, value)
}

export function ShoppingCart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const { user, supabase } = useSupabaseAuth()
    const { setIsLoading } = useLoading()
    const [localCart, setLocalCart] = useState(cart)
    const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' })
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        setLocalCart(cart)
    }, [cart])

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('first_name, last_name, email, phone_number')
                    .eq('id', user.id)
                    .single()

                if (error) {
                    console.error('Error fetching customer info:', error)
                } else if (data) {
                    setCustomerInfo({
                        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                        email: data.email,
                        phone: data.phone_number || ''
                    })
                }
            }
        }

        fetchCustomerInfo()
    }, [user, supabase])

    const handleSubmitOrder = async () => {
        if (!user) {
            toast({
                title: "Login Required",
                description: "Please log in to place an order.",
                variant: "destructive",
            })
            router.push('/auth/login')
            return
        }

        setIsLoading(true)
        try {
            const ordersData = localCart.map(item => ({
                user_id: user.id,
                product_id: item.id,
                product_name: item.product_name,
                product_img: item.product_img,
                quantity: item.quantity,
            }))

            const orderPromise = supabase
                .from('orders')
                .insert(ordersData)

            // Prepare order details for email
            const orderDetails = localCart.map(item => `${item.product_name} x ${item.quantity}`).join('\n')

            // Send email via Formspree
            const formData = new FormData()
            formData.append('name', customerInfo.name)
            formData.append('email', customerInfo.email)
            formData.append('phone', customerInfo.phone)
            formData.append('order', orderDetails)
            formData.append('subject', `A new order from ${customerInfo.name}`)

            const emailPromise = fetch('https://formspree.io/f/mzzbzorq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })

            const [orderResponse, emailResponse] = await Promise.all([orderPromise, emailPromise])

            if (orderResponse.error || !emailResponse.ok) {
                throw new Error('Failed to place order or send email')
            }

            await clearCart()
            toast({
                title: "Order placed successfully",
                description: "Your order has been confirmed.",
            })
            router.push('/orders')
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to place order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Simplified quantity handlers
    const handleQuantityChange = (id: string, value: string) => {
        const newValue = parseInt(value) || 1
        const validValue = ensureMinQuantity(newValue)
        updateQuantity(id, validValue)
    }

    const handleDecrementQuantity = (id: string, currentQuantity: number) => {
        const newQuantity = ensureMinQuantity(currentQuantity - 1)
        updateQuantity(id, newQuantity)
    }

    if (localCart.length === 0) {
        return (
            <Card className="w-full max-w-3xl mx-auto mt-8">
                <CardContent className="pt-6 flex flex-col items-center space-y-4">
                    <p className="text-2xl font-semibold text-muted-foreground">
                        Your cart is empty
                    </p>
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Shopping Cart ({localCart.length} items)</CardTitle>
                <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                </Button>
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
                                        onClick={() => handleDecrementQuantity(item.id, item.quantity)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        onBlur={(e) => {
                                            const value = parseInt(e.target.value) || 1
                                            handleQuantityChange(item.id, value.toString())
                                        }}
                                        className="w-16 text-center"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Trash2 className="h-5 w-5" />
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
                    size="lg"
                    className="min-w-[150px]"
                >
                    Place Order
                </Button>
            </CardFooter>
        </Card>
    )
}