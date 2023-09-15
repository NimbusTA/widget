import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const explorerUrl = publicRuntimeConfig.explorerUrl;
export const subscanExplorerUrl = publicRuntimeConfig.subscanExplorerUrl;

export const estimateTimeUrl = serverRuntimeConfig.estimateTimeUrl;
export const defiServiceUrl = serverRuntimeConfig.defiServiceUrl;
export const statisticsUrl = serverRuntimeConfig.statisticsUrl;
export const validatorsUrl = serverRuntimeConfig.validatorsUrl;

export const basePath = publicRuntimeConfig.basePath;

export const getExplorerTxEndpoint = (txHash: string): string =>
  `${explorerUrl}/tx/${txHash}`;

export const getAddressExplorerLink = (address: string): string =>
  `${explorerUrl}/address/${address}`;

export const DEFAULT_API_ERROR_MESSAGE =
  'Something went wrong. Sorry, try again later :(';
