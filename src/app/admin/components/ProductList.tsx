'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
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
import { useLoading } from '@/components/LoadingProvider'
import { Loader2 } from 'lucide-react'

type Product = Database['public']['Tables']['products']['Row']

interface ProductListProps {
    onProductUpdate: () => void
}

export default function ProductList({ onProductUpdate }: ProductListProps) {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
    const { supabase, user, userRole } = useSupabaseAuth()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { setIsLoading } = useLoading()

    const productFormRef = useRef<HTMLDivElement | null>(null)

    const { data: products = [], error: queryError, isLoading: isQueryLoading } = useQuery({
        queryKey: ['admin-products'],
        queryFn: async () => {
            if (!user || userRole !== 'admin') {
                throw new Error('Unauthorized')
            }

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('updated_at', { ascending: false })
            
            if (error) throw error
            return data || []
        },
        enabled: !!user && userRole === 'admin',
        retry: 1
    })

    // Handle error outside the useQuery options
    useEffect(() => {
        if (queryError) {
            toast({
                title: "Error",
                description: "Failed to fetch products",
                variant: "destructive",
            })
        }
    }, [queryError, toast])

    // Cleanup effect
    useEffect(() => {
        return () => {
            setEditingProduct(null)
            setDeleteProductId(null)
        }
    }, [])

    // Scroll to the ProductForm when editingProduct changes
    useEffect(() => {
        if (editingProduct) {
            productFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [editingProduct]);

    const handleDelete = async () => {
        if (!deleteProductId) return

        try {
            setIsLoading(true)
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', deleteProductId)

            if (error) throw error

            queryClient.invalidateQueries({ queryKey: ['admin-products'] })
            onProductUpdate()
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
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            setDeleteProductId(null)
        }
    }

    // Add this function to handle manual refetch
    const handleRefresh = async () => {
        await queryClient.invalidateQueries({ queryKey: ['products'] })
    }

    if (isQueryLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (queryError) return <div className="text-red-500">Failed to load products</div>
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
                <div className="mb-6" ref={productFormRef}>
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
                                            onClick={() => {
                                                setEditingProduct(product)
                                            }}
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