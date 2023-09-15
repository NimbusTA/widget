import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

export const WhatIsActiveStake: FC = () => {
  return (
    <Accordion summary="What is an active stake?">
      <p>
        That is the amount of DOTs a ledger actively nominates chosen validators
        with.
      </p>
    </Accordion>
  );
};
