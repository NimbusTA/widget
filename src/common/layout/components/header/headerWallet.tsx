import { useWeb3 } from '@lido-sdk/web3-react';
import { FC } from 'react';

import { WalletButton, WalletConnectButtonParachain } from '../../../wallets';
import { ThemeToggler } from '../themeToggler';

export const HeaderWallet: FC = () => {
  const { active } = useWeb3();

  return (
    <>
      {active ? <WalletButton /> : <WalletConnectButtonParachain size="sm" />}
      <ThemeToggler />
    </>
  );
};
