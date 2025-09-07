import promClient from 'prom-client';

export const requestCounter = new promClient.Counter({
    name: 'request_count',
    help: 'Total number of requests',
    labelNames: ['method', 'route', 'status']
});


