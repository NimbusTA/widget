import { BigNumber } from '@ethersproject/bignumber';
import { Td } from '@lidofinance/lido-ui';
import { FC } from 'react';

import NumberFormat from 'components/numberFormat';

import { TableCellProps } from '../types';

export const TokenCell: FC<TableCellProps<BigNumber>> = (props) => {
  const { value } = props;

  return (
    <Td align="right" numeric>
      <NumberFormat decimalDigits={4} amount={value} />
    </Td>
  );
};
