import { ButtonProps } from '@lidofinance/lido-ui';
import React, { FC } from 'react';

import { StyledFilter } from './styles';

type FilterProps = ButtonProps & {
  isActive: boolean;
  help?: string | null;
};

export const Filter: FC<FilterProps> = ({
  isActive,
  help,
  children,
  ...props
}) => (
  <StyledFilter $help={help} disabled={isActive} {...props}>
    {isActive && (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4344 8.29289C17.8249 8.68342 17.8249 9.31658 17.4344 9.70711L11.4344 15.7071C11.0439 16.0976 10.4107 16.0976 10.0202 15.7071L7.29289 12.9798C6.90237 12.5893 6.90237 11.9561 7.29289 11.5656C7.68342 11.1751 8.31658 11.1751 8.70711 11.5656L10.7273 13.5858L16.0202 8.29289C16.4107 7.90237 17.0439 7.90237 17.4344 8.29289Z"
        />
      </svg>
    )}
    {children}
  </StyledFilter>
);
