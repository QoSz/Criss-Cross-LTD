import { Metadata } from 'next'
import { OrdersList } from "./OrdersList"
import { ProtectedRoute } from '@/components/ProtectedRoute'

export const metadata: Metadata = {
    title: 'My Orders | Criss Cross LTD',
    description: 'View your order history with Criss Cross LTD.',
}

export default function OrdersPage() {
    return (
        <ProtectedRoute>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl text-center font-bold mb-6">My Orders</h1>
                <OrdersList />
            </main>
        </ProtectedRoute>
    )
} 