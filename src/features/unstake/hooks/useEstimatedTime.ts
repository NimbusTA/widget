import { useSDK } from '@lido-sdk/react';
import ms from 'ms';
import { useEffect } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

import warning from 'tiny-warning';

import { basePath, commonQuerySettings, getTokenAddress, TOKENS } from 'config';
import { getLiquidContract } from 'contracts';

export const etaRequest = async (account?: string): Promise<number> => {
  if (!account) throw new Error('Invalid account');

  const response = await fetch(`${basePath}/api/eta?account=${account}`);

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

export const useEstimatedTime = (): UseQueryResult<number, Error> => {
  const { account, providerWeb3 } = useSDK();

  const result = useQuery<number, Error>(
    `ETA-${account}`,
    () => etaRequest(account),
    {
      ...commonQuerySettings,
      cacheTime: 0,
      refetchInterval: ms('2h'),
      refetchIntervalInBackground: true,
    },
  );

  const liquidAddress = getTokenAddress(TOKENS.liquidToken);
  const liquidContractWeb3 = providerWeb3
    ? getLiquidContract(liquidAddress, providerWeb3)
    : null;

  useEffect(() => {
    if (!providerWeb3 || !liquidContractWeb3) return;

    const redeemEvent = liquidContractWeb3.filters.Redeemed(account);

    try {
      providerWeb3.on(redeemEvent, result.refetch);
    } catch (error) {
      warning(false, 'Cannot subscribe to events');
    }

    return () => {
      providerWeb3.off(redeemEvent, result.refetch);
    };
  }, [providerWeb3, liquidContractWeb3, account, result.refetch]);

  return result;
};
