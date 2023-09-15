import { trackedFetchRpcFactory } from '@lidofinance/api-rpc';
import { FetchRpc } from '@lidofinance/rpc';
import Metrics from 'utilsApi/metrics';

import { METRICS_PREFIX } from 'config';

const fetchRPCBase = trackedFetchRpcFactory({
  registry: Metrics.registry,
  prefix: METRICS_PREFIX,
});

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'User-Agent': '*',
};

export type TrackedFetchRPC = FetchRpc<{ chainId: string | number }>;

export const fetchRPC: TrackedFetchRPC = (url, init, props) =>
  fetchRPCBase(url, { ...init, headers }, props);
