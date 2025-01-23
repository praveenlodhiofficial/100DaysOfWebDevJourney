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
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tag',
        }
    ],
    id: {
        type: Schema.Types.ObjectId
    },
    link: {
        type: String
    },
    type: {
        type: String,
        enum: ['video', 'images', 'articles', 'youtube', 'twitter'], // Add 'youtube' and 'twitter'
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String
    }
});

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
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },

})

// ---------------------------------------------------------->

const userModel = mongoose.model('User', userSchema)
const contentModel = mongoose.model('Content', contentSchema)
const tagsModel = mongoose.model('Tag', tagsSchema)
const linkModel = mongoose.model('Link', linkSchema)

// ---------------------------------------------------------->

export { userModel, contentModel, tagsModel, linkModel }