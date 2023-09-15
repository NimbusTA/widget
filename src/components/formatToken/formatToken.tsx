import { Zero } from '@ethersproject/constants';

import { formatBalance } from 'utils';

import { FormatTokenComponent } from './types';

const FormatToken: FormatTokenComponent = (props) => {
  const {
    amount,
    decimals,
    maxDigits,
    symbol,
    approx = false,
    minimize = false,
    ...rest
  } = props;
  const prefix = !approx || amount?.isZero() ? '' : '≈ ';

  return (
    <span {...rest}>
      {prefix}
      {formatBalance({
        balance: amount || Zero,
        decimals,
        maxDecimalDigits: maxDigits,
        minimize,
      })}
      &nbsp;
      {symbol}
    </span>
  );
};

export default FormatToken;
