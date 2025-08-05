import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prismaClient = new PrismaClient();

app.post("/", async (req, res) => {
  try {
    const user = await prismaClient.user.create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    });
    res.send({
      success: true,
      user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.send({
      success: true,
      users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching users",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});