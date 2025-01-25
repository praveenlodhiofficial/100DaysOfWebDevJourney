import express from 'express';
import { appRouter } from './routes';
import { connectToDatabase } from './config/connectDb';

const app = express();
app.use(express.json());

// -------------------------------------------> ROUTES

app.use('/api/v1', appRouter)

// -------------------------------------------> START SERVER

const startServer = async () => {
  await connectToDatabase();

  app.listen(3000, () => {
    console.log("Server is running on port 3000\n");
  });
};

startServer();
