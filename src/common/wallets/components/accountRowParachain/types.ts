import { BigNumber } from '@ethersproject/bignumber';
import { SWRResponse } from '@lido-sdk/react';

export type AccountRowProps = {
  title: React.ReactNode;
  balance: SWRResponse<BigNumber, unknown>;
  tokenAddress: string;
};
