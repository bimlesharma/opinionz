import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/verify", "/forgot-password"];
const PROTECTED_ROUTE_PREFIXES = ["/dashboard", "/account", "/profile"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value || null;
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // ✅ Redirect logged-in users away from public pages (e.g. /login → /dashboard)
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Redirect unauthenticated users away from protected pages
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
