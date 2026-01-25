"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { deliveryLocations, nairobiBounds, createColoredIcon } from './delivery-locations'

type LeafletIconPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: () => string
}

delete (L.Icon.Default.prototype as LeafletIconPrototype)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface DeliveryMapClientProps {
  deliveryAreas: string[]
}

export function DeliveryMapClient({ deliveryAreas }: DeliveryMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current, {
      center: [-1.2921, 36.8219],
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
      maxBounds: nairobiBounds,
      maxBoundsViscosity: 1.0
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    const deliveryAreasSet = new Set(deliveryAreas)

    deliveryLocations.forEach((location) => {
      if (deliveryAreasSet.has(location.name)) {
        const marker = L.marker([location.lat, location.lng], {
          icon: createColoredIcon(location.color)
        }).addTo(map)

        marker.bindPopup(`
          <div class="text-center p-2">
            <h3 class="font-semibold text-gray-800">${location.name}</h3>
            <p class="text-sm text-gray-600">Delivery Available</p>
          </div>
        `, { closeButton: false, className: 'custom-popup' })

        marker.on('mouseover', () => marker.openPopup())
        marker.on('mouseout', () => marker.closePopup())
      }
    })

    mapInstanceRef.current = map

    setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100)

    let resizeObserver: ResizeObserver | undefined
    let observedElement: HTMLElement | null = null

    if (typeof window !== 'undefined' && window.ResizeObserver && mapRef.current) {
      observedElement = mapRef.current
      resizeObserver = new ResizeObserver(() => mapInstanceRef.current?.invalidateSize())
      resizeObserver.observe(observedElement)
    }

    const handleResize = () => {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 300)
    }

    window.addEventListener('orientationchange', handleResize)
    window.addEventListener('resize', handleResize)

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
      if (resizeObserver && observedElement) {
        resizeObserver.unobserve(observedElement)
        resizeObserver.disconnect()
      }
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [deliveryAreas])

  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-[1.618rem] overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg"
        style={{ minHeight: '300px' }}
      />
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white dark:bg-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-md">
        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
          {deliveryAreas.length} Areas
        </p>
      </div>
    </div>
  )
}
