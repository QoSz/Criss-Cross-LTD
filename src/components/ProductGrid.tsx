'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/SupabaseProvider'
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

type Product = Database['public']['Tables']['products']['Row']

interface ProductGridProps {
    initialCategories: string[]
}

export default function ProductGrid({ initialCategories }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [categories] = useState<string[]>(initialCategories)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const supabase = useSupabase()

    const isFilterActive = searchQuery !== '' || !selectedCategories.includes('All') || selectedCategories.length > 1 || sortOrder !== 'asc'

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('id, product_name, product_img, category')
                    .order('product_name', { ascending: sortOrder === 'asc' })

                if (productsError) throw productsError

                setProducts(productsData as Product[])
            } catch (error) {
                setError('Failed to fetch products. Please try again later.')
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [supabase, sortOrder])

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

    const filteredProducts = products.filter(product =>
        (selectedCategories.includes('All') || selectedCategories.includes(product.category || '')) &&
        (searchQuery === '' || product.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    if (isLoading) return <div className="text-center">Loading products...</div>
    if (error) return <div className="text-center text-red-500">{error}</div>

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
                            <Button className="w-full" onClick={() => console.log(`Add ${product.product_name} to cart`)}>
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}