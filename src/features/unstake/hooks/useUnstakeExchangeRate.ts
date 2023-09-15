import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useLidoSWR, SWRResponse } from '@lido-sdk/react';

import { useCallback } from 'react';

import { useLiquidContractRPC, useLiquidDecimals } from 'contracts';

// DOT-nDOT exchange rate = getSharesByPooledToken(1e12) / (1e12)
export const useUnstakeExchangeAmount = (
  amount?: BigNumber,
  shouldFetch = true,
): SWRResponse<BigNumber | null, Error> => {
  const liquidContractRPC = useLiquidContractRPC();

  const canFetch = amount && liquidContractRPC;
  const getExchangeAmount = useCallback(async () => {
    // Excessive check because otherwise typescript causes error
    // when using decimals.data
    if (!canFetch) return Zero;

    const sharesAmount = await liquidContractRPC.getPooledTokenByShares(amount);

    if (sharesAmount === Zero) return amount;

    return sharesAmount;
  }, [amount, canFetch, liquidContractRPC]);

  return useLidoSWR<BigNumber | null, Error>(
    canFetch && shouldFetch ? `UnstakeExchangeRate-${amount}` : null,
    canFetch ? getExchangeAmount : null,
  );
};

export const useUnstakeExchangeRate = (): SWRResponse<
  BigNumber | null,
  Error
> => {
  const decimals = useLiquidDecimals();
  const oneToken = decimals.data ? BigNumber.from(10).pow(decimals.data) : Zero;

  return useUnstakeExchangeAmount(oneToken);
};
