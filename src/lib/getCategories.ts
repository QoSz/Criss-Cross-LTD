import { cache } from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export const revalidate = 3600

export const getCategories = cache(async () => {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (cookies) => {
                    cookies.map((cookie) => {
                        cookieStore.set(cookie.name, cookie.value)
                    })
                }
            },
        }
    )

    try {
        const { data, error } = await supabase.rpc('get_unique_categories')
        
        if (error) throw error

        const categories = data?.map(row => row.category) ?? []
        return ['All', ...categories]
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw new Error('Failed to fetch categories')
    }
})