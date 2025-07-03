import mongoose, { connect } from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error(
    "Please define the 'MONGO_URI' in the environment variables."
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    // optional -> used when we have differnt plan of mongoDB
    const options = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    mongoose.connect(MONGO_URI, options).then(() => mongoose.connection);
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {}

  return cached.connection;
}
