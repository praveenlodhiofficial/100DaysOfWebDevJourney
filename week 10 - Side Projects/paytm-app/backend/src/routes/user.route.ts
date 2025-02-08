import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const appRouter = express.Router()
const JWT_SECRET = 'praveen'

import { UserModel } from '../schema/db'

// ------------------------------------>

appRouter.post('/signup', async (req, res) => {
    const { username, firstname, lastname, password } = req.body

    try {

        const doesUserExist = await UserModel.findOne ({
            username: username
        })

        if (!doesUserExist) {

            const hashedPassword = await bcrypt.hash(password, 5)

            const createUser = await UserModel.create({
                username,
                firstname,
                lastname,
                password: hashedPassword
            })

            res.json({
                message: 'User Signed In',
                createUser
            })

        } else {

            res.json({
                message: 'User with same username already exist',
            })

        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed Signup request',
        })

    }
})

appRouter.post('/signin', async (req, res) => {

    try {
        const { username, password } = req.body

        const doesUserExist = await UserModel.findOne({
            username: username
        })

        if (!doesUserExist) {
            res.json({
                message: 'User does not found in the database.'
            })
        }

        if (doesUserExist && doesUserExist.password) {
            const isPasswordValid = await bcrypt.compare(password, doesUserExist.password)

            if (isPasswordValid) {
                const token = jwt.sign({
                    id: doesUserExist._id
                }, JWT_SECRET)

                res.json({
                    message: 'User signed in',
                    username,
                    token,
                })
            }
        }

    } catch (error) {

        console.log(error)
        res.json({
            message: 'Unable to proceed Signin request',
        })
    }



})

// ------------------------------------>

export { appRouter }