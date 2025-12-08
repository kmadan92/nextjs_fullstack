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
        }),
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

                    if (existingUser) {
                        const checkForApproved = await User.findById(existingUser.isApproved)
                        if (checkForApproved) {
                            return true
                        }
                        else {
                            return "/unauthorized"
                        }
                    }
                    else {
                        return "/unauthorized"
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