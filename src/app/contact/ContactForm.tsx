'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitSuccess(false)
        setSubmitError('')

        const form = e.currentTarget
        const formData = new FormData(form)

        try {
            const response = await fetch('https://formspree.io/f/mzzbzorq', { // Replace with your Formspree endpoint
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                setSubmitSuccess(true)
                form.reset()
            } else {
                throw new Error('Form submission failed')
            }
        } catch (error) {
            setSubmitError('There was a problem submitting your form. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <p id="form-description" className="mb-4">
                    Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
                </p>
                {submitSuccess ? (
                    <p className="text-green-600 mb-4">Thank you for your message. We'll get back to you soon!</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="form-description">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                                <Input id="name" name="name" placeholder="Your Full Name" required aria-required="true" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                                <Input id="email" name="email" type="email" placeholder="your@email.com" required aria-required="true" />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium mb-1">Mobile Number (optional)</label>
                                <Input id="mobile" name="mobile" type="tel" placeholder="+254 7XX XXX XXX" aria-required="false" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-1">Message Subject</label>
                            <Input id="subject" name="subject" placeholder="Brief subject of your message" required aria-required="true" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                            <Textarea id="message" name="message" placeholder="Please type your message here..." className="h-32" required aria-required="true" />
                        </div>
                        {submitError && <p className="text-red-600" role="alert">{submitError}</p>}
                        <div className="flex justify-center md:justify-start">
                            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}