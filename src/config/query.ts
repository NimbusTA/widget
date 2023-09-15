export const retryOptions = {
  retry: 3,
} as const;

export const commonQuerySettings = {
  refetchInterval: false,
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
  ...retryOptions,
} as const;
