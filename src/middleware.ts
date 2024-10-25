// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Admin routes protection
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!session) {
            // If no session, redirect to login
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }

        // Get user's role from Supabase
        const { data: { user } } = await supabase.auth.getUser()
        const { data: profile } = await supabase.from('profiles').select('role').single()

        // If user is not an admin, redirect to home page
        if (!profile || profile.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    // Auth routes (login/signup/forgot-password)
    // Redirect to home if user is already logged in
    if (session && (
        req.nextUrl.pathname.startsWith('/auth/login') ||
        req.nextUrl.pathname.startsWith('/auth/signup') ||
        req.nextUrl.pathname.startsWith('/auth/forgot-password')
    )) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/auth/login',
        '/auth/signup',
        '/auth/forgot-password'
    ]
}