import { ThProps } from '@lidofinance/lido-ui';

import { PlaygroundData } from 'features/playground/types';

import { CELL_TYPES } from './constants';

export type Column<T> = {
  field: keyof T;
  name?: string;
  align?: ThProps['align'];
  type: CELL_TYPES;
};

type ColumnsConfigType = 'number';

interface ColumnsConfig {
  type?: ColumnsConfigType;
}

export type ColumnConfig<T extends symbol | string | number> =
  | Partial<Record<T, ColumnsConfig>>
  | undefined;

export interface TableHeaderProps {
  columns: Column<PlaygroundData>[];
  config?: ColumnConfig<keyof PlaygroundData>;
}

export interface TableRowProps {
  columns: Column<PlaygroundData>[];
  data: PlaygroundData;
  config: ColumnConfig<keyof PlaygroundData>;
}

export interface TableCellProps<TData> {
  value: TData;
  column: Column<PlaygroundData>;
  cellConfig?: ColumnsConfig;
  data: PlaygroundData;
}
