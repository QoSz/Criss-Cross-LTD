'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

type SupabaseContext = {
    supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [supabase] = useState(() => createClientComponentClient<Database>())

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    return (
        <Context.Provider value={{ supabase }}>
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

export function useSupabaseAuth() {
    const supabase = useSupabase()
    const [user, setUser] = useState<User | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single()
                
                setUserRole(profile?.role ?? null)
            } else {
                setUserRole(null)
            }
        }

        fetchUserAndProfile()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    return { user, supabase, userRole }
}