import express from 'express'
import { metricsMiddleware, getMetrics, getMetricsContentType } from '@/metrics';

const app = express();
app.use(metricsMiddleware);

app.get("/cpu", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    res.json({
        message: "CPU is working"
    })
})

app.get("/users", (req, res) => {
    res.json({
        message: "Users are working"
    })
})

app.get("/metrics", async (req, res) => {
    const metrics = await getMetrics();
    console.log(getMetricsContentType());
    res.setHeader('Content-Type', getMetricsContentType());
    res.send(metrics);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})