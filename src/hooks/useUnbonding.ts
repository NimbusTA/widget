import { BigNumber } from '@ethersproject/bignumber';
import { useContractSWR, SWRResponse, useSDK } from '@lido-sdk/react';

import { useCallback, useEffect } from 'react';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

import { getTokenAddress, TOKENS } from 'config';
import { getLiquidContract } from 'contracts';

export type UseUnbondingResponse = SWRResponse<
  [BigNumber, BigNumber] & { waiting: BigNumber; unbonded: BigNumber }
>;

const liquidAddress = getTokenAddress(TOKENS.liquidToken);

export const useUnbonding = (
  token: string,
  holder?: string,
): UseUnbondingResponse => {
  const { providerRpc, providerWeb3, account: sdkAccount } = useSDK();
  const mergedAccount = holder ?? sdkAccount;

  invariant(holder != null, 'Holder is required');
  invariant(token != null, 'Token is required');

  const contractRpc = getLiquidContract(token, providerRpc);
  const contractWeb3 = providerWeb3
    ? getLiquidContract(token, providerWeb3)
    : null;

  const result = useContractSWR({
    shouldFetch: !!holder,
    contract: contractRpc,
    method: 'getUnbonded',
    params: [holder],
  });

  const updateTotal = result.update;

  const liquidContractWeb3 = providerWeb3
    ? getLiquidContract(liquidAddress, providerWeb3)
    : null;

  const subscribeToUpdates = useCallback(() => {
    if (!providerWeb3 || !contractWeb3 || !liquidContractWeb3) return;

    try {
      const redeem = liquidContractWeb3.filters.Redeemed(mergedAccount);
      const claim = liquidContractWeb3.filters.Claimed(mergedAccount);

      providerWeb3.on(redeem, updateTotal);
      providerWeb3.on(claim, updateTotal);

      return () => {
        providerWeb3.off(redeem, updateTotal);
        providerWeb3.off(claim, updateTotal);
      };
    } catch (error) {
      return warning(false, 'Cannot subscribe to events');
    }
  }, [
    providerWeb3,
    contractWeb3,
    liquidContractWeb3,
    mergedAccount,
    updateTotal,
  ]);

  useEffect(subscribeToUpdates, [subscribeToUpdates]);

  return result;
};
