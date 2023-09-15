import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

export const WhatIsLiquidStaking: FC = () => {
  return (
    <Accordion summary="What is liquid staking?">
      <p>
        Liquid staking protocols allow users to earn staking rewards without
        locking assets or maintaining staking infrastructure. Users can deposit
        tokens and receive tradable liquid tokens in return. Liquid staking
        combines the benefits of staking (earning rewards) and brings liquidity,
        as well as additional possibilities to increase your assets or hedge
        your positions by participating in DeFi.
      </p>
      <p>
        Additionally, the Nimbus program stakes tokens with top-performing
        validator nodes, which are permissionlessly selected. As users&apos;
        funds are controlled by the program, staking providers never have direct
        access to the users&apos; assets. Additionally, by involving different
        staking providers, Nimbus diversifies risks across multiple validators.
      </p>
    </Accordion>
  );
};
