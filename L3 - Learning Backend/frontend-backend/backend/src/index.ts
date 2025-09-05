require('dotenv').config()
import express from 'express'

const app = express()

// Sample jokes data
const jokes = [
    {
        id: 1,
        setup: "Why don't scientists trust atoms?",
        punchline: "Because they make up everything!"
    },
    {
        id: 2,
        setup: "What do you call a fake noodle?",
        punchline: "An impasta!"
    },
    {
        id: 3,
        setup: "Why did the scarecrow win an award?",
        punchline: "He was outstanding in his field!"
    },
    {
        id: 4,
        setup: "What do you call a bear with no teeth?",
        punchline: "A gummy bear!"
    },
    {
        id: 5,
        setup: "Why don't eggs tell jokes?",
        punchline: "They'd crack each other up!"
    }
]

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Jokes endpoint - returns all jokes
app.get('/api/jokes', (req, res) => {
    res.json({
        success: true,
        count: jokes.length,
        data: jokes
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})