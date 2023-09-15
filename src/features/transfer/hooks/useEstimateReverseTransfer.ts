import { BigNumber } from '@ethersproject/bignumber';

import { SWRResponse } from '@lido-sdk/react';

import { decodeAddress } from '@polkadot/util-crypto';

import { TOKENS, REVERSE_DEST_WEIGHT, getTokenAddress } from 'config';
import { useXTokensContractWeb3 } from 'contracts';

import { useEstimate } from 'hooks/transactions';

const xcAddress = getTokenAddress(TOKENS.xcToken);

export const useEstimateReverseTransfer = (
  amount?: BigNumber,
  receiver?: string,
  shouldFetch = true,
): SWRResponse<BigNumber, Error> => {
  const xTokensContractWeb3 = useXTokensContractWeb3();

  return useEstimate({
    contract: xTokensContractWeb3,
    method: 'transfer',
    params: [
      xcAddress,
      amount,
      {
        parents: 1,
        interior: [
          new Uint8Array([1, ...(receiver ? decodeAddress(receiver) : []), 0]),
        ],
      },
      REVERSE_DEST_WEIGHT,
    ],
    cacheKey: 'estimateReverseTransfer',
    subscriptionField: amount,
    shouldFetch: !!amount && shouldFetch,
  });
};
