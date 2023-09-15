import { ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  title: string;
  icon: ReactNode;
  prefetch?: boolean;
}

export interface NavigationProps {
  links: NavLinkProps[];
}
