const basePath = process.env.BASE_PATH || '';

const parachainApiRPC = process.env.PARACHAIN_API_RPC;
const parachainFallbackRPCs = process.env.PARACHAIN_FALLBACK_RPCS;
const parachainPublicRPC = process.env.PARACHAIN_PUBLIC_RPC;

const defaultChain = process.env.DEFAULT_CHAIN;

const explorerUrl = process.env.EXPLORER_URL;
const polkadotExplorerUrl = process.env.POLKADOT_EXPLORER_URL;
const subscanExplorerUrl = process.env.SUBSCAN_EXPLORER_URL;

const estimateTimeUrl = process.env.ESTIMATE_TIME_SERVICE_URL;
const defiServiceUrl = process.env.DEFI_SERVICE_URL;
const statisticsUrl = process.env.STATISTICS_URL;
const playgroundServiceUrl = process.env.PLAYGROUND_SERVICE_URL;
const validatorsUrl = process.env.VALIDATORS_URL;

const relayChainName = process.env.RELAY_CHAIN_NAME;
const parachainName = process.env.PARACHAIN_NAME;
const parachainTransactionFee = process.env.PARACHAIN_TRANSACTION_FEE;
const parachainToken = process.env.PARACHAIN_TOKEN;
const nativeToken = process.env.NATIVE_TOKEN;
const xcToken = process.env.XC_TOKEN;
const liquidToken = process.env.LIQUID_TOKEN;

const xcTokenAddress = process.env.XC_TOKEN_ADDRESS;
const nativeTokenAddress = process.env.NATIVE_TOKEN_ADDRESS;
const xTokensAddress = process.env.XTOKENS_ADDRESS;
const liquidTokenAddress = process.env.LIQUID_TOKEN_ADDRESS;

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS;
const cspReportOnly = process.env.CSP_REPORT_ONLY;

const cspReportUri = process.env.CSP_REPORT_URI;

const swapFlashLoanAddress = process.env.SWAP_FLASHLOAN_ADDRESS;
const exchangeUrl = process.env.EXCHANGE_URL;
const maxExchangeRate = process.env.MAX_EXCHANGE_RATE;

const minDeposit = process.env.MIN_DEPOSIT;

const rateLimit = process.env.RATE_LIMIT || 100;
const rateLimitTimeFrame = process.env.RATE_LIMIT_TIME_FRAME || 60; // 1 minute

const path = require('path');

const config = {
  basePath,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    // dedupe multiple versions of bn.js across different node_modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'bn.js': path.resolve('./node_modules/bn.js'),
    };

    return config;
  },
  async headers() {
    return [
      {
        // required for gnosis save apps
        source: '/manifest.json',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  serverRuntimeConfig: {
    defaultChain,
    cspTrustedHosts,
    cspReportOnly,
    cspReportUri,
    parachainApiRPC,
    parachainFallbackRPCs,
    defiServiceUrl,
    estimateTimeUrl,
    statisticsUrl,
    validatorsUrl,
    playgroundServiceUrl,
    rateLimit,
    rateLimitTimeFrame,
  },
  publicRuntimeConfig: {
    basePath,
    parachainPublicRPC,
    defaultChain,
    explorerUrl,
    polkadotExplorerUrl,
    subscanExplorerUrl,
    parachainName,
    parachainTransactionFee,
    nativeToken,
    xcToken,
    liquidToken,
    parachainToken,
    xcTokenAddress,
    nativeTokenAddress,
    xTokensAddress,
    liquidTokenAddress,
    swapFlashLoanAddress,
    exchangeUrl,
    minDeposit,
    maxExchangeRate,
    relayChainName,
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

module.exports = withBundleAnalyzer(config);
