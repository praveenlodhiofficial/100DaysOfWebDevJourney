const express = require('express')
const app = express();
app.use(express.json());

const { mongoose } = require('mongoose')
const { userRouter } = require('./routes/user.routes')
const { adminRouter } = require('./routes/admin.routes')
const { courseRouter } = require('./routes/course.routes')

// -----------------------> Routes

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)

// -----------------------> Server Listening

app.listen(3000, async () => {
    await mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/Course-Selling-Application')
    console.log('Course-Selling-Application connected with Compass')
    console.log('Server Restarted \n')
})
