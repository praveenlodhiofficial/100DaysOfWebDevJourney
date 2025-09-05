import mongoose, { model, models, Schema } from "mongoose";

interface ISubTodo {
    content: string,
    isComplete: boolean,
    createdBy: Schema.Types.ObjectId
}

const subTodoSchema = new Schema<ISubTodo>({
    content: {
        type: String,
        required: [true, "content is required"],
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, "created_by is required"],
    }


}, {timestamps: true})

const SubTodo = models.SubTodo || model<ISubTodo>('SubTodo', subTodoSchema)

export default SubTodo