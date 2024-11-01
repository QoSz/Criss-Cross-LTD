import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: 'Sign Up Successful | Criss Cross LTD',
    description: 'Your account has been created successfully. Please check your email to verify your account.',
}

export default function SignUpSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold mb-2">Sign Up Successful!</CardTitle>
                    <CardDescription className="text-lg">Your account has been created.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="mb-6 text-muted-foreground">
                        Please check your email to verify your account before logging in.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/auth/login">Go to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}