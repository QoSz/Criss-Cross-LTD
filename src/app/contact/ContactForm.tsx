"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function ContactForm() {
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
  )
} 