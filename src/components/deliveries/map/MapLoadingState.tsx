"use client"

import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

export function MapLoadingState() {
  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] bg-gray-100 dark:bg-gray-800 rounded-[1.618rem] flex items-center justify-center" style={{ minHeight: '300px' }}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
        </motion.div>
        <p className="text-sm sm:text-base text-gray-500">Loading interactive map...</p>
      </div>
    </div>
  )
}
