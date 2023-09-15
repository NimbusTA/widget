import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useMemo } from 'react';

import { useLiquidDecimals } from 'contracts';

export const useMultipliedExchangeRate = (
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
