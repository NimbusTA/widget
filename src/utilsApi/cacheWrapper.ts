import {
  cacheControl,
  CACHE_DEFAULT_HEADERS,
  CACHE_DEFAULT_ERROR_HEADERS,
  RequestWrapper,
} from '@lidofinance/next-api-wrapper';
import fp from 'lodash/fp';

type Options = { [p: string]: string | number | boolean };

const getHeadersFromOptions = (options: Options) =>
  fp.pipe(
    fp.toPairs,
    fp.map(([key, value]) =>
      typeof value === 'boolean' ? key : `${key}=${value}`,
    ),
    fp.join(','),
  )(options);

const getHeaders = (options: Options | string) =>
  typeof options === 'string' ? options : getHeadersFromOptions(options || {});

type WrapperProps = {
  cacheHeaders?: Options | string;
  errorHeaders?: Options | string;
  defaultErrorMessage?: string;
};

export const defaultCacheControl = (
  { cacheHeaders, errorHeaders } = {} as WrapperProps,
): RequestWrapper =>
  cacheControl({
    headers: cacheHeaders ? getHeaders(cacheHeaders) : CACHE_DEFAULT_HEADERS,
    errorHeaders: errorHeaders
      ? getHeaders(errorHeaders)
      : CACHE_DEFAULT_ERROR_HEADERS,
  });

export default defaultCacheControl;
