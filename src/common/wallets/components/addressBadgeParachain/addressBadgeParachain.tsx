import { useBreakpoint } from '@lidofinance/lido-ui';

import { AddressBadgeStyle } from './styles';
import { AddressBadgeComponent } from './types';

export const AddressBadgeParachain: AddressBadgeComponent = (props) => {
  const { address, name, ...rest } = props;
  const isMobile = useBreakpoint('md');

  return (
    <AddressBadgeStyle
      symbols={isMobile ? 3 : 6}
      address={address ?? ''}
      {...rest}
    />
  );
};
