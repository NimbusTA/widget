import { Td } from '@lidofinance/lido-ui';
import { FC } from 'react';

import NumberFormat from 'components/numberFormat';

import { TableCellProps } from '../types';

export const PercentCell: FC<TableCellProps<number>> = (props) => {
  const { value } = props;

  return (
    <Td align="right">
      {value ? <NumberFormat amount={value} percent decimalDigits={1} /> : '-'}
    </Td>
  );
};
