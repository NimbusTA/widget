import { PlaygroundResponseData } from './types';
import { PlaygroundData } from '../types';

export const mapPlaygroundRowTypeToUi = (
  row: PlaygroundResponseData,
): PlaygroundData => {
  return {
    points: row.era_points,
    validator: row.validator_key,
    commission: row.commission,
    activity: row.activity,
    apr: row.apr,
    stake: row.nominated_stake,
  };
};
