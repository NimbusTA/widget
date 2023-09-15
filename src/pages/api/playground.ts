import fp from 'lodash/fp';
import { NextApiHandler } from 'next';
import getConfig from 'next/config';
import NodeCache from 'node-cache';

import {
  getDataFromPlaygroundResponse,
  PlaygroundResponse,
} from 'features/playground/utils';

const { serverRuntimeConfig } = getConfig();
const { playgroundServiceUrl } = serverRuntimeConfig;

const TIMEOUT = 20000;

const ttl = 60 * 20; // in seconds
const cacheKey = 'playground';
const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: ttl / 3,
  useClones: false,
});

const getFromQuery = (queryParam?: string | string[]): string | undefined =>
  Array.isArray(queryParam) ? fp.first(queryParam) : queryParam;

const handler: NextApiHandler = async (req, res) => {
  const { frequency, amount } = req.query;

  const frequencyParam = getFromQuery(frequency);
  const amountParam = getFromQuery(amount);

  if (!frequencyParam || !amountParam) {
    res.status(400).send('No required parameters.');
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(playgroundServiceUrl, {
      signal: controller.signal,
    });

    if (!response.ok) {
      const cachedData: PlaygroundResponse | undefined = cache.get(cacheKey);
      if (cachedData) {
        res
          .status(304)
          .json(
            getDataFromPlaygroundResponse(
              frequencyParam,
              amountParam,
              cachedData,
            ),
          );
        return;
      }

      const errorMessage = await response.text();
      res.status(response.status).send(errorMessage);
      return;
    }

    const projectsData: PlaygroundResponse = await response.json();
    const parsedProjectsData = getDataFromPlaygroundResponse(
      frequencyParam,
      amountParam,
      projectsData,
    );

    res.status(200).send(parsedProjectsData);
    cache.set(cacheKey, projectsData);
  } catch (e) {
    const cachedData: PlaygroundResponse | undefined = cache.get(cacheKey);
    if (cachedData) {
      res
        .status(304)
        .json(
          getDataFromPlaygroundResponse(
            frequencyParam,
            amountParam,
            cachedData,
          ),
        );
      return;
    }

    res.status(500).send('Something went wrong');
  }

  clearTimeout(timeoutId);
};

export default handler;
