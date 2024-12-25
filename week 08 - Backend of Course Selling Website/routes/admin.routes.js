require('dotenv').config();  // Make sure dotenv is imported first to load environment variables
const { authTokenExpiry, adminJwtSecret } = require('../config');

const express = require('express');
const adminRouter = express.Router();
const jwt = require('jsonwebtoken');


const bcrypt = require('bcrypt');
const { AdminModel } = require('../schema/admin.schema');

// -----------------------> Admin Routes Endpoints

adminRouter.post('/signup', async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const createAdmin = await AdminModel.create({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ // 201 Created
            username,
            email,
            message: 'Admin signed-up successfully',
        });
    } catch (error) {
        res.status(500).json({ // 500 Internal Server Error
            message: 'Unable to proceed with admin sign-up process',
        });
    }
});

adminRouter.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const doesAdminExist = await AdminModel.findOne({
            $or: [{ email }, { username }],
        });

        if (!doesAdminExist) {
            return res.status(404).json({ // 404 Not Found
                message: 'Admin does not exist in our database.',
            });
        }

        //try cookie based authentication in future
        const isPasswordMatched = await bcrypt.compare(password, doesAdminExist.password);

        if (isPasswordMatched) {
            const token = jwt.sign({
                id: doesAdminExist._id,
            }, adminJwtSecret, { expiresIn: authTokenExpiry } // Token expiration
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
            message: 'Unable to proceed with admin sign-in process.',
        });
    }
});

adminRouter.post('/create-courses', (req, res) => {
    res.status(200).json({
        message: 'admin create-courses route',
    });
});

adminRouter.post('/update-courses', (req, res) => {
    res.status(200).json({
        message: 'admin update-courses route',
    });
});

adminRouter.get('/courses/bulk', (req, res) => {
    res.status(200).json({
        message: 'admin get-all-courses route',
    });
});

// -----------------------> Admin Route Exported

module.exports = {
    adminRouter: adminRouter
};
