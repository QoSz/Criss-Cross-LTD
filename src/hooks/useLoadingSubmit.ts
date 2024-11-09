import { useLoading } from '@/components/LoadingProvider'
import { useState, useEffect } from 'react'

export function useLoadingSubmit<T, E extends Error = Error>(
    submitFn: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: E) => void
) {
    const { setIsLoading, isLoading } = useLoading()
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(true)

    useEffect(() => {
        return () => {
            setMounted(false)
        }
    }, [])

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await submitFn()
            if (mounted) {
                onSuccess?.(data)
            }
            return data
        } catch (err) {
            const error = err as E
            if (mounted) {
                setError(error.message)
                onError?.(error)
            }
            throw error
        } finally {
            if (mounted) {
                setIsLoading(false)
            }
        }
    }

    return { handleSubmit, error, isLoading }
}