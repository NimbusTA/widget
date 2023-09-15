import { Zero } from '@ethersproject/constants';
import { useCallback } from 'react';

import { STAGE } from 'components/txModal';

import { getTokenAddress, TOKENS } from 'config';
import { useLiquidContractWeb3, useXcTokenApprove } from 'contracts';

import {
  secondTryWaitTransaction,
  TransactionProps,
  useTransaction,
} from 'hooks/transactions';

import { TransactionWithApproveReturn } from './types';
import { useApproveTransaction } from './useApproveTransaction';

const LiquidAddress = getTokenAddress(TOKENS.liquidToken);

export const useStake = ({
  amount,
}: TransactionProps): TransactionWithApproveReturn => {
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

  const { onSuccess: onApproveSuccess, wrapper: approveWrapper } =
    useApproveTransaction({
      setStage,
      setTxHash,
      onStart,
      onFinish,
    });

  const {
    approve,
    allowance,
    approving,
    needsApprove,
    initialLoading: approveInitialLoading,
    loading: approveLoading,
    error: approveError,
    update: updateAllowance,
  } = useXcTokenApprove(
    amount || Zero,
    LiquidAddress,
    approveWrapper,
    onError,
    onApproveSuccess,
  );

  const canProcess = !!liquidContractWeb3 && !!amount;
  const transaction = useCallback(async () => {
    if (!canProcess) return;
    onStart?.();

    try {
      setStage(STAGE.STAKE);
      const tx = await liquidContractWeb3.deposit(amount);

      setTxHash(tx.hash);
      await tx.wait().catch(() => secondTryWaitTransaction(tx.hash));
      setStage(STAGE.STAKED);

      await updateAllowance();
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
    updateAllowance,
    onError,
    onFinish,
  ]);

  return {
    transaction,
    approveTransaction: approve,
    processing,
    approveProcessing: approving || approveLoading || approveInitialLoading,
    txHash,
    error: (approveError as Error) || txError,
    stage,
    canProcess,
    onFinish: clearTxStage,
    needsApprove,
    allowance,
  };
};
