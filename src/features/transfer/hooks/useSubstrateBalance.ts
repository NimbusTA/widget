import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';

import { useSubstrateBalances } from './useSubstrateBalances';
import { useSubstrate } from '../provider';

type SubstrateBalanceReturnType = {
  data: BigNumber | undefined;
  loading: boolean;
};

export const useSubstrateBalance = (): SubstrateBalanceReturnType => {
  const { selectedAccount } = useSubstrate();
  const { balances, loading } = useSubstrateBalances();

  const balance = useMemo(() => {
    if (balances && selectedAccount && balances[selectedAccount.address]) {
      return BigNumber.from(balances[selectedAccount.address].toString());
    }
  }, [balances, selectedAccount]);

  return {
    data: balance,
    loading: loading,
  };
};
