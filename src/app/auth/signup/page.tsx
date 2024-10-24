import { Metadata } from 'next'
import SignUpForm from './SignUpForm'

export const metadata: Metadata = {
    title: 'Sign Up | Criss Cross LTD',
    description: 'Create an account with Criss Cross LTD to start shopping. Enjoy exclusive deals and a seamless shopping experience.',
    openGraph: {
        title: 'Sign Up for Criss Cross LTD',
        description: 'Join Criss Cross LTD for exclusive deals and a seamless shopping experience. Create your account today!',
        type: 'website',
        url: 'https://www.crisscross.co.ke/auth/signup',
        siteName: 'Criss Cross LTD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sign Up for Criss Cross LTD',
        description: 'Join Criss Cross LTD for exclusive deals and a seamless shopping experience. Create your account today!',
    },
}

export default function SignUpPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
            <SignUpForm />
        </div>
    )
}