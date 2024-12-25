const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const { authMiddleware, JWT_SECRET } = require('./authMiddleware')

const { z } = require('zod')
const { signupSchema, signinSchema, todoSchema } = require('./zodSchemaValidation')

const bcrypt = require('bcrypt')
app.use(express.json())

const { mongoose } = require('mongoose')
const { UserModel, TodoModel } = require('./db')
mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/test-Todos')


app.post('/signup', async (req, res) => {

    signupSchema.parse(req.body)
    const { name, email, password } = req.body

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        res.json({
            name: name,
            message: 'User sign-up successfully'
        })

    } catch (error) {

        console.error(error)
        res.json({
            message: error.errors ? error.error[0].message: 'Error during Signup. Do not use same email twice.'
        })
    }
})

app.post('/signin', async (req, res) => {

    signinSchema.parse(req.body)
    const { email, password } = req.body;

    try {

        const doesUserExist = await UserModel.findOne({
            email: email
        })

        if (!doesUserExist) {
            res.json({
                message: 'User does not exist in our Database.'
            })
        }

        const matchPassword = await bcrypt.compare(password, doesUserExist.password)

        if (matchPassword) {
            const token = jwt.sign({
                id: doesUserExist._id
            }, JWT_SECRET)

            res.json({
                token: token,
                message: 'User signed-in successfully'
            })

        } else {

            console.error(error)
            res.json({
                message: error.errors ? error.error[0].message: 'Invalid Credentials'
            })

        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed sign-up process.'
        })
    }
})

app.post('/post-todo', authMiddleware, async (req, res) => {

    todoSchema.parse(req.body)
    const { title, description, isDone } = req.body;

    try {

        const UserDetails = req.DecodedData;

        const createTodo = await TodoModel.create({
            title: title,
            description: description,
            isDone: isDone,
            UserId: UserDetails.id
        })

        res.json({
            createTodo: createTodo,
            message: 'Todo created successfully'
        })

    } catch (error) {

        console.error(error)
        res.json({
            message: error.errors ? error.error[0].message: 'Unable to proceed todo creation process.'
        })

    }
})

app.get('/get-todos', authMiddleware, async (req, res) => {

    try {

        const allUserData = req.DecodedData.id

        const getTodos = await TodoModel.find({
            UserId: allUserData
        })

        res.json({
            getTodos,
            message: 'All todos fetched successfully.'
        })

    } catch (error) {

        console.error(error)
        res.json({
            error: error.message,
            message: 'Unable to fetch todos.'
        })

    }
})


app.listen(3000, () => {
    console.log('Server Restarted \n')
})