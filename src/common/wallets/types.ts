export enum WALLET_EXTENSIONS {
  POLKADOTJS = 'polkadot-js',
  // SUBWALLET = 'subwallet-js',
  TALISMAN = 'talisman',
}

export interface WalletLogoProps {
  src: string;
  alt: string;
}

type ExtendedWalletInfo = {
  errorText?: string;
  requirementsText?: string;
  installUrlAndroid?: string;
  installUrlIOS?: string;
};

export interface WalletInfo extends ExtendedWalletInfo {
  extensionName: WALLET_EXTENSIONS;
  title: string;
  installUrl: string;
  logo: WalletLogoProps;
}
