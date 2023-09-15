import { Tbody, Tr } from '@lidofinance/lido-ui';

import { FC, PropsWithChildren } from 'react';

import { PLAYGROUND_TABLE_COLUMNS } from './constants';
import { TableErrorTd } from './styles';

const TableErrorWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Tbody>
    <Tr>
      <TableErrorTd colSpan={PLAYGROUND_TABLE_COLUMNS.length}>
        {children}
      </TableErrorTd>
    </Tr>
  </Tbody>
);

export default TableErrorWrapper;
