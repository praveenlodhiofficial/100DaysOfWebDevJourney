import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(express.json())


// ---------------------------------------------------------->



// ---------------------------------------------------------->

app.listen(3000, async () => {
    mongoose.connect('mongodb+srv://praveenlodhiofficial:20204284@cluster0.6edkq.mongodb.net/Second-Brain-App')
    console.log('MongoDB conected')
    console.log('Server Restarted \n')
})