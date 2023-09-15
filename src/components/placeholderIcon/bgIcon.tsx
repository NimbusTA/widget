import { FC } from 'react';

export type bgShape = 'circle' | 'circleWithAngle';

export interface IIcon {
  shape?: bgShape;
}

interface IBgIcon extends IIcon {
  fillColor?: string;
}

export interface IIcons {
  [iconKey: string]: FC<IIcon>;
}

export const BgIcon: FC<IBgIcon> = ({
  shape = 'circle',
  fillColor = '#fff',
}) => (
  <>
    {shape === 'circle' && <circle cx="12" cy="12" r="12" fill={fillColor} />}
    {shape === 'circleWithAngle' && (
      <path
        d="M 12 0 H 20 Q 24 0 24 4 V 12 A 12 12 270 1 1 12 0"
        fill={fillColor}
      />
    )}
  </>
);
