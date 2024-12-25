const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lodhi'
app.use(express.json())

const { mongoose } = require('mongoose')
mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/Course-Selling-Application')
const { UserModel, AdminModel, CourseModel, PurchaseModel } = require('./schema/schema')

const bcrypt = require('bcrypt')


app.post('/signup', async (req, res) => {

    const { username, email, password } = req.body

    try {

        const hashedPassword = await bcrypt.hash(password, 5)

        const createUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })

        res.json({
            username,
            message: 'User signed-up successfully.'
        })

    } catch (error) {

        res.json({
            message: 'Error during sign-up process.'
        })

    }
})

app.post('/signin', async (req, res) => {

    const { username, email, password } = req.body

    try {

        const doesUserExist = await UserModel.findOne({
            $or: [
                { email },
                { username }
            ], // Check for either email or username
        })

        if (!doesUserExist) {
            return res.status(404).json({
                message: 'User does not exist in our database.',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, doesUserExist.password)

        if (isPasswordMatched) {

            const token = jwt.sign({
                id: doesUserExist._id
            }, JWT_SECRET)

            res.status(200).json({
                token,
                message: 'User signed-in successfully.'
            })

        } else {

            return res.status(401).json({
                message: 'Invalid Credentials'
            })

        }

    } catch (error) {

        res.status(500).json({
            message: 'Unable to proceed sign-in request.'
        })

    }
})






app.listen(3000, () => {
    console.log('Sever Restarted \n')
})