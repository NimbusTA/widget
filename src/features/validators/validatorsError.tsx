import { Button, Link, Text } from '@lidofinance/lido-ui';
import React, { FC } from 'react';

import { FakeTableRow } from './validatorsBlockStyles';

export const ValidatorsError: FC<{ onRefresh: () => void }> = ({
  onRefresh,
}) => (
  <FakeTableRow>
    <Text size="xxs">
      😞
      <br />
      <Text strong as="span" size="xxs" color="error">
        Sorry
      </Text>
      , it seems an error occurred while loading the data. Please, try again
      later and refresh the page.
      <br />
      If this error repeats, please contact our{' '}
    </Text>
    <Button onClick={onRefresh} size="xxs" variant="translucent">
      Refresh
    </Button>
  </FakeTableRow>
);
