import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import invariant from 'tiny-invariant';

import { CHAINS, defaultChain, nativeToken, relayChainName } from 'config';

export const WIKI_NOMINATORS_LINK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Moonbase]: 'https://wiki.polkadot.network/docs/learn-nominator',
  [CHAINS.Moonriver]: 'https://guide.kusama.network/docs/learn-nominator',
  [CHAINS.Moonbeam]: 'https://wiki.polkadot.network/docs/learn-nominator',
};

export const getWikiNominatorsLink = (chainId: CHAINS): string => {
  const wikiLink = WIKI_NOMINATORS_LINK[chainId];
  invariant(wikiLink != null, `Chain ${chainId} is not supported`);

  return wikiLink;
};

export const WhatIsNominator: FC = () => {
  return (
    <Accordion summary={`What is a nominator in ${relayChainName}?`}>
      <p>
        Nominator is someone who has {nativeToken}s and wants to get more of
        them by staking the already existing amount to{' '}
        <a
          target="_blank"
          rel="nofollow norefferer noreferrer"
          href={getWikiNominatorsLink(defaultChain)}
        >
          one or more validators
        </a>{' '}
        by nominating it.
      </p>
    </Accordion>
  );
};
