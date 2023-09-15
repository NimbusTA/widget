import { wrapRequest as wrapNextRequest } from '@lidofinance/next-api-wrapper';
import { rpcFactory } from '@lidofinance/next-pages';
import getConfig from 'next/config';

import {
  fetchRPC,
  serverLogger,
  responseTimeMetric,
  rateLimit,
} from 'utilsApi';
import Metrics from 'utilsApi/metrics';

import { getRPCProviders } from 'config';

const rpcProviders = getRPCProviders();

import { METRICS_PREFIX } from 'config';

const { publicRuntimeConfig } = getConfig();
const { defaultChain } = publicRuntimeConfig;

const rpc = rpcFactory({
  fetchRPC,
  serverLogger,
  metrics: {
    prefix: METRICS_PREFIX,
    registry: Metrics.registry,
  },
  allowedRPCMethods: [
    'eth_call',
    'eth_gasPrice',
    'eth_estimateGas',
    'eth_getBlockByNumber',
    'eth_getBalance',
    'eth_getTransactionByHash',
    'eth_blockNumber',
    'eth_getTransactionReceipt',
  ],
  defaultChain,
  providers: rpcProviders,
});

export default wrapNextRequest([
  rateLimit,
  responseTimeMetric(Metrics.request.apiTimings, '/api/rpc'),
])(rpc);
