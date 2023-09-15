import { isMobileOrTablet } from './userAgent';

declare global {
  interface Window {
    coin98?: boolean;
    talismanEth?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ethereum?: {
      isMetaMask?: boolean;
      isTalisman?: boolean;
    };
  }
}

export const hasInjected = (): boolean => {
  try {
    return !!window.ethereum;
  } catch (error) {
    return false;
  }
};

export const isDappBrowserProvider = (): boolean => {
  return isMobileOrTablet && hasInjected();
};

export const hasTalisman = (): boolean => {
  try {
    return !!window.talismanEth;
  } catch (error) {
    return false;
  }
};

export const isInjectedTalismanProvider = (): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return !!window.ethereum?.isTalisman;
  } catch (error) {
    return false;
  }
};

export const isTalismanProvider = (): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return !!window.talismanEth?.isTalisman;
  } catch (error) {
    return false;
  }
};
