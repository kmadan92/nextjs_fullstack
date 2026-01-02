import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [], // Keep empty; full providers belong in auth.ts
    callbacks: {},  // Keep empty; we are doing logic in middleware.ts
} satisfies NextAuthConfig;