'use client'

import Button from "@/components/button"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

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
                <div className="flex flex-row justify-end">
                    <Button
                        className="relative p-3 m-1 text-base shadow-lg bg-red-900 hover:bg-red-700 text-gray-700 border border-gray-100"
                        type="button">
                        Create Folder
                    </Button>
                    <Button
                        className="relative p-3 m-1 text-base shadow-lg bg-red-900 hover:bg-red-700 text-gray-700 border border-gray-100"
                        type="button">
                        Create Image
                    </Button>
                    <Button
                        className="relative p-3 m-1 text-base shadow-lg bg-red-900 hover:bg-red-700 text-gray-700 border border-gray-100"
                        type="button">
                        Create Folder
                    </Button>
                </div>
            )}
        </>
    )
}