'use server'

import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import connect from "./dbConfig";
import User from "@/models/User";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const validateSecrets = () => {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("CRITICAL: JWT Secrets are missing in environment variables.");
    }
};

export async function getAccessToken(user: any) {
    try {
        validateSecrets();
        const tokenData = {
            id: user._id?.toString() || user.id,
            email: user.email,
            role: user.role,
        };
        // 1. Set to 1 minute
        return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1m" });
    } catch (error) {
        console.error("Error generating Access Token:", error);
        throw error;
    }
}

export async function getRefreshToken(user: any) {
    try {
        validateSecrets();
        const tokenData = {
            id: user._id?.toString() || user.id,
            email: user.email,
        };
        // 2. Set to 3 minutes
        return jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "3m" });
    } catch (error) {
        console.error("Error generating Refresh Token:", error);
        throw error;
    }
}

// 3. Update calculations (1 min = 60,000ms; 3 min = 180,000ms)
export const calculateAccessTokenExpiry = async () => Date.now() + 1 * 60 * 1000;
export const calculateRefreshTokenExpiry = async () => Date.now() + 3 * 60 * 1000;

export async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        await connect();
        const user = await User.findById(token.id);

        if (!user) return { ...token, error: "UserNotFound" };

        if (user.refreshToken !== token.refreshToken) {
            return { ...token, error: "TokenMismatch" };
        }

        const accessToken = await getAccessToken(user);
        const accessTokenExpiry = await calculateAccessTokenExpiry();

        await User.findByIdAndUpdate(user._id, { $set: { accessToken } });

        return {
            ...token,
            accessToken,
            accessTokenExpiry,
        };
    } catch (error) {
        console.error("refreshAccessToken Error:", error);
        return { ...token, error: "CannotRefreshToken" };
    }
}

export async function clearTokensInDB() {
    try {
        const session = await auth();

        if (!session) {
            console.error("No session found to clear tokens")
            return
        }

        await connect();
        await User.findByIdAndUpdate(session?.id, {
            $set: { accessToken: null, refreshToken: null },
        });

        console.log(`Tokens cleared successfully for: ${session?.id}`);
    } catch (error) {
        console.error("Failed to clear tokens in DB:", error);
        // We don't throw error here so that the client-side redirect can still proceed
    }
}
