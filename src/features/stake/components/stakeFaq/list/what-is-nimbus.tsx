import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { nativeToken } from 'config';

export const WhatIsNimbus: FC = () => {
  return (
    <Accordion defaultExpanded summary="What is Nimbus?">
      <p>
        Nimbus is a liquid staking solution for {nativeToken} with a strong node
        selector algorithm.
      </p>
      <p>
        Nimbus lets users earn {nativeToken} staking rewards without needing to
        maintain infrastructure and enables them to trade staked positions, as
        well as participate in on-chain decentralized finance with their staked
        assets.
      </p>
      <p>Nimbus gives you:</p>
      <ul>
        <li>
          Liquidity through tokenization — no activation delays and the ability
          to sell your staked tokens or use them as collateral in decentralized
          finance;
        </li>
        <li>One-click staking — no complicated steps;</li>
        <li>
          Decentralized security — assets spread across the top performing
          validator nodes.
        </li>
      </ul>
    </Accordion>
  );
};
