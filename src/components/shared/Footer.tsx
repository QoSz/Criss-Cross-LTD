import Link from "next/link"
import { Phone, Mail, MapPin, User, Truck, Package } from "lucide-react"
import Image from 'next/image'

export function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-blue-50/50 to-blue-100/50 dark:from-gray-900/50 dark:to-gray-800/50 border-t border-blue-200/40 dark:border-gray-800/40">
            <div className="px-4 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center">
                            <Image src="/criss-cross.svg" alt="Criss Cross LTD" className="h-[50px]" width={50} height={50} />
                            <span className="ml-2 font-bold text-xl bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
                                Criss Cross LTD
                            </span>
                        </Link>
                        <p className="text-muted-foreground/80 dark:text-gray-400 text-sm">
                            Delivering FMCG products at competitive wholesale prices with reliable service across Nairobi.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground/90 dark:text-gray-200">Contact Us</h3>
                        <div className="space-y-3">
                            <a href="tel:+254707451536" className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 hover:text-primary text-sm">
                                <Phone className="h-4 w-4" />
                                <span>+254 707 451 536</span>
                            </a>
                            <a href="mailto:info@crisscross.co.ke" className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 hover:text-primary text-sm">
                                <Mail className="h-4 w-4" />
                                <span>info@crisscross.co.ke</span>
                            </a>
                            <div className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>Duldul Godown, Phase 2, Mombasa Road, Nairobi</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground/90 dark:text-gray-200">Quick Links</h3>
                        <div className="space-y-3">
                            <Link href="/about" className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 hover:text-primary text-sm">
                                <User className="h-4 w-4" />
                                <span>About Us</span>
                            </Link>
                            <Link href="/deliveries" className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 hover:text-primary text-sm">
                                <Truck className="h-4 w-4" />
                                <span>Deliveries</span>
                            </Link>
                            <Link href="/contact" className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 hover:text-primary text-sm">
                                <Phone className="h-4 w-4" />
                                <span>Contact</span>
                            </Link>
                            <Link href="/products" className="flex items-center space-x-2 text-muted-foreground/80 dark:text-gray-400 hover:text-primary text-sm">
                                <Package className="h-4 w-4" />
                                <span>Products</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-blue-200/40 dark:border-gray-800/40 px-4 py-4 mt-8">
                    <p className="text-center text-sm text-muted-foreground/70 dark:text-gray-500">
                        © {new Date().getFullYear()} Criss Cross LTD. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
