import PolkadotJsLogo from './assets/PolkadotLogo.svg';
// import SubWalletLogo from './SubWalletLogo.svg';
import TalismanLogo from './assets/TalismanLogo.svg';
import { WALLET_EXTENSIONS, WalletInfo } from './types';

export const PREDEFINED_WALLETS = {
  [WALLET_EXTENSIONS.POLKADOTJS]: {
    extensionName: WALLET_EXTENSIONS.POLKADOTJS,
    title: 'Polkadot{.js}',
    installUrl: 'https://polkadot.js.org/extension/',
    logo: {
      src: PolkadotJsLogo as string,
      alt: 'Polkadot{.js} Extension',
    },
  } as WalletInfo,
  // {
  //   extensionName: 'subwallet-js',
  //   title: 'SubWallet',
  //   installUrl:
  //     'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
  //   logo: {
  //     src: SubWalletLogo as string,
  //     alt: 'SubWallet',
  //   },
  // },
  [WALLET_EXTENSIONS.TALISMAN]: {
    extensionName: WALLET_EXTENSIONS.TALISMAN,
    title: 'Talisman',
    installUrl: 'https://www.talisman.xyz/',
    logo: {
      src: TalismanLogo as string,
      alt: 'Talisman',
    },
  } as WalletInfo,
};
