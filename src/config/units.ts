import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const ONE_GWEI = BigNumber.from(10 ** 9);

export const MIN_DEPOSIT = publicRuntimeConfig.minDeposit
  ? BigNumber.from(publicRuntimeConfig.minDeposit)
  : Zero;
