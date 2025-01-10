"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-20 items-center justify-between px-4 w-full">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img src="/criss-cross.svg" alt="Criss Cross LTD" className="h-[60px]" />
                        <span className="ml-2 font-bold text-2xl bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent">Criss Cross LTD</span>
                    </Link>
                    <Button
                        asChild
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white ml-4 hidden md:inline-flex"
                    >
                        <Link 
                            href="/contact" 
                            className="flex items-center space-x-2"
                        >
                            <span>Contact</span>
                            <Phone className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-base font-medium relative">
                    <Link 
                        href="/about" 
                        className="flex items-center space-x-2 hover:text-primary font-medium"
                    >
                        <span>About Us</span>
                        <User className="h-4 w-4" />
                    </Link>
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
                        <SheetContent side="right" className="pr-0">
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
                                <img src="/criss-cross.svg" alt="Criss Cross LTD" className="h-[60px]" />
                                <span className="ml-2 font-bold text-2xl bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent">Criss Cross LTD</span>
                            </Link>
                            <nav className="flex flex-col space-y-3">
                                <Button 
                                    asChild
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white justify-start self-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Link 
                                        href="/contact"
                                        className="flex items-center space-x-2"
                                    >
                                        <Phone className="h-4 w-4 mr-2" />
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
