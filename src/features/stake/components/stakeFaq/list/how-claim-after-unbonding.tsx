import { Accordion } from '@lidofinance/lido-ui';

import { FC } from 'react';

import { xcToken } from 'config';

export const HowClaimAfterUnbonding: FC = () => {
  return (
    <Accordion
      summary={`How can I claim my ${xcToken} tokens after unbonding?`}
    >
      <p>
        When unbonding period is over, you can claim your {xcToken} tokens, that
        your request for redeem, simply by clicking on the &quot;Claim&quot;
        button on the &quot;Unstake&quot; page.
      </p>
    </Accordion>
  );
};
