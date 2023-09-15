import { InlineLoader } from '@lidofinance/lido-ui';

import { FC, PropsWithChildren } from 'react';

import {
  WalletCardBalanceComponent,
  WalletCardComponent,
  WalletCardRowComponent,
} from './types';
import {
  WalletCardAccountStyle,
  WalletCardBalanceStyle,
  WalletCardContentStyle,
  WalletCardExtraStyle,
  WalletCardRowStyle,
  WalletCardStyle,
  WalletCardTitleStyle,
  WalletCardValueStyle,
} from './walletCardStyles';

export const WalletCard: WalletCardComponent = (props) => {
  return <WalletCardStyle color="accent" {...props} />;
};

export const WalletCardRow: WalletCardRowComponent = (props) => {
  return <WalletCardRowStyle {...props} />;
};

export const WalletCardBalance: WalletCardBalanceComponent = (props) => {
  const {
    title,
    small = false,
    extra,
    loading = false,
    children,
    value,
    ...rest
  } = props;

  const hasExtra = !!extra;
  const hasChildren = !!children;

  return (
    <WalletCardBalanceStyle {...rest}>
      <WalletCardTitleStyle>{title}</WalletCardTitleStyle>
      <WalletCardValueStyle $small={small}>
        {loading ? <InlineLoader /> : value}
      </WalletCardValueStyle>
      {hasExtra && (
        <WalletCardExtraStyle>
          {loading ? <InlineLoader /> : extra}
        </WalletCardExtraStyle>
      )}
      {hasChildren && (
        <WalletCardContentStyle $hidden={loading}>
          {children}
        </WalletCardContentStyle>
      )}
    </WalletCardBalanceStyle>
  );
};

export const WalletCardAccount: FC<PropsWithChildren> = ({
  children,
  ...rest
}) => {
  return <WalletCardAccountStyle {...rest}>{children}</WalletCardAccountStyle>;
};
