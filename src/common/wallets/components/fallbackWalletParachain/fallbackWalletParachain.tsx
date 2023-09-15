import { useSDK } from '@lido-sdk/react';
import { useSupportedChains, useWeb3 } from '@lido-sdk/web3-react';
import { useBreakpoint } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren } from 'react';

import { parachainPublicRPC } from 'config';

import { ConnectButtonStyle, FallbackWalletStyle } from './styles';
import { useErrorMessage } from './useErrorMessage';
import { MOBILE_CONNECT_ERROR_HELPER, NO_EVM_ACCOUNTS } from '../../constants';
import { useSwitchChainRPC } from '../../hooks';
import { WalletCardComponent } from '../walletCard';

const FallbackWalletWrapper: FC<PropsWithChildren> = ({
  children,
  ...props
}) => (
  <FallbackWalletStyle {...props}>
    <strong>EVM connection failed:</strong> <br />
    {children}
  </FallbackWalletStyle>
);

export const FallbackWalletParachain: WalletCardComponent = (props) => {
  const { account: evmAccount } = useSDK();
  const { active } = useWeb3();

  const error = useErrorMessage();
  const { isUnsupported } = useSupportedChains();
  const { switchChain, chainName } = useSwitchChainRPC(parachainPublicRPC);

  const isMobile = useBreakpoint('md');

  if (error) {
    return (
      <FallbackWalletWrapper {...props}>
        {isUnsupported && isMobile ? MOBILE_CONNECT_ERROR_HELPER : error}
        {isUnsupported && !isMobile && switchChain && (
          <ConnectButtonStyle
            size="xs"
            variant="filled"
            color="secondary"
            onClick={switchChain}
          >
            Switch to {chainName}
          </ConnectButtonStyle>
        )}
      </FallbackWalletWrapper>
    );
  }

  if (active && !evmAccount) {
    return (
      <FallbackWalletWrapper {...props}>
        {NO_EVM_ACCOUNTS}
      </FallbackWalletWrapper>
    );
  }

  return null;
};
