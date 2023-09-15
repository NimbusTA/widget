import { API } from '@lidofinance/next-api-wrapper';
import { wrapRequest } from '@lidofinance/next-api-wrapper';
import NodeCache from 'node-cache';

import { rateLimit, responseTimeMetric } from 'utilsApi';
import cacheWrapper from 'utilsApi/cacheWrapper';
import Metrics from 'utilsApi/metrics';

import { DEFAULT_API_ERROR_MESSAGE, defiServiceUrl } from 'config';
import { mapProjectTypeToUi, DeFiListResponse } from 'features/defi/utils';

const TIMEOUT = 5000;

const ttl = 14400; // 4h in seconds
const cacheKey = 'defi-projects';
const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: ttl / 3,
  useClones: false,
});

const handler: API = async (req, res) => {
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    res.json(cachedData);
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(defiServiceUrl, {
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      res.status(response.status).send(errorMessage);
      return;
    }

    const projectsData: DeFiListResponse = await response.json();
    const parsedProjectsData = projectsData.data.projects.map((project) =>
      mapProjectTypeToUi(project),
    );

    res.status(200).send(parsedProjectsData);

    cache.set(cacheKey, parsedProjectsData);
  } catch (e) {
    res.status(500).send(DEFAULT_API_ERROR_MESSAGE);
  }
  clearTimeout(timeoutId);
};

const cacheOptions = {
  public: true,
  'max-age': 3600, // 1h in seconds
  'stale-if-error': 3600, // 1h in seconds
  'stale-while-revalidate': 30,
};

export default wrapRequest([
  rateLimit,
  responseTimeMetric(Metrics.request.apiTimings, '/api/defi'),
  cacheWrapper({
    cacheHeaders: cacheOptions,
  }),
])(handler);
