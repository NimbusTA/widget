import { Tr } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { TableCell } from './TableCell';
import { TableRowProps } from './types';

export const TableRow: FC<TableRowProps> = (props): JSX.Element => {
  const { columns, data, config, ...rest } = props;

  return (
    <Tr>
      {columns.map((column) => (
        <TableCell
          key={String(column.field)}
          column={column}
          value={data[column.field]}
          cellConfig={config?.[column.field]}
          data={data}
          {...rest}
        />
      ))}
    </Tr>
  );
};
