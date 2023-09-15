import { trimAddress } from '@lidofinance/lido-ui';
import { ForwardedRef, forwardRef } from 'react';

import {
  IdenticonBadgeStyle,
  IdenticonAddressStyle,
  IdenticonStyle,
  IdenticonArrowStyle,
} from './styles';
import { IdenticonBadgeProps } from './types';

const SubstrateIdenticonBadgeComponent = (
  props: IdenticonBadgeProps,
  ref?: ForwardedRef<HTMLDivElement>,
) => {
  const {
    symbols = 3,
    color = 'background',
    diameter,
    address,
    name,
    paperStyles,
    svgStyles,
    ...rest
  } = props;
  const identiconProps = { address, diameter, paperStyles, svgStyles };

  return (
    <IdenticonBadgeStyle $color={color} {...rest} ref={ref}>
      <IdenticonAddressStyle>
        {name} ({trimAddress(address, symbols)})
      </IdenticonAddressStyle>
      <IdenticonStyle {...identiconProps} />
      <IdenticonArrowStyle />
    </IdenticonBadgeStyle>
  );
};

export default forwardRef(SubstrateIdenticonBadgeComponent);
