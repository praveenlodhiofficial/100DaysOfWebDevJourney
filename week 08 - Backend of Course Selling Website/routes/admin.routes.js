const { Router } = require('express')
const adminRouter = Router()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const { AdminModel } = require('../schema/admin.schema')

// -----------------------> Admin Routes Endpoints

adminRouter.post('/signup', async(req, res) => {

    const { username, firstname, lastname, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const createAdmin = await AdminModel.create({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        res.json({
            username,
            email,
            message: 'Admin signed-up successfully'
        })

    } catch (error) {

        res.json({
            message: 'Unable to proceed admin-sign-up process'
        })

    }
})

adminRouter.post('/signin', async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const doesAdminExist = await AdminModel.findOne({
            $or: [{ email }, { username }]
        })

        if (!doesAdminExist) {
            res.json({
                message: 'Admin does not exist in our Database.'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, doesAdminExist.password)

        if (isPasswordMatched) {

            const token = jwt.sign({
                id: doesAdminExist._id
            }, process.env.JWT_ADMIN_SECRET)

            res.json({
                token,
                message: 'User signed-in successfully.'
            })

        } else {

            res.json({
                message: 'Invalid Credentials'
            })

        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed admin-sign-in process.'
        })

    }
})

adminRouter.post('/create-courses', (req, res) => {
    res.json ({
        message: 'admin create-courses route'
    })
})

adminRouter.post('/update-courses', (req, res) => {
    res.json ({
        message: 'admin update-courses route'
    })
})

adminRouter.get('/courses/bulk', (req, res) => {
    res.json ({
        message: 'admin get-all-courses route'
    })
})

// -----------------------> Admin Route Exported

module.exports = {
    adminRouter: adminRouter
}