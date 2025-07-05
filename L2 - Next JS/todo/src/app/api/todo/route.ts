import Todo from "@/models/todo.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const getAllTodos = await Todo.find({});

    return NextResponse.json(
      {
        message: "Fetched all todo successfully",
        success: true,
        getAllTodos,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: "Unable to fetch all the todo",
        success: false,
      },
      { status: 500 }
    );
  }
}
