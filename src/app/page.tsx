import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Criss Cross LTD</h1>
      <p className="text-xl mb-8 text-center">Discover our amazing products and services.</p>
      <div className="flex justify-center">
        <Button asChild>
          <a href="/products">Shop Now</a>
        </Button>
      </div>
    </div>
  )
}