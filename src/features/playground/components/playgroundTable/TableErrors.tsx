import { FC, PropsWithChildren } from 'react';

import { ValidatorsError } from 'features/validators/validatorsError';

import { TableEmptyWrapper } from './styles';
import TableErrorWrapper from './TableErrorWrapper';

export const TableEmptyError: FC<PropsWithChildren> = () => (
  <TableErrorWrapper>
    <TableEmptyWrapper>No matching validators found.</TableEmptyWrapper>
  </TableErrorWrapper>
);

export const TableDefaultError: FC<{ onRefresh: () => void }> = ({
  onRefresh,
}) => (
  <TableErrorWrapper>
    <ValidatorsError onRefresh={onRefresh} />
  </TableErrorWrapper>
);
