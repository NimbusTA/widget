import { FC } from 'react';

import { MainStyle } from './mainStyles';
import { MainProps } from './types';

export const Main: FC<MainProps> = ({ size = 'tight', ...props }) => {
  return <MainStyle size={size} forwardedAs="main" {...props} />;
};
