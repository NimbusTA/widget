import { ContractReceipt } from '@ethersproject/contracts';
import { getStaticRpcBatchProvider } from '@lido-sdk/providers';

import ms from 'ms';

import { defaultChain, getBackendRPCPath } from '../../config';

export const secondTryWaitTransaction = async (
  txHash: string,
): Promise<ContractReceipt | undefined> => {
  const parsedParachainId = parseInt(defaultChain);

  const provider = getStaticRpcBatchProvider(
    parsedParachainId,
    getBackendRPCPath(parsedParachainId),
  );

  let tx;
  const endTime = Date.now() + ms('30s');
  while (!tx && Date.now() < endTime) {
    tx = await provider.getTransaction(txHash).catch(() => undefined);
  }

  if (!tx) {
    throw new Error('Failed to retrieve transaction');
  }

  return await tx.wait();
};
