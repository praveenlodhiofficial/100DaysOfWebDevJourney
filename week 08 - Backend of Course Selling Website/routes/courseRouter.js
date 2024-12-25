const { Router } = require('express');
const courseRouter = Router();

// -----------------------> Course Routes Endpoints

courseRouter.get('/all-courses', (req, res) => {
    res.json ({
        message: 'Course all-courses route'
    })
})

// -----------------------> Course Route Exported

module.exports = {
    courseRouter: courseRouter
}