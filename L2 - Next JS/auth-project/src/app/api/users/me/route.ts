import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/get-data-from-token";
import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
