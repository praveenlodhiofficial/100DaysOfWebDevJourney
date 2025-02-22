import express from 'express'

// import { JWT_SECRET } from '@repo/backend-common/config'
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