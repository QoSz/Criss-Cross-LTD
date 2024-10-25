import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
    title: 'Login | Criss Cross LTD',
    description: 'Log in to your Criss Cross LTD account to start shopping and manage your orders.',
}

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Log In to Your Account</h1>
            <LoginForm />
        </div>
    )
}