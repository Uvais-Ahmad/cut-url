import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

// Define a session cookie name
const ANON_COOKIE_NAME = process.env.NEXT_PUBLIC_ANON_COOKIE_NAME;
const NEXT_AUTH_SECRET = process.env.NEXTAUTH_SECRET;

const protectedRoutes = ['/home'];
const publicRoutes = ['/', '/login', '/register'];

export async function middleware(request: NextRequest) {
    const { cookies, nextUrl } = request;
    const  path = nextUrl.pathname;

    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.includes(path);

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuth = !!token;
    if (isPublicRoute && isAuth) {
        console.log("Authenticated user trying to access public route:", request.url);
        // Authenticated user trying to access login/register → redirect to dashboard
        return NextResponse.redirect(new URL("/home", request.url));
    }
    // If not logged in and trying to access protected pages → redirect to /
    if (!isAuth && isProtectedRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    if(!ANON_COOKIE_NAME) {
        console.error("ANON_COOKIE_NAME is not defined in environment variables.");
        return NextResponse.next();
    }
    if(!NEXT_AUTH_SECRET) {
        console.error("NEXTAUTH_SECRET is not defined in environment variables.");
        return NextResponse.next();
    }
    
    const anonymousUserId = cookies.get(ANON_COOKIE_NAME)?.value;


    if(!isAuth && !anonymousUserId) {
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
    matcher: ['/((?!api|_next|favicon.ico).*)'],
}

