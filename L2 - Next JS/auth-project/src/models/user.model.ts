import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide a username."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide a email."]
    },
    password: {
        type: String,
        required: [true, "Add a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: String,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
