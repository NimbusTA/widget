import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PROVIDER_SOCKET = publicRuntimeConfig.relayProvider;
export const PARACHAIN_TELEPORT_ID = publicRuntimeConfig.parachainTeleportId;
export const CHAIN_NAME = publicRuntimeConfig.relayChainName;

const FALLBACK_PROVIDER_SOCKETS = publicRuntimeConfig.relayFallbackProviders;
export const FALLBACK_PROVIDERS = FALLBACK_PROVIDER_SOCKETS
  ? FALLBACK_PROVIDER_SOCKETS.split(',')
  : [];
