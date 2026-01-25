import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollUpButton } from "@/components/shared/ScrollUpButton";
import { ServiceWorkerRegistration } from "@/components/shared/ServiceWorkerRegistration";
import { siteConfig } from "@/lib/seo";
import { env } from "@/lib/env";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Wholesale FMCG Distributor in Kenya`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: [
    'wholesale FMCG Kenya',
    'fast moving consumer goods distributor',
    'wholesale distributor Nairobi',
    'FMCG supply chain Kenya',
    'bulk consumer goods',
    'wholesale food products'
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/cc-logos/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Wholesale FMCG Distributor in Kenya`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Wholesale FMCG Distributor in Kenya`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Wholesale FMCG Distributor in Kenya`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@crisscrossltd',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" dir="ltr">
      <head>
        {env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', '${env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="color-scheme" content="light dark" />
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body className={poppins.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ServiceWorkerRegistration />
        <Navbar />
        <main id="main-content" className="dark:bg-gray-900 dark:text-gray-100">
          {children}
        </main>
        <Footer />
        <ScrollUpButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
