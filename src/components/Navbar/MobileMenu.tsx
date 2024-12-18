'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
    SheetDescription
} from '@/components/ui/sheet'
import { Menu, Moon, Sun, ShoppingCart, User, PackageSearch, Phone, LayoutDashboard } from 'lucide-react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Badge } from "@/components/ui/badge"

interface MobileMenuProps {
    user: SupabaseUser | null
    onSignOut: () => Promise<void>
    cartItemsCount: number
    userRole: string | null
}

export default function MobileMenu({ user, onSignOut, cartItemsCount, userRole }: MobileMenuProps) {
    const { setTheme, theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const handleSignOut = async () => {
        await onSignOut()
        setIsOpen(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
                    <Menu className="h-[1.5rem] w-[1.5rem]" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle><Link href="/">Criss Cross LTD</Link></SheetTitle>
                <SheetDescription>
                    Access Quick Links
                </SheetDescription>
                <nav className="flex flex-col space-y-4 mt-4">
                    <SheetClose asChild>
                        <Link href="/contact" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact
                        </Link>
                    </SheetClose>
                    {userRole === 'admin' && (
                        <SheetClose asChild>
                            <Link href="/admin" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
                                <LayoutDashboard className="h-4 w-4 mr-2" />
                                Admin Dashboard
                            </Link>
                        </SheetClose>
                    )}
                    <SheetClose asChild>
                        <Link href="/cart" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Cart
                            {cartItemsCount > 0 && (
                                <Badge variant="destructive" className="ml-2 px-2 py-1 text-xs">
                                    {cartItemsCount}
                                </Badge>
                            )}
                        </Link>
                    </SheetClose>

                    {user ? (
                        <>
                            <SheetClose asChild>
                                <Link href="/profile" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/orders" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
                                    <PackageSearch className="h-4 w-4 mr-2" />
                                    Orders
                                </Link>
                            </SheetClose>
                            <div className="px-4">
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <SheetClose asChild>
                                <Link href="/auth/login" className="block py-2 px-4 hover:bg-accent rounded-md">
                                    Login
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/auth/signup" className="block py-2 px-4 hover:bg-accent rounded-md">
                                    Sign Up
                                </Link>
                            </SheetClose>
                        </>
                    )}

                    <div className="py-2 px-4">
                        <div className="flex space-x-8">
                            <Button
                                variant={theme === 'light' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setTheme('light')}
                            >
                                <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
                                Light
                            </Button>
                            <Button
                                variant={theme === 'dark' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setTheme('dark')}
                            >
                                <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />
                                Dark
                            </Button>
                        </div>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}