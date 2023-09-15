import { Link, Text } from '@lidofinance/lido-ui';
import React, { FC } from 'react';

import { ListHeadingWrapper } from './styles';

// TODO: move as constant
const POLKADOT_VALIDATORS_LINK = 'https://polkadot.js.org/apps/#/staking';

const ListHeading: FC = () => (
  <ListHeadingWrapper>
    <Text size="sm" strong>
      Matching validators
    </Text>
    <Text size="xxs" color="secondary">
      In order to receive most from your stake you will need to nominate each
      validator in this table via{' '}
      <Link href={POLKADOT_VALIDATORS_LINK}>polkadot.js</Link>.
    </Text>
  </ListHeadingWrapper>
);

export default ListHeading;
