import { createMetadata } from "@/lib/seo"
import DeliveryClient from "./DeliveryClient"

// Export metadata for SEO
export const metadata = createMetadata({
  title: "Deliveries",
  description: "Fast and reliable FMCG delivery across 40+ locations in Nairobi and surrounding areas. Same-day delivery available for wholesale cooking oil, soaps, rice, sugar, and consumer goods. Check our delivery coverage map.",
  keywords: [
    'FMCG delivery Nairobi',
    'wholesale delivery Kenya',
    'same day delivery Nairobi',
    'food products delivery',
    'consumer goods delivery',
    'delivery areas Nairobi',
    'Nairobi delivery coverage',
    'wholesale distributor delivery',
    'fast delivery Kenya',
    'reliable FMCG delivery',
    'Eastleigh delivery',
    'CBD delivery',
    'Westlands delivery',
    'Karen delivery',
    'Langata delivery',
    'Kasarani delivery',
    'delivery zones Nairobi'
  ],
  path: "/deliveries"
})

// Delivery areas in Nairobi
const deliveryAreas = [
  "Athi River", "Buruburu", "CBD", "Chokaa", "Dandora", "Eastleigh", 
  "Githurai", "Highridge", "Huruma", "Kahawa Sukari", "Kabiria", "Kangemi", 
  "Kariobangi", "Karen", "Kasarani", "Kawangware", "Kayole", "Kikuyu", 
  "Kimbo", "Kinoo", "Kiserian", "Kitengela", "Langata", "Mawimbi", 
  "Mlolongo", "Ngara", "Ngong", "Pangani", "Parklands", "Pipeline", 
  "Rongai", "Ruiru", "Roysambu", "South B", "Thika", "Umoja", 
  "Uthiru", "Utawala", "Westlands", "Zimmerman"
]

export default function DeliveriesPage() {
  return <DeliveryClient deliveryAreas={deliveryAreas} />
}