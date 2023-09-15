import { BigNumber } from '@ethersproject/bignumber';

import { SWRResponse } from '@lido-sdk/react';

import { useXcTokenContractWeb3 } from 'contracts';
import { useEstimate } from 'hooks/transactions';

export const useXcTokenEstimateApprove = (
  spender: string,
  shouldFetch = true,
  amount?: BigNumber,
): SWRResponse<BigNumber, Error> => {
  const xcTokenContractWeb3 = useXcTokenContractWeb3();
  return useEstimate({
    contract: xcTokenContractWeb3,
    method: 'approve',
    shouldFetch: !!amount && shouldFetch,
    cacheKey: 'estimateXcTokenApprove',
    params: [spender, amount],
    subscriptionField: amount,
  });
};
