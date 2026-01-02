'use server'

import connect from "./dbConfig";
import { auth } from "@/auth";
import User from "@/models/User";

export async function clearTokensInDB() {
    try {
        const session = await auth();
        if (!session?.id) return;

        await connect();
        await User.findByIdAndUpdate(session.id, {
            $set: { accessToken: null, refreshToken: null },
        });
        console.log(`Tokens cleared successfully for: ${session.id}`);
    } catch (error) {
        console.error("Failed to clear tokens in DB:", error);
        // We don't throw error here so that the client-side redirect can still proceed
    }
}