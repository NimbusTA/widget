import { openWindow } from '@lido-sdk/helpers';
import {
  WalletsModal,
  WalletsModalProps,
  ConnectButton,
} from '@lidofinance/lido-ui-blocks';

import { getWalletBySource, Wallet } from '@talismn/connect-wallets';

import { FC, useCallback } from 'react';

import { useThemeToggle } from 'common/layout';
import { WALLET_EXTENSIONS } from 'common/wallets';

import { useSubstrate } from 'features/transfer';

const dotsamaWallets = [
  getWalletBySource(WALLET_EXTENSIONS.POLKADOTJS),
  getWalletBySource(WALLET_EXTENSIONS.TALISMAN),
];

const WalletConnectModalSubstrate: FC<WalletsModalProps> = (props) => {
  const { themeName } = useThemeToggle();
  const { setWallet } = useSubstrate();

  const onSelectWallet = useCallback(
    (walletKey: string) => {
      setWallet(getWalletBySource(walletKey));
    },
    [setWallet],
  );

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet, onConnect: () => void) => () => {
      if (wallet.installed) {
        onSelectWallet(wallet.extensionName);
        onConnect?.();
      } else {
        openWindow(wallet.installUrl);
      }
    },
    [onSelectWallet],
  );

  return (
    <WalletsModal
      title="Connect wallet"
      shouldInvertWalletIcon={themeName === 'dark'}
      {...props}
    >
      {({ onConnect, ...connectProps }) => (
        <>
          {dotsamaWallets.map(
            (dotWallet) =>
              dotWallet && (
                <ConnectButton
                  {...connectProps}
                  key={dotWallet.extensionName}
                  iconSrcOrReactElement={dotWallet.logo.src}
                  onClick={onClickDotsamaWallet(dotWallet, onConnect)}
                  title={dotWallet.title}
                >
                  {dotWallet.title}
                </ConnectButton>
              ),
          )}
        </>
      )}
    </WalletsModal>
  );
};

export default WalletConnectModalSubstrate;
