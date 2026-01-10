import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-950/40 dark:to-indigo-950/30 text-slate-950 transition-colors w-full overflow-x-hidden">
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight dark:text-white">
            Your Trusted Partner in
            <span className="block bg-gradient-to-b from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600">
              Wholesale Consumer Goods
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Leading wholesale FMCG distributor in Kenya. Competitive prices, reliable delivery across Nairobi, and comprehensive product selection for your business needs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-b from-blue-700 to-blue-400 text-white rounded-[1.618rem] font-semibold hover:opacity-90 transition-all dark:from-blue-400 dark:to-blue-600 flex items-center space-x-2 justify-center"
            >
              <span>View Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-[1.618rem] font-semibold transition-all border-2 border-blue-400 hover:border-blue-500 bg-transparent flex items-center space-x-2 justify-center"
            >
              <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-b from-blue-700 to-blue-400 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
