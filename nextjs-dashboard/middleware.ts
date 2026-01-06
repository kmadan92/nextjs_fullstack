import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// We initialize a "Lite" version of auth for the middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; // req.auth contains the session

    //console.log("req auth: " + JSON.stringify(req.auth))

    const publicPaths = ["/", "/signup", "/unauthorized"];
    const isPublicPath = publicPaths.includes(nextUrl.pathname);

    // 1. If user is logged in and tries to access public pages (like login/signup)
    // Redirect them to the dashboard
    if (isPublicPath && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    // 2. If user is NOT logged in and tries to access protected pages
    // Redirect them to the home/login page
    if (!isPublicPath && !isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * 1. Next.js internals (_next/static, _next/image)
         * 2. API routes (/api)
         * 3. Static files with extensions (png, jpg, jpeg, gif, svg, ico)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$|sitemap.xml|robots.txt).*)',
    ],
};