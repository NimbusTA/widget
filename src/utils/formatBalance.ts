import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { formatUnits } from '@ethersproject/units';

type FormatBalance = {
  balance?: BigNumber;
  decimals?: number;
  maxDecimalDigits?: number;
  minimize?: boolean;
};

export const formatBalance = (props: FormatBalance): string => {
  const {
    balance = Zero,
    decimals,
    maxDecimalDigits = 4,
    minimize = false,
  } = props;

  if (!decimals) return 'N/A';

  const balanceString = formatUnits(balance, decimals);

  if (minimize && !balance.eq(Zero)) {
    const MIN_VALUE = BigNumber.from(10).pow(decimals).div(10000); // 0.0001 in any decimals
    if (balance.lt(MIN_VALUE)) {
      const minValueString = formatUnits(MIN_VALUE, decimals);
      return `<${minValueString}`;
    }
  }

  if (balanceString.includes('.')) {
    const parts = balanceString.split('.');
    return parts[1].startsWith('0'.repeat(maxDecimalDigits))
      ? parts[0] + '.0'
      : parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
  }

  return balanceString;
};
