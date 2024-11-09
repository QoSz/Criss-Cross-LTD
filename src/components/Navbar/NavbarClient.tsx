'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, PackageSearch, Phone, LayoutDashboard } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
import MobileMenu from './MobileMenu'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLoading } from '@/components/LoadingProvider'
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/contexts/CartContext'

export default function NavbarClient() {
    const { user, supabase, userRole } = useSupabaseAuth()
    const router = useRouter()
    const { setIsLoading } = useLoading()
    const { cart } = useCart()

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

    const handleSignOut = async () => {
        try {
            setIsLoading(true)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            
            // Only proceed with navigation if sign-out was successful
            router.push('/')
            router.refresh()
        } catch (error) {
            console.error('Error signing out:', error)
        } finally {
            // Ensure loading state is always cleared
            setTimeout(() => {
                setIsLoading(false)
            }, 500) // Small delay to prevent flash
        }
    }

    return (
        <header className="border-b">
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to main content
            </a>
            <nav aria-label="Main navigation" className="bg-background">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold">
                            Criss Cross LTD
                        </Link>
                        <Button
                            variant="ghost"
                            asChild
                            className="hidden md:inline-flex bg-gray-200 hover:bg-gray-300 text-gray-900"
                        >
                            <Link href="/contact" className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                Contact
                            </Link>
                        </Button>
                        {userRole === 'admin' && (
                            <Button
                                variant="ghost"
                                asChild
                                className="hidden md:inline-flex bg-gray-200 hover:bg-gray-300 text-gray-900"
                            >
                                <Link href="/admin" className="flex items-center">
                                    <LayoutDashboard className="h-4 w-4 mr-1" />
                                    Admin Dashboard
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeSwitcher />

                        <Button variant="ghost" size="icon" asChild className="relative">
                            <Link href="/cart">
                                <ShoppingCart className="h-[1.5rem] w-[1.5rem]" />
                                <span className="sr-only">Shopping cart</span>
                                {cartItemsCount > 0 && (
                                    <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                                        {cartItemsCount}
                                    </Badge>
                                )}
                            </Link>
                        </Button>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-[1.5rem] w-[1.5rem]" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="flex items-center">
                                            <User className="h-4 w-4 mr-2" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/orders" className="flex items-center">
                                            <PackageSearch className="h-4 w-4 mr-2" />
                                            Orders
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600 cursor-pointer"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/auth/signup">Sign Up</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <MobileMenu 
                        user={user} 
                        onSignOut={handleSignOut} 
                        cartItemsCount={cartItemsCount}
                        userRole={userRole}
                    />
                </div>
            </nav>
        </header>
    )
}