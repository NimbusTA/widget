import { CHAINS } from '@lido-sdk/constants';
import { RpcProviders } from '@lidofinance/next-pages';
import getConfig from 'next/config';

import invariant from 'tiny-invariant';

import { isUrlValid } from 'utils';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const { basePath, parachainApiRPC, parachainFallbackRPCs } =
  serverRuntimeConfig;

const { defaultChain } = publicRuntimeConfig;

export const parachainPublicRPC = publicRuntimeConfig.parachainPublicRPC;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  return `${basePath ?? ''}/api/rpc?chainId=${chainId}`;
};

export const getRPCProviders = (): RpcProviders => {
  invariant(parachainApiRPC, 'Api RPC endpoint should be defined');

  const parsedParachainId = parseInt(defaultChain);

  const urls: [string, ...string[]] = parachainFallbackRPCs
    ? [
        parachainApiRPC,
        ...parachainFallbackRPCs
          .split(',')
          .filter((url: string) => isUrlValid(url)),
      ]
    : [parachainApiRPC];

  return {
    [parsedParachainId]: urls,
  };
};
