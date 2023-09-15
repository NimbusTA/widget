import { ContainerProps } from '@lidofinance/lido-ui';
import { PropsWithChildren } from 'react';

export type MainProps = PropsWithChildren & Pick<ContainerProps, 'size'>;
