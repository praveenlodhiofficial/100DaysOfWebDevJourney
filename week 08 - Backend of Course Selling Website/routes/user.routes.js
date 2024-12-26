const express = require('express')
const { UserModel } = require('../schema/schema')
const userRouter = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { USER_JWT_SECRET } = require('../config')
const { userAuthMiddleware } = require('../middleware/user.middlewares')

// ------------------------------------------------------------>

//sign-up
userRouter.post('/signup', async(req, res) => {
    const { username, firstname, lastname, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 5)

        const createUser = await UserModel.create({
            username, 
            firstname, 
            lastname, 
            email, 
            password: hashedPassword,
        })

        res.json ({
            username,
            email,
            message: 'User signed-up successfully.'
        })

    } catch (error) {

        console.log(error)
        res.json ({
            message: 'Unable to proceed sign-up process.'
        })
        
    }
})

//sign-in
userRouter.post('/signin', async(req, res) => {
    const { username, email, password } = req.body

    try {
        const doesUserExist = await UserModel.findOne({
            $or: [
                { email },
                { username },
            ]
        })

        if(!doesUserExist) {
            res.json({
                message: 'User does not exist in our Database'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, doesUserExist.password)

        if (isPasswordMatched) {
            const token = jwt.sign ({
                id: doesUserExist._id
            }, USER_JWT_SECRET)

            res.json ({
                token,
                message: 'User signed-up successfully.'
            })
        }

    } catch (error) {

        console.log(error)
        res.json ({
            message: 'Unable to proceed sign-in process.'
        })
        
    }
})

// ------------------------------------------------------------>

module.exports = {
    userRouter
}