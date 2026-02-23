"use client"

import { Truck, Clock, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface DeliveriesStatsProps {
  areasCount: number
}

export function DeliveriesStats({ areasCount }: DeliveriesStatsProps) {
  return (
    <section className="py-8 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center rounded-[1.618rem] border-l-4 border-l-blue-500">
            <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{areasCount}+</p>
            <p className="text-gray-600 dark:text-gray-400">Delivery Areas</p>
          </Card>
          <Card className="p-6 text-center rounded-[1.618rem] border-l-4 border-l-green-500">
            <Clock className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Same Day</p>
            <p className="text-gray-600 dark:text-gray-400">Delivery Available</p>
          </Card>
          <Card className="p-6 text-center rounded-[1.618rem] border-l-4 border-l-purple-500">
            <MapPin className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Nairobi</p>
            <p className="text-gray-600 dark:text-gray-400">Metro Coverage</p>
          </Card>
        </div>
      </motion.div>
    </section>
  )
}
