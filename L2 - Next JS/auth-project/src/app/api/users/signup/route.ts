import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    // Connect to database first
    await connectDB();

    //   await beacuse request in nextjs is a promise
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //   TODO: Input Validation (Zod Types)

    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //   send email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "User signed-up successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log("unable to proceed create user request.");
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Unable to proceed create user request.",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
