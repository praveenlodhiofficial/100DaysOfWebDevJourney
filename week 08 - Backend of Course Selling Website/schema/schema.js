const { mongoose } = require('mongoose')

console.log('Connected to Compass')
mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/Course-Selling-Application')

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
const CourseModel = mongoose.model('courses', courseSchema)
const AdminModel = mongoose.model('admins', adminSchema)
const PurchaseModel = mongoose.model('purchases', purchaseSchema)

module.exports = {
    UserModel,
    CourseModel,
    AdminModel,
    PurchaseModel,
}