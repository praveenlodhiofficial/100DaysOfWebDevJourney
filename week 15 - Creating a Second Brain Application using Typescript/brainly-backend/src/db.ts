import mongoose, { Document, Schema } from "mongoose";

// ---------------------------------------------------------->

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

})

const contentSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag',
        // required: true
    }],
    id: {
        type: Schema.Types.ObjectId
    },
    link: {
        type: String
    },
    type: {
        type: String,
        enum: ['video', 'images', 'articles']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        // required: true
    },

})

const tagsSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    id: {
        type: Schema.Types.ObjectId
    },

})

const linkSchema = new Schema({

    hash: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

})

// ---------------------------------------------------------->

const userModel = mongoose.model('users', userSchema)
const contentModel = mongoose.model('contents', contentSchema)
const tagsModel = mongoose.model('tags', tagsSchema)
const linkModel = mongoose.model('links', linkSchema)

// ---------------------------------------------------------->

export { userModel, contentModel, tagsModel, linkModel }