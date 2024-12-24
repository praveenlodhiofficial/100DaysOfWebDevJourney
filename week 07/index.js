const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const { authMiddleware, JWT_SECRET } = require('./authMiddleware');

const bcrypt = require('bcrypt');
app.use(express.json());

const mongoose = require('mongoose');
const { UserModel, TodoModel } = require('./db');
const { signupSchema, signinSchema, todoSchema } = require('./zodSchemaValidation');

mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/praveen-todos');

/* --------------------------------------------------- ENDPOINTS -------------------------------------------------------------- */

// Signup endpoint
app.post('/signup', async (req, res) => {

    try {
        // Validate request body
        signupSchema.parse(req.body);

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 6);

        await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User signed-up successfully',
        });

    } catch (error) {

        console.error(error);
        res.status(400).json({
            message: error.errors ? error.errors[0].message : 'Unable to sign up',
        });
        
    }
});

// Signin endpoint
app.post('/signin', async (req, res) => {
    try {
        // Validate request body
        signinSchema.parse(req.body);

        const { email, password } = req.body;

        const doesUserExist = await UserModel.findOne({ email });

        if (!doesUserExist) {
            return res.status(404).json({
                message: 'User does not exist in the database.',
            });
        }

        const matchPassword = await bcrypt.compare(password, doesUserExist.password);

        if (matchPassword) {
            const token = jwt.sign({ id: doesUserExist._id }, JWT_SECRET);

            res.json({
                token,
                message: 'User signed-in successfully.',
            });
        } else {
            res.status(401).json({
                message: 'Invalid credentials',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.errors ? error.errors[0].message : 'An error occurred',
        });
    }
});

// Todo creation endpoint
app.post('/post-todo', authMiddleware, async (req, res) => {
    try {
        // Validate request body
        todoSchema.parse(req.body);

        const { title, description, isDone } = req.body;
        const UserDetails = req.DecodedData;

        const createTodo = await TodoModel.create({
            title,
            description,
            isDone,
            UserId: UserDetails.id,
        });

        res.status(201).json({
            createTodo,
            message: 'Todo successfully added',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.errors ? error.errors[0].message : 'Unable to create todo',
        });
    }
});

// Get todos endpoint
app.get('/get-todos', authMiddleware, async (req, res) => {
    try {
        const userId = req.DecodedData.id;
        const todos = await TodoModel.find({ UserId: userId });

        res.status(200).json({
            message: 'Todos fetched successfully.',
            todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching todos.',
            error: error.message,
        });
    }
});


/* ----------------------------------------------- SERVER LISTENING ------------------------------------------------------------ */

app.listen(3000, () => {
    console.log('Server Restarted \n');
});
