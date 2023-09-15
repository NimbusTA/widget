import { BigNumber } from '@ethersproject/bignumber';
import { SubmittableResult } from '@polkadot/api';
import { Signer } from '@polkadot/types/types';
import { isFunction } from '@polkadot/util';
import { useCallback, useMemo, useState } from 'react';

import { DIRECT_DEST_WEIGHT, WEIGHT_LIMIT } from 'config';
import {
  useSubstrateApi,
  WalletAccount,
  PARACHAIN_TELEPORT_ID,
} from 'features/transfer';
import { STAGE } from 'features/transfer/components/txModal';

import { TransactionReturnSubstrate } from './types';

type DirectTransferProps = {
  sender: WalletAccount | null;
  receiver?: string;
  amount?: BigNumber;
  onSuccess: () => void;
};

export const useDirectTransfer = ({
  sender,
  receiver,
  amount,
  onSuccess,
}: DirectTransferProps): Omit<TransactionReturnSubstrate, 'txHash'> => {
  const [unsub, setUnsub] = useState<void | (() => void) | undefined | null>(
    null,
  );
  const [processing, setProcessing] = useState(false);
  const [stage, setStage] = useState<STAGE>(STAGE.IDLE);
  const [error, setError] = useState<Error | undefined>();

  const { api, isActive } = useSubstrateApi();

  const params = useMemo(
    () => [
      {
        V1: {
          parents: 0,
          interior: { X1: { Parachain: PARACHAIN_TELEPORT_ID } },
        },
      },
      {
        V1: {
          parents: 0,
          interior: {
            X1: {
              AccountKey20: { key: receiver, network: 'Any' },
            },
          },
        },
      },
      {
        V1: [
          {
            id: {
              Concrete: {
                parents: 0,
                interior: 'Here',
              },
            },
            fun: {
              Fungible: amount?.toString(),
            },
          },
        ],
      },
      DIRECT_DEST_WEIGHT,
      { Limited: WEIGHT_LIMIT },
    ],
    [amount, receiver],
  );

  const tx =
    isActive &&
    api &&
    ((api.tx.xcm && api.tx.xcm.limitedReserveTransferAssets) ||
      (api.tx.polkadotXcm && api.tx.polkadotXcm.limitedReserveTransferAssets) ||
      (api.tx.xcmPallet && api.tx.xcmPallet.limitedReserveTransferAssets));

  const _onStart = useCallback(() => {
    setProcessing(true);
    setError(undefined);
    setStage(STAGE.TRANSFER);
  }, []);

  const _onError = useCallback((result: SubmittableResult | null): void => {
    setProcessing(false);
    setStage(STAGE.ERROR);
    setError(result?.internalError);
  }, []);

  const _onSuccess = useCallback(
    ({ status }: SubmittableResult): void => {
      if (status.isFinalized) {
        setStage(STAGE.TRANSFERRED);
        setProcessing(false);
        if (typeof unsub === 'function') {
          unsub();
          setUnsub(undefined);
        }
      }
    },
    [unsub],
  );

  const canProcess =
    tx &&
    api &&
    receiver &&
    sender &&
    sender.signer &&
    amount &&
    PARACHAIN_TELEPORT_ID;
  const _onSend = useCallback(async (): Promise<void> => {
    if (!canProcess || !sender?.signer) {
      return;
    }

    _onStart();

    api.setSigner(sender.signer as Signer);
    const txExecute = tx(...(isFunction(params) ? params() : params || []));

    const _unsub = await txExecute
      .signAndSend(
        sender.address,
        { signer: sender.signer as Signer },
        _onSuccess,
      )
      .catch(_onError);

    setUnsub(() => _unsub);
  }, [_onError, _onStart, _onSuccess, api, canProcess, params, sender, tx]);

  const onFinish = useCallback(() => {
    setStage(STAGE.IDLE);
    setError(undefined);
    onSuccess?.();
  }, [onSuccess]);

  return {
    transaction: _onSend,
    processing,
    canProcess,
    onFinish,
    stage,
    error,
  };
};
