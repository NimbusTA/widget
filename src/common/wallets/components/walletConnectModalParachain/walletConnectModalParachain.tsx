import {
  WalletsModal,
  WalletsModalProps,
} from '@lidofinance/blocks-connect-wallet-modal';
import { FC } from 'react';

import { useThemeToggle } from 'common/layout';

import { ConnectMetamask, ConnectTalisman } from '../connectors';

export const WalletConnectModalParachain: FC<WalletsModalProps> = (props) => {
  const { themeName } = useThemeToggle();

  return (
    <WalletsModal
      title="Connect wallet"
      shouldInvertWalletIcon={themeName === 'dark'}
      {...props}
    >
      {(commonProps) => (
        <>
          <ConnectMetamask key="Metamask" {...commonProps} />
          <ConnectTalisman key="Talisman" {...commonProps} />
        </>
      )}
    </WalletsModal>
  );
};
