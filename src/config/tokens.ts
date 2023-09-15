import getConfig from 'next/config';

import GLMRTokenIcon from 'assets/icons/token=GLMR.png';
import MOVRTokenIcon from 'assets/icons/tokens=MOVR.svg';
import nDOTIcon from 'assets/icons/tokens=nDOT.svg';
import nKSMIcon from 'assets/icons/tokens=nKSM.svg';
import XcDOTIcon from 'assets/icons/tokens=xcDOT.svg';
import XcKSMIcon from 'assets/icons/tokens=xcKSM.svg';

import { CHAINS, defaultChain } from './chains';

const { publicRuntimeConfig } = getConfig();

export const parachainToken = publicRuntimeConfig.parachainToken;
export const nativeToken = publicRuntimeConfig.nativeToken;
export const xcToken = publicRuntimeConfig.xcToken;
export const liquidToken = publicRuntimeConfig.liquidToken;

export const downwardParachainFee = publicRuntimeConfig.downwardParachainFee;
export const upwardRelayFee = publicRuntimeConfig.upwardRelayFee;
export const relayTransactionFee = publicRuntimeConfig.relayTransactionFee;
export const parachainTransactionFee =
  publicRuntimeConfig.parachainTransactionFee;

export const REVERSE_DEST_WEIGHT = 4 * 1000000000;
export const DIRECT_DEST_WEIGHT = 0; // 3 * BaseXcmWeight on Kusama (on Rococo and Westend this is different)
export const WEIGHT_LIMIT = publicRuntimeConfig.relayWeightLimit || 1000000000;

export const PARACHAIN_DECIMALS = 18;

export const xTokensAddress = publicRuntimeConfig.xTokensAddress;

export enum TOKENS {
  nativeToken = 'nativeToken',
  liquidToken = 'liquidToken',
  xcToken = 'xcToken',
}

export const TOKEN_ADDRESSES: {
  [key in TOKENS]: string;
} = {
  [TOKENS.xcToken]: publicRuntimeConfig.xcTokenAddress,
  [TOKENS.nativeToken]: publicRuntimeConfig.nativeTokenAddress,
  [TOKENS.liquidToken]: publicRuntimeConfig.liquidTokenAddress,
};

export const TOKEN_ICONS: {
  [key in CHAINS]: {
    [key in TOKENS]: string;
  };
} = {
  [CHAINS.Moonbase]: {
    [TOKENS.xcToken]: XcKSMIcon,
    [TOKENS.nativeToken]: MOVRTokenIcon,
    [TOKENS.liquidToken]: nKSMIcon,
  },
  [CHAINS.Moonbeam]: {
    [TOKENS.xcToken]: XcDOTIcon,
    [TOKENS.nativeToken]: GLMRTokenIcon.src,
    [TOKENS.liquidToken]: nDOTIcon,
  },
  [CHAINS.Moonriver]: {
    [TOKENS.xcToken]: XcKSMIcon,
    [TOKENS.nativeToken]: MOVRTokenIcon,
    [TOKENS.liquidToken]: nKSMIcon,
  },
};

export const getTokenAddress = (token: TOKENS): string =>
  TOKEN_ADDRESSES[token];

export const getTokenIcon = (token: TOKENS): string =>
  defaultChain ? TOKEN_ICONS[defaultChain as CHAINS][token] : '';
