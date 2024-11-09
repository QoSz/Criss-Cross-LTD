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
    const { isLoading, setIsLoading } = useLoading()
    const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        
        const checkAuth = async () => {
            if (!user) {
                router.push('/auth/login')
            } else if (adminOnly && userRole !== 'admin') {
                console.log('Access denied: User role:', userRole)
                router.push('/')
            }
            setIsLoading(false)
        }

        checkAuth()
    }, [user, userRole, router, adminOnly, setIsLoading])

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (!user || (adminOnly && userRole !== 'admin')) {
        return null
    }

    return <>{children}</>
} 