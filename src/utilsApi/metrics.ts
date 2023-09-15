import { collectStartupMetrics } from '@lidofinance/api-metrics';
import getConfig from 'next/config';
import { collectDefaultMetrics, Registry } from 'prom-client';

import { METRICS_PREFIX } from 'config';

import { RequestMetrics } from './requestMetrics';
import buildInfoJson from '../../build-info.json';

const { publicRuntimeConfig } = getConfig();
const { defaultChain } = publicRuntimeConfig;

class Metrics {
  registry = new Registry();
  request = new RequestMetrics(this.registry);

  constructor() {
    this.collectStartupMetricsInit();
    collectDefaultMetrics({ prefix: METRICS_PREFIX, register: this.registry });
  }

  collectStartupMetricsInit() {
    collectStartupMetrics({
      prefix: METRICS_PREFIX,
      registry: this.registry,
      defaultChain,
      supportedChains: [defaultChain],
      version: buildInfoJson.version,
      commit: buildInfoJson.commit,
      branch: buildInfoJson.branch,
    });
  }
}

export default new Metrics();
