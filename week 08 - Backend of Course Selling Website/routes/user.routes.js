const { Router } = require('express')
const userRouter = Router()

const jwt = require('jsonwebtoken')
const JWT_USER_SECRET = 'user secret'

const bcrypt = require('bcrypt')
const { UserModel } = require('../schema/user.schema')


// -----------------------> User Routes Endpoints

userRouter.post('/signup', async (req, res) => {

    const { username, firstname, lastname, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await UserModel.create({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        res.json({
            username,
            email,
            message: 'User signed-up successfully'
        })

    } catch (error) {

        res.json({
            message: 'Unable to proceed sign-up process'
        })

    }
})

userRouter.post('/signin', async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const doesUserExist = await UserModel.findOne({
            $or: [{ email }, { username }]
        })

        if (!doesUserExist) {
            res.json({
                message: 'User does not exist in our Database.'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, doesUserExist.password)

        if (isPasswordMatched) {

            const token = jwt.sign({
                id: doesUserExist._id
            }, JWT_USER_SECRET)

            res.json({
                token,
                message: 'User signed-in successfully.'
            })

        } else {

            res.json({
                message: 'Invalid Credentials'
            })

        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed sign-in process.'
        })

    }
})

userRouter.post('/purchased-courses', async (req, res) => {
    res.json({
        message: 'user purchased-courses route'
    })
})

// -----------------------> User Route Exported

module.exports = {
    userRouter: userRouter
}
