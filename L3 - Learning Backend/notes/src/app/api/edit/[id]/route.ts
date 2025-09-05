import { connectDB } from "@/lib/dbConfig";
import { Notes } from "@/models/notes.model";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    {params}: {params: {id: string}}
) {
    try {
        await connectDB();
        const {id} = await params;

        if (!id) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Note ID is required"
            }, {status: 400})
        }

        const {title, description} = await request.json();

        if (!title || !description) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Title and description are required"
            }, {status: 400})
        }

        const note = await Notes.findByIdAndUpdate({ _id: id}, {
            title,
            description
        })

        return NextResponse.json({
            status: 200,
            note: note,
            success: true,
            message: "Note updated successfully"
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Internal server error"
        }, {status: 500})
    }
}