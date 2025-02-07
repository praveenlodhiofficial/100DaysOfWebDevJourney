"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
    try {
        await prisma.post.create({
            data: {
                title: formData.get("title") as string,
                content: formData.get("content") as string,
                slug: (formData.get("title") as string)
                    .replace(/\s+/g, "-")
                    .toLowerCase(),
                author: {
                    connectOrCreate: {
                        where: {
                            email: "john@gmail.com",
                        },
                        create: {
                            email: "john@gmail.com",
                            hashedPassword: "elfrjhrkjgnvfojvolfkjv"
                        }
                    },
                },
                isPublished: true
            }
        })

        revalidatePath("/posts")

    } catch (error) {
        console.error("Error creating post:", error)
        throw error
    }
}