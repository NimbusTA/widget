import { useCallback } from 'react';

import { STAGE } from 'components/txModal';

import { useLiquidContractWeb3 } from 'contracts';

import { TransactionReturn } from '../../../hooks/transactions/types';
import { useTransaction } from '../../../hooks/transactions/useTransaction';
import { secondTryWaitTransaction } from '../../../hooks/transactions/utils';

export const useClaim = (): TransactionReturn => {
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

  const transaction = useCallback(async () => {
    if (!liquidContractWeb3) return;
    onStart?.();

    try {
      setStage(STAGE.CLAIM);
      const tx = await liquidContractWeb3.claimUnbonded();
      setTxHash(tx.hash);
      await tx.wait().catch(() => secondTryWaitTransaction(tx.hash));
      setStage(STAGE.CLAIMED);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      onFinish?.();
    }
  }, [onStart, setStage, liquidContractWeb3, setTxHash, onError, onFinish]);

  return {
    transaction,
    processing,
    txHash,
    stage,
    error: txError,
    onFinish: clearTxStage,
    canProcess: !!liquidContractWeb3,
  };
};
