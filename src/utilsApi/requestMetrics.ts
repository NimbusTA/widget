import { Counter, Histogram, Registry } from 'prom-client';

import { METRICS_PREFIX, METRIC_NAMES } from 'config';

export class RequestMetrics {
  apiTimings: Histogram<'hostname' | 'route' | 'entity' | 'status'>;
  apiTimingsExternal: Histogram<'hostname' | 'route' | 'entity' | 'status'>;
  requestCounter: Counter<'route'>;

  constructor(public registry: Registry) {
    this.apiTimings = this.apiTimingsInit('internal');
    this.apiTimingsExternal = this.apiTimingsInit('external');
    this.requestCounter = this.requestsCounterInit();
  }

  apiTimingsInit(
    postfix: string,
  ): Histogram<'hostname' | 'route' | 'entity' | 'status'> {
    const postfixWithDash = postfix ? `_${postfix}` : '';
    const apiResponseName =
      METRICS_PREFIX + METRIC_NAMES.API_RESPONSE + postfixWithDash;

    return new Histogram({
      name: apiResponseName,
      help: 'API response time',
      labelNames: ['hostname', 'route', 'entity', 'status'],
      buckets: [0.1, 0.2, 0.3, 0.6, 1, 1.5, 2, 5],
      registers: [this.registry],
    });
  }

  requestsCounterInit(): Counter<'route' | 'entity'> {
    const requestsCounterName = METRICS_PREFIX + METRIC_NAMES.REQUESTS_TOTAL;

    return new Counter({
      name: requestsCounterName,
      help: 'Total number of requests for each valid route',
      labelNames: ['route', 'entity'],
      registers: [this.registry],
    });
  }
}
