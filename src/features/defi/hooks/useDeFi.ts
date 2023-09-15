import ms from 'ms';
import { useQuery, UseQueryResult } from 'react-query';

import { commonQuerySettings, basePath } from 'config';
import { DeFiListElement } from 'features/defi/types';

export const deFiRequest = async (): Promise<DeFiListElement[]> => {
  const response = await fetch(`${basePath}/api/defi`);

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

export const useDeFi = (): UseQueryResult<DeFiListElement[], Error> =>
  useQuery('DEFI', () => deFiRequest(), {
    ...commonQuerySettings,
    refetchInterval: ms('1h'),
  });
