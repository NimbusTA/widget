import { BigNumber } from '@ethersproject/bignumber';

import { nativeToken } from 'config';
import { formatCost } from 'utils';

import { useRawTxCost } from './useTxCost';

export const useCumulativeCost = (
  relayFee: BigNumber,
  parachainFee?: BigNumber,
): string => {
  const relayCost = useRawTxCost(relayFee, nativeToken);
  const parachainCost = useRawTxCost(parachainFee);

  return formatCost(relayCost + parachainCost);
};
