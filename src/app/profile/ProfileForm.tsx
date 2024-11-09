'use client'

import { useState, useEffect } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import { useLoading } from '@/components/LoadingProvider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface Profile {
    id: string
    first_name: string | null
    last_name: string | null
    email: string
    role: string | null
    phone_number: string | null
}

export default function ProfileForm() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { supabase, user } = useSupabaseAuth()
    const { setIsLoading, isLoading } = useLoading()
    const { toast } = useToast()
    const [isInitialLoading, setIsInitialLoading] = useState(true)

    useEffect(() => {
        async function loadProfile() {
            if (user) {
                try {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    if (error) throw error
                    if (data) setProfile(data)
                } catch (error) {
                    console.error('Error fetching profile:', error)
                    toast({
                        title: "Error",
                        description: "Failed to load profile data",
                        variant: "destructive",
                    })
                } finally {
                    setIsInitialLoading(false)
                }
            }
        }

        loadProfile()
    }, [supabase, user, toast])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!profile) return

        setError(null)
        setIsLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No authenticated user')

            const { error } = await supabase
                .from('profiles')
                .update({
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    phone_number: profile.phone_number,
                })
                .eq('id', user.id)

            if (error) throw error

            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            })
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }

    if (isInitialLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!profile) return null

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Edit Your Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={profile.first_name || ''}
                                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={profile.last_name || ''}
                                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            disabled
                        />
                    </div>
                    <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            value={profile.phone_number || ''}
                            onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                            disabled={isLoading}
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}