import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // List of paths that are accessible without authentication
  const publicPaths = ["/", "/pages/login", "/pages/register"];

  // Check if the current path is in the list of public paths
  const isPublicPath = publicPaths.includes(pathname);

  if (!token && !isPublicPath) {
    // Redirect to login page if trying to access a protected route without a token
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  if (
    token &&
    (pathname === "/pages/login" || pathname === "/pages/register")
  ) {
    // Redirect to dashboard if trying to access login/register page with a token
    return NextResponse.redirect(new URL("/pages/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
