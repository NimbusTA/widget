import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const swapFlashLoanAddress = publicRuntimeConfig.swapFlashLoanAddress;
export const exchangeUrl = publicRuntimeConfig.exchangeUrl;
export const maxExchangeRate = publicRuntimeConfig.maxExchangeRate;
