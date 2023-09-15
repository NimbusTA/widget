import { trimAddress } from '@lidofinance/lido-ui';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

import { ValidatorLinkProps } from './types';
import {
  StyledValidatorsLink,
  ValidatorsText,
  ValidatorsTooltip,
} from './validatorsBlockStyles';

// This library uses styled components lib that is accessible only in browser
const Identicon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

const ValidatorsLinkComponent: FC<ValidatorLinkProps> = ({
  validatorAddress,
  link,
  fullInfo = false,
}) => (
  <ValidatorsTooltip
    offset="xs"
    placement="bottomLeft"
    title={validatorAddress}
  >
    <StyledValidatorsLink
      fullInfo={fullInfo}
      target="_blank"
      href={link}
      rel="noreferrer noopener"
    >
      <Identicon size={20} value={validatorAddress} theme="polkadot" />
      {fullInfo && (
        <ValidatorsText size="xxs" color="secondary">
          {trimAddress(validatorAddress, 3)}
        </ValidatorsText>
      )}
    </StyledValidatorsLink>
  </ValidatorsTooltip>
);

export const ValidatorsLink = React.memo(ValidatorsLinkComponent);
