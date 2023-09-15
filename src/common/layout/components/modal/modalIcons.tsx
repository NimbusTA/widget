import { Error, Success } from '@lidofinance/lido-ui';
import React from 'react';

import { ModalIconStyle } from './modalStyles';

export const RoundErrorIcon = (): JSX.Element => (
  <ModalIconStyle>
    <Error
      style={{
        width: 64,
        height: 64,
      }}
    />
  </ModalIconStyle>
);

export const RoundCheckIcon = (): JSX.Element => (
  <ModalIconStyle>
    <Success
      style={{
        fill: '#61B75F',
        width: 64,
        height: 64,
      }}
    />
  </ModalIconStyle>
);
