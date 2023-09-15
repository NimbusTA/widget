import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import {
  explorerUrl,
  getTokenAddress,
  liquidToken,
  TOKENS,
  xcToken,
} from 'config';

export const HowRateCalculated: FC = () => {
  return (
    <Accordion summary="How the staking exchange rate is calculated?">
      <p>
        The number of {liquidToken}s you will receive is determined by the share
        of your deposited tokens in the total volume of already staked tokens.
        In other words, the {liquidToken}s you will obtain represent the
        proportion of {xcToken}s you will add to the pool.
      </p>
      <p>
        <code>
          {liquidToken} amount ={' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`${explorerUrl}/token/${getTokenAddress(
              TOKENS.liquidToken,
            )}#readProxyContract#F15`}
          >
            getSharesByPooledToken
          </a>
          (amount of {xcToken})
        </code>
      </p>
    </Accordion>
  );
};
