import { VoidFn } from '@polkadot/api/types';
import { AccountInfo, Balance } from '@polkadot/types/interfaces';
import { useState, useEffect } from 'react';

import { useSubstrate, useSubstrateApi } from '../provider';

export type SubstrateBalanceValue = {
  loading: boolean;
  error: string | undefined;
  balances: { [key: string]: Balance };
};

export const useSubstrateBalances = (): SubstrateBalanceValue => {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { accounts, isLoading: accountsLoading } = useSubstrate();
  const { api, isActive, isLoading } = useSubstrateApi();

  useEffect(() => {
    if (isActive && accounts && api) {
      setLoading(true);

      const addresses = accounts
        ? accounts.map((account) => account.address)
        : [];

      let unsubscribeAll: VoidFn;

      api.query.system.account
        .multi(addresses, (balances: AccountInfo[]) => {
          const balancesMap = addresses.reduce(
            (acc, address, index) => ({
              ...acc,
              [address]: balances[index].data.free.sub(
                balances[index].data.miscFrozen,
              ),
            }),
            {},
          );
          setBalances(balancesMap);
        })
        .then((unsub) => {
          unsubscribeAll = unsub;
        })
        .catch((err: unknown) => {
          if (typeof err === 'string') {
            setError(err);
          } else if (err instanceof Error) {
            setError(err.message);
          }
        });

      setLoading(false);
      return () => unsubscribeAll && unsubscribeAll();
    }
  }, [accounts, api, isActive]);

  return { loading: loading || isLoading || accountsLoading, error, balances };
};
