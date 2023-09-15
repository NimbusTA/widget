import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

export const WhatFee: FC = () => {
  return (
    <Accordion summary="What fee is applied by Nimbus?">
      <p>
        Nimbus applies a 10% fee on a user&apos;s staking rewards. This fee is
        split between the DAO treasury, and Nimbus developers. This fee cut is
        applied to incentivize Nimbus maintainers.
      </p>
    </Accordion>
  );
};
