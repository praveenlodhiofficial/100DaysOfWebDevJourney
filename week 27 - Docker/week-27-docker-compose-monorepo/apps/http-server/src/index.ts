import express from "express";
import { prismaClient } from "@repo/db/prismaClient";

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
    try {
        const user = await prismaClient.user.create({
            data: {
                username: Math.random().toString(36).substring(2, 15),
                password: Math.random().toString(36)
            }
        })

        res.status(201).json({
            success: true,
            user,
            message: "User created successfully"
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await prismaClient.user.findMany();

        res.status(200).json({
            success: true,
            users,
            message: "Users fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})