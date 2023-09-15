import { LidoComponentProps } from '@lidofinance/lido-ui';

export enum IdenticonBadgeColor {
  background,
  accent,
}

export type IdenticonBadgeColors = keyof typeof IdenticonBadgeColor;

export type IdenticonProps = LidoComponentProps<
  'div',
  {
    address: string;
    name: string;
    diameter?: number;
    paperStyles?: React.CSSProperties;
    svgStyles?: React.CSSProperties;
  }
>;

export type IdenticonBadgeProps = {
  symbols?: number;
  color?: IdenticonBadgeColors;
} & IdenticonProps;
