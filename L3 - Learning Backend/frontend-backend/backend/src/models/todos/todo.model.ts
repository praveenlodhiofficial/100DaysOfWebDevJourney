import mongoose, { model, models, Schema } from "mongoose";

interface ITodo {
    content: string,
    isComplete: boolean,
    createdBy: Schema.Types.ObjectId
    subTodo: []

}

const todoSchema = new Schema<ITodo>({
    content: {
        type: String,
        required: [true, "content is required"],
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, "created_by is required"],
    },
    subTodo: [{
        type: Schema.Types.ObjectId,
        ref: 'SubTodo'
    }]
    
}, {timestamps: true})

const Todo = models.Todo || model<ITodo>('Todo', todoSchema)

export default Todo