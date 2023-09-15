import { decodeAddress } from '@polkadot/util-crypto';

import { useCallback, useState } from 'react';

import { TOKENS, REVERSE_DEST_WEIGHT, getTokenAddress } from 'config';
import { useXTokensContractWeb3 } from 'contracts';
import { STAGE } from 'features/transfer/components/txModal';

import {
  useTransaction,
  TransactionProps,
  secondTryWaitTransaction,
} from 'hooks/transactions';

import { TransactionReturnSubstrate } from './types';

type ReverseTransferProps = TransactionProps & {
  receiver?: string;
  onSuccess?: () => void;
};

const xcAddress = getTokenAddress(TOKENS.xcToken);

export const useReverseTransfer = ({
  amount,
  receiver,
  onSuccess,
}: ReverseTransferProps): TransactionReturnSubstrate => {
  const xTokensContractWeb3 = useXTokensContractWeb3();
  const [stage, setStage] = useState<STAGE>(STAGE.IDLE);

  const {
    processing,
    txError,
    txHash,
    setTxHash,
    onError,
    onStart,
    onFinish,
    clearTxStage,
  } = useTransaction();

  const canProcess = !!xTokensContractWeb3 && !!amount && !!receiver;
  const transaction = useCallback(async () => {
    if (!canProcess) return;
    onStart?.();

    try {
      setStage(STAGE.REVERSE_TRANSFER);
      const tx = await xTokensContractWeb3.transfer(
        xcAddress,
        amount,
        {
          parents: 1,
          interior: [new Uint8Array([1, ...decodeAddress(receiver), 0])],
        },
        REVERSE_DEST_WEIGHT,
      );

      setTxHash(tx.hash);
      await tx.wait().catch(() => secondTryWaitTransaction(tx.hash));
      setStage(STAGE.REVERSE_TRANSFERRED);

      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      onFinish?.();
    }
  }, [
    canProcess,
    onStart,
    setStage,
    xTokensContractWeb3,
    amount,
    receiver,
    setTxHash,
    onSuccess,
    onError,
    onFinish,
  ]);

  return {
    transaction,
    processing,
    txHash,
    stage,
    error: txError,
    onFinish: clearTxStage,
    canProcess,
  };
};
