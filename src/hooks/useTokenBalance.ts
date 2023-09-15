import { BigNumber } from '@ethersproject/bignumber';
import { getERC20Contract } from '@lido-sdk/contracts';
import { useContractSWR, SWRResponse, useSDK } from '@lido-sdk/react';

import { useCallback, useEffect } from 'react';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

import { getTokenAddress, TOKENS } from 'config';
import { getLiquidContract } from 'contracts';

export const useTokenBalance = (
  token: string,
  account?: string,
): SWRResponse<BigNumber> => {
  const { providerRpc, providerWeb3, account: sdkAccount } = useSDK();
  const mergedAccount = account ?? sdkAccount;

  invariant(token != null, 'Token is required');

  const contractRpc = getERC20Contract(token, providerRpc);
  const contractWeb3 = providerWeb3
    ? getERC20Contract(token, providerWeb3)
    : null;

  const result = useContractSWR({
    shouldFetch: !!mergedAccount,
    contract: contractRpc,
    method: 'balanceOf',
    params: [mergedAccount],
  });

  const updateBalance = result.update;

  const liquidAddress = getTokenAddress(TOKENS.liquidToken);
  const liquidContractWeb3 = providerWeb3
    ? getLiquidContract(liquidAddress, providerWeb3)
    : null;

  const subscribeToUpdates = useCallback(() => {
    if (!mergedAccount || !providerWeb3 || !contractWeb3 || !liquidContractWeb3)
      return;

    const balanceSubscriptions =
      token === getTokenAddress(TOKENS.xcToken)
        ? [
            liquidContractWeb3.filters.Deposited(mergedAccount),
            liquidContractWeb3.filters.Claimed(mergedAccount),
          ]
        : token === getTokenAddress(TOKENS.liquidToken)
        ? [
            liquidContractWeb3.filters.Deposited(mergedAccount),
            liquidContractWeb3.filters.Redeemed(mergedAccount),
            liquidContractWeb3.filters.Losses(null),
            liquidContractWeb3.filters.Rewards(null),
          ]
        : [];

    try {
      const fromMe = contractWeb3.filters.Transfer(mergedAccount, null);
      const toMe = contractWeb3.filters.Transfer(null, mergedAccount);

      providerWeb3.on(fromMe, updateBalance);
      providerWeb3.on(toMe, updateBalance);

      balanceSubscriptions.forEach((subscription) =>
        providerWeb3.on(subscription, updateBalance),
      );

      return () => {
        providerWeb3.off(fromMe, updateBalance);
        providerWeb3.off(toMe, updateBalance);

        balanceSubscriptions.forEach((subscription) =>
          providerWeb3.off(subscription, updateBalance),
        );
      };
    } catch (error) {
      return warning(false, 'Cannot subscribe to events');
    }
  }, [
    mergedAccount,
    providerWeb3,
    contractWeb3,
    liquidContractWeb3,
    token,
    updateBalance,
  ]);

  useEffect(subscribeToUpdates, [subscribeToUpdates]);

  return result;
};
