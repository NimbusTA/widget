import { useSDK } from '@lido-sdk/react';

import { FC } from 'react';

import FormatToken from 'components/formatToken';

import { xcToken } from 'config';
import { useXcTokenDecimals } from 'contracts';

import { WalletAccountRowStyle } from './styles';
import { AccountRowProps } from './types';
import { AccountParachain } from '../accountParachain';
import { TokenToWallet } from '../tokenToWallet';
import { WalletCardBalance } from '../walletCard';

export const AccountRowParachain: FC<AccountRowProps> = ({
  title,
  balance,
  tokenAddress,
}) => {
  const { account } = useSDK();
  const decimals = useXcTokenDecimals();

  return account ? (
    <WalletAccountRowStyle>
      <WalletCardBalance
        small
        loading={balance.initialLoading || decimals.initialLoading}
        title={title}
        value={
          decimals.data && (
            <>
              <FormatToken
                amount={balance.data}
                decimals={decimals.data}
                symbol={xcToken}
              />
              <TokenToWallet address={tokenAddress} />
            </>
          )
        }
      />
      <AccountParachain />
    </WalletAccountRowStyle>
  ) : null;
};
