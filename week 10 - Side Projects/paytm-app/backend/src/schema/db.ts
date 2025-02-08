import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

// ------------------------------------------------>

const UserSchema = new Schema ({
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, unique: true, required: true },
})

// ------------------------------------------------>

const UserModel = mongoose.model ('users', UserSchema)

// ------------------------------------------------>

export { UserModel }