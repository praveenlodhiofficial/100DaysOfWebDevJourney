import { error } from "console";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.off("error", (err) => {
      console.log(
        `MongoDB connection error, please make sure db is up and running ${err}`
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to Database.");
    console.log(error);
  }
}
