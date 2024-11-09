'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQueryClient } from '@tanstack/react-query'
import { useSupabaseAuth } from '@/components/SupabaseProvider'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
    const queryClient = useQueryClient()
    const { user, userRole } = useSupabaseAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user || userRole !== 'admin') {
            router.push('/')
        }
    }, [user, userRole, router])

    const handleProductUpdate = () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
    }

    if (!user || userRole !== 'admin') {
        return null
    }

    return (
        <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="add">Add Product</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
                <ProductList onProductUpdate={handleProductUpdate} />
            </TabsContent>

            <TabsContent value="add">
                <ProductForm onSuccess={handleProductUpdate} />
            </TabsContent>
        </Tabs>
    )
} 