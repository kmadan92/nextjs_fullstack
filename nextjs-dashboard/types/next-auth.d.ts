import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * The 'Session' is what you see in the frontend (useSession / auth())
     */
    interface Session {
        accessToken?: string;
        error?: "RefreshTokenExpired" | "TokenMismatch" | "UserNotFound" | "CannotRefreshToken"; // For our rotation logic
        id: string;
        role?: string;
        isApproved?: boolean;
    }

    /**
     * The 'User' is what comes from your MongoDB or 'authorize' function
     */
    interface User {
        id?: string;
        role?: string;
        isApproved?: boolean;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpiry?: number;
        refreshTokenExpiry?: number;
    }
}

declare module "next-auth/jwt" {
    /**
     * The 'JWT' is the encrypted "backpack" (the token)
     */
    interface JWT {
        id?: string;
        role?: string;
        isApproved?: boolean;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpiry?: number;
        refreshTokenExpiry?: number;
        provider?: string;
        error?: "RefreshTokenExpired" | "TokenMismatch" | "UserNotFound" | "CannotRefreshToken";
    }
}