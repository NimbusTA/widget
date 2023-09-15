import { ConnectButton } from '@lidofinance/lido-ui-blocks';
import Image from 'next/image';
import { FC, useCallback } from 'react';

import styled from 'styled-components';

import { ConnectWalletProps } from './types';
import { useConnectorTalisman } from '../../hooks';
import { WALLET_EXTENSIONS } from '../../types';
import { PREDEFINED_WALLETS } from '../../wallets';

const StyledWalletIcon = styled(Image)`
  border-radius: 50%;
  margin-bottom: 8px;
`;

const talismanWallet = PREDEFINED_WALLETS[WALLET_EXTENSIONS.TALISMAN];

export const ConnectTalisman: FC<ConnectWalletProps> = (props) => {
  const { onConnect, setRequirements, ...rest } = props;
  const { connect } = useConnectorTalisman();

  const handleConnect = useCallback(async () => {
    onConnect?.();
    await connect();
  }, [onConnect, connect]);

  return (
    <ConnectButton
      {...rest}
      iconSrcOrReactElement={
        talismanWallet && (
          <StyledWalletIcon
            width={40}
            height={40}
            src={talismanWallet.logo.src}
            alt={talismanWallet.logo.alt}
          />
        )
      }
      onClick={handleConnect}
    >
      {talismanWallet.title}
    </ConnectButton>
  );
};
