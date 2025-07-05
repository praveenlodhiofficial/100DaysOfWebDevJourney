import Todo from "@/models/todo.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { title, description } = await request.json();
    const { id: todoId } = await params;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return NextResponse.json({
        error: "id is not valid",
        success: false,
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
      title,
      description,
    });

    return NextResponse.json(
      {
        message: "Todo updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to update todo",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: todoId } = await params;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return NextResponse.json({
        error: "id is not valid",
        success: false,
      });
    }

    // First find the todo to get its data before deletion
    const todoToDelete = await Todo.findById(todoId);

    if (!todoToDelete) {
      return NextResponse.json(
        {
          error: "Todo not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Delete the todo
    await Todo.findByIdAndDelete(todoId);

    return NextResponse.json(
      {
        message: "Todo deleted successfully",
        success: true,
        deletedTodo: {
          title: todoToDelete.title,
          description: todoToDelete.description,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "unable to delete todo",
        success: false,
      },
      { status: 500 }
    );
  }
}
