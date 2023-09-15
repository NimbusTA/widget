import { BigNumber } from '@ethersproject/bignumber';

import { TransactionReturn } from 'hooks/transactions';

export type TransactionWithApproveReturn = TransactionReturn & {
  approveTransaction: () => Promise<void>;
  approveProcessing: boolean;
  needsApprove: boolean;
  allowance: BigNumber;
};
