import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const protectedRoutes = ["/dashboard", "/dashboard/(.*)"]
const authRoutes = ["/auth", "/auth/(.*)"]

export function proxy(request: NextRequest) {
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token")
    const pathname = request.nextUrl.pathname

    const isProtectedRoute = protectedRoutes.some(route =>
        new RegExp(`^${route}$`).test(pathname)
    )
    const isAuthRoute = authRoutes.some(route =>
        new RegExp(`^${route}$`).test(pathname)
    )

    if (!sessionCookie && isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }

    if (sessionCookie && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/(.*)", "/auth", "/auth/(.*)"],
}