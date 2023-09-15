import { FC } from 'react';

import {
  FooterStyle,
  FooterDividerStyle,
  FooterLogoStyle,
  FooterGroupStyle,
  FooterItemStyle,
} from './footerStyles';
import { Logo } from '../logo';

export const Footer: FC = () => (
  <FooterStyle size="full" forwardedAs="footer">
    <FooterDividerStyle />

    <FooterLogoStyle>
      <Logo />
    </FooterLogoStyle>

    <FooterGroupStyle>
      <FooterItemStyle>
        Proudly crafted with love from all over the world 🌍
      </FooterItemStyle>
    </FooterGroupStyle>
  </FooterStyle>
);
