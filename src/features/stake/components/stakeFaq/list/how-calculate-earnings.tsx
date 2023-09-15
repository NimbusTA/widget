import { Accordion } from '@lidofinance/lido-ui';

import { FC } from 'react';

import {
  explorerUrl,
  getTokenAddress,
  liquidToken,
  nativeToken,
  TOKENS,
} from 'config';

export const HowCalculateEarnings: FC = () => {
  return (
    <Accordion summary="How can I calculate my earnings?">
      <p>
        Due to the {liquidToken} nature, your current balance doesn&apos;t
        directly indicate the number of {nativeToken}s it&apos;s worth. To
        determine this, refer to the{' '}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`${explorerUrl}/token/${getTokenAddress(
            TOKENS.liquidToken,
          )}#readProxyContract#F14`}
        >
          <code>getPooledTokenByShares</code>
        </a>{' '}
        contract function.
      </p>
      <p>
        This will provide you with the amount of {nativeToken} tokens you would
        receive if you were to redeem all your {liquidToken} tokens today. To
        calculate your lifetime earnings, subtract the estimated {nativeToken}{' '}
        amount from the {nativeToken}s invested in the Nimbus program.
      </p>
      <p>
        We&apos;ll also make sure to provide all the related info seamlessly in
        the UI later 🙌 In addition, you can check the annualized staking APR to
        get an idea of your earnings.
      </p>
    </Accordion>
  );
};
