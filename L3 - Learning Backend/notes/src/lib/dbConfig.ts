import mongoose, { connect } from "mongoose"

let MONGO_URI = process.env.MONGO_URI!

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = ({
        connection: null,
        promise: null
    })
}

export async function connectDB() {
    if (cached.connection) {
        return cached.connection
    }

    if (!cached.promise) {
        const Options = {
          bufferCommands: true,
          maxPoolSize: 10,
        };
        cached.promise = connect(MONGO_URI, Options).then(() => mongoose.connection)
    }

    try {
        cached.connection = await cached.promise
        console.log("✅ MongoDB connected successfully!")
        return cached.connection
    } catch (err) {
        console.log("❌ MongoDB connection failed!")
        throw err
    }
}