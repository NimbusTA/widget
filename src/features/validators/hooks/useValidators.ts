import { useQuery, UseQueryResult } from 'react-query';

import { commonQuerySettings, basePath } from 'config';

export type ValidatorsInfo = {
  active_stake: number;
  ledger: string;
  stash: string;
  validators: string[];
};

export type ValidatorsResponse = UseQueryResult<ValidatorsInfo[], Error>;

export const validatorsRequest = async (): Promise<ValidatorsInfo[]> => {
  const response = await fetch(`${basePath}/api/validators`);

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

export const useValidators = (): ValidatorsResponse =>
  useQuery('VALIDATORS', () => validatorsRequest(), commonQuerySettings);
