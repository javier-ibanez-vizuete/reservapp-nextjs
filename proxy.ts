import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./app/core/auth/auth.api";
import { PathTypes } from "./app/types/index.type";

const protectedRoutes = ["/profile", "/dashboard"];

function checkIsProtectedRoute(path: string) {
    return protectedRoutes.includes(path)
}


export async function proxy(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    const isProtectedRoute = checkIsProtectedRoute(currentPath);

    if (!isProtectedRoute) return NextResponse.next();

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.redirect(new URL(PathTypes.LOGIN, request.url))

        const response = await fetch(`${BASE_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json",
            }
        })

        const userResponse = await response.json();

        if (!userResponse?.user) return NextResponse.redirect(new URL(PathTypes.LOGIN, request.url))

        return NextResponse.next();

    } catch (error) {
        console.error("Error Verificando la authenticacion del usuario", error)
        return NextResponse.redirect(new URL(PathTypes.LOGIN, request.url))
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/dashboard",
        "/dashboard/:path*",
        "/profile",
        "/profile/:path*",
    ]
}