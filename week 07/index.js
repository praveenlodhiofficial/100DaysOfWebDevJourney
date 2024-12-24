const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const { authMiddleware, JWT_SECRET } = require('./authMiddleware')

const bcrypt = require('bcrypt')
app.use(express.json())

const mongoose = require('mongoose')
const { UserModel, TodoModel } = require('./db')
mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/praveen-todos')

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 6)

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        res.json({
            message: 'User signed-up successfully'
        })

    } catch (error) {

        console.log(error)
        res.json({
            message: 'Unable to signed-up'
        })
    }
})

app.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    const doesUserExist = await UserModel.findOne({
        email: email
    })

    if (!doesUserExist) {
        res.json({
            message: 'User does not exist in the Database.'
        })
    }

    const matchPassword = await bcrypt.compare(password, doesUserExist.password)

    if (matchPassword) {

        const token = jwt.sign({
            id: doesUserExist._id
        }, JWT_SECRET)

        res.json({
            token: token,
            message: 'User signed-in successfully.'
        })

    } else {

        res.json({
            message: 'Invalid Credentials'
        })

    }
})

app.post('/post-todo', authMiddleware, async (req, res) => {

    const { title, description, isDone } = req.body;

    const UserDetails = req.DecodedData

    const createTodo = await TodoModel.create({
        title: title,
        description: description,
        isDone: isDone,
        UserId: UserDetails.id
    })

    res.json({
        createTodo,
        message: 'Todo successfully added'
    })

})

app.get('/get-todos', authMiddleware, async (req, res) => {

    try {
        const userId = req.DecodedData.id;
        const todos = await TodoModel.find({ UserId: userId });

        res.status(200).json({
            message: 'Todos fetched successfully.',
            todos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching todos.',
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log('Server Restarted \n')
})