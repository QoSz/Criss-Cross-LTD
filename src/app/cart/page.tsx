import { ShoppingCart } from './ShoppingCart'

export const metadata = {
    title: 'Shopping Cart | Your Store Name',
    description: 'View and manage your shopping cart items',
}

export default function CartPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl text-center font-bold mb-4">Your Shopping Cart</h1>
            <ShoppingCart />
        </div>
    )
}