import { BigNumber } from '@ethersproject/bignumber';

import { Component } from 'types';

export type FormatTokenComponent = Component<
  'span',
  {
    symbol: string;
    amount?: BigNumber | null;
    approx?: boolean;
    decimals: number;
    maxDigits?: number;
    minimize?: boolean;
  }
>;
