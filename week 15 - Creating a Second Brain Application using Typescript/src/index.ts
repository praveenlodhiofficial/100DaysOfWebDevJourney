import express from 'express';
import mongoose from 'mongoose';
import { appRouter } from './routes';

const app = express();
app.use(express.json())


// ---------------------------------------------------------->

app.use('/api/v1', appRouter)

// ---------------------------------------------------------->

app.listen(3000, async () => {
    mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/Second-Brain-App')
    console.log('MongoDB conected')
    console.log('Server Restarted \n')
})