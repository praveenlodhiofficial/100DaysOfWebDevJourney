import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { userModel } from './db'

const appRouter = express.Router()

const JWT_SECRET = 'user-jwt-secret'

// ----------------------------------------------------------> ROUTES

appRouter.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const createUser = userModel.create({
            username,
            email,
            password: hashedPassword,
        })

        res.json({
            createUser,
            message: 'User signup successful'
        })

    } catch (error) {

        console.error(error);
        res.json({
            message: 'Unable to proceed sign-up process.'
        })

    }
})

appRouter.post('/signin', async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const doesUserExist = await userModel.findOne({
            $or: [
                { username },
                { email },
            ],
        })

        if (!doesUserExist) {
            res.json({
                message: 'User does not exist in the Database.'
            })
        }

        if (doesUserExist && doesUserExist.password) {
            const isPasswordMatched = await bcrypt.compare(password, doesUserExist.password)

            if (isPasswordMatched) {
                const token = jwt.sign({
                    id: doesUserExist._id
                }, JWT_SECRET )

                res.json({
                    token,
                    message: 'User signed-up successfully.'
                })
            }
        } else {
            res.json({
                message: 'Invalid Credentials'
            })
        }

    } catch (error) {
        console.error(error);
        res.json({
            message: 'Unable to proceed sign-up process.'
        })
    }
})

// ----------------------------------------------------------> EXPORT ROUTES

export {
    appRouter,
}