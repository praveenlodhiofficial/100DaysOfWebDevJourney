const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// User Schema
const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    purchasedCourses: [
        {
            type: ObjectId,
            ref: 'Course',
        },
    ],
});

// Admin Schema
const Admin = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
});

// Course Schema
const Course = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    content: {
        type: [String], // Array to include videos or sections
        required: true,
    },
    createdBy: {
        type: ObjectId,
        ref: 'Admin',
        required: true,
    },
});

// Purchase Schema
const Purchase = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: ObjectId,
        ref: 'Course',
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now, // Current timestamp by default
    },
});

// Models
const UserModel = mongoose.model('User', User);
const AdminModel = mongoose.model('Admin', Admin);
const CourseModel = mongoose.model('Course', Course);
const PurchaseModel = mongoose.model('Purchase', Purchase);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel,
};
