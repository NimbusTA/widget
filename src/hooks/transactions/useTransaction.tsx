import { useMountedState } from '@lido-sdk/react';
import { useCallback, useState } from 'react';

import { STAGE } from 'components/txModal';

export type UseTransactionResponse = {
  onError: (err: Error) => void;
  onStart: () => void;
  onFinish: () => void;
  stage: STAGE;
  setError: (value: Error | null) => void;
  processing: boolean;
  setProcessing: (value: boolean) => void;
  setStage: (value: STAGE) => void;
  txHash: string | null;
  txError: Error | null;
  setTxHash: (value: string | null) => void;
  clearTxStage: () => void;
};

export const useTransaction = (): UseTransactionResponse => {
  const [stage, setStage] = useState<STAGE>(STAGE.IDLE);
  const [txError, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [processing, setProcessing] = useMountedState(false);

  const onError = useCallback((err: Error) => {
    setError(err);
    setStage(STAGE.ERROR);
  }, []);

  const onStart = useCallback(() => {
    setTxHash(null);
    setError(null);
    setProcessing(true);
  }, [setProcessing]);

  const onFinish = useCallback(() => {
    setProcessing(false);
  }, [setProcessing]);

  const clearTxStage = useCallback(() => {
    setStage(STAGE.IDLE);
    setTxHash(null);
    setError(null);
  }, []);

  return {
    onError,
    onStart,
    onFinish,
    processing,
    setProcessing,
    stage,
    setStage,
    txError,
    setError,
    txHash,
    setTxHash,
    clearTxStage,
  };
};
