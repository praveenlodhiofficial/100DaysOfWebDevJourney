import express from 'express'
import bcrypt from 'bcrypt'
import { UserModel } from '../schema/db'
const appRouter = express.Router()

// ------------------------------------>

appRouter.post('/signup', async (req, res) => {
    const { username, firstname, lastname, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 5)

    const createUser = await UserModel.create ({
        username,
        firstname,
        lastname,
        password: hashedPassword
    })

    res.json ({
        message: 'User Signed In',
        createUser
    })
}) 

appRouter.post('/signin', async (req, res) => {
    console.log('signin route')
}) 

// ------------------------------------>

export { appRouter }