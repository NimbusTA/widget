import { useCallback } from 'react';

import { STAGE } from 'components/txModal';

import { useLiquidContractWeb3 } from 'contracts';

import {
  TransactionProps,
  TransactionReturn,
  useTransaction,
  secondTryWaitTransaction,
} from 'hooks/transactions';

export const useUnstake = ({ amount }: TransactionProps): TransactionReturn => {
  const liquidContractWeb3 = useLiquidContractWeb3();

  const {
    processing,
    txError,
    txHash,
    stage,
    setStage,
    setTxHash,
    onError,
    onStart,
    onFinish,
    clearTxStage,
  } = useTransaction();

  const canProcess = !!liquidContractWeb3 && !!amount;
  const transaction = useCallback(async () => {
    if (!canProcess) return;
    onStart?.();

    try {
      setStage(STAGE.WITHDRAW);
      const tx = await liquidContractWeb3.redeem(amount);

      setTxHash(tx.hash);
      await tx.wait().catch(() => secondTryWaitTransaction(tx.hash));
      setStage(STAGE.WITHDRAWN);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      onFinish?.();
    }
  }, [
    canProcess,
    onStart,
    setStage,
    liquidContractWeb3,
    amount,
    setTxHash,
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
