import { LockSmall, Tooltip } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { LockWrapper } from './inputLockStyles';

export const InputLocked: FC = (props) => (
  <Tooltip title="Locked Token" placement="top" {...props}>
    <LockWrapper>
      <LockSmall />
    </LockWrapper>
  </Tooltip>
);
