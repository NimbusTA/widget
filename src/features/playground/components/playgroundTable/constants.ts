import { TableConfig } from './types';
import { CELL_TYPES } from '../table';

export const PLAYGROUND_TABLE_TEXT = {
  headers: {
    validator: 'Validator',
    apr: 'Apr',
    commission: 'Commission',
    activity: 'Activity',
    points: 'Era points',
    stake: 'Nominated Stake',
  },
};

export const PLAYGROUND_TABLE_COLUMNS = [
  'validator',
  'apr',
  'commission',
  'activity',
  'points',
  'stake',
] as const;

export const PLAYGROUND_TABLE_CONFIG: TableConfig = {
  columnsOrder: [
    {
      field: 'validator',
      name: PLAYGROUND_TABLE_TEXT.headers.validator,
      type: CELL_TYPES.VALIDATOR,
    },
    {
      field: 'apr',
      name: PLAYGROUND_TABLE_TEXT.headers.apr,
      type: CELL_TYPES.PERCENT,
      align: 'right',
    },
    {
      field: 'commission',
      name: PLAYGROUND_TABLE_TEXT.headers.commission,
      align: 'right',
      type: CELL_TYPES.PERCENT,
    },
    {
      field: 'activity',
      name: PLAYGROUND_TABLE_TEXT.headers.activity,
      align: 'right',
      type: CELL_TYPES.NUMBER,
    },
    {
      field: 'points',
      name: PLAYGROUND_TABLE_TEXT.headers.points,
      align: 'right',
      type: CELL_TYPES.NUMBER,
    },
    {
      field: 'stake',
      name: PLAYGROUND_TABLE_TEXT.headers.stake,
      align: 'right',
      type: CELL_TYPES.TOKEN,
    },
  ],
  columnsConfig: {},
  page: 1,
  take: 5,
};
