import { Wallet } from '@talismn/connect-wallets';
import { createContext, useContext } from 'react';

import { SetStateType, WalletAccount } from './types';

export interface SubstrateContextInterface {
  wallet?: Wallet;
  accounts: WalletAccount[];
  setWallet: (wallet: Wallet | undefined) => void;

  selectedAccount: WalletAccount | null;
  selectAccount: SetStateType<WalletAccount | null>;

  error?: Error;
  isLoading: boolean;
  connectionTried: boolean;
}

export const SubstrateContext = createContext({} as SubstrateContextInterface);

export const useSubstrate = (): SubstrateContextInterface =>
  useContext(SubstrateContext);
