'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Loader2 } from "lucide-react"

type LoadingContextType = {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
    const context = useContext(LoadingContext)
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context
}

export default function LoadingProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(false)

    // Approach A: Handle visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            // Log the visibility state change
            console.log('Visibility state changed:', {
                state: document.visibilityState,
                timestamp: new Date().toISOString(),
                wasLoading: isLoading
            })

            if (document.visibilityState === 'visible') {
                // If the page becomes visible and was loading, reset it
                setIsLoading(false)
                console.info('Loading state reset due to tab becoming visible')
            } else if (document.visibilityState === 'hidden') {
                console.info('Tab/Window hidden - current loading state:', isLoading)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [isLoading]) // Added isLoading to dependencies to access current state

    // Approach B: Timeout-based error boundary
    useEffect(() => {
        if (isLoading) {
            console.log('Loading state activated:', new Date().toISOString())
            const timeoutId = setTimeout(() => {
                console.warn('Loading state was forced to reset after timeout')
                setIsLoading(false)
            }, 10000) // 10 second timeout

            return () => clearTimeout(timeoutId)
        }
    }, [isLoading])

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    )
}