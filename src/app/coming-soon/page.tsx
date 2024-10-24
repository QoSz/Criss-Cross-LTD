import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Coming Soon | Criss Cross LTD',
    description: 'Our social media pages are coming soon. Stay tuned for updates, exciting content, and special offers from Criss Cross LTD.',
    openGraph: {
        title: 'Coming Soon | Criss Cross LTD',
        description: 'Our social media pages are coming soon. Stay tuned for updates, exciting content, and special offers from Criss Cross LTD.',
        type: 'website',
        url: 'https://www.crisscross.co.ke/coming-soon',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Coming Soon | Criss Cross LTD',
        description: 'Our social media pages are coming soon. Stay tuned for updates, exciting content, and special offers from Criss Cross LTD.',
    },
}

export default function ComingSoonPage() {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
            <main>
                <h1 className="text-4xl font-bold mb-6 text-center">Coming Soon!</h1>
                <p className="text-xl mb-8 text-center max-w-2xl">
                    We're working hard to bring you our social media presence. Stay tuned for updates, exciting content, and special offers!
                </p>
                <div className="mb-8 text-center">
                    <p className="text-lg mb-2">What to expect:</p>
                    <ul className="list-disc list-inside text-left inline-block">
                        <li>Exclusive limited-time deals</li>
                        <li>Flash sales on popular products</li>
                        <li>Seasonal product discounts</li>
                        <li>Special offers for early followers</li>
                    </ul>
                </div>
                <div className="text-center">
                    <Button asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}