'use client'

import { useState } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { ChevronDown, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { Database } from '@/lib/database.types'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from "lucide-react"

type Product = Database['public']['Tables']['products']['Row']

interface ProductGridProps {
    initialCategories: string[]
}

// Debug utility for ProductGrid
const debug = {
    log: (action: string, data?: any) => {
        if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
            console.log(`[ProductGrid] ${action}`, {
                timestamp: new Date().toISOString(),
                visibility: typeof document !== 'undefined' ? document.visibilityState : 'unknown',
                ...data
            })
        }
    }
}

export default function ProductGrid({ initialCategories }: ProductGridProps) {
    const [categories] = useState<string[]>(initialCategories)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const { supabase, user } = useSupabaseAuth()
    const { addToCart } = useCart()
    const { toast } = useToast()

    // Add debug logs to useQuery
    const { data: products, isLoading, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            debug.log('Fetching products', { userId: user?.id })
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                
                if (error) {
                    debug.log('Product fetch error', { error })
                    throw error
                }
                
                debug.log('Products fetched successfully', { 
                    count: data?.length,
                    firstProduct: data?.[0]?.id 
                })
                return data as Product[]
            } catch (error) {
                debug.log('Product fetch exception', { error })
                throw error
            }
        }
    })

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => {
            if (category === 'All') {
                return ['All']
            }
            const newSelection = prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev.filter(c => c !== 'All'), category]
            return newSelection.length === 0 ? ['All'] : newSelection
        })
    }

    const clearFilters = () => {
        setSelectedCategories(['All'])
        setSearchQuery('')
        setSortOrder('asc')
    }

    const filteredProducts = products?.filter(product =>
        (selectedCategories.includes('All') || selectedCategories.includes(product.category || '')) &&
        (searchQuery === '' || product.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || []

    const handleAddToCart = async (product: Product) => {
        debug.log('Adding to cart', { 
            productId: product.id,
            userId: user?.id 
        })
        try {
            await addToCart({
                id: product.id,
                product_name: product.product_name,
                product_img: product.product_img
            })
            debug.log('Added to cart successfully', { productId: product.id })
        } catch (error) {
            debug.log('Add to cart error', { error, productId: product.id })
        }
    }

    const isFilterActive = searchQuery !== '' || !selectedCategories.includes('All') || selectedCategories.length > 1 || sortOrder !== 'asc'

    if (error) {
        debug.log('Rendering error state', { error })
        return <div>Error loading products. Please try again later.</div>
    }

    if (isLoading) {
        debug.log('Rendering loading state')
        return <Loader2 className="h-8 w-8 animate-spin" />
    }

    return (
        <div>
            <div className="flex flex-col space-y-4 mb-6">
                <div className="w-full">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="flex flex-wrap gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto justify-between">
                                Categories
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <div className="p-4 space-y-2">
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={category}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => handleCategoryChange(category)}
                                        />
                                        <Label htmlFor={category}>{category}</Label>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                        <SelectTrigger className="w-full sm:w-auto">
                            <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Name: A-Z</SelectItem>
                            <SelectItem value="desc">Name: Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                    {isFilterActive && (
                        <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                            <X className="mr-2 h-4 w-4" /> Clear Filters
                        </Button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Card key={product.id} className="flex flex-col">
                        <CardContent className="p-4">
                            <div className="relative w-full h-[200px]">
                                <Image
                                    src={product.product_img}
                                    alt={product.product_name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <h2 className="mt-2 text-lg font-semibold text-center">{product.product_name}</h2>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button
                                className="w-full"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}