import { BigNumber } from '@ethersproject/bignumber';

import { SWRResponse } from '@lido-sdk/react';

import { useLiquidContractWeb3 } from 'contracts';

import { useEstimate } from '../../../hooks/transactions/useEstimate';

export const useEstimateClaim = (
  amount?: BigNumber,
  shouldFetch = true,
): SWRResponse<BigNumber, Error> => {
  const liquidContractWeb3 = useLiquidContractWeb3();

  return useEstimate({
    contract: liquidContractWeb3,
    method: 'claimUnbonded',
    cacheKey: 'estimateClaim',
    shouldFetch,
  });
};
