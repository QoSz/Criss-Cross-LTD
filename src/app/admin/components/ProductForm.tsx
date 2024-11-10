'use client'

import { useState, useEffect } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
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
import { useLoading } from '@/components/LoadingProvider'

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
    const [categories, setCategories] = useState<string[]>([])
    const [categoryInputType, setCategoryInputType] = useState<'select' | 'new'>('select')
    const { supabase, user, userRole } = useSupabaseAuth()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)
    const { setIsLoading, isLoading } = useLoading()

    useEffect(() => {
        if (!user || userRole !== 'admin') {
            toast({
                title: "Unauthorized",
                description: "You must be an admin to perform this action",
                variant: "destructive",
            })
            onCancel?.()
            return
        }

        async function loadCategories() {
            const fetchedCategories = await fetchCategoriesClient()
            setCategories(fetchedCategories)
        }
        loadCategories()
    }, [user, userRole, onCancel, toast])

    useEffect(() => {
        if (product) {
            setProductName(product.product_name || '')
            setDescription(product.product_description || '')
            setCategory(product.category || '')
            setImageUrl(product.product_img || '')
        }
    }, [product])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user || userRole !== 'admin') {
            toast({
                title: "Unauthorized",
                description: "You must be an admin to perform this action",
                variant: "destructive",
            })
            return
        }

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
                result = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', product.id)
                    .select()
            } else {
                result = await supabase
                    .from('products')
                    .insert([productData])
                    .select()
            }

            if (result.error) throw result.error

            if (!product) {
                setProductName('')
                setDescription('')
                setCategory('')
                setImageUrl('')
            }

            queryClient.invalidateQueries({ queryKey: ['admin-products'] })
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
            setTimeout(() => {
                setError(null)
            }, 500)
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
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        <Button 
                            type="submit" 
                            disabled={isLoading || Boolean(error)}
                        >
                            {product ? 'Update Product' : 'Add Product'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
} 