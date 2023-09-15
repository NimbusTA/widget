import { Loader } from '@lidofinance/lido-ui';
import React, { FC, useMemo } from 'react';

import {
  BoldText,
  ErrorModalContent,
  ExplorerLink,
  InstructionText,
  LightText,
  Modal,
  ModalContent,
  RoundCheckIcon,
} from 'common/layout';
import { getExplorerTxEndpoint, nativeToken, xcToken } from 'config';
import { toTitleCase } from 'utils';

import { TxModalProps } from './types';

export enum STAGE {
  TRANSFER,
  TRANSFERRED,
  REVERSE_TRANSFER,
  REVERSE_TRANSFERRED,
  IDLE,
  ERROR,
}

const statusMap = {
  [STAGE.TRANSFER]: {
    status: 'transferring',
    currency: nativeToken,
    canClose: false,
  },
  [STAGE.TRANSFERRED]: {
    status: 'transferred',
    currency: nativeToken,
    canClose: true,
  },
  [STAGE.REVERSE_TRANSFER]: {
    status: 'transferring',
    currency: xcToken,
    canClose: false,
  },
  [STAGE.REVERSE_TRANSFERRED]: {
    status: 'transferred',
    currency: xcToken,
    canClose: true,
  },
  [STAGE.IDLE]: { status: '', currency: '', canClose: false },
  [STAGE.ERROR]: { status: 'error', currency: '', canClose: true },
};

export const TxModal: FC<TxModalProps> = ({
  open,
  onClose,
  onRetry,
  stage = STAGE.IDLE,
  txHash,
  amount,
  error,
}) => {
  // Do not update amount when popup is visible
  const frozenAmount = useMemo(
    () => amount,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open],
  );

  const txLink = useMemo(
    () => (txHash && getExplorerTxEndpoint(txHash)) || '',
    [txHash],
  );

  const currentStatus = statusMap[stage];

  const _onClose = useMemo(
    () => ((currentStatus.canClose || !!error) && onClose) || undefined,
    [currentStatus.canClose, error, onClose],
  );

  const content = useMemo(() => {
    switch (stage) {
      case STAGE.TRANSFER:
        return (
          <ModalContent>
            <Loader
              size="large"
              style={{
                marginBottom: 32,
              }}
            />
            <BoldText>
              You are now {currentStatus.status} {frozenAmount}{' '}
              {currentStatus.currency}
            </BoldText>
            <LightText>Awaiting block confirmation</LightText>
          </ModalContent>
        );
      case STAGE.REVERSE_TRANSFER:
        return (
          <ModalContent>
            <Loader
              size="large"
              style={{
                marginBottom: 32,
              }}
            />
            <BoldText>
              You are now {currentStatus.status} {frozenAmount}{' '}
              {currentStatus.currency}
            </BoldText>
            <LightText>
              {txHash
                ? 'Awaiting block confirmation'
                : `${toTitleCase(currentStatus.status)} ${frozenAmount} ${
                    currentStatus.currency
                  }`}
            </LightText>
            {txHash ? (
              <ExplorerLink href={txLink}>View on Explorer</ExplorerLink>
            ) : (
              <InstructionText>
                Confirm this transaction in your wallet
              </InstructionText>
            )}
          </ModalContent>
        );
      case STAGE.TRANSFERRED:
      case STAGE.REVERSE_TRANSFERRED:
        return (
          <ModalContent>
            <RoundCheckIcon />
            <BoldText>
              You have {currentStatus.status} {frozenAmount}{' '}
              {currentStatus.currency}
            </BoldText>
            <LightText>Operation was successful</LightText>
            {stage !== STAGE.TRANSFERRED && (
              <ExplorerLink href={txLink}>View on Explorer</ExplorerLink>
            )}
          </ModalContent>
        );
      case STAGE.ERROR:
        return <ErrorModalContent error={error} onRetry={onRetry} />;
      default:
        return null;
    }
  }, [
    stage,
    currentStatus.status,
    currentStatus.currency,
    frozenAmount,
    txHash,
    txLink,
    error,
    onRetry,
  ]);

  return (
    <Modal open={open} onClose={_onClose}>
      {content}
    </Modal>
  );
};
