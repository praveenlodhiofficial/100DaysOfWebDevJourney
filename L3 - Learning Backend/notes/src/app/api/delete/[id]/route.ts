import { connectDB } from "@/lib/dbConfig";
import { Notes } from "@/models/notes.model";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectDB();

    const { id } = await params;

    if (!id) {
        return NextResponse.json({
            status: 400,
            success: false,
            message: "Note ID is required"
        }, { status: 400 });
    }
    
    try {
        const note = await Notes.findByIdAndDelete(id);
        
        if (!note) {
            return NextResponse.json({
                status: 404,
                success: false,
                message: "Note not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            status: 200,
            note: note,
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}
