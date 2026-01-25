"use client"

import { Phone, Package, ArrowRight, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function DeliveriesHero() {
  return (
    <section className="py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
            <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Fast & Reliable FMCG Delivery Across Nairobi
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          We deliver across Nairobi and surrounding areas.
          Explore our coverage zones and see if we deliver to your location.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200">
            <Link href="/contact">
              <Phone className="h-5 w-5 mr-2" />
              Contact for Delivery
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/products">
              <Package className="h-5 w-5 mr-2" />
              View Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
