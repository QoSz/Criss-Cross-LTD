'use client'

import { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { 
    SupabaseClient, 
    User, 
    AuthError,
    AuthChangeEvent,
    Session
} from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { useLoading } from './LoadingProvider'

// Validate environment variables
const validateEnvironment = () => {
    const requiredVars = {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }

    const missingVars = Object.entries(requiredVars)
        .filter(([_, value]) => !value)
        .map(([key]) => key)

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    }

    return true
}

// Enhanced debug utility
const debug = {
    log: (component: string, action: string, data?: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Supabase ${component}] ${action}`, data || '')
        }
    },
    error: (component: string, action: string, error: any) => {
        console.error(`[Supabase ${component}] Error in ${action}:`, error)
    },
    warn: (component: string, action: string, data?: any) => {
        console.warn(`[Supabase ${component}] Warning in ${action}:`, data || '')
    },
    session: (action: string, data?: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Session State] ${action}`, {
                timestamp: new Date().toISOString(),
                visibility: document.visibilityState,
                ...data
            })
        }
    }
}

// Create a singleton instance
let supabaseInstance: SupabaseClient<Database> | null = null

const getSupabaseClient = () => {
    if (!supabaseInstance) {
        try {
            debug.log('Client', 'Validating environment variables')
            validateEnvironment()
            
            debug.log('Client', 'Creating Supabase client')
            supabaseInstance = createBrowserClient<Database>(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            )
        } catch (error) {
            debug.error('Client', 'Initialization failed', error)
            throw error
        }
    }
    return supabaseInstance
}

// Initialize the client
const supabase = getSupabaseClient()

type SupabaseContext = {
    supabase: SupabaseClient<Database>
    user: User | null
    userRole: string | null
    isLoading: boolean
    clientHealth: {
        initialized: boolean
        error: Error | null
    }
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [isAuthLoading, setIsAuthLoading] = useState(true)
    const { setIsLoading } = useLoading()
    const processingAuthRef = useRef(false)
    const mounted = useRef(true)
    const lastAuthEventRef = useRef<string | null>(null)
    const clientHealth = useRef({
        initialized: true,
        error: null as Error | null
    })

    // Test connection on mount
    useEffect(() => {
        const testConnection = async () => {
            try {
                debug.log('Client', 'Testing connection')
                const { error } = await supabase.from('profiles').select('id').limit(1)
                if (error) throw error
                debug.log('Client', 'Connection test successful')
            } catch (error) {
                debug.error('Client', 'Connection test failed', error)
                clientHealth.current.error = error as Error
                clientHealth.current.initialized = false
            }
        }
        
        testConnection()
    }, [])

    const fetchUserRole = async (userId: string): Promise<string | null> => {
        try {
            debug.log('Role', `Fetching role for user: ${userId}`)
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single()

            if (error) {
                debug.error('Role', 'Role fetch failed', error)
                return null
            }

            debug.log('Role', 'Role fetched successfully:', data.role)
            return data.role
        } catch (error) {
            debug.error('Role', 'Role fetch failed', error)
            return null
        }
    }

    const handleAuthStateChange = useCallback(async (event: AuthChangeEvent, session: Session | null) => {
        // Prevent duplicate auth events
        const eventKey = `${event}-${session?.user?.id}`
        if (lastAuthEventRef.current === eventKey || processingAuthRef.current) {
            debug.log('Auth', 'Skipping duplicate auth event', { event, userId: session?.user?.id })
            return
        }

        try {
            processingAuthRef.current = true
            lastAuthEventRef.current = eventKey
            setIsLoading(true)

            if (session?.user) {
                debug.log('Auth', `Session user detected: ${session.user.id}`)
                setUser(session.user)
                const role = await fetchUserRole(session.user.id)
                if (mounted.current) {
                    setUserRole(role)
                    debug.log('Auth', `User role set: ${role}`)
                }
            } else {
                debug.log('Auth', 'No session user, clearing role')
                setUser(null)
                setUserRole(null)
            }
        } finally {
            if (mounted.current) {
                setIsLoading(false)
                setIsAuthLoading(false)
                processingAuthRef.current = false
                debug.log('Auth', 'State change processing complete')
            }
        }
    }, [setIsLoading])

    useEffect(() => {
        mounted.current = true

        const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange)

        const handleVisibilityChange = async () => {
            if (document.visibilityState === 'visible' && !processingAuthRef.current) {
                const { data: { session } } = await supabase.auth.getSession()
                
                // Only trigger auth change if session status has actually changed
                const currentUserId = user?.id
                const sessionUserId = session?.user?.id
                
                if (currentUserId !== sessionUserId) {
                    handleAuthStateChange(
                        session ? 'SIGNED_IN' : 'SIGNED_OUT',
                        session
                    )
                }
            }
        }

        if (typeof window !== 'undefined') {
            document.addEventListener('visibilitychange', handleVisibilityChange)
        }

        // Initial auth check
        supabase.auth.getSession().then(({ data: { session } }) => {
            handleAuthStateChange('INITIAL_SESSION', session)
        })

        return () => {
            mounted.current = false
            if (typeof window !== 'undefined') {
                document.removeEventListener('visibilitychange', handleVisibilityChange)
            }
            subscription.unsubscribe()
        }
    }, [handleAuthStateChange, user])

    const contextValue = useMemo(() => ({
        supabase,
        user,
        userRole,
        isLoading: isAuthLoading,
        clientHealth: clientHealth.current
    }), [user, userRole, isAuthLoading])

    // Render error state if client initialization failed
    if (clientHealth.current.error) {
        return (
            <div className="text-red-500 p-4">
                Supabase client initialization failed. Please check your configuration.
            </div>
        )
    }

    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export const useSupabase = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('useSupabase must be used inside SupabaseProvider')
    }
    return context.supabase
}

export const useSupabaseAuth = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('useSupabaseAuth must be used inside SupabaseProvider')
    }
    return {
        user: context.user,
        userRole: context.userRole,
        supabase: context.supabase,
        isLoading: context.isLoading
    }
}