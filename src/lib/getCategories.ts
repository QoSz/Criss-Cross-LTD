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

    const { data: categoriesData, error: categoriesError } = await supabase
        .from('products')
        .select('category')

    if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
        return []
    }

    const uniqueCategories = Array.from(new Set(categoriesData.map(item => item.category).filter(Boolean) as string[]))
    return ['All', ...uniqueCategories]
})