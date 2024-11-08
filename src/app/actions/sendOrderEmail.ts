'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

type OrderItem = {
    product_name: string
    quantity: number
}

type CustomerProfile = {
    first_name: string | null
    last_name: string | null
    email: string
    phone_number: string | null
}

export async function sendOrderEmail(userId: string, orderItems: OrderItem[]) {
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

    try {
        // Fetch customer profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name, email, phone_number')
            .eq('id', userId)
            .single()

        if (profileError) throw profileError

        const customerProfile = profile as CustomerProfile
        
        // Format order details
        const formattedItems = orderItems.map(item => 
            `${item.product_name} x ${item.quantity}`
        ).join('\n')

        const customerName = `${customerProfile.first_name || ''} ${customerProfile.last_name || ''}`.trim()
        
        // Prepare email content
        const emailContent = {
            subject: `New Order from ${customerName}`,
            customerName: customerName,
            customerEmail: customerProfile.email,
            customerPhone: customerProfile.phone_number || 'Not provided',
            message: `Order Details:\n\n${formattedItems}`,
            orderType: 'New Order'
        }

        // Send to Formspree
        const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailContent)
        })

        if (!response.ok) throw new Error('Failed to send email')

        return { success: true }
    } catch (error) {
        console.error('Error sending order email:', error)
        return { success: false, error }
    }
} 