import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { NavLinkStyle } from './navigationStyles';
import { NavLinkProps } from './types';

const NavLink: FC<NavLinkProps> = (props) => {
  const { href, title, icon, prefetch } = props;
  const router = useRouter();
  return (
    <Link href={href} prefetch={prefetch}>
      <NavLinkStyle active={router.route === href}>
        {icon}
        {title}
      </NavLinkStyle>
    </Link>
  );
};

export default NavLink;
