import { Button, ButtonProps } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { useSubstrateModal, MODAL } from 'features/transfer';

const WalletConnectButtonSubstrate: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useSubstrateModal(MODAL.connect);

  return (
    <Button onClick={openModal} variant="filled" color="primary" {...rest}>
      Connect Dotsama account
    </Button>
  );
};

export default WalletConnectButtonSubstrate;
