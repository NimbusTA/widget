import { BigNumber } from '@ethersproject/bignumber';
import { BaseContract } from '@ethersproject/contracts';
import { useLidoSWR, SWRResponse } from '@lido-sdk/react';
import invariant from 'tiny-invariant';

import { useMemoField } from './useMemoField';

export const useEstimate = <C extends BaseContract, F extends boolean>(props: {
  contract: C | null;
  method: string;
  cacheKey: string;
  shouldFetch?: boolean;
  params?: F extends false ? unknown[] : [];
  subscriptionField?: BigNumber;
}): SWRResponse<BigNumber, Error> => {
  const {
    shouldFetch = true,
    params = [],
    subscriptionField,
    contract,
    method,
    cacheKey,
  } = props;

  invariant(method != null, 'Method is required');
  invariant(cacheKey != null, 'Cache Key is required');

  const result = useLidoSWR<BigNumber, Error>(
    contract && shouldFetch ? cacheKey : null,
    contract && (() => contract.estimateGas[method](...params)),
  );

  useMemoField(subscriptionField, result.update);

  return result;
};
