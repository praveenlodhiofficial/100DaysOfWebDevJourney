import { PrismaClient } from "./generated/prisma/index.js";
import express from "express";

const app = express();
const prismaClient = new PrismaClient();

app.post("/", async (req, res) => {
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
});

app.get("/", async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.send({
    success: true,
    users,
    message: "Users fetched successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});