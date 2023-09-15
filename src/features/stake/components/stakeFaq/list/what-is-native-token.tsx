import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { parachainToken, parachainName } from 'config';

export const WhatIsParachainToken: FC = () => {
  return (
    <Accordion summary={`What is ${parachainToken}?`}>
      <p>
        {parachainToken} is {parachainName}’s native token. As on Ethereum, the{' '}
        {parachainName} network charges some fee to execute a transaction. When
        you perform Stake, Unstake, or Claim, you have to pay a transactional
        cost, so you should hold {parachainToken} on your {parachainName}{' '}
        balance to cover it.
      </p>
    </Accordion>
  );
};
