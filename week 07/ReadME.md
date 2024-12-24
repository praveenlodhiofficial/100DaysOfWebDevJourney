## Normal Implementation for Todo Application

```
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

function authMiddleware(req, res, next) {

    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'User Unauthorized'
                })
            } else {
                req.DecodedData = decoded
                next()
            }
        })
    } else {
        res.status(401).json({
            message: 'User Unauthorized'
        })
    }
}

app.post('/post-todo', authMiddleware, async (req, res) => {

    const { title, description, isDone } = req.body;

    const UserDetails = req.DecodedData;

    // Create the new todo
    const todo = await TodoModel.create({
        title,
        description,
        UserId: UserDetails.id,
        isDone
    });

    res.status(201).json({
        message: 'Todo created successfully.',
        todo
    });
});

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
```


## Database Schema

```
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema ({
    name: String,
    password: String,
    email: {
        unique: true,
        type: String
    }
})

const Todo = new Schema ({
    title: String,
    description: String,
    UserId: ObjectId,
    isDone: Boolean
})

const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}
```

## Implemented Auth Middleware for different Endpoints in Stack

```
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lodhi'

function authMiddleware(req, res, next) {

    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'User Unauthorized'
                })
            } else {
                req.DecodedData = decoded
                next()
            }
        })
    } else {
        res.status(401).json({
            message: 'User Unauthorized'
        })
    }
}

module.exports = { authMiddleware, JWT_SECRET };
```

## Using Bcrypt Package for Password Hashing

- Sign-up Endpoint
    ```
    app.post('/signup', async (req, res) => {

        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const fixedPassword = await bcrypt.hash(password, 4)

        const user = await UserModel.create({
            name: name,
            email: email,
            password: fixedPassword
        })

        res.status(200).json({
            message: 'User signed-up successfully.'
        })
    })
    ```

- Sign-in Endpoint
    ```
    app.post('/signin', async (req, res) => {
        const { email, password } = req.body;

        const doesUserExist = await UserModel.findOne({ email });

        if (!doesUserExist) {
            return res.status(404).json({
                message: 'User does not exist in our Database.'
            });
        }

        const passwordMatch = await bcrypt.compare(password, doesUserExist.password);

        if (passwordMatch) {
            const token = jwt.sign(
                { id: doesUserExist._id },
                JWT_SECRET
            );

            return res.status(200).json({
                email,
                token,
                message: 'User signed-in successfully.'
            });
        } else {
            return res.status(403).json({
                message: 'Incorrect Credentials'
            });
        }
    });
    ```