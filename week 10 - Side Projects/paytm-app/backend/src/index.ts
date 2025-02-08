import express from 'express'

const app  = express()

app.use(express.json())

// ------------------------------------------------>

app.use('/signup', async (req, res) => {

})

app.use('/signin', async (req, res) => {
    
})

// ------------------------------------------------>

app.listen(3000, async() => {
    console.log('\nserver running on port 3000\n')
})