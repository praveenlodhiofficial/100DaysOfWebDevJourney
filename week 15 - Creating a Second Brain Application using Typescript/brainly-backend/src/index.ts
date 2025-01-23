import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app  = express()
app.use(express.json())
app.use(cors())

import { appRouter } from './routes'
import { config } from './config';

const { PORT, MONGO_URI } = config;

// ---------------------------------------------------------->

app.use('/api/v1', appRouter);

// ---------------------------------------------------------->

app.listen(PORT, async () => {
  try {
      await mongoose.connect(MONGO_URI)
      console.log('\nMongoose Connected & Server Restarted\n.')
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
})
