import mongoose, { model, models, Schema } from "mongoose";

interface ITodo {
  _id: mongoose.Types.ObjectId;
  title: String;
  description: String;
  isCompleted: Boolean;
  createdAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Please provide the title for the todo"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description for the todo"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
