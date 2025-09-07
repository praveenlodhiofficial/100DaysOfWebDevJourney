import type { Request, Response, NextFunction } from 'express';
import promClient from 'prom-client';
import { activeRequestsGauge } from '@/metrics/activeRequests';
import { requestCounter } from '@/metrics/requestCount';
import { httpRequestsDurationinMicrosecondsHistogram } from '@/metrics/requestTime';

// Middleware to calculate performance metrics
export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    // Increment active requests when request starts
    activeRequestsGauge.inc();

    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.url,
            status: res.statusCode
        });

        console.log(`----------------------------------------------------------------`);
        console.log(`[middleware] ${req.method} | route: ${req.url} | duration: ${duration}ms | status: ${res.statusCode}`);

        // Decrement active requests when request finishes
        activeRequestsGauge.dec();

        // Record the duration of the request
        httpRequestsDurationinMicrosecondsHistogram.observe({
            method: req.method,
            route: req.url,
            status: res.statusCode
        }, duration);
    });

    next();
}

// Function to get metrics
export async function getMetrics() {
    return await promClient.register.metrics();
}

// Function to get content type
export function getMetricsContentType() {
    return promClient.register.contentType;
}