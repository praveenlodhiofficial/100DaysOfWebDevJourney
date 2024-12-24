const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema ({
    name: String,
    password: String,
    email: {
        unique: true,
        type: String
    }
})

const Todo = new Schema ({
    title: String,
    description: String,
    UserId: ObjectId,
    isDone: Boolean
})

const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}