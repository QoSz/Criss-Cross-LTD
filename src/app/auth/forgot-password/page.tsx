import { Metadata } from 'next'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
    title: 'Forgot Password | Criss Cross LTD',
    description: 'Reset your Criss Cross LTD account password.',
    openGraph: {
        title: 'Forgot Password - Criss Cross LTD',
        description: 'Reset your Criss Cross LTD account password easily and securely.',
        type: 'website',
        url: 'https://www.crisscross.co.ke/auth/forgot-password',
        siteName: 'Criss Cross LTD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Forgot Password - Criss Cross LTD',
        description: 'Reset your Criss Cross LTD account password easily and securely.',
    },
}

export default function ForgotPasswordPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
            <ForgotPasswordForm />
        </div>
    )
}