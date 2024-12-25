const express = require('express');
const app = express();
app.use(express.json())

const { serverPort, mongoURI } = require('./config');
require('dotenv').config();

const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.routes');
const { adminRouter } = require('./routes/admin.routes');
const { courseRouter } = require('./routes/course.routes');

// -----------------------> Routes

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/courses', courseRouter)

// -----------------------> Server Listening

app.listen(serverPort, async () => {
    await mongoose.connect(mongoURI)
    console.log('Course-Selling-Application connected with Compass')
    console.log('Server Restarted \n')
})
