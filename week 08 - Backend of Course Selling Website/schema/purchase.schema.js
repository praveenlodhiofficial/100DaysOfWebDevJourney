const { mongoose } = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

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

const PurchaseModel = mongoose.model('purchases', purchaseSchema)

module.exports = {
    PurchaseModel : PurchaseModel
}