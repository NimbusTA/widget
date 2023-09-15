import { API, wrapRequest } from '@lidofinance/next-api-wrapper';
import NodeCache from 'node-cache';

import { rateLimit, responseTimeMetric } from 'utilsApi';
import cacheWrapper from 'utilsApi/cacheWrapper';
import Metrics from 'utilsApi/metrics';

import { DEFAULT_API_ERROR_MESSAGE, statisticsUrl } from 'config';

const TIMEOUT = 5000;
const ttl = 3600; // 1h in seconds

const cacheKey = 'stats';
const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: ttl / 3,
  useClones: false,
});

const handler: API = async (req, res) => {
  if (!statisticsUrl) {
    res.status(400).send('No url for statistics service');
    return;
  }

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    res.json(cachedData);
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const requested = await fetch(statisticsUrl, {
      signal: controller.signal,
    });

    if (!requested.ok) {
      const errorMessage = await requested.text();
      res.status(requested.status).send(errorMessage);
      return;
    }

    const responded = await requested.json();

    res.status(requested.status).send(responded);

    cache.set(cacheKey, responded);
  } catch (e) {
    res.status(500).send(DEFAULT_API_ERROR_MESSAGE);
  }

  clearTimeout(timeoutId);
};

const cacheOptions = {
  public: true,
  'max-age': 1200, // 20min in seconds
  'stale-if-error': 3600, // 1h in seconds
  'stale-while-revalidate': 30,
};

export default wrapRequest([
  rateLimit,
  responseTimeMetric(Metrics.request.apiTimings, '/api/stats'),
  cacheWrapper({
    cacheHeaders: cacheOptions,
  }),
])(handler);
