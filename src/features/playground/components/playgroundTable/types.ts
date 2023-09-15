import { PlaygroundData } from '../../types';
import { ColumnConfig, Column } from '../table/types';

export type TableConfig = {
  columnsOrder: Column<PlaygroundData>[];
  page: number;
  take: number;
  columnsConfig?: ColumnConfig<keyof PlaygroundData>;
};

export interface TableProps {
  data: PlaygroundData[];
  pending: boolean;
  error?: Error | null;
  onRefresh: () => void;
}
