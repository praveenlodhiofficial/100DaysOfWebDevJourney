import promClient from 'prom-client';

export const httpRequestsDurationinMicrosecondsHistogram = new promClient.Histogram({
    name: 'http_requests_duration_in_microseconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.5, 1, 2.5, 5, 10]
})