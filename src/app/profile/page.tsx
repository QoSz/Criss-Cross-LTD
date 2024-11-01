'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/components/SupabaseProvider'
import ProfileForm from './ProfileForm'

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const supabase = useSupabase()

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth/login')
            } else {
                setIsLoading(false)
            }
        }

        checkSession()
    }, [supabase, router])

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ProfileForm />
        </div>
    )
}