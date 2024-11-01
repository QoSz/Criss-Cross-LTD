'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/components/SupabaseProvider'
import { useLoadingSubmit } from '@/hooks/useLoadingSubmit'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ResetPasswordForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState(0)
    const router = useRouter()
    const supabase = useSupabase()

    const { handleSubmit, error } = useLoadingSubmit(
        async () => {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }

            if (passwordStrength < 75) {
                throw new Error('Password is not strong enough')
            }

            const { error } = await supabase.auth.updateUser({ password })

            if (error) throw error

            router.push('/auth/login?message=Password reset successfully')
        },
        () => {
            console.log('Password reset successful')
        }
    )

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (password.match(/[a-z]+/)) strength += 25
        if (password.match(/[A-Z]+/)) strength += 25
        if (password.match(/[0-9]+/)) strength += 25
        return strength
    }

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password))
    }, [password])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
                <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-required="true"
                        />
                        <Progress value={passwordStrength} className="mt-2" aria-label="Password strength" />
                        <p id="passwordRequirements" className="text-sm text-gray-500 mt-1">
                            Password must be at least 8 characters long and contain uppercase, lowercase, and numbers
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}