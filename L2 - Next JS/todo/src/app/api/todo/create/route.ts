import { connectDB } from "@/lib/dbConfig";
import Todo from "@/models/todo.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    const newTodo = await Todo.create({
      title,
      description,
    });

    return NextResponse.json(
      {
        message: "Todo added successfully",
        success: true,
        newTodo
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Unable to create todo",
        success: true,
      },
      { status: 500 }
    );
  }
}
