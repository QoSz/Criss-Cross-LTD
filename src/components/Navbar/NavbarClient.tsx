'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User } from 'lucide-react'
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
import { User as SupabaseUser } from '@supabase/supabase-js'

interface NavbarClientProps {
    initialUser: SupabaseUser | null
}

export default function NavbarClient({ initialUser }: NavbarClientProps) {
    const { user, supabase } = useSupabaseAuth()
    const router = useRouter()
    const { setIsLoading } = useLoading()

    const currentUser = user ?? initialUser

    const handleSignOut = async () => {
        try {
            setIsLoading(true)
            await supabase.auth.signOut()
            router.push('/')
            router.refresh()
        } catch (error) {
            console.error('Error signing out:', error)
        } finally {
            setIsLoading(false)
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
                        <Button variant="ghost" asChild className="hidden md:inline-flex">
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeSwitcher />

                        <Button variant="ghost" size="icon" asChild className="relative">
                            <Link href="/cart">
                                <ShoppingCart className="h-[1.5rem] w-[1.5rem]" />
                                <span className="sr-only">Shopping cart</span>
                            </Link>
                        </Button>

                        {currentUser ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-[1.5rem] w-[1.5rem]" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/orders">Orders</Link>
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
                    <MobileMenu user={currentUser} onSignOut={handleSignOut} />
                </div>
            </nav>
        </header>
    )
}