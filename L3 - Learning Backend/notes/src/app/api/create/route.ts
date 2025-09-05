import { connectDB } from "@/lib/dbConfig"
import { Notes } from "@/models/notes.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    await connectDB();
    const { title, description } = await req.json()

    if (!title || !description) {
        return NextResponse.json({ message: "Title and description are required" }, { status: 400 })
    }

    const note = await Notes.create({ 
        title, 
        description 
    })

    return NextResponse.json({
        status: 201,
        success: true,
        message: "Note created successfully",
        note: note
    })
}