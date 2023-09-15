import { FC } from 'react';

export type TokenIconProps = {
  icon: string;
  alt?: string;
};

export type TokenIconComponent = FC<TokenIconProps>;
