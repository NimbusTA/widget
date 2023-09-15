import fp from 'lodash/fp';
import React, { FC } from 'react';

import { themeLight } from 'styles';

import { BgIcon, bgShape } from './bgIcon';

export type PlaceholderIconProps = {
  name: string;
  isExact?: boolean;
  shape?: bgShape;
  bgColor?: string;
  textColor?: string;
};

const formatPlaceholderName = (name: string) =>
  fp.pipe(
    fp.replace(/[-.]/g, ' '),
    fp.replace(/([^ a-zA-Z0-9])/g, ''),
    fp.split(' '),
    fp.filter(fp.identity),
    fp.take(2),
    fp.map((str) => str.substring(0, 1).toUpperCase()),
    fp.join(''),
  )(name);

export const PlaceholderIconComponent: FC<PlaceholderIconProps> = ({
  name,
  isExact = false,
  shape = 'circle',
  bgColor = themeLight.colors.primary,
  textColor = '#FFF',
}) => {
  const title = isExact ? name : formatPlaceholderName(name);

  return (
    <svg viewBox="0 0 24 24">
      <BgIcon shape={shape} fillColor={bgColor} />
      <text
        textAnchor="middle"
        fontSize={`${0.4 / title.length + 0.6}em`}
        dy="0.36em"
        x="12"
        y="12"
        fill={textColor}
      >
        {title}
      </text>
    </svg>
  );
};

export const PlaceholderIcon = React.memo(PlaceholderIconComponent);
