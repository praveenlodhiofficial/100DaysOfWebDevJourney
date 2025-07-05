import bcryptjs from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email Id"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

const User = models?.User || model<IUser>("User", userSchema);
export default User;
