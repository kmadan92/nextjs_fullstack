import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import connect from "@/lib/dbConfig";
import jwt from "jsonwebtoken"
import { getAccessToken } from "@/lib/auth";
import { getRefreshToken } from "@/lib/auth";

export async function POST(request: NextRequest) {

    try {
        await connect();
        const reqBody = await request.json()
        const { email, password } = reqBody

        if (!email || !password) {
            return NextResponse.json({ error: "Email or Password is empty" },
                { status: 400 }
            )
        }

        const getUser = await User.findOne({ email }).select("+password");
        // Note: .select("+password") is needed if your Schema has { select: false } for password

        if (!getUser) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 401 }
            )
        }

        if (!getUser.isApproved) {
            return NextResponse.json({ error: "User is not authorized" },
                { status: 403 }
            )
        }

        const checkPassword = await bcryptjs.compare(password, getUser.password)

        if (!checkPassword) {
            return NextResponse.json({ error: "Wrong Password" },
                { status: 401 }
            )
        }


        const accessToken = await getAccessToken(getUser)

        const refreshToken = await getRefreshToken(getUser)

        getUser.refreshToken = refreshToken
        await getUser.save()

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 3600 * 24
        })

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 3600 * 24 * 7
        })

        return response

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}