import { FC } from 'react';

import { Nav } from './navigationStyles';
import NavLink from './navLink';
import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ links }) => (
  <Nav>
    {links.map(({ title, ...rest }) => (
      <NavLink key={title} title={title} {...rest} />
    ))}
  </Nav>
);
