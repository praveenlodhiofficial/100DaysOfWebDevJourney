const { Router } = require('express')
const userRoute = Router()

userRoute.post('/signup', (req, res) => {
    res.json ({
        message: 'user sign-up route'
    })
})

userRoute.post('/signin', (req, res) => {
    res.json ({
        message: 'user sign-in route'
    })
})

userRoute.post('/purchased-courses', (req, res) => {
    res.json ({
        message: 'user purchased-courses route'
    })
})


module.exports = {
    userRoute: userRoute
}
