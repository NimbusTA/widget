import { serverLoggerFactory } from '@lidofinance/api-logger';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { parachainApiRPC } = serverRuntimeConfig;

export const serverLogger = serverLoggerFactory([parachainApiRPC]);
