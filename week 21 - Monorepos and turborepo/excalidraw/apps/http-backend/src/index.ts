import express from 'express'
import { appRouter } from './routes/route';
import { PORT } from './config';

const app = express()
app.use(express.json());

// ------------------------------------------------------->

app.use('/api/v1', appRouter)

// ------------------------------------------------------->

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)  
})