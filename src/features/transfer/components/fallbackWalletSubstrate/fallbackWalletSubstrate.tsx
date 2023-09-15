import { FC, PropsWithChildren } from 'react';

import { WalletCardComponent, FallbackWalletStyle } from 'common/wallets';

import {
  isAccountEmpty,
  useSubstrate,
  useSubstrateApi,
} from 'features/transfer';
import {
  NO_DOTSAMA_ACCOUNTS,
  CONNECT_RELAY_ERROR,
} from 'features/transfer/config';

const FallbackWalletWrapper: FC<PropsWithChildren> = ({
  children,
  ...props
}) => (
  <FallbackWalletStyle {...props}>
    <strong>Dotsama connection failed:</strong> <br />
    {children}
  </FallbackWalletStyle>
);

const FallbackWalletSubstrate: WalletCardComponent = (props) => {
  const { isError: isApiError } = useSubstrateApi();

  const {
    selectedAccount,
    error: connectError,
    connectionTried,
  } = useSubstrate();

  if (isApiError) {
    return (
      <FallbackWalletWrapper {...props}>
        {CONNECT_RELAY_ERROR}
      </FallbackWalletWrapper>
    );
  } else if (connectError) {
    return (
      <FallbackWalletWrapper {...props}>
        {connectError.message}
      </FallbackWalletWrapper>
    );
  } else if (
    connectionTried &&
    (!selectedAccount || isAccountEmpty(selectedAccount))
  ) {
    return (
      <FallbackWalletWrapper {...props}>
        {NO_DOTSAMA_ACCOUNTS}
      </FallbackWalletWrapper>
    );
  } else {
    return null;
  }
};

export default FallbackWalletSubstrate;
