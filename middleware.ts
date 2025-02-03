import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define a session cookie name
const ANON_COOKIE_NAME = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME || "anonymousUserId";

export function middleware(request: NextRequest) {
    const {cookies } = request;
    const anonymousUserId = cookies.get(ANON_COOKIE_NAME)?.value;
    if(!anonymousUserId) {
        const newAnonymousUserId = nanoid(5);
        const response = NextResponse.next();
        response.cookies.set(ANON_COOKIE_NAME, newAnonymousUserId, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            path: '/',
        });

        return response
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*', // Run the middleware on all paths
}