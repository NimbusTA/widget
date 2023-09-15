import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { liquidToken, nativeToken, xcToken } from 'config';

export const WhatIsLiquidToken: FC = () => {
  return (
    <Accordion summary={`What is ${liquidToken}?`}>
      <p>
        {liquidToken} is a liquid token that represents your share of the total{' '}
        {xcToken} pool deposited with Nimbus. As soon as you delegate to the
        pool, you receive the newly minted {liquidToken}. Over time, as your{' '}
        {nativeToken} delegation accrues rewards, the amount of your{' '}
        {liquidToken} increases. Interestingly, there is no waiting time for
        receiving {liquidToken} tokens. When a user delegates their{' '}
        {nativeToken} tokens, they do not need to perform or wait for the
        completion of any delegation or activation steps, as is the norm in
        traditional staking. The user can instantly exchange {liquidToken} for{' '}
        {xcToken} at any time in the open market.
      </p>
    </Accordion>
  );
};
