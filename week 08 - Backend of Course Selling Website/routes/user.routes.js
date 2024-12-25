require('dotenv').config();  // Make sure dotenv is imported first to load environment variables
const { authTokenExpiry, userJwtSecret} = require('../config');

const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');


const bcrypt = require('bcrypt');
const { UserModel } = require('../schema/user.schema');

// -----------------------> User Routes Endpoints

userRouter.post('/signup', async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await UserModel.create({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ // 201 Created
            username,
            email,
            message: 'User signed-up successfully',
        });
    } catch (error) {
        res.status(500).json({ // 500 Internal Server Error
            message: 'Unable to proceed with the sign-up process.',
        });
    }
});

userRouter.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const doesUserExist = await UserModel.findOne({
            $or: [{ email }, { username }],
        });

        if (!doesUserExist) {
            return res.status(404).json({ // 404 Not Found
                message: 'User does not exist in our database.',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, doesUserExist.password);

        if (isPasswordMatched) {
            const token = jwt.sign({
                    id: doesUserExist._id,
                }, userJwtSecret, { expiresIn: authTokenExpiry } // Token expiration
            );

            res.status(200).json({ // 200 OK
                token,
                message: 'User signed-in successfully.',
            });
        } else {
            res.status(401).json({ // 401 Unauthorized
                message: 'Invalid credentials.',
            });
        }
    } catch (error) {
        res.status(500).json({ // 500 Internal Server Error
            message: 'Unable to proceed with the sign-in process.',
        });
    }
});

userRouter.post('/purchased-courses', async (req, res) => {
    res.json({
        message: 'user purchased-courses route'
    })
})

// -----------------------> User Route Exported

module.exports = {
    userRouter: userRouter
}
