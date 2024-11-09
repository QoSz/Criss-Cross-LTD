'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
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

const LOADING_TIMEOUT = 10000 // 10 seconds maximum loading time
const VISIBILITY_DELAY = 150 // 150ms delay for visibility changes

// Debug utility
const debug = {
    log: (action: string, data?: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Loading State] ${action}`, {
                timestamp: new Date().toISOString(),
                visibility: document.visibilityState,
                ...data
            })
        }
    }
}

export default function LoadingProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoadingState] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Memoized setIsLoading function with debug logging
    const setIsLoading = useCallback((loading: boolean) => {
        debug.log(`Setting loading state to ${loading}`)
        setIsLoadingState(loading)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            debug.log('Loading state cleared')
            return
        }

        debug.log('Loading state activated')

        // Clear any existing timeouts
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (visibilityTimeoutRef.current) {
            clearTimeout(visibilityTimeoutRef.current)
        }

        // Safety timeout to prevent infinite loading
        timeoutRef.current = setTimeout(() => {
            debug.log('Safety timeout triggered')
            setIsLoadingState(false)
            console.warn('Loading state was forcefully cleared after timeout')
        }, LOADING_TIMEOUT)

        // Visibility change handler
        const handleVisibilityChange = () => {
            debug.log('Visibility changed', { 
                newState: document.visibilityState 
            })

            if (document.visibilityState === 'visible') {
                visibilityTimeoutRef.current = setTimeout(() => {
                    debug.log('Clearing loading state after visibility change')
                    setIsLoadingState(false)
                }, VISIBILITY_DELAY)
            }
        }

        // Add visibility change listener
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (visibilityTimeoutRef.current) {
                clearTimeout(visibilityTimeoutRef.current)
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            debug.log('Cleaning up loading effect')
        }
    }, [isLoading])

    // Memoized context value
    const contextValue = {
        isLoading,
        setIsLoading
    }

    return (
        <LoadingContext.Provider value={contextValue}>
            {isLoading && (
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
                    role="alert"
                    aria-busy="true"
                    aria-label="Loading content"
                >
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