import { ContainerProps } from '@lidofinance/lido-ui';
import React from 'react';

export type LayoutProps = ContainerProps & {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
};
