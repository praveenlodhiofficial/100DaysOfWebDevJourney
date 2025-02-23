import express from 'express'
import { appRouter } from './routes/route';

const app = express()
app.use(express.json());

const PORT = 3001

// ------------------------------------------------------->

app.use('/api/v1', appRouter)

// ------------------------------------------------------->

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)  
})