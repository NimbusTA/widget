import { useSDK } from '@lido-sdk/react';
import { useDisconnect } from '@lido-sdk/web3-react';
import {
  ButtonIcon,
  Modal,
  ModalProps,
  Identicon,
  Copy,
  trimAddress,
} from '@lidofinance/lido-ui';

import { FC, useCallback, useEffect, useMemo } from 'react';

import { useCopyToClipboard } from 'hooks';

import { useConnectorInfo } from '../../hooks';
import {
  WalletModalContentStyle,
  WalletModalConnectedStyle,
  WalletModalConnectorStyle,
  WalletModalDisconnectStyle,
  WalletModalAccountStyle,
  WalletModalAddressStyle,
  WalletModalActionsStyle,
} from '../accountModal';

export const AccountModalParachain: FC<ModalProps> = (props) => {
  const { onClose } = props;
  const { account } = useSDK();
  const { providerName } = useConnectorInfo();
  const { disconnect } = useDisconnect();

  const handleDisconnect = useCallback(() => {
    disconnect?.();
    onClose?.();
  }, [disconnect, onClose]);

  useEffect(() => {
    if (!account) {
      onClose?.();
    }
  }, [account, onClose]);

  const trimmedAddress = useMemo(
    () => trimAddress(account ?? '', 6),
    [account],
  );

  const handleCopy = useCopyToClipboard(account ?? '');

  return (
    <Modal title="Account" {...props}>
      <WalletModalContentStyle>
        <WalletModalConnectedStyle>
          {providerName && (
            <WalletModalConnectorStyle>
              Connected with {providerName}
            </WalletModalConnectorStyle>
          )}

          {disconnect && (
            <WalletModalDisconnectStyle
              size="xs"
              variant="outlined"
              onClick={handleDisconnect}
            >
              Disconnect
            </WalletModalDisconnectStyle>
          )}
        </WalletModalConnectedStyle>

        <WalletModalAccountStyle>
          <Identicon address={account ?? ''} />
          <WalletModalAddressStyle>{trimmedAddress}</WalletModalAddressStyle>
        </WalletModalAccountStyle>

        <WalletModalActionsStyle>
          <ButtonIcon
            onClick={handleCopy}
            icon={<Copy />}
            size="xs"
            variant="ghost"
          >
            Copy address
          </ButtonIcon>
        </WalletModalActionsStyle>
      </WalletModalContentStyle>
    </Modal>
  );
};
