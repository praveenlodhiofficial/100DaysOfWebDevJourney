require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const { mongoose } = require('mongoose')
const { userRouter } = require('./routes/user.routes')
const { adminRouter } = require('./routes/admin.routes')
const { MONGO_URI, PORT } = require('./config')

// ------------------------------------------------------------>

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)

// ------------------------------------------------------------>

app.listen(PORT, async() => {
    mongoose.connect(MONGO_URI)
    console.log('MongoDB conected')
    console.log('Server Restarted \n')
})
