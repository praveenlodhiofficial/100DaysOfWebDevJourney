import mongoose from "mongoose";

let MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Provode 'MONGO_URI' in the environment varibles.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    connection: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const Options = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(MONGO_URI, Options)
      .then(() => {
        console.log("✅ MongoDB connected successfully!");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
      });
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    console.error("❌ Failed to establish MongoDB connection:", error);
    throw error;
  }

  return mongoose.connection;
}
