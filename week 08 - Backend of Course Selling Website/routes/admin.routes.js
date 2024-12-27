const express = require('express');
const adminRouter = express.Router();
const { AdminModel, CourseModel } = require('../schema/schema');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ADMIN_JWT_SECRET } = require('../config');
const { adminAuthMiddleware } = require('../middleware/admin.middlewares');

// ------------------------------------------------------------>

// Admin Sign-up
adminRouter.post('/signup', async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

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
            message: 'Admin signed up successfully.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to proceed with the sign-up process.'
        });
    }
});

// Admin Sign-in
adminRouter.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const doesAdminExist = await AdminModel.findOne({
            $or: [
                { email },
                { username },
            ]
        });

        if (!doesAdminExist) {
            return res.status(404).json({
                message: 'Admin does not exist in our database.'
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, doesAdminExist.password);

        if (isPasswordMatched) {
            const token = jwt.sign({ id: doesAdminExist._id }, ADMIN_JWT_SECRET);

            return res.status(200).json({
                token,
                message: 'Admin signed in successfully.'
            });
        } else {
            return res.status(401).json({
                message: 'Invalid password.'
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to proceed with the sign-in process.'
        });
    }
});

// Create courses
adminRouter.post('/create-courses', adminAuthMiddleware, async (req, res) => {
    const { title, description, price, imageURL } = req.body;

    try {
        const adminDetails = req.adminDetails;

        const createCourse = await CourseModel.create({
            title,
            description,
            price,
            imageURL,
            createdBy: adminDetails.id
        });

        res.status(201).json({
            courseId: createCourse._id,
            createCourse,
            message: 'New course created successfully.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to proceed with the create courses process.'
        });
    }
});

// Update courses
adminRouter.put('/update-courses', adminAuthMiddleware, async (req, res) => {
    const adminDetails = req.adminDetails;
    const { title, description, price, imageURL, courseId } = req.body;

    try {
        const updateCourse = await CourseModel.updateOne(
            {
                _id: courseId,
                // createdBy: adminDetails.id              // here we make sure to update course it must belong to right admin
            },
            { title, description, price, imageURL }
        );

        if (updateCourse.nModified === 0) {
            return res.status(404).json({
                message: 'Course not found or no changes made.'
            });
        }

        res.status(200).json({
            courseId,
            message: 'Course updated successfully.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to proceed with the update courses process.'
        });
    }
});

// Fetch all courses
adminRouter.get('/courses/bulk', adminAuthMiddleware, async (req, res) => {
    const adminDetails = req.adminDetails;

    try {
        // Fetching all courses created by the admin
        const allCourses = await CourseModel.find({ createdBy: adminDetails.id });

        // Check if any courses were found
        if (allCourses.length === 0) {
            return res.status(404).json({
                message: 'No courses found for this admin.'
            });
        }

        res.status(200).json({
            allCourses,
            message: 'All courses fetched successfully.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to fetch courses at this time.'
        });
    }
});


// ------------------------------------------------------------>

module.exports = {
    adminRouter
};
