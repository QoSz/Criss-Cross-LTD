import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: 'Sign Up Successful | Criss Cross LTD',
    description: 'Your account has been created successfully.',
}

export default function SignUpSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Sign Up Successful!</h1>
            <p className="mb-6">Thank you for creating an account with Criss Cross LTD. Please check your email to verify your account.</p>
            <Button asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    )
}