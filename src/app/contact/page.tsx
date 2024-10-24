import { Metadata } from 'next'
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
    title: 'Contact Us | Criss Cross LTD',
    description: 'Get in touch with Criss Cross LTD. We\'re here to help with quotes, support, or if you\'re interested in joining our team.',
    openGraph: {
        title: 'Contact Criss Cross LTD',
        description: 'Reach out to us for quotes, support, or career opportunities. Fill out our contact form or use our contact details.',
        type: 'website',
        url: 'https://www.crisscross.co.ke/contact',
    },
}

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="space-y-6">
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <MapPin className="h-6 w-6 text-red-500 mr-4" />
                            <div>
                                <h2 className="font-semibold text-lg">Address:</h2>
                                <p>Criss Cross Ltd, Mombasa Road, Nairobi, Kenya</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <Mail className="h-6 w-6 text-blue-500 mr-4" />
                            <div>
                                <h2 className="font-semibold text-lg">Email:</h2>
                                <a href="mailto:info@crisscross.co.ke" className="text-blue-600 hover:underline">info@crisscross.co.ke</a>
                                <br />
                                <a href="mailto:crisscrossltd@gmail.com" className="text-blue-600 hover:underline">crisscrossltd@gmail.com</a>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <Phone className="h-6 w-6 text-green-500 mr-4" />
                            <div>
                                <h2 className="font-semibold text-lg">Call Us:</h2>
                                <a href="tel:+254707451536" className="text-blue-600 hover:underline">+254 707 451 536</a>
                                <br />
                                <a href="tel:+254722488224" className="text-blue-600 hover:underline">+254 722 488 224</a>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="font-semibold text-lg mb-2">Connect With Us</h2>
                            <p className="mb-4">Follow us for updates, offers, and more.</p>
                            <div className="flex space-x-4">
                                <Link href="/coming-soon" aria-label="Facebook page (coming soon)">
                                    <Facebook className="h-6 w-6 text-blue-600" />
                                </Link>
                                <Link href="/coming-soon" aria-label="Instagram page (coming soon)">
                                    <Instagram className="h-6 w-6 text-pink-600" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-[400px] lg:h-full rounded-lg overflow-hidden border border-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.734665705923!2d36.89375821082464!3d-1.335415298646304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13df6febb2d7%3A0x23d6ba31663476fa!2sCriss%20Cross%20Ltd!5e0!3m2!1sen!2ske!4v1729761455416!5m2!1sen!2ske"
                        width="100%"
                        height="100%"
                        className="rounded-lg"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <ContactForm />
        </div>
    )
}