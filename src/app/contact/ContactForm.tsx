"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact.schema"
import { env } from "@/lib/env"

export default function ContactForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string>("")

  // Initialize React Hook Form with hybrid validation
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',              // Validate when user leaves field (first validation)
    reValidateMode: 'onChange',  // Re-validate as they type (after error shown)
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setServerError("")

    try {
      // Create FormData for Formspree submission
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('subject', data.subject)
      formData.append('message', data.message)

      // Submit validated data to Formspree
      const response = await fetch(`https://formspree.io/f/${env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        // Clear the form
        form.reset()
        // Redirect to your custom thank you page
        router.push('/thank-you')
      } else {
        setServerError('Failed to send message. Please try again or contact us directly.')
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <Card className="p-8 rounded-[1.618rem] transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
          Send us a Message
        </h2>

        {serverError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-400 text-sm">{serverError}</p>
          </div>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                required
                aria-invalid={!!form.formState.errors.name}
                aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                className={`rounded-lg ${form.formState.errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p id="name-error" className="text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                aria-invalid={!!form.formState.errors.email}
                aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                className={`rounded-lg ${form.formState.errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p id="email-error" className="text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="What&apos;s this about?"
              required
              aria-invalid={!!form.formState.errors.subject}
              aria-describedby={form.formState.errors.subject ? "subject-error" : undefined}
              className={`rounded-lg ${form.formState.errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...form.register('subject')}
            />
            {form.formState.errors.subject && (
              <p id="subject-error" className="text-sm text-red-600 dark:text-red-400">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Your message here..."
              required
              aria-invalid={!!form.formState.errors.message}
              aria-describedby={form.formState.errors.message ? "message-error" : undefined}
              className={`min-h-[150px] rounded-lg ${form.formState.errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              {...form.register('message')}
            />
            {form.formState.errors.message && (
              <p id="message-error" className="text-sm text-red-600 dark:text-red-400">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 text-white dark:from-blue-600 dark:to-purple-500 dark:hover:from-purple-500 dark:hover:to-blue-400"
          >
            {form.formState.isSubmitting ? (
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