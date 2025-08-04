import { connectDB } from "@/lib/dbConfig";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";

// Create a new todo
export async function POST(req: NextRequest) {
  const { title, description, status } = await req.json();

  if (!title || !description) {
    return NextResponse.json(
      {
        success: false,
        message: "Title and description are required",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const todo = await Todo.create({
      title,
      description,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo created successfully",
        todo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create todo",
      },
      { status: 500 }
    );
  }
}

// View all todo
export async function GET(req: NextRequest) {
  try {
    const todos = await Todo.find({});

    return NextResponse.json(
      {
        success: true,
        todos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch todos",
      },
      { status: 500 }
    );
  }
}

// delete a todo - using search params
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

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
