import { Tr, Thead, Th } from '@lidofinance/lido-ui';

import { TableHeaderProps } from './types';

export const TableHeader = (props: TableHeaderProps): JSX.Element => {
  const { columns } = props;

  return (
    <Thead sticky>
      <Tr>
        {columns.map(({ field, name, align }) => (
          <Th key={String(field)} align={align}>
            {name || field}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};
