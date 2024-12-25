const { Router } = require('express')
const adminRouter = Router()

// -----------------------> Admin Routes Endpoints

adminRouter.post('/signup', (req, res) => {
    res.json ({
        message: 'admin sign-up route'
    })
})

adminRouter.post('/signin', (req, res) => {
    res.json ({
        message: 'admin sign-in route'
    })
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