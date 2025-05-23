"use client";

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function HeroClient() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
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
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-b from-blue-700 to-blue-400 text-white rounded-lg font-semibold hover:opacity-90 transition-all dark:from-blue-400 dark:to-blue-600 flex items-center space-x-2 justify-center"
            >
              <span>View Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all relative bg-white flex items-center space-x-2 justify-center"
            >
              <span className="relative bg-gradient-to-b from-blue-700 to-blue-400 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Contact Us</span>
              </span>
              <span className="absolute inset-0 rounded-lg border-2 border-blue-400 hover:border-blue-500 transition-colors"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 