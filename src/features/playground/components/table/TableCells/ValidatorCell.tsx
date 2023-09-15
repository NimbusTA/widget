import { Link, Td, trimAddress } from '@lidofinance/lido-ui';
import React, { FC } from 'react';

import { getPolkadotValidatorLink } from 'features/validators/config';

import { TableCellProps } from '../types';

export const ValidatorCell: FC<TableCellProps<string>> = (props) => {
  const { value } = props;
  return (
    <Td>
      <Link href={getPolkadotValidatorLink(value)}>
        {trimAddress(value, 4)}
      </Link>
    </Td>
  );
};
