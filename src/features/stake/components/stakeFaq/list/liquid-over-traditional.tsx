import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { nativeToken, relayChainName } from 'config';

export const LiquidOverTraditional: FC = () => {
  return (
    <Accordion summary="Why should I prefer liquid staking over traditional?">
      <p>
        In traditional {relayChainName} staking a user has to perform several
        steps manually:
      </p>
      <ul>
        <li>Create a Stash Account and bond {nativeToken} to it;</li>
        <li>Nominate validators;</li>
        <li>Monitor validator&apos;s yield to maximize profit.</li>
      </ul>
      <p>
        Staking on {relayChainName} requires expert knowledge, the main being
        the fact that slashing can get very severe if the staking is managed
        improperly.
      </p>
      <p>
        Staking {nativeToken} through Nimbus will come with a variety of
        benefits:
      </p>
      <ul>
        <li>
          One-step process — just deposit into the pool with a single click.
        </li>
        <li>The pool takes care of validator diversification.</li>
        <li>
          Immediate appreciation — you start earning from the pool from the
          moment of deposit.
        </li>
      </ul>
    </Accordion>
  );
};
