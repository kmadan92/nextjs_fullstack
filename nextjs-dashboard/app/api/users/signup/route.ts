import connect from "@/lib/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { fullName, email, password } = reqBody

        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: "Please provide name, email, and password" },
                { status: 400 }
            );
        }

        const verifyExistingUser = await User.findOne({ email })

        if (verifyExistingUser) {
            return NextResponse.json({ error: "User already exist" },
                { status: 400 }
            )
        }

        // 1. Generate salt and hash the password
        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(password, salt);

        const newUser = await User.create({
            name: fullName,
            email,
            password: hashedPassword
        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        }, { status: 201 });


    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}