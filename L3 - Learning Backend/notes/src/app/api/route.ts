import { Notes } from "@/models/notes.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";

export async function GET() {
    try {
        await connectDB();
        const getAllNotes = await Notes.find().sort({ createdAt: -1 });

        return NextResponse.json({
            status: 200,
            success: true,
            message: "Notes fetched successfully",
            notes: getAllNotes
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Failed to fetch notes",
            notes: []
        }, { status: 500 });
    }
}