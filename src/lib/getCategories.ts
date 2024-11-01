import { cache } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export const revalidate = 3600 // revalidate every hour

export const getCategories = cache(async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

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