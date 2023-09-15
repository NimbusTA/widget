import React, { FC } from 'react';

import LogoIcon from 'assets/logo.png';

import { LogoImage, LogoStyle } from './logoStyles';

const LogoComponent: FC = (props) => (
  <LogoStyle {...props}>
    <LogoImage src={LogoIcon.src} alt="Nimbus logo" />
  </LogoStyle>
);

export const Logo = React.memo(LogoComponent);
