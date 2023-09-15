import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { liquidToken, xcToken, nativeToken, relayChainName } from 'config';

export const HowDoesNimbusWork: FC = () => {
  return (
    <Accordion summary="How does Nimbus work?">
      <p>
        An {xcToken} token holder connects their wallet and deposits their
        tokens into the Nimbus program. They immediately receive {liquidToken}{' '}
        tokens that represent a share of the total pool, and the Nimbus program
        delegates {nativeToken} to Nimbus-controlled validators on the{' '}
        {relayChainName} network. When these delegations accrue rewards on the
        allotted stake, the total {nativeToken} under management grows and this
        increases the value of {liquidToken} tokens.
      </p>
    </Accordion>
  );
};
