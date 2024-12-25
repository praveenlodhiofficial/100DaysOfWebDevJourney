const express = require('express')
const app = express();

const { userRoute } = require('./routes/userRoute')
const { adminRoute } = require('./routes/adminRoute')
const { courseRoute } = require('./routes/courseRoute')

const { mongoose } = require('mongoose')

app.use(express.json());


app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/courses', courseRoute)


app.listen(3000, () => {
    message: 'Server Restarted'
})
