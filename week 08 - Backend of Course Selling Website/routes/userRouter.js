const { Router } = require('express')
const userRouter = Router()

// -----------------------> User Routes Endpoints

userRouter.post('/signup', (req, res) => {
    res.json ({
        message: 'user sign-up route'
    })
})

userRouter.post('/signin', (req, res) => {
    res.json ({
        message: 'user sign-in route'
    })
})

userRouter.post('/purchased-courses', (req, res) => {
    res.json ({
        message: 'user purchased-courses route'
    })
})

// -----------------------> User Route Exported

module.exports = {
    userRouter: userRouter
}
