import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useLidoSWR, SWRResponse } from '@lido-sdk/react';

import { useCallback, useMemo } from 'react';

import { useLiquidContractWeb3, useLiquidDecimals } from 'contracts';

// nDOT_DOT exchange rate = getSharesByPooledToken(1e12) / (1e12)
export const useStakeExchangeRate = (
  amount?: BigNumber,
  shouldFetch = true,
): SWRResponse<BigNumber | null, Error> => {
  const liquidContractWeb3 = useLiquidContractWeb3();
  const decimals = useLiquidDecimals();

  const getLiquidExchangeAmount = useCallback(async () => {
    if (!liquidContractWeb3 || !decimals.data) return null;

    const oneToken = BigNumber.from(10).pow(decimals.data);
    const defaultedAmount = amount || oneToken;
    const sharesAmount = await liquidContractWeb3.getSharesByPooledToken(
      defaultedAmount,
    );

    if (sharesAmount === Zero) return amount || oneToken;

    return sharesAmount;
  }, [amount, decimals.data, liquidContractWeb3]);

  const liquidToken_amount = useLidoSWR<BigNumber | null, Error>(
    liquidContractWeb3 && shouldFetch ? 'liquidExchangeRate' : null,
    liquidContractWeb3 ? getLiquidExchangeAmount : null,
  );

  return liquidToken_amount;
};

export const useCountStakeExchangeRate = (
  amount?: BigNumber,
  rate?: BigNumber | null,
): BigNumber => {
  const decimals = useLiquidDecimals();

  const result = useMemo(
    () =>
      (amount &&
        rate &&
        decimals.data &&
        amount.mul(rate).div(BigNumber.from(10).pow(decimals.data))) ||
      Zero,
    [amount, decimals.data, rate],
  );

  return result;
};
