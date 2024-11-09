'use client'

import { useEffect, useState } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useLoading } from '@/components/LoadingProvider'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Order } from './types'

export function OrdersList() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user, supabase } = useSupabaseAuth()
    const { toast } = useToast()
    const { setIsLoading } = useLoading()

    useEffect(() => {
        async function fetchOrders() {
            if (!user) return

            try {
                setIsInitialLoading(true)
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setOrders(data)
            } catch (err) {
                console.error('Error fetching orders:', err)
                setError('Failed to load orders')
                toast({
                    title: "Error",
                    description: "Failed to load orders",
                    variant: "destructive",
                })
            } finally {
                setTimeout(() => {
                    setIsInitialLoading(false)
                }, 500)
            }
        }

        fetchOrders()
    }, [user, supabase, toast])

    // Show loading spinner during initial load
    if (isInitialLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-red-500">{error}</p>
                </CardContent>
            </Card>
        )
    }

    if (orders.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No orders found</p>
                </CardContent>
            </Card>
        )
    }

    // Group orders by date
    const ordersByDate = orders.reduce((acc, order) => {
        const date = format(new Date(order.created_at), 'MMMM d, yyyy')
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(order)
        return acc
    }, {} as Record<string, Order[]>)

    return (
        <div className="space-y-8">
            {Object.entries(ordersByDate).map(([date, dateOrders]) => (
                <div key={date}>
                    <h2 className="text-lg font-semibold mb-4">{date}</h2>
                    <Card>
                        <CardContent className="divide-y p-6">
                            {dateOrders.map((order) => (
                                <div key={order.id} className="py-4 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <Image
                                                src={order.product_img}
                                                alt={order.product_name}
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium">{order.product_name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Quantity: {order.quantity}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Ordered at: {format(new Date(order.created_at), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
} 