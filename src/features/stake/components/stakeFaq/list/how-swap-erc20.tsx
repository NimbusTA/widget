import { Accordion } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { nativeToken } from 'config';

export const HowSwapErc20: FC = () => {
  return (
    <Accordion summary={`How can I swap my ERC20 to ${nativeToken}?`}>
      <p>
        You can use bridges or exchanges to deposit ERC20 and withdraw native{' '}
        {nativeToken} tokens.
      </p>
    </Accordion>
  );
};
