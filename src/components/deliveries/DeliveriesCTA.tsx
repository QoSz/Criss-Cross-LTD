"use client"

import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function DeliveriesCTA() {
  return (
    <section className="py-16 px-4 bg-blue-50 dark:bg-gray-800/50">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Place an Order?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          Contact us today to discuss your delivery requirements.
          Our team is ready to serve you across all covered areas.
        </p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200 hover:scale-105 active:scale-95 transition-transform">
            <Link href="/contact">
              <Phone className="h-5 w-5 mr-2" />
              Get In Touch
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full hover:scale-105 active:scale-95 transition-transform">
            <Link href="/products">
              Browse Our Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
