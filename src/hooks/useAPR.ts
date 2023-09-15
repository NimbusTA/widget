import { DEFAULT_VALUE, FREQUENCY } from 'config';

import { useStatistics } from './useStatistics';
import { numberWithCommas } from '../utils';

const getApyFromApr = (APR: number) => {
  return ((1 + APR / 100 / FREQUENCY) ** FREQUENCY - 1) * 100;
};

export const useAPR = (isApy = false): number | typeof DEFAULT_VALUE => {
  const statistics = useStatistics();
  const APR = statistics?.data?.APRPerMonth;

  if (!APR) return DEFAULT_VALUE;

  return isApy ? getApyFromApr(APR) : APR;
};

type DefaultedValueType = number | typeof DEFAULT_VALUE;

export const formatAPR = (
  apr: DefaultedValueType | undefined,
): string | typeof DEFAULT_VALUE =>
  apr && apr !== DEFAULT_VALUE ? numberWithCommas(apr, 1) + '%' : DEFAULT_VALUE;
