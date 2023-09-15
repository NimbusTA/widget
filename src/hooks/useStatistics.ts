import getConfig from 'next/config';
import { useQuery, UseQueryResult } from 'react-query';

import { commonQuerySettings } from 'config';

const { publicRuntimeConfig } = getConfig();
const { basePath } = publicRuntimeConfig;

export type Statistics = {
  APRPerMonth: number;
  estimatedAPY: number;

  priceRelay: number;
  pricePara: number;

  stakers: number;

  totalStaked: {
    token: number;
    usd: number;
  };
  totalRewards: number;
};

export const statsRequest = async (): Promise<Statistics> => {
  const response = await fetch(`${basePath}/api/stats`);

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

export const useStatistics = (): UseQueryResult<Statistics, Error> =>
  useQuery('STATS', () => statsRequest(), commonQuerySettings);
