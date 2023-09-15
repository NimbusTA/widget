// import { isMobileOrTablet } from './ua';
import type { InjectedWindowProvider } from '@polkadot/extension-inject/types';
import { Balance } from '@polkadot/types/interfaces';
import { BN, bnToBn } from '@polkadot/util';
import { ToBn } from '@polkadot/util/types';

import { isEmptyObject } from 'utils';

import { WalletAccount } from './provider';

declare global {
  interface Window {
    injectedWeb3?: Record<string, InjectedWindowProvider>;
  }
}

export const hasInjected = (): boolean => {
  try {
    return !!window && !!window.injectedWeb3;
  } catch (error) {
    return false;
  }
};

export const formatSubstrateBalance = (
  balance: Balance,
  chainTokens: string[],
): string => {
  return balance.toHuman() === '0'
    ? `0.0 ${chainTokens && chainTokens.length > 0 && chainTokens[0]}`
    : balance.toHuman();
};

// Formats a string/number with <prefix>.<postfix> notation
export const formatDecimalBalance = <ExtToBn extends ToBn>(
  input: number | string | BN | bigint | ExtToBn,
  decimals: number,
  maxDecimalDigits = 4,
): string => {
  let text = bnToBn(input).toString();

  if (text.length === 0 || text === '0') {
    return '0';
  }

  // strip the negative sign so we can work with clean groupings, re-add this in the
  // end when we return the result (from here on we work with positive numbers)
  const isNegative = text[0].startsWith('-');

  if (isNegative) {
    text = text.substr(1);
  }

  // NOTE We start at midpoint (8) minus 1 - this means that values display as
  // 123.456 instead of 0.123k (so always 6 relevant). Additionally we use ceil
  // so there are at most 3 decimal before the decimal separator
  const mid = text.length - decimals;
  const prefix = text.substr(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;

  const postfix = `${`${new Array(padding + 1).join('0')}${text}`.substr(
    mid < 0 ? 0 : mid,
  )}0000`.substr(0, maxDecimalDigits);

  return `${isNegative ? '-' : ''}${prefix || '0'}.${postfix}`.replace(
    /(\.[0-9]*[1-9])0+$|\.0*$/,
    '$1',
  );
};

// Substrate account can be null, {}
// Can't use any of empty values
export const isAccountEmpty = (account: WalletAccount | null): boolean =>
  !account || isEmptyObject(account);
