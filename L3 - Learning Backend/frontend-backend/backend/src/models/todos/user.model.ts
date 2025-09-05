import mongoose, { model, models, Schema } from "mongoose";

interface IUser {
    username: string
    email: string,
    password: string,

}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "username is required"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, {timestamps: true})

const User = models.User || model<IUser>('User', userSchema)

export default User;