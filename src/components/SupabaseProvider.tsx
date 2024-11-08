'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
import { useLoading } from './LoadingProvider'

type SupabaseContext = {
    supabase: SupabaseClient<Database>
    user: User | null
    userRole: string | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ))
    const [user, setUser] = useState<User | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const { setIsLoading } = useLoading()
    const router = useRouter()

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            try {
                setIsLoading(true)
                const { data: { user } } = await supabase.auth.getUser()
                
                if (!user) {
                    setUser(null)
                    setUserRole(null)
                    return
                }
                
                setUser(user)
                
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single()
                
                setUserRole(profile?.role ?? null)
            } catch (error) {
                if (!(error instanceof Error && error.message.includes('Auth session missing'))) {
                    console.error('Error fetching user:', error)
                }
                setUser(null)
                setUserRole(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserAndProfile()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            try {
                setIsLoading(true)
                setUser(session?.user ?? null)
                
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', session.user.id)
                        .single()
                    
                    setUserRole(profile?.role ?? null)
                } else {
                    setUserRole(null)
                }
                router.refresh()
            } catch (error) {
                console.error('Error during auth state change:', error)
                setUser(null)
                setUserRole(null)
            } finally {
                setIsLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [supabase, setIsLoading, router])

    return (
        <Context.Provider value={{ supabase, user, userRole }}>
            {children}
        </Context.Provider>
    )
}

export const useSupabase = () => {
    const context = useContext(Context)
    if (context === undefined) {
        throw new Error('useSupabase must be used inside SupabaseProvider')
    }
    return context.supabase
}

export const useSupabaseAuth = () => {
    const context = useContext(Context)
    if (context === undefined) {
        throw new Error('useSupabaseAuth must be used inside SupabaseProvider')
    }
    return {
        user: context.user,
        userRole: context.userRole,
        supabase: context.supabase
    }
}