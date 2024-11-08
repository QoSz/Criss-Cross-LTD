import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
    const { data: { user } } = await supabase.auth.getUser()

    return <NavbarClient initialUser={user} />
}
