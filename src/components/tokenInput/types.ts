import { InputProps } from '@lidofinance/lido-ui';

import { Component } from 'types';

type TokenInputProps = InputProps & {
  onMax?: () => void | undefined;
  locked?: boolean;
};

export type TokenInputComponent = Component<'input', TokenInputProps>;
