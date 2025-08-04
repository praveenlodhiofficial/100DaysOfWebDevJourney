import mongoose, { connect } from "mongoose";

let MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Provide 'MONGO_URI' in the environment variables.");
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
    cached.promise = connect(MONGO_URI, Options)
      .then(() => {
        console.log("✅ MongoDB connected successfully!");
        return mongoose.connection;
      })
      .catch((err) => {
        console.log("❌ MongoDB connection failed!");
        throw err;
      });
  }

  try {
    await cached.promise;
  } catch (error) {
    console.log("❌ MongoDB connection failed!");
    throw error;
  }

  return cached.promise;
}
