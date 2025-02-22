"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon, Phone, User, Truck, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Image from "next/image"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-200/40 bg-blue-50/30 backdrop-blur-sm supports-[backdrop-filter]:bg-blue-50/60 dark:bg-gray-900/30 dark:border-gray-800/40">
            <div className="flex h-20 items-center justify-between px-4 w-full">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <div className="w-[60px] h-[60px] relative">
                            <Image
                                src="/criss-cross.svg"
                                alt="Criss Cross LTD"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="ml-2 font-bold text-2xl bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
                            Criss Cross LTD
                        </span>
                    </Link>
                    <Link
                        href="/deliveries"
                        className="group relative flex items-center space-x-2 text-muted-foreground/80 ml-4 hidden md:inline-flex dark:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 dark:hover:text-blue-400 after:hover:w-full"
                    >
                        <Truck className="h-4 w-4" />
                        <span>Deliveries</span>
                    </Link>
                    <Link
                        href="/about"
                        className="group relative flex items-center space-x-2 text-muted-foreground/80 ml-4 hidden md:inline-flex dark:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 dark:hover:text-blue-400 after:hover:w-full"
                    >
                        <User className="h-4 w-4" />
                        <span>About Us</span>
                    </Link>
                    <Link
                        href="/products"
                        className="group relative flex items-center space-x-2 text-muted-foreground/80 ml-4 hidden md:inline-flex dark:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 dark:hover:text-blue-400 after:hover:w-full"
                    >
                        <Package className="h-4 w-4" />
                        <span>Products</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-base font-medium relative">
                    <Button
                        asChild
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200"
                    >
                        <Link
                            href="/contact"
                            className="flex items-center space-x-2"
                        >
                            <Phone className="h-4 w-4" />
                            <span>Contact</span>
                        </Link>
                    </Button>
                </nav>
                <div className="flex items-center md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="ml-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="pr-0 dark:bg-gray-900 bg-white/70 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90 dark:bg-gray-900/30"
                        >
                            <SheetTitle className="sr-only">
                                Navigation Menu
                            </SheetTitle>
                            <SheetDescription className="sr-only">
                                Mobile navigation menu for accessing site sections
                            </SheetDescription>
                            <Link
                                href="/"
                                className="flex items-center mb-4"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="w-[60px] h-[60px] relative">
                                    <Image
                                        src="/criss-cross.svg"
                                        alt="Criss Cross LTD"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="ml-2 font-bold text-2xl bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
                                    Criss Cross LTD
                                </span>
                            </Link>
                            <nav className="flex flex-col space-y-3">
                                <Link
                                    href="/deliveries"
                                    className="group relative flex items-center space-x-2 text-muted-foreground/80 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 dark:after:bg-blue-400 hover:after:w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Truck className="h-4 w-4" />
                                    <span>Deliveries</span>
                                </Link>
                                <Link
                                    href="/about"
                                    className="group relative flex items-center space-x-2 text-muted-foreground/80 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 dark:after:bg-blue-400 hover:after:w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                    <span>About Us</span>
                                </Link>
                                <Link
                                    href="/products"
                                    className="group relative flex items-center space-x-2 text-muted-foreground/80 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 dark:after:bg-blue-400 hover:after:w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Package className="h-4 w-4" />
                                    <span>Products</span>
                                </Link>
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white justify-start self-start dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Link
                                        href="/contact"
                                        className="flex items-center space-x-2"
                                    >
                                        <Phone className="h-4 w-4" />
                                        <span>Contact</span>
                                    </Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
