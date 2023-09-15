import { FC } from 'react';

import { CELL_TYPES } from './constants';
import {
  NumberCell,
  PercentCell,
  TokenCell,
  ValidatorCell,
} from './TableCells';
import { TableCellProps } from './types';

const getComponent = (type?: CELL_TYPES): FC<TableCellProps<any>> => {
  switch (type) {
    case CELL_TYPES.NUMBER:
      return NumberCell;
    case CELL_TYPES.PERCENT:
      return PercentCell;
    case CELL_TYPES.TOKEN:
      return TokenCell;
    case CELL_TYPES.VALIDATOR:
      return ValidatorCell;
    default:
      // eslint-disable-next-line react/display-name
      return () => <></>;
  }
};

export const TableCell: FC<TableCellProps<any>> = (props): JSX.Element => {
  const Component = getComponent(props.column.type);

  return <Component {...props} />;
};
