import { Metadata } from 'next'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
    title: 'Reset Password | Criss Cross LTD',
    description: 'Reset your password for your Criss Cross LTD account.',
}

export default function ResetPasswordPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Reset Your Password</h1>
            <ResetPasswordForm />
        </div>
    )
}