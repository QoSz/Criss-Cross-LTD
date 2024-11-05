'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/SupabaseProvider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Database } from '@/lib/database.types'
import { fetchCategoriesClient } from '@/lib/clientUtils'
import { useQueryClient } from '@tanstack/react-query'

type Product = Database['public']['Tables']['products']['Row']

interface ProductFormProps {
    product?: Product
    onSuccess: () => void
    onCancel?: () => void
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
    const [productName, setProductName] = useState(product?.product_name || '')
    const [description, setDescription] = useState(product?.product_description || '')
    const [category, setCategory] = useState(product?.category || '')
    const [imageUrl, setImageUrl] = useState(product?.product_img || '')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<string[]>([])
    const [categoryInputType, setCategoryInputType] = useState<'select' | 'new'>('select')
    const supabase = useSupabase()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    useEffect(() => {
        async function loadCategories() {
            const fetchedCategories = await fetchCategoriesClient()
            setCategories(fetchedCategories)
        }
        loadCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const productData = {
                product_name: productName.trim(),
                product_description: description.trim(),
                product_img: imageUrl.trim(),
                category: category.trim(),
                updated_at: new Date().toISOString()
            }

            let result;
            if (product) {
                // Update existing product
                result = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', product.id)
                    .select()
            } else {
                // Add new product
                result = await supabase
                    .from('products')
                    .insert([productData])
                    .select()
            }

            if (result.error) throw result.error

            // Reset form and notify parent
            if (!product) {
                setProductName('')
                setDescription('')
                setCategory('')
                setImageUrl('')
            }

            // Ensure the cache is properly invalidated
            queryClient.invalidateQueries({ queryKey: ['products'] })
            onSuccess()

            toast({
                title: "Success",
                description: product ? "Product updated successfully" : "Product added successfully",
            })
        } catch (err) {
            console.error('Error saving product:', err)
            setError(err instanceof Error ? err.message : 'An error occurred')
            toast({
                title: "Error",
                description: "Failed to save product",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Category Selection</Label>
                        <RadioGroup
                            defaultValue="select"
                            value={categoryInputType}
                            onValueChange={(value) => setCategoryInputType(value as 'select' | 'new')}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="select" id="select" />
                                <Label htmlFor="select">Choose Existing</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="new" id="new" />
                                <Label htmlFor="new">Add New</Label>
                            </div>
                        </RadioGroup>

                        {categoryInputType === 'select' ? (
                            <Select
                                value={category}
                                onValueChange={setCategory}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                placeholder="Enter new category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                disabled={isLoading}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex justify-end space-x-2">
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
} 