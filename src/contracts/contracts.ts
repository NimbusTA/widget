import { createContractGetter } from '@lido-sdk/contracts';
import { contractHooksFactory } from '@lido-sdk/react';

import { getTokenAddress, TOKENS, xTokensAddress } from 'config';

import {
  LiquidFactory,
  XcTokenFactory,
  XTokensFactory,
} from './factories';

export const getLiquidContract = createContractGetter(LiquidFactory);
export const getXcTokenContract = createContractGetter(XcTokenFactory);
export const getXTokensContract = createContractGetter(XTokensFactory);

const liquid = contractHooksFactory(LiquidFactory, () =>
  getTokenAddress(TOKENS.liquidToken),
);

export const useLiquidContractRPC = liquid.useContractRPC;
export const useLiquidContractWeb3 = liquid.useContractWeb3;

const xcToken = contractHooksFactory(XcTokenFactory, () =>
  getTokenAddress(TOKENS.xcToken),
);

export const useXcTokenContractRPC = xcToken.useContractRPC;
export const useXcTokenContractWeb3 = xcToken.useContractWeb3;

const xtokens = contractHooksFactory(XTokensFactory, () => xTokensAddress);

export const useXTokensContractRPC = xtokens.useContractRPC;
export const useXTokensContractWeb3 = xtokens.useContractWeb3;
