import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
import MobileMenu from './MobileMenu'

export default function Navbar() {
    return (
        <header>
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to main content
            </a>
            <nav aria-label="Main navigation">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold">
                            Criss Cross LTD
                        </Link>
                        <Button variant="ghost" asChild className="hidden md:inline-flex">
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeSwitcher />
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                            <ShoppingCart className="h-[1.5rem] w-[1.5rem]" />
                            <span className="sr-only">Shopping cart</span>
                        </Button>
                        <Button variant="ghost" asChild className="h-10">
                            <Link href="/auth/login">Login</Link>
                        </Button>
                        <Button asChild className="h-10">
                            <Link href="/auth/signup">Sign Up</Link>
                        </Button>
                    </div>
                    <MobileMenu />
                </div>
            </nav>
        </header>
    )
}