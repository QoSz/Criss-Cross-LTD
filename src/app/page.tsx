import ProductGrid from '@/components/ProductGrid'
import { Suspense } from 'react'
import { getCategories } from '@/lib/getCategories'

export default async function Home() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Criss Cross LTD</h1>
      <p className="text-xl mb-8 text-center">A place to find the essentials for your everyday needs.</p>
      <Suspense fallback={<div className="text-center">Loading products...</div>}>
        <ProductGrid initialCategories={categories} />
      </Suspense>
    </div>
  )
}