'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQueryClient } from '@tanstack/react-query'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

export default function AdminDashboard() {
    const queryClient = useQueryClient()

    const handleProductUpdate = () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
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