import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';

import { useSDK } from '@lido-sdk/react';

import { useCallback, useEffect, useState } from 'react';

import { ONE_GWEI } from 'config';

import { parachainTransactionFee } from 'config';

export const useGasPrice = (): BigNumber => {
  const [gasPrice, setGasPrice] = useState<BigNumber>(ONE_GWEI);
  const { providerRpc } = useSDK();

  const getGasPrice = useCallback(async () => {
    if (providerRpc) {
      try {
        const newGasPrice = await providerRpc.getGasPrice();
        setGasPrice(newGasPrice);
      } catch (error) {
        setGasPrice(ONE_GWEI);
      }
    }
  }, [providerRpc]);

  useEffect(() => {
    getGasPrice();
  }, [getGasPrice]);

  return gasPrice;
};

export type TxPriceProps = {
  estimatedTxGas?: BigNumber;
};

export const useTxPrice = (estimatedTxGas?: BigNumber): BigNumber => {
  const gasPrice = useGasPrice();
  const defaultTxPrice = gasPrice?.mul(parachainTransactionFee);

  return (
    (estimatedTxGas && estimatedTxGas.mul(gasPrice)) || defaultTxPrice || Zero
  );
};
