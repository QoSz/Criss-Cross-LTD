"use client"

import dynamic from 'next/dynamic'
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MapLoadingState } from "./map/MapLoadingState"

const DeliveryMapClient = dynamic(
  () => import('./map/DeliveryMapClient').then(mod => ({ default: mod.DeliveryMapClient })),
  { ssr: false, loading: () => <MapLoadingState /> }
)

interface DeliveriesMapProps {
  deliveryAreas: string[]
}

export function DeliveriesMap({ deliveryAreas }: DeliveriesMapProps) {
  return (
    <section className="py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Interactive Delivery Map</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Click on any highlighted area to see the delivery zone name
          </p>
        </div>
        <Card className="p-2 sm:p-4 rounded-[1.618rem] overflow-hidden">
          <DeliveryMapClient deliveryAreas={deliveryAreas} />
        </Card>
      </motion.div>
    </section>
  )
}
