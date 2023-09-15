import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { ContractTransaction, ContractReceipt } from '@ethersproject/contracts';
import { getERC20Contract } from '@lido-sdk/contracts';
import { useSDK, useAllowance, useMountedState } from '@lido-sdk/react';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';

type TransactionCallback = () => Promise<ContractTransaction>;

const defaultWrapper = async (callback: TransactionCallback) => {
  const transaction = await callback();
  return await transaction.wait();
};

export type UseApproveResponse = {
  approve: () => Promise<void>;
  update: () => Promise<BigNumber | undefined>;
  approving: boolean;
  needsApprove: boolean;
  initialLoading: boolean;
  allowance: BigNumber;
  loading: boolean;
  error: unknown;
};

export type UseApproveWrapper = (
  callback: TransactionCallback,
) => Promise<ContractReceipt | undefined>;

export const useApprove = (
  amount: BigNumber,
  token: string,
  spender: string,
  owner?: string,
  wrapper: UseApproveWrapper = defaultWrapper,
  onError?: (error: Error) => void,
  onSuccess?: () => void,
): UseApproveResponse => {
  const { providerWeb3, account, onError: onErrorSDK } = useSDK();
  const mergedOwner = owner ?? account;

  invariant(token != null, 'Token is required');
  invariant(spender != null, 'Spender is required');

  const [approving, setApproving] = useMountedState(false);
  const result = useAllowance(token, spender, mergedOwner);
  const {
    data: allowance = Zero,
    initialLoading,
    update: updateAllowance,
  } = result;

  const needsApprove =
    !initialLoading && !amount.isZero() && amount.gt(allowance);

  const approve = useCallback(async () => {
    invariant(providerWeb3 != null, 'Web3 provider is required');
    const contractWeb3 = getERC20Contract(token, providerWeb3.getSigner());

    setApproving(true);

    try {
      await wrapper(() => contractWeb3.approve(spender, amount));
      await updateAllowance();
      onSuccess && onSuccess();
    } catch (error) {
      onError ? onError(error as Error) : onErrorSDK(error as Error);
    } finally {
      setApproving(false);
    }
  }, [
    providerWeb3,
    token,
    setApproving,
    wrapper,
    updateAllowance,
    onSuccess,
    spender,
    amount,
    onError,
    onErrorSDK,
  ]);

  return {
    approve,
    approving,
    needsApprove,

    allowance,
    initialLoading,

    update: updateAllowance,

    /*
     * support dependency collection
     * https://swr.vercel.app/advanced/performance#dependency-collection
     */

    get loading() {
      return result.loading;
    },
    get error() {
      return result.error;
    },
  };
};
