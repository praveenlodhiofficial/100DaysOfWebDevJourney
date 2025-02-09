import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const appRouter = express.Router()
const JWT_SECRET = 'praveen'

import { UserModel } from '../schema/db'
import { signin, signup } from '../schema/zod'
import { authMiddleware } from '../middleware/user.middleware'

// ------------------------------------>

appRouter.post('/signup', async (req, res) => {

    // signup.parse(req.body)
    const { username, firstname, lastname, password } = req.body

    try {

        const doesUserExist = await UserModel.findOne({
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

    // signin.parse(req.body)
    const { username, password } = req.body

    try {

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

appRouter.put('/edit', authMiddleware, async (req: any, res: any) => {

    const userId = req.userId.id;
    const { firstname, lastname, password } = req.body;

    try {

        const hashedPassword = password ? await bcrypt.hash(password, 5) : undefined;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                firstname,
                lastname,
                password: hashedPassword,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({
            message: "User details updated successfully.",
            updatedUser,
        });

    } catch (error) {

        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Failed to update user details." });

    }
});


// ------------------------------------>

export { appRouter }