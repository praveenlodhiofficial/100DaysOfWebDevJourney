import express from 'express'
const app = express()
app.use(express.json())

// ----------------------------------------->

app.get('/signup', async (req, res) => {
    res.send('signup route of http server')
})

app.get('/signin', async (req, res) => {
    res.send('signin route of http server')
})

app.get('/chat', async (req, res) => {
    res.send('chat route of http server')
})

// ----------------------------------------->

// app.listen(3000, async() => {
//     console.log('listening to http-server')
// })