import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { liquidToken, nativeToken, relayChainName } from 'config';

export const RisksOfStakingWithNimbus: FC = () => {
  return (
    <Accordion summary="What are the risks of staking with Nimbus?">
      <ul>
        <li>
          <span>Downtime risk:</span>
          <p>
            {relayChainName} validators can go offline, in which case they do
            not earn staking rewards. To minimize this risk, Nimbus stakes
            across multiple professional and reputable node operators with
            heterogeneous setups. This will also serve to mitigate potential
            slashing risks.
          </p>
        </li>
        <li>
          <span>{liquidToken} price risk</span>
          <p>
            As mentioned above, withdrawals from the Nimbus program take some
            time to deactivate. Liquidity pools in the open market will be
            available for instantly redeeming {liquidToken} for {nativeToken}.
            On such pools, users risk an exchange price of {liquidToken}, which
            is lower than the inherent value due to withdrawal restrictions on
            Nimbus, making arbitrage and risk-free market-making impossible.
          </p>
        </li>
      </ul>
    </Accordion>
  );
};
