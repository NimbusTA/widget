import { Balance } from '@polkadot/types/interfaces';

import { WalletAccount } from 'features/transfer';

export type AccountModalSubstrateProps = {
  account: WalletAccount;
  balance: Balance;
  loading: boolean;
  token: string;
};
