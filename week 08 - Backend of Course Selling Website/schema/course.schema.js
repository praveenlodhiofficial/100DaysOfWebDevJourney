const { mongoose } = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

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

const CourseModel = mongoose.model('courses', courseSchema)

module.exports = {
    CourseModel: CourseModel
}