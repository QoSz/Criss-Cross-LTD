import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

export async function fetchCategoriesClient() {
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data: categoriesData, error: categoriesError } = await supabase
        .from('products')
        .select('category')
    
    if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
        return []
    }
    
    const uniqueCategories = Array.from(new Set(categoriesData
        .map(item => item.category)
        .filter(Boolean) as string[]))
    
    return uniqueCategories.sort()
} 