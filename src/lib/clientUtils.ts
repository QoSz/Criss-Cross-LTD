import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

export async function fetchCategoriesClient() {
    const supabase = createClientComponentClient<Database>()
    
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