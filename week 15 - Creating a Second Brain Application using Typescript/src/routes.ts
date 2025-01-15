import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { contentModel, userModel } from './db'
import { userAuthMiddleware } from './middleware'

const appRouter = express.Router()

const JWT_SECRET = 'user-jwt-secret'
// interface AuthenticatedRequest extends Request {
//   userDetails?: string | JwtPayload; // Add a custom field to store decoded token details
// }

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
                }, JWT_SECRET)

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

appRouter.post('/content', userAuthMiddleware, async (req: any, res: any) => {
    try {
        const userDetails = req.userDetails.id;
        const { title, tags, link, type } = req.body; 

        // Validate type field
        const validTypes = ['video', 'images', 'articles'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                error: `Invalid type. Allowed values are ${validTypes.join(', ')}.`
            });
        }

        // Create the content
        const createContent = await contentModel.create({
            title,
            tags,
            link,
            type,
            userId: userDetails,
        });

        return res.status(201).json({
            data: createContent,
            message: 'Content created successfully.'
        });

    } catch (error) {
        console.error('Error creating content:', error);
        return res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
});




// ----------------------------------------------------------> EXPORT ROUTES

export {
    appRouter,
}