import { useLocalStorage } from '@lido-sdk/react';
import { getWalletBySource, Wallet } from '@talismn/connect-wallets';

import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { WALLET_EXTENSIONS } from 'common/wallets';

import {
  SubstrateContext,
  SubstrateContextInterface,
} from './SubstrateContext';
import { GenericFn, WalletAccount } from './types';
import { APP_NAME } from '../config';

export const SubstrateContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [walletKey, setWalletKey] = useLocalStorage<string | null>(
    'wallet-key',
    null,
  );
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>(
    getWalletBySource(walletKey as WALLET_EXTENSIONS),
  );
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, selectAccount] = useState<WalletAccount | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any | undefined>(undefined);
  const [connectionTried, setConnectionTried] = useState(false);

  const [unsubsribe, setUnsubscribe] = useState<GenericFn | undefined>();
  useEffect(() => {
    return () => {
      if (unsubsribe) {
        unsubsribe?.();
      }
    };
  }, [unsubsribe]);

  const afterSelectWallet = useCallback(
    (infos: WalletAccount[] | undefined) => {
      const filteredAccounts = infos?.filter(
        (info) => info.type !== 'ethereum',
      );
      setAccounts(filteredAccounts || []);
      if (filteredAccounts && filteredAccounts.length > 0) {
        selectAccount(filteredAccounts[0]);
      } else {
        selectAccount(null);
      }
    },
    [],
  );

  const selectWallet = useCallback(
    async (wallet: Wallet) => {
      try {
        if (!wallet?.installed) return;

        setError(undefined);
        setLoading(true);
        setCurrentWallet(currentWallet);

        setConnectionTried(true);
        await wallet.enable(APP_NAME);
        setWalletKey(wallet.extensionName);

        const unsub = await wallet.subscribeAccounts(afterSelectWallet);
        setUnsubscribe(unsub as GenericFn);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    },
    [afterSelectWallet, currentWallet, setWalletKey],
  );

  // AutoConnect
  useEffect(() => {
    if (walletKey) {
      const wallet = getWalletBySource(walletKey as WALLET_EXTENSIONS);

      setTimeout(() => {
        if (wallet && wallet?.installed) {
          void selectWallet(wallet);
        }
      }, 150);
    }
  }, [selectWallet, walletKey]);

  const substrateContext = {
    wallet: getWalletBySource(walletKey as WALLET_EXTENSIONS),
    accounts,
    setWallet: (wallet: Wallet | undefined) => {
      wallet?.installed && selectWallet(wallet as Wallet);
    },

    error,
    selectAccount,
    selectedAccount,

    isLoading,
    connectionTried,
  };

  return (
    <SubstrateContext.Provider
      value={substrateContext as SubstrateContextInterface}
    >
      {children}
    </SubstrateContext.Provider>
  );
};
