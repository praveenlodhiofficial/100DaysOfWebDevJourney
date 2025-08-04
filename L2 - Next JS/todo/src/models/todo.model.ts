import mongoose, { model, models, Schema } from "mongoose";

interface ITodo {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "in_progress"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || model<ITodo>("Todo", todoSchema);

export default Todo;
