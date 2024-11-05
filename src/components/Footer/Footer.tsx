import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-background text-foreground border-t" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                    <div className="md:col-span-3">
                        <h1 className="text-2xl font-bold mb-4"><Link href="/">Criss Cross LTD</Link></h1>
                        <p className="mb-4">Criss Cross LTD is your trusted partner in FMCG wholesale, offering high-quality products with competitive pricing and reliable delivery. Committed to excellence and customer satisfaction, we prioritise meeting the needs of every client.</p>
                    </div>
                    <nav className="md:col-span-1" aria-label="Footer Navigation">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:underline">Home</Link></li>
                            <li><Link href="/products" className="hover:underline">Products</Link></li>
                            <li><Link href="/services" className="hover:underline">Services</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                            <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        </ul>
                    </nav>
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic">
                            <p className="flex items-center mb-2">
                                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
                                <span>Criss Cross Ltd, Mombasa Road, Nairobi, Kenya</span>
                            </p>
                            <p className="flex items-center mb-2">
                                <Mail className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
                                <a href="mailto:info@crisscross.co.ke" className="hover:underline">info@crisscross.co.ke</a>
                            </p>
                            <p className="flex items-center mb-2">
                                <Phone className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
                                <a href="tel:+254707451536" className="hover:underline">+254 707 451 536</a>
                            </p>
                        </address>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
                            <div className="flex space-x-4">
                                <Link href="/coming-soon" aria-label="Facebook page (coming soon)">
                                    <Facebook className="h-6 w-6 text-blue-600" />
                                </Link>
                                <Link href="/coming-soon" aria-label="Instagram page (coming soon)">
                                    <Instagram className="h-6 w-6 text-pink-600" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-muted">
                <div className="container mx-auto px-4 py-4 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Criss Cross LTD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}