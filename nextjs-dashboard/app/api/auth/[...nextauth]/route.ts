import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from '@/models/User'
import connect from "@/lib/dbConfig";
import { getAccessToken, getRefreshToken } from "@/lib/auth";
import { cookies } from "next/headers";

// 1. Destructure the 'handlers' object from NextAuth
const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    // This forces Google to show the selection screen every time
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {

                    await connect()
                    const existingUser = await User.findOne({ email: user.email })

                    if (!existingUser) {

                        const newuser = await new User({
                            name: user.name,
                            email: user.email
                        }).save()

                        const accessToken = getAccessToken(newuser)
                        const refreshToken = getRefreshToken(newuser)

                        const updatedUser = await User.findByIdAndUpdate(
                            newuser,
                            { accessToken, refreshToken },
                            { new: true }
                        )
                        return "/unauthorized"

                    }
                    else {
                        const accessToken = getAccessToken(existingUser)
                        const refreshToken = getRefreshToken(existingUser)

                        const updatedUser = await User.findByIdAndUpdate(
                            existingUser,
                            { accessToken, refreshToken },
                            { new: true }
                        )

                        if (existingUser.isApproved) {

                            // We access the browser cookies directly
                            const cookieStore = await cookies();

                            cookieStore.set("accessToken", accessToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                sameSite: "lax", // 'lax' is better for OAuth redirects than 'strict'
                                path: "/",
                                maxAge: 60 * 60 * 24 // 1 day
                            });

                            cookieStore.set("refreshToken", refreshToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                sameSite: "lax",
                                path: "/",
                                maxAge: 60 * 60 * 24 * 7 // 7 days
                            });

                            return true
                        }
                        else {
                            return "/unauthorized"
                        }
                    }
                } catch (error) {
                    console.log("Error saving user", error);
                    return "/something-went-wrong";
                }
            }
            return true;
        },
    },
});

// 2. Export the GET and POST handlers correctly
export const { GET, POST } = handlers;