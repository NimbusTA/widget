import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { formatUnits } from '@ethersproject/units';
import { isUndefined } from '@polkadot/util';

import { DEFAULT_VALUE } from 'config';

export const toBigNumber = (amount: unknown): BigNumber | undefined => {
  try {
    return BigNumber.from(amount);
  } catch (e) {
    return undefined;
  }
};

export const replaceCommas = (amountString: string): string =>
  amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatString = (
  amountString: string,
  decimalDigits: number,
): string => {
  if (amountString === '0.0') return amountString;

  if (amountString.includes('.')) {
    const parts = amountString.split('.');
    const firstPart = replaceCommas(parts[0]);
    return decimalDigits > 0
      ? parts[1].startsWith('0'.repeat(decimalDigits))
        ? firstPart + '.0'
        : firstPart + '.' + parts[1].slice(0, decimalDigits).replace(/0*$/, '')
      : firstPart;
  }

  return amountString;
};

type FormatBig = {
  amount?: BigNumber;
  decimals: number;
  decimalDigits?: number;
  min?: BigNumber | null;
};

const MIN_BIG_VALUE = BigNumber.from(100000000); // 0.0001
const MIN_VALUE = 0.01;

// TODO: make min value dependent from decimals
export const formatBig = ({
  amount,
  decimals,
  decimalDigits = 0,
  min = MIN_BIG_VALUE,
}: FormatBig): string => {
  if (isUndefined(amount) || !decimals) return DEFAULT_VALUE;

  const balanceString = formatUnits(amount, decimals);

  if (min && amount.lt(min) && !amount.eq(Zero)) {
    return `<${formatBig({
      amount: BigNumber.from(min),
      decimals,
      decimalDigits: 6,
    })}`;
  }

  return formatString(balanceString, decimalDigits);
};

type FormatNumber = {
  amount?: number;
  decimals?: number;
  decimalDigits: number;
  min?: number | null;
};

export const formatNumber = ({
  amount,
  decimalDigits = 0,
  min = MIN_VALUE,
}: FormatNumber): string => {
  if (isUndefined(amount)) return DEFAULT_VALUE;

  if (min && amount !== 0 && amount < min) {
    return `<${min}`;
  }

  return formatString(amount.toFixed(decimalDigits).toString(), decimalDigits);
};

type FormatArgs<ValueType> = {
  amount?: ValueType;
  decimals?: number;
  decimalDigits?: number;
  min?: ValueType | null;
};

type ValueTypes = BigNumber | number;
export const format = <ValueType extends ValueTypes>({
  amount,
  decimals,
  decimalDigits = 0,
  min,
}: FormatArgs<ValueType>): string => {
  if (isUndefined(amount)) {
    return DEFAULT_VALUE;
  }

  if (amount instanceof BigNumber) {
    if (!decimals) return DEFAULT_VALUE;
    return formatBig({
      amount,
      decimals,
      decimalDigits,
      min: min instanceof BigNumber || min === null ? min : MIN_BIG_VALUE,
    });
  } else if (typeof amount === 'number') {
    return formatNumber({
      amount,
      decimalDigits,
      min: typeof min === 'number' || min === null ? min : MIN_VALUE,
    });
  } else {
    return DEFAULT_VALUE;
  }
};
