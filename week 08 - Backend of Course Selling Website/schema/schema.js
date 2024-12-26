const { mongoose } = require('mongoose');

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
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
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const adminSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
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
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    createdBy: {
        type: ObjectId,
        required: true,
    },
})

const purchaseSchema = new Schema({
    courseId: {
        type: ObjectId,
        required: true,
        ref: 'courses'
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'users'
    }
})

const UserModel = mongoose.model('users', userSchema)
const AdminModel = mongoose.model('admins', adminSchema)
const CourseModel = mongoose.model('courses', courseSchema)
const PurchaseModel = mongoose.model('purchases', purchaseSchema)

module.exports = {
    UserModel, AdminModel, CourseModel, PurchaseModel
}