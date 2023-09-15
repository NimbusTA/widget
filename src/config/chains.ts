import getConfig from 'next/config';
import invariant from 'tiny-invariant';

const { publicRuntimeConfig } = getConfig();

export const relayChainName = publicRuntimeConfig.relayChainName;
export const parachainName = publicRuntimeConfig.parachainName;

export const defaultChain = publicRuntimeConfig.defaultChain;

export const enum CHAINS {
  Moonbase = 1287,
  Moonbeam = 1284,
  Moonriver = 1285,
}

export type NativeCurrencyType = {
  name: string;
  symbol: string;
  decimals: number;
};

// Used for adding new tokens to wallets api
export const CHAIN_NATIVE_CURRENCIES: {
  [key in CHAINS]: NativeCurrencyType;
} = {
  [CHAINS.Moonbase]: {
    name: 'Moonbase',
    symbol: 'DEV',
    decimals: 18,
  },
  [CHAINS.Moonriver]: {
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18,
  },
  [CHAINS.Moonbeam]: {
    name: 'Moonbeam',
    symbol: 'GLMR',
    decimals: 18,
  },
  [CHAINS.Moonriver]: {
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18,
  },
};

export const CHAIN_UNBONDING_PERIOD: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Moonbase]: '30 days',
  [CHAINS.Moonriver]: '7-8 days',
  [CHAINS.Moonbeam]: '30 days',
};

export const CHAIN_ERA_PERIOD: {
  [key in CHAINS]: string;
} = {
  [CHAINS.Moonbase]: '24 hours',
  [CHAINS.Moonriver]: '6 hours',
  [CHAINS.Moonbeam]: '24 hours',
};

export const getChainNativeCurrency = (chainId: CHAINS): NativeCurrencyType => {
  const nativeCurrency = CHAIN_NATIVE_CURRENCIES[chainId];
  invariant(nativeCurrency != null, `Chain ${chainId} is not supported`);

  return nativeCurrency;
};

export const getChainUnbondingPeriod = (chainId: CHAINS): string => {
  const unbondingPeriod = CHAIN_UNBONDING_PERIOD[chainId];
  invariant(unbondingPeriod != null, `Chain ${chainId} is not supported`);

  return unbondingPeriod;
};

export const getChainEraPeriod = (chainId: CHAINS): string => {
  const eraPeriod = CHAIN_ERA_PERIOD[chainId];
  invariant(eraPeriod != null, `Chain ${chainId} is not supported`);

  return eraPeriod;
};
