"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
type LeafletIconPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: () => string;
};

delete (L.Icon.Default.prototype as LeafletIconPrototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface DeliveryMapProps {
  deliveryAreas: string[]
}

// Accurate coordinates for Nairobi delivery areas with unique colors
const deliveryLocations = [
  { name: "Athi River", lat: -1.4550, lng: 36.9825, color: "#FF6B6B" },
  { name: "Buruburu", lat: -1.298333, lng: 36.883333, color: "#4ECDC4" },
  { name: "CBD", lat: -1.286389, lng: 36.817223, color: "#45B7D1" },
  { name: "Chokaa", lat: -1.2509, lng: 37.0396, color: "#96CEB4" },
  { name: "Dandora", lat: -1.278333, lng: 36.938333, color: "#FFEAA7" },
  { name: "Eastleigh", lat: -1.2700, lng: 36.8500, color: "#DDA0DD" },
  { name: "Githurai", lat: -1.171800, lng: 36.931800, color: "#FFB6C1" },
  { name: "Highridge", lat: -1.259882, lng: 36.817892, color: "#87CEEB" },
  { name: "Huruma", lat: -1.2500, lng: 36.8783, color: "#FFA07A" },
  { name: "Kahawa Sukari", lat: -1.1578, lng: 36.9208, color: "#20B2AA" },
  { name: "Kabiria", lat: -1.2929, lng: 36.7570, color: "#F0E68C" },
  { name: "Kangemi", lat: -1.2678, lng: 36.7567, color: "#DA70D6" },
  { name: "Kariobangi", lat: -1.2718, lng: 36.8789, color: "#FF7F50" },
  { name: "Karen", lat: -1.3167, lng: 36.7000, color: "#32CD32" },
  { name: "Kasarani", lat: -1.2333, lng: 36.9167, color: "#FF69B4" },
  { name: "Kawangware", lat: -1.2929, lng: 36.7570, color: "#1E90FF" },
  { name: "Kayole", lat: -1.28333, lng: 36.9333, color: "#FFD700" },
  { name: "Kikuyu", lat: -1.254337, lng: 36.681660, color: "#8A2BE2" },
  { name: "Kimbo", lat: -1.1070, lng: 36.9480, color: "#00CED1" },
  { name: "Kinoo", lat: -1.2417, lng: 36.7208, color: "#FF1493" },
  { name: "Kiserian", lat: -1.4251869, lng: 36.6936512, color: "#00FF7F" },
  { name: "Kitengela", lat: -1.4925, lng: 36.9867, color: "#DC143C" },
  { name: "Langata", lat: -1.36611, lng: 36.73806, color: "#00BFFF" },
  { name: "Mawimbi", lat: -1.2967, lng: 36.8434, color: "#9370DB" },
  { name: "Mlolongo", lat: -1.3833, lng: 36.9333, color: "#FF4500" },
  { name: "Ngara", lat: -1.27472, lng: 36.82889, color: "#2E8B57" },
  { name: "Ngong", lat: -1.3500, lng: 36.6500, color: "#B22222" },
  { name: "Pangani", lat: -1.2667, lng: 36.8333, color: "#5F9EA0" },
  { name: "Parklands", lat: -1.25972, lng: 36.81778, color: "#D2691E" },
  { name: "Pipeline", lat: -1.2709, lng: 36.9209, color: "#9932CC" },
  { name: "Rongai", lat: -1.3938636, lng: 36.7442377, color: "#8FBC8F" },
  { name: "Ruiru", lat: -1.1457029, lng: 36.9648534, color: "#F4A460" },
  { name: "Roysambu", lat: -1.21833, lng: 36.88639, color: "#DA70D6" },
  { name: "South B", lat: -1.3000, lng: 36.8333, color: "#EEE8AA" },
  { name: "Thika", lat: -1.03326000, lng: 37.06933000, color: "#98FB98" },
  { name: "Umoja", lat: -1.28222, lng: 36.89222, color: "#F0E68C" },
  { name: "Uthiru", lat: -1.2744417, lng: 36.7028500, color: "#DDA0DD" },
  { name: "Utawala", lat: -1.2800, lng: 36.9700, color: "#87CEFA" },
  { name: "Westlands", lat: -1.2667, lng: 36.7833, color: "#FFB347" },
  { name: "Zimmerman", lat: -1.20833, lng: 36.89972, color: "#FF6347" }
];

// Define Nairobi bounds to restrict map view
const nairobiBounds = L.latLngBounds(
  [-1.55, 36.60], // Southwest corner (bottom-left)
  [-0.95, 37.15]  // Northeast corner (top-right)
);

// Create custom colored icons
const createColoredIcon = (color: string) => {
  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.607 0 0 5.607 0 12.5c0 7.395 12.5 28.5 12.5 28.5s12.5-21.105 12.5-28.5C25 5.607 19.393 0 12.5 0z" fill="${color}" stroke="#fff" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="4" fill="#fff"/>
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: 'custom-pin',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -35]
  });
};

export default function DeliveryMap({ deliveryAreas }: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize the map centered on Nairobi with restrictions
    const map = L.map(mapRef.current, {
      center: [-1.2921, 36.8219],
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
      maxBounds: nairobiBounds,
      maxBoundsViscosity: 1.0 // Prevents dragging outside bounds
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    // Add markers for each delivery area
    deliveryLocations.forEach((location) => {
      if (deliveryAreas.includes(location.name)) {
        const marker = L.marker([location.lat, location.lng], {
          icon: createColoredIcon(location.color)
        }).addTo(map)

        // Add popup with area name
        marker.bindPopup(`
          <div class="text-center p-2">
            <h3 class="font-semibold text-gray-800">${location.name}</h3>
            <p class="text-sm text-gray-600">Delivery Available</p>
          </div>
        `, {
          closeButton: false,
          className: 'custom-popup'
        })

        // Show popup on hover
        marker.on('mouseover', function(this: L.Marker) {
          this.openPopup()
        })
        
        marker.on('mouseout', function(this: L.Marker) {
          this.closePopup()
        })
      }
    })

    mapInstanceRef.current = map

    // Force map resize after initialization to ensure proper sizing
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize()
      }
    }, 100)

    // Add resize observer for better mobile handling
    let resizeObserver: ResizeObserver | undefined
    
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize()
        }
      })
      
      if (mapRef.current) {
        resizeObserver.observe(mapRef.current)
      }
    }

    // Handle orientation changes on mobile
    const handleOrientationChange = () => {
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize()
        }
      }, 300)
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
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