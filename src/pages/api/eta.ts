import { API, wrapRequest } from '@lidofinance/next-api-wrapper';

import { rateLimit, responseTimeMetric } from 'utilsApi';
import cacheWrapper from 'utilsApi/cacheWrapper';

import Metrics from 'utilsApi/metrics';

import { DEFAULT_API_ERROR_MESSAGE, estimateTimeUrl } from 'config';

const TIMEOUT = 5000;

const handler: API = async (req, res) => {
  const { account } = req.query;

  if (!estimateTimeUrl) {
    res.status(400).send('No url for estimated time service');
    return;
  }

  if (!account) {
    res.status(400).send('No required parameters.');
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const requested = await fetch(`${estimateTimeUrl}${account}`, {
      signal: controller.signal,
    });

    if (!requested.ok) {
      const errorMessage = await requested.text();
      res.status(requested.status).send(errorMessage);
      return;
    }

    const responded = await requested.json();

    // status = 0 means we have no data for user, 1 = we have estimated data
    const dataStatusCode = responded['status'];
    if (dataStatusCode === 0) {
      res.status(requested.status).send(0);
    } else if (dataStatusCode === 1) {
      const data = responded['data'];
      res.status(requested.status).send(data);
    } else {
      res.status(400).send('Status not supported.');
    }
  } catch (e) {
    res.status(500).send(DEFAULT_API_ERROR_MESSAGE);
  }

  clearTimeout(timeoutId);
};

const cacheOptions = {
  private: true,
  'max-age': 0,
};

export default wrapRequest([
  rateLimit,
  responseTimeMetric(Metrics.request.apiTimings, '/api/eta'),
  cacheWrapper({
    cacheHeaders: cacheOptions,
  }),
])(handler);
