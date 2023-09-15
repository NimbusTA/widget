import { useConnectorMetamask } from '@lido-sdk/web3-react';
import { ConnectButton } from '@lidofinance/lido-ui-blocks';
import { FC, useCallback } from 'react';

import iconUrl from 'assets/icons/metamask.svg';

import { ConnectWalletProps } from './types';

export const ConnectMetamask: FC<ConnectWalletProps> = (props) => {
  const { onConnect, ...rest } = props;
  const { connect } = useConnectorMetamask();

  const handleConnect = useCallback(async () => {
    onConnect?.();
    connect();
  }, [onConnect, connect]);

  return (
    <ConnectButton
      {...rest}
      iconSrcOrReactElement={iconUrl}
      onClick={handleConnect}
    >
      Metamask
    </ConnectButton>
  );
};
