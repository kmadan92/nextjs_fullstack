import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/dbConfig";
import Folder from "@/models/Folder";

export async function POST(request: NextRequest) {

    try {
        await connect();
        const reqBody = await request.json()
        const { folderName, coverImage, memorytimestamp, tags, fileStructure } = reqBody

        if (!folderName || !memorytimestamp || !fileStructure) {
            return NextResponse.json({ error: "Mandatory Fields are empty" },
                { status: 400 }
            )
        }

        const folderData: any = {
            folderName,
            MemoryTimestamp: new Date(memorytimestamp),
            tags,
            fileStructure
        };

        if (coverImage) {
            folderData.coverImage = coverImage;
        }

        const newFolder = new Folder(folderData)
        const savedFolder = await newFolder.save();

        return NextResponse.json({
            message: "Folder created successfully",
            success: true,
            savedFolder
        }, { status: 201 });

    } catch (error: any) {

        // Handle MongoDB Duplicate Key Error (code 11000)
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "A folder with this name already exists." },
                { status: 409 } // 409 is the standard 'Conflict' status code
            );
        }

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );

    }

}