const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lodhi'

const { mongoose } = require('mongoose')
const { UserModel, TodoModel } = require('./db')
mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/praveen-todos')

app.use(express.json())

app.post('/signup', async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    const user = await UserModel.create({
        name: name,
        email: email,
        password: password
    })

    res.status(200).json({
        message: 'User signed-up successfully.'
    })
})

app.post('/signin', async (req, res) => {

    const password = req.body.password;
    const email = req.body.email;

    const user = await UserModel.findOne({
        email,
        password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET)

        res.status(200).json({
            email,
            token,
            message: 'User signed-in successfully.'
        })
    } else {
        res.status(403).json({
            message: 'Incorrect Credentials'
        })
    }
})

app.listen(3000, () => {
    console.log('Server Restarted \n')
})