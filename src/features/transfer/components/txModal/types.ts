import { ErrorCode } from '@ethersproject/logger';

import { STAGE } from './txModal';

export type TxError = null | (Error & { code?: ErrorCode });

export type TxModalProps = {
  token?: string;
  stage?: STAGE;
  amount?: string;
  open?: boolean;
  error?: TxError;
  onClose?: () => void;
  onRetry?: () => void;
  txHash?: string | null;
};
