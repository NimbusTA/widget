import { BigNumber } from '@ethersproject/bignumber';

import { ContractTransaction } from '@ethersproject/contracts';

import { STAGE } from 'components/txModal';

export type TransactionProps = {
  amount?: BigNumber;
};

export type TransactionReturn = {
  transaction: () => Promise<void>;
  canProcess: boolean;
  processing: boolean;
  txHash: string | null;
  error: Error | null | unknown;
  stage: STAGE;
  onFinish: () => void;
};

export type TransactionCallback = () => Promise<ContractTransaction>;
