import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from '@lido-sdk/react';

import { useLiquidContractWeb3 } from 'contracts';
import { useEstimate } from 'hooks/transactions';

export const useEstimateStake = (
  amount?: BigNumber,
  shouldFetch = true,
): SWRResponse<BigNumber, Error> => {
  const liquidContractWeb3 = useLiquidContractWeb3();

  return useEstimate({
    contract: liquidContractWeb3,
    method: 'deposit',
    cacheKey: 'estimateStake',
    shouldFetch: !!amount && shouldFetch,
    subscriptionField: amount,
    params: [amount],
  });
};
