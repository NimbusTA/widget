import { useWeb3, UnsupportedChainIdError } from '@lido-sdk/web3-react';
import { UserRejectedRequestError } from '@talismn/web3react-v6-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import fp from 'lodash/fp';

import {
  CONNECT_IN_PROCESS_ERROR,
  NO_ENV_PROVIDER_ERROR,
  NO_EVM_ACCOUNTS,
  UNKNOWN_ERROR,
  UNSUPPORTED_CHAIN_ERROR,
  USER_REJECTED_ERROR,
} from '../../constants';

export const useErrorMessage = (): string | undefined => {
  const { error } = useWeb3();

  if (error instanceof NoEthereumProviderError) {
    return NO_ENV_PROVIDER_ERROR;
  } else if (error instanceof UnsupportedChainIdError) {
    return UNSUPPORTED_CHAIN_ERROR;
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestError ||
    fp.get('code', error) === 4001
  ) {
    return USER_REJECTED_ERROR;
  } else if (fp.get('code', error) === -32002) {
    return CONNECT_IN_PROCESS_ERROR;
  } else if (
    fp.get('code', error) === 4100 ||
    fp.get('message', error) === 'Unauthorized'
  ) {
    return NO_EVM_ACCOUNTS;
    /*
      TODO: find a better way to check for that error
      
      An injected connector in v6 cannot handle [] as accounts array
      It throws an error 'Error: Invariant failed: Invalid address undefined'
      from it's internal normalizeAccount function.
      
      Talisman, when connected via the injected connector, can
      output [] as accounts array, if no active account found
      in the wallet.
 
      It throws 'Error: Invariant failed: Invalid address' but gets shortened
      in production build to just 'Invariant failed'.
     */
  } else if (fp.get('message', error)?.includes('Invariant failed')) {
    return NO_EVM_ACCOUNTS;
  } else if (error) {
    return error?.message || UNKNOWN_ERROR;
  }
};
