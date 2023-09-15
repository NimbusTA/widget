import ms from 'ms';
import { useQuery, UseQueryResult } from 'react-query';

import { commonQuerySettings, basePath } from 'config';

import { PlaygroundData } from '../types';

export type PlaygroundRequestReturnType = {
  [p: string]: PlaygroundData[];
};

export const playgroundRequest = async (
  frequency: number,
  amount: number,
): Promise<PlaygroundRequestReturnType> => {
  const response = await fetch(
    `${basePath}/api/playground?frequency=${frequency}&amount=${amount}`,
  );

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

export const useValidatorsPlayground = ({
  frequency,
  amount,
}: {
  frequency: number;
  amount: number;
}): UseQueryResult<PlaygroundRequestReturnType, Error> =>
  useQuery(
    ['frequency', frequency, amount],
    async () => {
      // Simulating a hard work
      await delay(2000);
      return playgroundRequest(frequency, amount);
    },
    {
      ...commonQuerySettings,
      cacheTime: 0,
      refetchInterval: ms('1h'),
    },
  );
