import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
    title: 'Login | Criss Cross LTD',
    description: 'Log in to your Criss Cross LTD account to start shopping and manage your orders.',
    openGraph: {
        title: 'Login to Criss Cross LTD',
        description: 'Access your Criss Cross LTD account for a personalized shopping experience.',
        type: 'website',
        url: 'https://www.crisscross.co.ke/auth/login',
        siteName: 'Criss Cross LTD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Login to Criss Cross LTD',
        description: 'Access your Criss Cross LTD account for a personalized shopping experience.',
    },
}

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
            <LoginForm />
        </div>
    )
}