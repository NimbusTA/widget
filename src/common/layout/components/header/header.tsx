import Link from 'next/link';
import { FC } from 'react';

import { headerLinks } from 'config';

import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
} from './headerStyles';
import { HeaderWallet } from './headerWallet';
import { Logo } from '../logo';
import { Navigation } from '../navigation';

export const Header: FC = () => (
  <HeaderStyle size="full" forwardedAs="header">
    <HeaderLogoStyle>
      <Link href="/">
        <Logo />
      </Link>
    </HeaderLogoStyle>
    <Navigation links={headerLinks} />
    <HeaderActionsStyle>
      <HeaderWallet />
    </HeaderActionsStyle>
  </HeaderStyle>
);
