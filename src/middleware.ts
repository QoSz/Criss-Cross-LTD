import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }

        // Check if user has admin role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!profile || profile.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url))
        }

        return response
    }

    // Protect the profile route
    if (request.nextUrl.pathname.startsWith('/profile')) {
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        return response
    }

    // Auth routes (login/signup/forgot-password)
    // Redirect to home if user is already logged in
    if (user && (
        request.nextUrl.pathname.startsWith('/auth/login') ||
        request.nextUrl.pathname.startsWith('/auth/signup') ||
        request.nextUrl.pathname.startsWith('/auth/forgot-password')
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}

export const config = {
    matcher: ['/profile', '/admin/:path*', '/auth/login', '/auth/signup', '/auth/forgot-password']
}