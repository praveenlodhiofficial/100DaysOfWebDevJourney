import { connectDB } from "@/lib/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: "User already exists in the database.",
          success: false,
        },
        { status: 400 }
      );
    }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      newUser.save();

      return NextResponse.json(
        {
          message: "user registered sucessfully",
          success: true,
          newUser,
        },
        { status: 200 }
      );
  } catch (error: any) {
    console.log("registration error", error);
    return NextResponse.json({
      message: "failed to register user",
    });
  }
}
