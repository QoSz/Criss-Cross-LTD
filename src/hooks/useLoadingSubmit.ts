import { useLoading } from '@/components/LoadingProvider'
import { useState } from 'react'

export function useLoadingSubmit<T>(
    submitFn: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
) {
    const { setIsLoading, isLoading } = useLoading()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await submitFn()
            onSuccess?.(data)
            return data
        } catch (err) {
            const error = err as Error
            setError(error.message)
            onError?.(error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return { handleSubmit, error, isLoading }
}