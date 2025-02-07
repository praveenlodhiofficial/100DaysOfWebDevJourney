import express from 'express'

const app = express()
app.use(express.json())

// --------------------------------------------->

app.get('/signup', async(req, res) => {
    console.log('signup of http-server')
})

app.get('/signin', async(req, res) => {
    console.log('signin of http-server')
})

app.get('/chat', async(req, res) => {
    console.log('chat of http-server')
})

// --------------------------------------------->

app.listen(3001, async() => {
    console.log('http-server running on port 3001')
})