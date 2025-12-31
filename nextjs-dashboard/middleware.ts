import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    /*
        const token = request.cookies.get("accessToken")?.value
    
        let isUserLoggedIn = false
        const publicPath = [
            "/",
            "/signup",
            "/unauthorized"
        ]
        const IsPublicPath = publicPath.includes(request.nextUrl.pathname)
    
        if (token) {
            try {
                const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    
                // If the token is invalid or expired, this line throws an error
                await jwtVerify(token, secret)
    
                // If we reach here, no error occurred
                isUserLoggedIn = true
    
            } catch (error) {
                // Token is invalid, expired, or tampered with.
                isUserLoggedIn = false
            }
        }
    
        if (IsPublicPath && isUserLoggedIn) {
    
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
        }
    
        if (!IsPublicPath && !isUserLoggedIn) {
    
            return NextResponse.redirect(new URL("/", request.nextUrl))
    
        }
        return NextResponse.next()
    
    }
    
    // Alternatively, you can use a default export:
    // export default function proxy(request: NextRequest) { ... }
    
    // See "Matching Paths" below to learn more
    export const config = {
        matcher: [
            '/',
            '/signup',
            '/dashboard',
            '/dashboard/:path*'
        ]
            */
}