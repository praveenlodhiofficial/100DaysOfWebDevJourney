const { Router } = require('express')
const adminRoute = Router()

adminRoute.post('/signup', (req, res) => {
    res.json ({
        message: 'admin sign-up route'
    })
})

adminRoute.post('/signin', (req, res) => {
    res.json ({
        message: 'admin sign-in route'
    })
})

adminRoute.post('/courses', (req, res) => {
    res.json ({
        message: 'admin courses route'
    })
})


module.exports = {
    adminRoute: adminRoute
}
