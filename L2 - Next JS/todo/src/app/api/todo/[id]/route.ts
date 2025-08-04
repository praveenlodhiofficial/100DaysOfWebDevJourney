import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todo.model";
import { connectDB } from "@/lib/dbConfig";

// delete a todo - using params
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Todo ID is required",
      });
    }

    const todo = await Todo.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete todo",
      },
      { status: 500 }
    );
  }
}

// update a todo - using params
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { title, description, status } = await req.json();

    if (!title || !description || status === undefined || !id) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description and status are required",
        },
        { status: 400 }
      );
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!todo) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update todo",
      },
      { status: 500 }
    );
  }
}
