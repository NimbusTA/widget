import { FC } from 'react';

import { LayoutTitleStyle, LayoutSubTitleStyle } from './layoutStyles';
import { LayoutProps } from './types';
import { Footer } from '../footer';
import { Header } from '../header';
import { Main } from '../main';

export const Layout: FC<LayoutProps> = (props) => {
  const { title, subtitle, size, children } = props;

  return (
    <>
      <Header />
      <Main size={size}>
        <LayoutTitleStyle>{title}</LayoutTitleStyle>
        <LayoutSubTitleStyle>{subtitle}</LayoutSubTitleStyle>
        {children}
      </Main>
      <Footer />
    </>
  );
};
