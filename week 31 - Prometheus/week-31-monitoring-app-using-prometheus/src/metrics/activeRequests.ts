import promClient from 'prom-client';

export const activeRequestsGauge = new promClient.Gauge({
    name: 'active_requests',
    help: 'Number of active requests',
});

