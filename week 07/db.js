const { mongoose } = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}

const Todo = {
    title: String,
    description: String,
    isDone: Boolean,
    UserId: ObjectId,
}

const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}