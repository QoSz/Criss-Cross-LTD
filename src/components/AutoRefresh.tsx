'use client'

import { useEffect } from 'react';

export default function AutoRefresh() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.reload();
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return null; // This component does not render anything
} 