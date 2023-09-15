import React, { ForwardedRef, forwardRef } from 'react';

import {
  PlaceholderIcon,
  PlaceholderIconProps,
} from 'components/placeholderIcon';

import { iconsMap } from './iconsMap';

type IconProps = PlaceholderIconProps & {
  iconKey?: string;
};

const IconComponent = (
  { iconKey, name, isExact, shape = 'circle', ...props }: IconProps,
  ref?: ForwardedRef<any>,
) => {
  const BaseIcon = iconKey && iconsMap[iconKey];
  return (
    <div ref={ref} {...props}>
      {(BaseIcon && <BaseIcon shape={shape} />) || (
        <PlaceholderIcon name={name} isExact={isExact} shape={shape} />
      )}
    </div>
  );
};

export const Icon = forwardRef(IconComponent);
