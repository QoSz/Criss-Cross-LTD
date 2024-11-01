import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Protect the profile route
    if (req.nextUrl.pathname.startsWith('/profile')) {
        if (!session) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
        return res
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
    matcher: ['/profile', '/auth/login', '/auth/signup', '/auth/forgot-password']
}