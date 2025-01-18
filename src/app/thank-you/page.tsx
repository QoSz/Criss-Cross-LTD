import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Home } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent">
          Thank You!
        </h1>
        <p className="text-muted-foreground mb-8">
          Your message has been received. We'll get back to you as soon as possible.
        </p>
        <Button 
          asChild
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400"
        >
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
} 