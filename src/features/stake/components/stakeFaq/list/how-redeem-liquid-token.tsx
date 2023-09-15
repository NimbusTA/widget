import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import invariant from 'tiny-invariant';

import { CHAINS, getChainUnbondingPeriod } from 'config';
import {
  defaultChain,
  liquidToken,
  nativeToken,
  relayChainName,
  xcToken,
} from 'config';

export const HowRedeemLiquidToken: FC = () => {
  invariant(defaultChain, 'Default chain is not defined');
  const parachainId = parseInt(defaultChain);

  return (
    <Accordion summary={`How can I redeem ${liquidToken} for ${nativeToken}?`}>
      <p>
        Withdrawals of {xcToken} from the Nimbus program can be done through the
        Unstake tab. However, unstaking directly from the Nimbus program will
        incur the {relayChainName} stake unbonding period, which is roughly{' '}
        {getChainUnbondingPeriod(parachainId as CHAINS)}. Immediate withdrawal
        options will be available in the open market through liquidity pools on
        AMM protocols and other DEXes where one will be able to immediately
        exchange {liquidToken} for {xcToken}. If you wish to instantly receive{' '}
        {xcToken}, we recommend trading {liquidToken} directly on an exchange.
      </p>
    </Accordion>
  );
};
