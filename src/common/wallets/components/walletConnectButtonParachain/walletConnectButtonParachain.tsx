import { useSupportedChains } from '@lido-sdk/web3-react';
import { Button, ButtonProps } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { useModal } from 'common/layout';
import { MODAL } from 'providers';

export const WalletConnectButtonParachain: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { isUnsupported } = useSupportedChains();
  const { openModal } = useModal(MODAL.connect);

  return (
    <Button
      disabled={isUnsupported}
      onClick={openModal}
      variant={isUnsupported ? 'translucent' : 'filled'}
      color={isUnsupported ? 'secondary' : 'primary'}
      {...rest}
    >
      {isUnsupported ? 'Unsupported chain' : 'Connect EVM account'}
    </Button>
  );
};
