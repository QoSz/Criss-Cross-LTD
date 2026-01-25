"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

interface DeliveriesAreasGridProps {
  deliveryAreas: string[]
}

export function DeliveriesAreasGrid({ deliveryAreas }: DeliveriesAreasGridProps) {
  return (
    <section className="py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Delivery Coverage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We deliver to {deliveryAreas.length} locations across Nairobi and surrounding areas
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t see your area?{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Contact us
            </Link>{" "}
            to inquire about delivery options
          </p>
        </div>

        <Card className="p-8 rounded-[1.618rem]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {deliveryAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer py-2 text-sm font-medium"
              >
                {area}
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
