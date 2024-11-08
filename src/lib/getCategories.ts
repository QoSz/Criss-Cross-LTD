import { cache } from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export const revalidate = 3600 // revalidate every hour

export const getCategories = cache(async () => {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
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