import { OrdersList } from "./OrdersList";

export default function OrdersPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl text-center font-bold mb-6">My Orders</h1>
            <OrdersList />
        </main>
    )
} 