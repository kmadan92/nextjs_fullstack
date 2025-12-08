import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {

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

    const checkPassword = await bcryptjs.compare(password, getUser.password)

    if (!checkPassword) {
        return NextResponse.json({ error: "Wrong Password" },
            { status: 400 }
        )

    }
}