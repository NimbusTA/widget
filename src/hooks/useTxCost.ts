import { BigNumber } from '@ethersproject/bignumber';
import { divide } from '@lido-sdk/helpers';
import { useMemo } from 'react';

import { PARACHAIN_DECIMALS, parachainToken } from 'config';

import { useStatistics } from './useStatistics';
import { useXcTokenDecimals } from '../contracts';
import { formatCost } from '../utils';

// Price for DOT or GLMR
export const useRawTxCost = (
  txPrice?: BigNumber,
  token = parachainToken,
): number => {
  const statistics = useStatistics();
  const xcTokenDecimals = useXcTokenDecimals();

  const decimals =
    token === parachainToken ? PARACHAIN_DECIMALS : xcTokenDecimals.data;

  return useMemo(() => {
    const price =
      token === parachainToken
        ? statistics?.data?.pricePara
        : statistics?.data?.priceRelay;

    if (!price || !decimals || !txPrice || !decimals) return 0;

    return divide(
      txPrice.mul(price.toFixed()),
      BigNumber.from(10).pow(decimals),
    );
  }, [decimals, statistics, token, txPrice]);
};

export const useTxCost = (
  txPrice?: BigNumber,
  token = parachainToken,
): string => {
  const rawCost = useRawTxCost(txPrice, token);

  return useMemo(() => {
    if (!rawCost) return '';

    return formatCost(rawCost);
  }, [rawCost]);
};
