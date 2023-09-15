import { getStatusLabel } from '@lidofinance/api-metrics';
import {
  RequestWrapper,
  defaultErrorHandler as nextDefaultErrorHandler,
} from '@lidofinance/next-api-wrapper';
import { rateLimitWrapper } from '@lidofinance/next-ip-rate-limit';
import getConfig from 'next/config';
import { Histogram } from 'prom-client';

const { serverRuntimeConfig } = getConfig();
const { rateLimit: rateLimitConfig, rateLimitTimeFrame } = serverRuntimeConfig;

import defaultCacheControl from './cacheWrapper';
import { serverLogger } from './serverLogger';

export const responseTimeMetric =
  (metrics: Histogram<string>, route: string): RequestWrapper =>
  async (req, res, next) => {
    let status = '2xx';
    const endMetric = metrics.startTimer({ route });

    try {
      await next?.(req, res, next);
      status = getStatusLabel(res.statusCode);
    } catch (error) {
      status = getStatusLabel(res.statusCode);
      // throw error up the stack
      throw error;
    } finally {
      endMetric({ status });
    }
  };

export const rateLimit = rateLimitWrapper({
  rateLimit: rateLimitConfig,
  rateLimitTimeFrame,
});

export const defaultErrorHandler = nextDefaultErrorHandler({ serverLogger });

export const errorAndCacheDefaultWrappers = [
  defaultCacheControl(),
  defaultErrorHandler,
];
