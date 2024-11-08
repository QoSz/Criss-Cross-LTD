import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
    try {
        // Get the absolute path to the favicon file
        const filePath = join(process.cwd(), 'public', 'favicon.ico')

        // Read the favicon file
        const buffer = readFileSync(filePath)

        // Return the favicon with appropriate headers
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'image/x-icon',
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
            },
        })
    } catch (error) {
        console.error('Error serving favicon:', error)
        return new NextResponse(null, { status: 404 })
    }
}