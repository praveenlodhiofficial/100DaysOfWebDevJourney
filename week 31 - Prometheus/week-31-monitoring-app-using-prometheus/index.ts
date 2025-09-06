import express from 'express'
import { middleware } from './middleware';

const app = express();
app.use(middleware);

app.get("/cpu", (req, res) => {
    for (let i=0; i<1000000000; i++) {
        Math.random();
    }
    res.json({
        message: "CPU is working"
    })
})

app.get("/users", (req, res) => {
    res.json({
        message: "Users are working"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})