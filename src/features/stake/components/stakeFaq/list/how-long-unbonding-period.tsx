import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import invariant from 'tiny-invariant';

import { CHAINS, getChainUnbondingPeriod } from 'config';
import { defaultChain, relayChainName } from 'config';

export const HowLongUnbondingPeriod: FC = () => {
  invariant(defaultChain, 'Default chain is not defined');
  const parachainId = parseInt(defaultChain);

  return (
    <Accordion summary="How long goes unbonding period?">
      <p>
        In the {relayChainName} network unbonding period usually takes{' '}
        {getChainUnbondingPeriod(parachainId as CHAINS)}.
      </p>
    </Accordion>
  );
};
