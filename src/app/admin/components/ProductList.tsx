'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/SupabaseProvider'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Database } from '@/lib/database.types'
import Image from 'next/image'
import { Edit, Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import ProductForm from './ProductForm'

type Product = Database['public']['Tables']['products']['Row']

interface ProductListProps {
    onProductUpdate: () => void
}

export default function ProductList({ onProductUpdate }: ProductListProps) {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
    const supabase = useSupabase()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { data: products, isLoading, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('category')
                .order('product_name')

            if (error) throw error
            return data
        },
        retry: 2,
        refetchOnWindowFocus: true,
    })

    // Handle error outside the useQuery options
    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: "Failed to fetch products",
                variant: "destructive",
            })
        }
    }, [error])

    // Cleanup effect
    useEffect(() => {
        return () => {
            setEditingProduct(null)
            setDeleteProductId(null)
        }
    }, [])

    const handleDelete = async () => {
        if (!deleteProductId) return

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', deleteProductId)

            if (error) throw error

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['products'] })

            toast({
                title: "Success",
                description: "Product deleted successfully",
            })
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete product",
                variant: "destructive",
            })
        } finally {
            setDeleteProductId(null)
        }
    }

    // Add this function to handle manual refetch
    const handleRefresh = async () => {
        await refetch()
    }

    if (isLoading) return <div>Loading products...</div>
    if (error) return <div className="text-red-500">Failed to load products</div>
    if (!products) return null

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized'
        if (!acc[category]) {
            acc[category] = []
        }
        acc[category].push(product)
        return acc
    }, {} as Record<string, Product[]>)

    return (
        <div className="space-y-6">
            {editingProduct && (
                <div className="mb-6">
                    <ProductForm
                        product={editingProduct}
                        onSuccess={() => {
                            setEditingProduct(null)
                            queryClient.invalidateQueries({ queryKey: ['products'] })
                            onProductUpdate()
                        }}
                        onCancel={() => setEditingProduct(null)}
                    />
                </div>
            )}

            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category}>
                    <h2 className="text-2xl font-bold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryProducts.map((product) => (
                            <Card key={product.id}>
                                <CardContent className="p-4">
                                    <div className="relative w-full h-[200px] mb-4">
                                        <Image
                                            src={product.product_img}
                                            alt={product.product_name}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    <h3 className="font-semibold mb-2">{product.product_name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {product.product_description || 'No description available'}
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingProduct(product)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setDeleteProductId(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}

            <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
} 