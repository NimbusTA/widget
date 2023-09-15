import { IdenticonBadgeProps } from '@lidofinance/lido-ui';

import { Component } from 'types';

export type AddressBadgeComponent = Component<
  'div',
  Omit<IdenticonBadgeProps, 'address' | 'name' | 'as'> & {
    address?: string | null;
    name?: string | null;
  }
>;
