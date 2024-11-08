'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import { useLoading } from '@/components/LoadingProvider'
import ProfileForm from './ProfileForm'

export default function ProfilePage() {
    const { user } = useSupabaseAuth()
    const { isLoading } = useLoading()
    const router = useRouter()

    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/auth/login')
        }
    }, [user, isLoading, router])

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ProfileForm />
        </div>
    )
}