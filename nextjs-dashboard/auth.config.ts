import type { NextAuthConfig } from "next-auth";


// created this file for use on middleware as middleware is lite and cannot have auth.ts which contains calls
// from Db

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [], // Keep empty; full providers belong in auth.ts
    callbacks: {},  // Keep empty; we are doing logic in middleware.ts
} satisfies NextAuthConfig;