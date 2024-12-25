const { Router } = require('express');
const courseRoute = Router();


courseRoute.get('/all-courses', (req, res) => {
    res.json ({
        message: 'Course all-courses route'
    })
})

module.exports = {
    courseRoute: courseRoute
}