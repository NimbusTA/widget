import { wrapRequest as wrapNextRequest } from '@lidofinance/next-api-wrapper';

import { metricsFactory } from '@lidofinance/next-pages';
import {
  responseTimeMetric,
  errorAndCacheDefaultWrappers,
  rateLimit,
} from 'utilsApi';

import Metrics from 'utilsApi/metrics';

const metrics = metricsFactory({
  registry: Metrics.registry,
});

export default wrapNextRequest([
  rateLimit,
  responseTimeMetric(Metrics.request.apiTimings, '/api/metrics'),
  ...errorAndCacheDefaultWrappers,
])(metrics);
