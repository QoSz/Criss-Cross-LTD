"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

const ContactPage = () => {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  if (!formspreeId) {
    console.error('Formspree ID is not defined in environment variables')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        // Clear the form using the ref
        formRef.current?.reset()
        // Redirect to your custom thank you page
        router.push('/thank-you')
      } else {
        console.error('Form submission failed')
        // Handle error - you might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors dark:hover:bg-[#1877F2]/20 dark:hover:text-[#1877F2]"
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:bg-[#E4405F]/10 hover:text-[#E4405F] transition-colors dark:hover:bg-[#E4405F]/20 dark:hover:text-[#E4405F]"
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </Button>
            </div>
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

      <div className="mt-16 max-w-3xl mx-auto">
        <Card className="p-8 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
            Send us a Message
          </h2>
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="rounded-lg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What&apos;s this about?"
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                required
                className="min-h-[150px] rounded-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 text-white dark:from-blue-600 dark:to-purple-500 dark:hover:from-purple-500 dark:hover:to-blue-400"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ContactPage
