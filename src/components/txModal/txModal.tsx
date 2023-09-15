import { Loader } from '@lidofinance/lido-ui';
import React, { FC, useMemo } from 'react';

import {
  BoldText,
  ExplorerLink,
  InstructionText,
  LightText,
  ModalContent,
  Modal,
  RoundErrorIcon,
  RoundCheckIcon,
  ErrorModalContent,
} from 'common/layout';

import { getExplorerTxEndpoint, liquidToken, xcToken } from 'config';
import { toTitleCase } from 'utils';

import { TxModalProps } from './types';

export enum STAGE {
  APPROVE,
  APPROVED,
  STAKE,
  STAKED,
  WITHDRAW,
  WITHDRAWN,
  CLAIM,
  CLAIMED,
  IDLE,
  ERROR,
}

const statusMap = (token?: string) => ({
  [STAGE.APPROVE]: {
    status: 'approving',
    currency: token || xcToken,
    canClose: false,
  },
  [STAGE.STAKE]: { status: 'staking', currency: xcToken, canClose: false },
  [STAGE.WITHDRAW]: {
    status: 'withdrawing',
    currency: liquidToken,
    canClose: false,
  },
  [STAGE.CLAIM]: {
    status: 'claiming',
    currency: xcToken,
    canClose: false,
  },
  [STAGE.APPROVED]: {
    status: 'approved',
    currency: token || xcToken,
    canClose: true,
  },
  [STAGE.STAKED]: { status: 'staked', currency: xcToken, canClose: true },
  [STAGE.WITHDRAWN]: {
    status: 'withdrawn',
    currency: liquidToken,
    canClose: true,
  },
  [STAGE.CLAIMED]: {
    status: 'claimed',
    currency: xcToken,
    canClose: true,
  },
  [STAGE.IDLE]: { status: '', currency: '', canClose: false },
  [STAGE.ERROR]: { status: 'error', currency: '', canClose: true },
});

export const MetamaskErrorModalContent: FC = () => (
  <ModalContent>
    <RoundErrorIcon />
    <BoldText>Metamask tx signature</BoldText>
    <LightText>User denied transaction signature</LightText>
    <InstructionText>Try again</InstructionText>
  </ModalContent>
);

export const TxModal: FC<TxModalProps> = ({
  open,
  onClose,
  onRetry,
  stage = STAGE.IDLE,
  txHash,
  amount,
  error,
  token,
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

  const currentStatus = useMemo(() => statusMap(token)[stage], [stage, token]);

  const _onClose = useMemo(
    () => ((currentStatus.canClose || !!error) && onClose) || undefined,
    [currentStatus.canClose, error, onClose],
  );

  const content = useMemo(() => {
    switch (stage) {
      case STAGE.STAKE:
      case STAGE.WITHDRAW:
      case STAGE.APPROVE:
      case STAGE.CLAIM:
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
              <ExplorerLink href={txLink}>View in Explorer</ExplorerLink>
            ) : (
              <InstructionText>
                Confirm this transaction in your wallet
              </InstructionText>
            )}
          </ModalContent>
        );
      case STAGE.APPROVED:
      case STAGE.STAKED:
      case STAGE.WITHDRAWN:
      case STAGE.CLAIMED:
        return (
          <ModalContent>
            <RoundCheckIcon />
            <BoldText>
              You have {currentStatus.status} {frozenAmount}{' '}
              {currentStatus.currency}
            </BoldText>
            <LightText>Operation was successful</LightText>
            <ExplorerLink href={txLink}>View on Explorer</ExplorerLink>
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
