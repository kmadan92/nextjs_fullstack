import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from '@/models/User'
import connect from "@/lib/dbConfig";

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

                        const newuser = new User({
                            name: user.name,
                            email: user.email,
                            accessToken: account.access_token,
                            refreshToken: account.refresh_token

                        })
                        await newuser.save()
                        return "/unauthorized"

                    }
                    else {

                        existingUser.accessToken = account.access_token;
                        if (account.refresh_token) {
                            existingUser.refreshToken = account.refresh_token;
                        }

                        await existingUser.save()

                        if (existingUser.isApproved) {
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