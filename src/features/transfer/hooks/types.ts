import { STAGE } from 'features/transfer/components/txModal';

import { TransactionReturn } from 'hooks/transactions';

export type TransactionReturnSubstrate = Omit<TransactionReturn, 'stage'> & {
  stage: STAGE;
};
