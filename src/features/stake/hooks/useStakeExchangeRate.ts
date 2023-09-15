import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { SWRResponse, useLidoSWR } from '@lido-sdk/react';

import { useCallback } from 'react';

import { useLiquidContractRPC, useLiquidDecimals } from 'contracts';

// nDOT_DOT exchange rate = getSharesByPooledToken(1e12) / (1e12)
export const useStakeExchangeAmount = (
  amount?: BigNumber,
  shouldFetch = true,
): SWRResponse<BigNumber | null, Error> => {
  const liquidContractRPC = useLiquidContractRPC();

  const canFetch = amount && liquidContractRPC;
  const getExchangeAmount = useCallback(async () => {
    // Excessive check because otherwise typescript causes error
    // when using decimals.data
    if (!canFetch) return Zero;

    const sharesAmount = await liquidContractRPC.getSharesByPooledToken(amount);

    if (sharesAmount === Zero) return amount;

    return sharesAmount;
  }, [amount, canFetch, liquidContractRPC]);

  return useLidoSWR<BigNumber | null, Error>(
    canFetch && shouldFetch ? `StakeExchangeRate-${amount}` : null,
    getExchangeAmount,
  );
};

export const useStakeExchangeRate = (): SWRResponse<
  BigNumber | null,
  Error
> => {
  const decimals = useLiquidDecimals();
  const oneToken = decimals.data ? BigNumber.from(10).pow(decimals.data) : Zero;

  return useStakeExchangeAmount(oneToken);
};
