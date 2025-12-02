import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
          // You can save the user to your DB here
          const { name, email, image } = user;
          console.log("User logged in via Google:", email);
          return true;
        } catch (error) {
          console.log("Error saving user", error);
          return false;
        }
      }
      return true;
    },
  },
});

// 2. Export the GET and POST handlers correctly
export const { GET, POST } = handlers;