'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSupabase } from '@/components/SupabaseProvider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false) // Local loading state
    const router = useRouter()
    const supabase = useSupabase()

    const handleSubmit = async () => {
        setIsLoading(true) // Set loading state to true
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            // Use a generic error message
            setError('Invalid email or password. Please try again or sign up if you do not have an account.')
            setIsLoading(false) // Reset loading state on error
            return
        }

        if (data.user && !data.user.email_confirmed_at) {
            setError('Please verify your email address before logging in.')
            setIsLoading(false) // Reset loading state on error
            return
        }

        setError(null) // Clear error on successful login
        setIsLoading(false) // Reset loading state on success
        router.refresh() // Trigger a re-render
        router.push('/') // Redirect to home page after successful login
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardDescription>Welcome back! Please log in to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <div className="mt-4 text-center">
                    <p>Don't have an account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
                </div>
            </CardContent>
        </Card>
    )
}