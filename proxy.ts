import { NextRequest, NextResponse } from "next/server"

const PROTECTED_PREFIX = "/dashboard"
const AUTH_PREFIX = "/auth"

export function proxy(request: NextRequest) {
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token")
    
    const pathname = request.nextUrl.pathname

    const isProtectedRoute = pathname === PROTECTED_PREFIX || pathname.startsWith(`${PROTECTED_PREFIX}/`)
    const isAuthRoute = pathname === AUTH_PREFIX || pathname.startsWith(`${AUTH_PREFIX}/`)

    if (!sessionCookie && isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }

    if (sessionCookie && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
}