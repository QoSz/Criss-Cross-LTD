"use client"

import dynamic from 'next/dynamic'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Package, Phone, ArrowRight, Clock, Truck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Dynamically import the map component to avoid SSR issues
const DeliveryMap = dynamic(() => import('./DeliveryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] bg-gray-100 dark:bg-gray-800 rounded-[1.618rem] flex items-center justify-center" style={{ minHeight: '300px' }}>
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MapPin className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
        </motion.div>
        <p className="text-sm sm:text-base text-gray-500">Loading interactive map...</p>
      </div>
    </div>
  )
})

interface DeliveryClientProps {
  deliveryAreas: string[]
}

export default function DeliveryClient({ deliveryAreas }: DeliveryClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900/50">
      {/* Hero Section */}
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

      {/* Stats Section */}
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{deliveryAreas.length}+</h3>
              <p className="text-gray-600 dark:text-gray-400">Delivery Areas</p>
            </Card>
            <Card className="p-6 text-center rounded-[1.618rem] border-l-4 border-l-green-500">
              <Clock className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Same Day</h3>
              <p className="text-gray-600 dark:text-gray-400">Delivery Available</p>
            </Card>
            <Card className="p-6 text-center rounded-[1.618rem] border-l-4 border-l-purple-500">
              <MapPin className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Nairobi</h3>
              <p className="text-gray-600 dark:text-gray-400">Metro Coverage</p>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
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
            <DeliveryMap deliveryAreas={deliveryAreas} />
          </Card>
        </motion.div>
      </section>

      {/* Areas Grid Section */}
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
          
          {/* Simple Areas List */}
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

      {/* Call to Action Section */}
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 hover:opacity-80 transition-opacity duration-200">
                <Link href="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  Get In Touch
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/products">
                  Browse Our Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
} 