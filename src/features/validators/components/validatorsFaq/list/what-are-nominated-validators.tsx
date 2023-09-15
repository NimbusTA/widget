import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import invariant from 'tiny-invariant';

import { CHAINS, getChainEraPeriod } from 'config';
import { defaultChain, relayChainName, subscanExplorerUrl } from 'config';

export const WhatAreNominatedValidators: FC = () => {
  invariant(defaultChain, 'Default chain is not defined');
  const parachainId = parseInt(defaultChain);

  return (
    <Accordion summary="What are nominated validators in the current era?">
      <p>
        Those are {relayChainName} addresses of Validators from nomination, that
        are active in the current era which is{' '}
        <a
          target="_blank"
          rel="nofollow norefferer noreferrer"
          href="https://support.polkadot.network/support/solutions/articles/65000168050-what-is-an-era-"
        >
          a period of {getChainEraPeriod(parachainId as CHAINS)}.
        </a>
        .
      </p>
      <p>
        Validators&apos; addresses are in the {relayChainName} blockchain
        because actual staking happens in the {relayChainName} Relay Chain. You
        may follow the link and see details on{' '}
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={subscanExplorerUrl}
        >
          Subscan
        </a>
        , which is an explorer for the
        {relayChainName} network.
      </p>
    </Accordion>
  );
};
