'use client'
import { clearTokensInDB } from "@/lib/auth";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {

    const { data: session, status, update } = useSession()
    const router = useRouter();

    useEffect(() => {


        if (session?.error === "RefreshTokenExpired") {

            clearTokensInDB();
            signOut({ callbackUrl: "/login" });

        }

        if (session?.error === "UserNotFound") {

            clearTokensInDB();
            signOut({ callbackUrl: "/unauthorized" });

        }

        if (session?.error === "TokenMismatch") {

            clearTokensInDB();
            signOut({ callbackUrl: "/something-went-wrong" });

        }

    }, [session, router]);

    return <>{children}</>

}