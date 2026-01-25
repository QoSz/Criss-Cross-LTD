'use client'

import { useState, useEffect } from 'react'

export function CopyrightYear() {
    const [year, setYear] = useState(() => new Date().getFullYear())

    useEffect(() => {
        // Calculate ms until next midnight
        const now = new Date()
        const nextYear = new Date(now.getFullYear() + 1, 0, 1)
        const msUntilMidnight = nextYear.getTime() - now.getTime()

        const timeout = setTimeout(() => {
            setYear(new Date().getFullYear())
        }, msUntilMidnight)

        return () => clearTimeout(timeout)
    }, [year])

    return <>{year}</>
}
