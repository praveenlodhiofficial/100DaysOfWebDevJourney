import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()

export async function POST(req: NextRequest) {
    const data = await req.json()

    const createUser = await prismaClient.user.create({
        data: {
            username: data.username,
            password: data.password,
        }
    })

    return NextResponse.json ({
        message: 'User Signed Up'
    })
}