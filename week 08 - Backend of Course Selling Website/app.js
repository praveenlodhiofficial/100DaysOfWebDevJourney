const express = require('express')
const app = express();
app.use(express.json());

const { UserModel, CourseModel, AdminModel, PurchaseModel } = require('./schema/schema')

const { userRouter } = require('./routes/userRouter')
const { adminRouter } = require('./routes/adminRouter')
const { courseRouter } = require('./routes/courseRouter')

const { mongoose } = require('mongoose')
// mongoose.connect('')

// -----------------------> Routes

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/courses', courseRouter)

// -----------------------> Server Listening

app.listen(3000, () => {
    console.log('Server Restarted \n')
})
