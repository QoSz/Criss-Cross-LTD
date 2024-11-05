'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSupabase } from '@/components/SupabaseProvider'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
    user: User | null
    userRole: string | null
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userRole: null,
    isLoading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = useSupabase()

    useEffect(() => {
        async function loadSession() {
            const { data: { session } } = await supabase.auth.getSession()
            
            if (session?.user) {
                setUser(session.user)
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()
                
                setUserRole(profile?.role || null)
            }
            setIsLoading(false)
        }

        loadSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user || null)
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', session.user.id)
                        .single()
                    
                    setUserRole(profile?.role || null)
                } else {
                    setUserRole(null)
                }
                setIsLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase])

    return (
        <AuthContext.Provider value={{ user, userRole, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 