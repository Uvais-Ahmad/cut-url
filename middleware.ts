import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './lib/session';

// Define a session cookie name
const ANON_COOKIE_NAME = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME || "anonymousUserId";
const protectedRoutes = ['/home'];
const publicRoutes = ['/', '/login', '/register'];

export async function middleware(request: NextRequest) {
    const {cookies } = request;
    const  path = request.nextUrl.pathname;
    const sessionCookie = cookies.get('session')?.value;
    const anonymousUserId = cookies.get(ANON_COOKIE_NAME)?.value;

    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.includes(path);

    const session = await decrypt(sessionCookie);

    if(session?.userId && isPublicRoute) {
        // return NextResponse.redirect(new URL('/home', request.nextUrl))
    }
    if(isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/register', request.nextUrl))
    }

    if(!session?.userId && !anonymousUserId) {
        const newAnonymousUserId = nanoid();
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