require('dotenv').config(); // Load environment variables
const { authTokenExpiry, adminJwtSecret } = require('../config');

const express = require('express');
const adminRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AdminModel } = require('../schema/admin.schema');
const { CourseModel } = require('../schema/course.schema');
const { adminAuthMiddleware } = require('../middlewares/admin.middlewares');

// -----------------------> Admin Routes Endpoints

// Admin Signup
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

        res.status(201).json({
            username,
            email,
            message: 'Admin signed up successfully',
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            message: 'Unable to proceed with admin signup process',
        });
    }
});

// Admin Signin
adminRouter.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const admin = await AdminModel.findOne({
            $or: [{ email }, { username }],
        });

        if (!admin) {
            return res.status(404).json({
                message: 'Admin does not exist in our database.',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, admin.password);

        if (isPasswordMatched) {
            const token = jwt.sign(
                { id: admin._id },
                adminJwtSecret,
                { expiresIn: authTokenExpiry }
            );

            res.status(200).json({
                token,
                message: 'Admin signed in successfully.',
            });
        } else {
            res.status(401).json({
                message: 'Invalid credentials.',
            });
        }
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            message: 'Unable to proceed with admin signin process.',
        });
    }
});

// Create Courses
adminRouter.post('/create-courses', adminAuthMiddleware, async (req, res) => {
    const { title, description, price, imageURL } = req.body;

    try {
        const adminID = req.DecodedData.id;

        const newCourse = await CourseModel.create({
            title,
            description,
            price,
            imageURL,
            createdBy: adminID,
        });

        res.status(201).json({
            course: newCourse,
            courseId: newCourse._id,
            message: 'Course created successfully',
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({
            message: 'Unable to proceed with create-courses request',
        });
    }
});

// Update Courses
adminRouter.post('/update-courses', adminAuthMiddleware, async (req, res) => {
    const { title, description, price, imageURL, courseId } = req.body;

    try {
        const adminID = req.DecodedData.id;

        const updateResult = await CourseModel.updateOne(
            { _id: courseId },
            { title, description, price, imageURL, createdBy: adminID }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                message: 'Course not found or no changes made.',
            });
        }

        res.status(200).json({
            message: 'Course updated successfully',
        });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({
            message: 'Unable to proceed with update-courses process',
        });
    }
});

// Get All Courses (Example Placeholder)
adminRouter.get('/courses/bulk', async (req, res) => {
    try {
        const courses = await CourseModel.find({});
        res.status(200).json({
            courses,
            message: 'Courses retrieved successfully',
        });
    } catch (error) {
        console.error('Get all courses error:', error);
        res.status(500).json({
            message: 'Unable to retrieve courses',
        });
    }
});

// -----------------------> Admin Route Exported

module.exports = {
    adminRouter,
};
