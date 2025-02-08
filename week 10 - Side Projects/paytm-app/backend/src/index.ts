import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import { appRouter } from './routes/user.route';

// ------------------------------------------------>

app.use('/api/v1', appRouter);

// ------------------------------------------------>

app.listen(3000, async () => {
    try {
        await mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/Paytm-App');
        console.log('\nMongoose Connected & Server Restarted\n.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});
