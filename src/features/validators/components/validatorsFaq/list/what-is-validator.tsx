import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import invariant from 'tiny-invariant';

import { CHAINS, defaultChain, relayChainName } from 'config';

export const WIKI_VALIDATORS_LINK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Moonbase]: 'https://wiki.polkadot.network/docs/learn-validator',
  [CHAINS.Moonriver]: 'https://guide.kusama.network/docs/learn-validator',
  [CHAINS.Moonbeam]: 'https://wiki.polkadot.network/docs/learn-validator',
};

export const getWikiValidatorsLink = (chainId: CHAINS): string => {
  const wikiLink = WIKI_VALIDATORS_LINK[chainId];
  invariant(wikiLink != null, `Chain ${chainId} is not supported`);

  return wikiLink;
};

export const WhatIsValidator: FC = () => (
  <Accordion summary={`What is a validator in ${relayChainName}?`}>
    <p>
      Since {relayChainName} is a NPoS-type of blockchain network, validators
      are those participants, who are willing to keep {relayChainName} network
      working, while receiving rewards for it. They are{' '}
      <a
        target="_blank"
        rel="nofollow norefferer noreferrer"
        href={getWikiValidatorsLink(defaultChain)}
      >
        staking and participating
      </a>{' '}
      in consensus.
    </p>
  </Accordion>
);
