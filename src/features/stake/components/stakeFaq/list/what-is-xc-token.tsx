import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { parachainName, xcToken, relayChainName, nativeToken } from 'config';

export const WhatIsXcToken: FC = () => {
  return (
    <Accordion summary={`What is ${xcToken}?`}>
      <p>
        {nativeToken} is {relayChainName}&apos;s native token. {nativeToken} is
        not ERC20 token and cannot be used by {parachainName} parachain users.
        To get around that, {xcToken} comes into play. {xcToken} is ERC20
        compatible token on the {parachainName} network, which can be received
        by users in exchange for {nativeToken}. A {nativeToken} holder locks
        their {nativeToken} on {relayChainName} and gets the same amount of{' '}
        {xcToken} on their {parachainName} account.
      </p>
    </Accordion>
  );
};
