'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseAuth } from './SupabaseProvider'
import { useLoading } from './LoadingProvider'

interface ProtectedRouteProps {
    children: React.ReactNode
    adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const { user, userRole } = useSupabaseAuth()
    const { isLoading } = useLoading()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/auth/login')
            } else if (adminOnly && userRole !== 'admin') {
                router.push('/')
            }
        }
    }, [user, userRole, isLoading, router, adminOnly])

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (!user || (adminOnly && userRole !== 'admin')) {
        return null
    }

    return <>{children}</>
} 