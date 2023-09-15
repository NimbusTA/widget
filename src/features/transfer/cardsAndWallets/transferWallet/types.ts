import { FC } from 'react';

import { Component } from 'types';

export type TransferWalletComponent = Component<
  'div',
  {
    reversed: boolean;
  }
>;

export type WalletDividerComponent = FC<{
  onReverse: () => void;
}>;
