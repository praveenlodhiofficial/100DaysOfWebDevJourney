const { mongoose } = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
})

const UserModel = mongoose.model('users', userSchema)

module.exports = {
    UserModel: UserModel
}