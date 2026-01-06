import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import User from '@/models/User'
import connect from "@/lib/dbConfig";
import { getAccessToken, getRefreshToken, calculateAccessTokenExpiry, calculateRefreshTokenExpiry, refreshAccessToken } from "@/lib/auth";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";

// Create a custom error class to avoid polluting the server console
class InfoError extends CredentialsSignin {
    constructor(code: string) {
        super();
        this.code = code; // This is what the client will see in response.error
    }
}

// 1. Destructure the 'handlers' object from NextAuth
export const { handlers: { GET, POST },
    auth,
    signIn,
    signOut } = NextAuth({
        ...authConfig,
        providers: [
            Credentials({
                credentials: {
                    email: {},
                    password: {},
                },
                async authorize(credentials) {

                    try {
                        //if null is returned then logins fails
                        if (credentials === null) return null;

                        const email = credentials?.email as string
                        const password = credentials?.password as string

                        if (!email || !password) {
                            return null;
                        }

                        await connect()
                        const getUser = await User.findOne({ email }).select("+password");
                        // Note: .select("+password") is needed if your Schema has { select: false } for password

                        if (!getUser) {
                            return null;
                        }

                        const checkPassword = await bcryptjs.compare(password, getUser.password)

                        if (!checkPassword) {
                            return null;
                        }

                        return {
                            id: getUser._id.toString(), // Must be a string
                            name: getUser.name,
                            email: getUser.email,
                            role: getUser.role,
                            isApproved: getUser.isApproved,
                            accessToken: await getAccessToken(getUser),
                            refreshToken: await getRefreshToken(getUser),
                            accessTokenExpiry: await calculateAccessTokenExpiry(),
                            refreshTokenExpiry: await calculateRefreshTokenExpiry()
                        };

                    } catch (err: any) {

                        console.log("Something went wrong" + err)
                        return null

                    }

                }
            }),
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

                if (account?.provider === "credentials") {

                    if (!((user as any).isApproved)) {
                        return "/unauthorized"
                    }

                    return true

                }

                if (account?.provider === "google") {
                    try {

                        await connect()
                        const existingUser = await User.findOne({ email: user.email })

                        if (!existingUser) {

                            const newuser = await new User({
                                name: user.name,
                                email: user.email
                            }).save()

                            return "/unauthorized"

                        }
                        else {

                            if (!existingUser.isApproved) {

                                return "/unauthorized"

                            }
                            return true
                        }
                    } catch (error) {
                        console.log("Error saving user", error);
                        return "/something-went-wrong";
                    }
                }
                return false;
            },
            async jwt({ token, user, account }) {

                // 1st login
                if (user && account) {

                    await connect()

                    if (account?.provider == "credentials") {

                        await User.findOneAndUpdate(
                            { email: user.email },
                            {
                                $set: {
                                    accessToken: user.accessToken,
                                    refreshToken: user.refreshToken
                                }
                            }
                        )

                        return {
                            ...token,
                            accessToken: user.accessToken,
                            refreshToken: user.refreshToken,
                            accessTokenExpiry: user.accessTokenExpiry,
                            refreshTokenExpiry: user.refreshTokenExpiry,
                            id: user.id,
                            email: user.email,
                            role: user.role,
                            isApproved: user.isApproved,
                            provider: account.provider
                        }

                    }

                    if (account?.provider == "google") {

                        const db_user = await User.findOne({ email: user.email })

                        const accessToken = await getAccessToken(db_user)
                        const refreshToken = await getRefreshToken(db_user)
                        const accessTokenExpiry = await calculateAccessTokenExpiry()
                        const refreshTokenExpiry = await calculateRefreshTokenExpiry()

                        await User.findByIdAndUpdate(
                            db_user._id,
                            {
                                $set: {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken
                                }
                            }
                        )

                        return {
                            ...token,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            accessTokenExpiry: accessTokenExpiry,
                            refreshTokenExpiry: refreshTokenExpiry,
                            id: db_user._id.toString(),
                            email: db_user.email,
                            role: db_user.role,
                            isApproved: db_user.isApproved,
                            provider: account.provider
                        }
                    }
                }

                //susequent page navigation

                const date = Date.now()

                if (date > (token as any).refreshTokenExpiry) {

                    return {
                        ...token,
                        error: "RefreshTokenExpired"
                    }

                }

                if (date > (token as any).accessTokenExpiry) {

                    return await refreshAccessToken(token)

                }


                return { ...token }

            },

            async session({ session, token }) {

                if (token.error) {
                    (session as any).error = token.error;
                }

                if (token && session.user) {

                    return {
                        ...session,
                        id: token.id,
                        email: token.email,
                        accessToken: token.accessToken,
                        role: token.role,
                        isApproved: token.isApproved
                    }
                }

                return session

            }


        }

    });