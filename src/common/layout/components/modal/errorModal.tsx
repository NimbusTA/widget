import { Button } from '@lidofinance/lido-ui';
import React, { FC } from 'react';

import { METAMASK_ERROR_CODE } from 'config';

import { Modal } from './modal';
import { RoundErrorIcon } from './modalIcons';
import { BoldText, LightText, ModalContent } from './modalStyles';
import { ErrorModalProps } from './types';

// TODO: move to a related module from layout
export const ErrorModalContent: FC<
  Pick<ErrorModalProps, 'error' | 'onRetry'>
> = ({ error, onRetry }) => {
  return (
    <ModalContent>
      <RoundErrorIcon />
      {error && error?.code === METAMASK_ERROR_CODE ? (
        <>
          <BoldText>Metamask tx signature</BoldText>
          <LightText>User denied transaction signature</LightText>
        </>
      ) : (
        <>
          <BoldText>Error</BoldText>
          <LightText>Oops! We&apos;ve got an error</LightText>
        </>
      )}
      {onRetry && (
        <Button variant="text" onClick={onRetry}>
          Retry
        </Button>
      )}
    </ModalContent>
  );
};

export const ErrorModal: FC<ErrorModalProps> = ({
  open,
  error,
  onClose,
  onRetry,
}) => (
  <Modal open={open} onClose={onClose}>
    <ModalContent>
      <RoundErrorIcon />
      <ErrorModalContent error={error} onRetry={onRetry} />
    </ModalContent>
  </Modal>
);
