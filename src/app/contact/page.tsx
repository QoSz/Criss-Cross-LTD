import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "./ContactForm"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata(
  "Contact Us | Criss Cross Ltd",
  "Contact Criss Cross Ltd - Kenya's trusted wholesale FMCG distributor. Located in Nairobi on Mombasa Road. Call +254 707 451 536 or email info@crisscross.co.ke for wholesale inquiries, partnerships, and business opportunities."
)

export default function ContactPage() {
  return (
    <div className="mx-auto py-12 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900/50">
      <h1 className="text-4xl font-semibold text-center mb-12 bg-gradient-to-b from-blue-700 to-blue-400 text-transparent bg-clip-text dark:from-blue-400 dark:to-blue-600">
        Contact Us
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="p-6 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Address:</h3>
                <a 
                  href="https://maps.app.goo.gl/HMpV56YZSjdmKVJq8"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary dark:hover:text-blue-400"
                >
                  Duldul Godown, Phase 2,<br />
                  Mombasa Road, Nairobi
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Email:</h3>
                <div className="flex flex-col">
                  <a href="mailto:info@crisscross.co.ke" className="text-muted-foreground hover:text-primary dark:hover:text-blue-400">info@crisscross.co.ke</a>
                  <a href="mailto:crisscrossltd@gmail.com" className="text-muted-foreground hover:text-primary dark:hover:text-blue-400">crisscrossltd@gmail.com</a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Call US:</h3>
                <div className="flex flex-col">
                  <a href="tel:+254707451536" className="text-muted-foreground hover:text-primary dark:hover:text-blue-400">+254 707 451 536</a>
                  <a href="tel:+254722488224" className="text-muted-foreground hover:text-primary dark:hover:text-blue-400">+254 722 488 224</a>
                  <a href="tel:+254723641478" className="text-muted-foreground hover:text-primary dark:hover:text-blue-400">+254 723 641 478</a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="text-muted-foreground mb-4">
              Let&apos;s build something amazing together. Reach out for collaborations, support, career opportunities, or just to say hello!
            </p>
          </Card>
        </div>

        {/* Google Maps */}
        <div className="h-full w-full min-h-[450px]">
          <Card className="p-2 h-full rounded-[1.618rem] overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.734665705923!2d36.89375821082464!3d-1.335415298646304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13df6febb2d7%3A0x23d6ba31663476fa!2sCriss%20Cross%20Ltd!5e0!3m2!1sen!2ske!4v1736585818128!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.618rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[1.618rem]"
            />
          </Card>
        </div>
      </div>

      {/* Contact Form Component */}
      <ContactForm />
    </div>
  )
}
