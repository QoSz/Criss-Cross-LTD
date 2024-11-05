import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6 p-4">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100 animate-fade-in">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 