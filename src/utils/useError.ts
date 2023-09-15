import fp from 'lodash/fp';
import { useMemo } from 'react';

export type Checker<T> = {
  condition: boolean | ((value: T) => boolean);
  message: string;
};

export const useError = <T extends any>(
  value?: T,
  shouldCheck = true,
  checkers?: Checker<T>[],
): string | undefined => {
  const error = useMemo(
    () =>
      shouldCheck
        ? fp.find(({ condition }) => {
            if (typeof condition === 'boolean') return condition;
            else if (typeof condition === 'function' && value)
              return condition(value);
            else return false;
          }, checkers)
        : undefined,
    [checkers, shouldCheck, value],
  );

  return error?.message || undefined;
};
