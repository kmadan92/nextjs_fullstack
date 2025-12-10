import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import connect from "@/lib/dbConfig";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {

    try {

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
                { status: 400 }
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
                { status: 400 }
            )
        }

        const tokenData = {
            id: getUser._id,
            email: getUser.email,
            role: getUser.role
        }

        // 5. Generate TOKENS
        // Access Token: Short life (e.g., 15 minutes) - Used for API calls
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1d" })

        // Refresh Token: Long life (e.g., 7 days) - Used to get new Access Tokens
        const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })

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