import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const subscanExplorerUrl = publicRuntimeConfig.subscanExplorerUrl;
const polkadotValidatorUrl = publicRuntimeConfig.polkadotExplorerUrl;

export const getValidatorsExplorerLink = (
  ledgerConvertedAddress: string,
): string => `${subscanExplorerUrl}/vote?address=${ledgerConvertedAddress}`;

export const getPolkadotValidatorLink = (address: string): string =>
  `${polkadotValidatorUrl}/${address}`;
