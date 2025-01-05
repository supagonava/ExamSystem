import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mockAuth } from "@/lib/mockData";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = String(req.cookies.get("lastUsername")?.value || "User").toUpperCase();
    const isLoginPage = req.nextUrl.pathname === "/login";

    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token) {
        try {
            // const role = mockAuth.getUserRole(token);)

            // Redirect from login page if already authenticated
            if (isLoginPage) {
                return NextResponse.redirect(new URL(role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard", req.url));
            }

            // Check route permissions
            if (req.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
                return NextResponse.redirect(new URL("/login", req.url));
            }
            if (req.nextUrl.pathname.startsWith("/user") && role !== "USER") {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        } catch (error) {
            // If token is invalid, clear it and redirect to login
            const response = NextResponse.redirect(new URL("/login", req.url));
            response.cookies.delete("token");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/admin/:path*", "/user/:path*"],
};
