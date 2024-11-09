'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 300000, // 5 minutes
                gcTime: 3600000,   // 1 hour
                retry: 2,
                refetchOnWindowFocus: true,
                refetchOnMount: true,
                refetchOnReconnect: true,
                retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            },
            mutations: {
                retry: 2,
                retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            }
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
} 