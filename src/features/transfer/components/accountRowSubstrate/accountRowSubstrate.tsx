import { FC } from 'react';

import FormatToken from 'components/formatToken';

import { WalletCardBalance } from 'common/wallets';

import { DEFAULT_VALUE, nativeToken } from 'config';
import { useXcTokenDecimals } from 'contracts';
import { useSubstrate, useSubstrateBalance } from 'features/transfer';
import AccountSubstrate from 'features/transfer/components/accountSubstrate';

import { WalletAccountRowStyle } from './styles';
import { AccountRowProps } from './types';

const AccountRowSubstrate: FC<AccountRowProps> = ({ title }) => {
  const { data: balance, loading } = useSubstrateBalance();
  const { selectedAccount, isLoading } = useSubstrate();
  const decimals = useXcTokenDecimals();

  return selectedAccount ? (
    <WalletAccountRowStyle>
      <WalletCardBalance
        title={title}
        loading={loading || isLoading}
        value={
          balance && decimals.data ? (
            <FormatToken
              symbol={nativeToken}
              amount={balance}
              decimals={decimals.data}
              minimize
            />
          ) : (
            DEFAULT_VALUE
          )
        }
      />
      <AccountSubstrate />
    </WalletAccountRowStyle>
  ) : null;
};

export default AccountRowSubstrate;
