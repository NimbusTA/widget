import { UseApproveWrapper } from '@lido-sdk/react';

import { useCallback } from 'react';

import { STAGE } from 'components/txModal';

import {
  secondTryWaitTransaction,
  TransactionCallback,
} from 'hooks/transactions';

type ApproveTransactionProps = {
  setStage: (value: STAGE) => void;
  setTxHash: (value: string | null) => void;
  onStart: () => void;
  onFinish: () => void;
};

type ApproveTransactionReturn = {
  onSuccess: () => void;
  wrapper: UseApproveWrapper;
};

export const useApproveTransaction = ({
  setTxHash,
  setStage,
  onStart,
  onFinish,
}: ApproveTransactionProps): ApproveTransactionReturn => {
  const approveWrapper = async (callback: TransactionCallback) => {
    onStart?.();

    setTxHash(null);
    setStage(STAGE.APPROVE);
    const transaction = await callback();
    setTxHash(transaction.hash);
    return await transaction
      .wait()
      .catch(() => secondTryWaitTransaction(transaction.hash));
  };

  const onSuccess = useCallback(() => {
    setStage(STAGE.APPROVED);
    onFinish?.();
  }, [onFinish, setStage]);

  return {
    onSuccess,
    wrapper: approveWrapper,
  };
};
