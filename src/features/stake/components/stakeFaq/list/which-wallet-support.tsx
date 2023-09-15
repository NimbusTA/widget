import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

export const WhichWalletSupport: FC = () => {
  return (
    <Accordion summary="Which wallets do you support?">
      <p>
        As of now, we support only Metamask and Talisman. We are working on the
        adoption of other commonly used wallets.
      </p>
    </Accordion>
  );
};
