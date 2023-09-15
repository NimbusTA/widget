import { Box, InlineLoader, Tooltip } from '@lidofinance/lido-ui';
import { BigNumber } from 'ethers';

import { FC } from 'react';

import { format } from 'utils/format';

import { DEFAULT_VALUE } from 'config';
import { useXcTokenDecimals } from 'contracts';

type FormatArgs = {
  amount?: BigNumber | number;
  decimals?: number;
  decimalDigits?: number;
  minimize?: boolean;
};

type Props = Partial<FormatArgs> & {
  symbol?: string;
  approx?: boolean;
  decimalDigits?: number;
  minimize?: boolean;
  percent?: boolean;
  currency?: string;
  pending?: boolean;
};

const NumberFormat: FC<Props> = ({
  amount,
  approx,
  symbol,
  decimalDigits,
  percent,
  currency,
  pending,
}) => {
  const prefix =
    !approx ||
    (amount instanceof BigNumber && amount?.isZero()) ||
    (typeof amount === 'number' && amount === 0)
      ? ''
      : '≈ ';

  const decimals = useXcTokenDecimals();

  const value = format({ amount, decimals: decimals.data, decimalDigits });
  const valueFull = format({
    amount,
    decimals: decimals.data,
    decimalDigits: 8,
    min: null,
  });

  if (pending)
    return <InlineLoader style={{ flexBasis: '60%', minWidth: '60px' }} />;

  return value === DEFAULT_VALUE ? (
    <>{DEFAULT_VALUE}</>
  ) : (
    <Tooltip
      placement="bottom"
      title={
        <Box padding="12px!important">
          <span className="number full">
            {prefix}
            {currency ? currency : ''}
            {valueFull}
            {percent ? '%' : ''}
            &nbsp;
            {symbol}
          </span>
        </Box>
      }
    >
      <span className="number short">
        {prefix}
        {currency ? currency : ''}
        {value}
        {percent ? '%' : ''}
        &nbsp;
        {symbol}
      </span>
    </Tooltip>
  );
};

export default NumberFormat;
