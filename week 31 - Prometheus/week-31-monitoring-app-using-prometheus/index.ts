import express from 'express'
import type { Request, Response, NextFunction } from 'express';
import promClient from 'prom-client';

// Counter to track the number of requests
const requestCounter = new promClient.Counter({
    name: 'request_count',
    help: 'Total number of requests',
    labelNames: ['method', 'route', 'status']
});

// Middleware to calculate performance metrics
function middleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        requestCounter.inc({
            method: req.method,
            route: req.url,
            status: res.statusCode
        });

        console.log(`----------------------------------------------------------------`);
        console.log(`[middleware] ${req.method} | route: ${req.url} | duration: ${duration}ms | status: ${res.statusCode}`);
    });

    next();
}

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

app.get("/metrics", async (req, res) => {
    const metrics = await promClient.register.metrics();
    console.log(promClient.register.contentType);
    res.setHeader('Content-Type', promClient.register.contentType);
    res.send(metrics);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})