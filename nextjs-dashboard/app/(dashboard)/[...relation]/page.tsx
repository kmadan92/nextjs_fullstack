'use client'

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { OpenWizard } from "@/components/OpenWizard"
import { Folder } from "@/components/Folder"

export default function RelationPage() {

    const { data: session, status } = useSession()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (status == "authenticated" && session?.role == "admin") {
            setIsAdmin(true)
        }
    }, [status, session])

    return (

        <>
            {isAdmin && (
                <div className="flex flex-row justify-end m-4">
                    <OpenWizard />
                </div>
            )}

            <div className="grid sm:grid-cols-4 md:grid-cols-3 gap-4">
                <Folder />
                <Folder />
                <Folder />
                <Folder />

            </div>
        </>
    )
}