const { mongoose } = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const adminSchema = new Schema({
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

const AdminModel = mongoose.model('admins', adminSchema)

module.exports = {
    AdminModel: AdminModel
}