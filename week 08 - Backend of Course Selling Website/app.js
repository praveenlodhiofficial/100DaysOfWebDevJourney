const express = require('express')
const app = express();
const dotenv = require('dotenv')

app.use(express.json());
dotenv.config();

const { mongoose } = require('mongoose')
const { userRouter } = require('./routes/user.routes')
const { adminRouter } = require('./routes/admin.routes')
const { courseRouter } = require('./routes/course.routes')

// -----------------------> Routes

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)

// -----------------------> Server Listening

app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Course-Selling-Application connected with Compass')
    console.log('Server Restarted \n')
})
