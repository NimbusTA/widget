import { useSDK } from '@lido-sdk/react';
import { ButtonProps } from '@lidofinance/lido-ui';

import { FC } from 'react';

import FormatToken from 'components/formatToken';

import { useModal } from 'common/layout';
import { xcToken } from 'config';
import { useXcTokenBalance, useXcTokenDecimals } from 'contracts';
import { MODAL } from 'providers';

import {
  WalledButtonStyle,
  WalledButtonWrapperStyle,
  WalledButtonBalanceStyle,
  WalledButtonLoaderStyle,
} from './walletButtonStyles';
import { AddressBadgeParachain } from '../addressBadgeParachain';

export const WalletButton: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.account);
  const { account } = useSDK();
  const { data: balance, initialLoading } = useXcTokenBalance();
  const xcTokenDecimals = useXcTokenDecimals();

  return (
    <WalledButtonStyle
      size="sm"
      variant="text"
      color="secondary"
      onClick={openModal}
      {...rest}
    >
      <WalledButtonWrapperStyle>
        <WalledButtonBalanceStyle>
          {initialLoading ||
          xcTokenDecimals.initialLoading ||
          !xcTokenDecimals.data ? (
            <WalledButtonLoaderStyle />
          ) : (
            <FormatToken
              amount={balance}
              symbol={xcToken}
              decimals={xcTokenDecimals.data}
            />
          )}
        </WalledButtonBalanceStyle>
        <AddressBadgeParachain address={account} />
      </WalledButtonWrapperStyle>
    </WalledButtonStyle>
  );
};
