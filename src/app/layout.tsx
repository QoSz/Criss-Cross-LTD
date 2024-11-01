import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from '@/components/SupabaseProvider'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import LoadingProvider from '@/components/LoadingProvider'
import Loading from './loading'
import { ScrollToTopButton } from '@/components/ScrollToTopButton'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Criss Cross LTD | E-Commerce Platform',
    template: '%s | Criss Cross LTD'
  },
  description: 'E-Commerce platform for Criss Cross LTD. Shop our wide range of high-quality products with excellent customer service.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://www.crisscross.co.ke',
    siteName: 'Criss Cross LTD',
    title: 'Criss Cross LTD | E-Commerce Platform',
    description: 'Shop with Criss Cross LTD for a wide range of high-quality products. Best deals and excellent customer service guaranteed.',
  },
  metadataBase: new URL('https://www.crisscross.co.ke'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SupabaseProvider>
          <CartProvider>
            <LoadingProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Suspense fallback={<Loading />}>
                      {children}
                    </Suspense>
                  </main>
                  <Footer />
                  <ScrollToTopButton />
                </div>
              </ThemeProvider>
            </LoadingProvider>
          </CartProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}