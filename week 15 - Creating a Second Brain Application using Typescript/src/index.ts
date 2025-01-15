import express from 'express';
import mongoose from 'mongoose';
import { appRouter } from './routes';
import { config } from './config';

const app = express();
app.use(express.json());

const { PORT, MONGO_URI } = config;

// ---------------------------------------------------------->

app.use('/api/v1', appRouter);

// ---------------------------------------------------------->

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    console.log('Server Restarted \n');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
});
