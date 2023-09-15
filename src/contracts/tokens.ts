import { BigNumber } from '@ethersproject/bignumber';
import {
  SWRResponse,
  useAllowance,
  useDecimals,
  useTotalSupply,
  UseApproveWrapper,
  useSDK,
} from '@lido-sdk/react';

import { TOKENS, getTokenAddress } from 'config';
import {
  useApprove,
  UseApproveResponse,
  useUnbonding,
  UseUnbondingResponse,
  useTokenBalance,
} from 'hooks';

export const hooksFactory = (
  getTokenAddress: () => string,
): {
  useTokenBalance: () => SWRResponse<BigNumber>;
  useTotalSupply: () => SWRResponse<BigNumber>;
  useDecimals: () => SWRResponse<number>;
  useAllowance: (spender: string) => SWRResponse<BigNumber>;
  useApprove: (
    amount: BigNumber,
    spender: string,
    wrapper: UseApproveWrapper,
    onError?: (error: Error) => void,
    onSuccess?: () => void,
  ) => UseApproveResponse;
  useUnbonding: () => UseUnbondingResponse;
} => {
  return {
    useTokenBalance: () => {
      const tokenAddress = getTokenAddress();
      return useTokenBalance(tokenAddress);
    },
    useTotalSupply: () => {
      const tokenAddress = getTokenAddress();
      return useTotalSupply(tokenAddress);
    },
    useDecimals: () => {
      const tokenAddress = getTokenAddress();
      return useDecimals(tokenAddress);
    },
    useAllowance: (spender: string) => {
      const tokenAddress = getTokenAddress();
      return useAllowance(tokenAddress, spender);
    },
    useApprove: (
      amount: BigNumber,
      spender: string,
      wrapper?: UseApproveWrapper,
      onError?: (error: Error) => void,
      onSuccess?: () => void,
    ) => {
      const { account } = useSDK();
      const tokenAddress = getTokenAddress();
      return useApprove(
        amount,
        tokenAddress,
        spender,
        account,
        wrapper,
        onError,
        onSuccess,
      );
    },
    useUnbonding: () => {
      const { account } = useSDK();
      const tokenAddress = getTokenAddress();
      return useUnbonding(tokenAddress, account);
    },
  };
};

const liquid = hooksFactory(() => getTokenAddress(TOKENS.liquidToken));
export const useLiquidBalance = liquid.useTokenBalance;
export const useLiquidTotalSupply = liquid.useTotalSupply;
export const useLiquidDecimals = liquid.useDecimals;
export const useLiquidAllowance = liquid.useAllowance;
export const useLiquidApprove = liquid.useApprove;
export const useLiquidUnbonding = liquid.useUnbonding;

const xcToken = hooksFactory(() => getTokenAddress(TOKENS.xcToken));
export const useXcTokenBalance = xcToken.useTokenBalance;
export const useXcTokenTotalSupply = xcToken.useTotalSupply;
export const useXcTokenDecimals = xcToken.useDecimals;
export const useXcTokenAllowance = xcToken.useAllowance;
export const useXcTokenApprove = xcToken.useApprove;
