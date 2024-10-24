'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'

const SupabaseContext = createContext<SupabaseClient | null>(null)

export const useSupabase = () => {
    const context = useContext(SupabaseContext)
    if (!context) {
        throw new Error('useSupabase must be used within a SupabaseProvider')
    }
    return context
}

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [supabase] = useState(() => createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ))

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { })
        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    return (
        <SupabaseContext.Provider value={supabase}>
            {children}
        </SupabaseContext.Provider>
    )
}

// Updated hook for easier access to auth state
export function useSupabaseAuth() {
    const supabase = useSupabase()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Set the initial user state
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    return { user, supabase }
}