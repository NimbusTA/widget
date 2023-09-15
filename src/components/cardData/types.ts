import { Component } from 'types';

export type CardDataRowComponent = Component<
  'div',
  {
    title: React.ReactNode;
    value: React.ReactNode;
    loading?: boolean;
    help?: string;
    highlight?: boolean;
  }
>;
