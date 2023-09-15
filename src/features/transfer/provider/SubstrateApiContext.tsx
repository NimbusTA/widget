import { ApiPromise, WsProvider } from '@polkadot/api';
import {
  useReducer,
  useContext,
  FC,
  createContext,
  memo,
  useCallback,
  PropsWithChildren,
} from 'react';

import invariant from 'tiny-invariant';

import warning from 'tiny-warning';

import { getActions, reducer } from './reducer';
import { API_STATES, State, SubstrateApiContextValue } from './types';
import { FALLBACK_PROVIDERS, PROVIDER_SOCKET, RPC } from '../config';

const INIT_STATE: State = {
  apiState: API_STATES.INIT,
  api: null,
};

const SubstrateApiContext = createContext({} as SubstrateApiContextValue);

const ApiContextProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const actions = getActions(dispatch);

  const { apiState } = state;

  const isActive = apiState === API_STATES.READY;
  const isError = apiState === API_STATES.ERROR;
  const isLoading = apiState === API_STATES.LOADING;

  const connect = useCallback(() => {
    invariant(PROVIDER_SOCKET, 'You need to provide relay socket');

    if (apiState) return;

    actions.CONNECT_INIT();

    try {
      const provider = new WsProvider(
        [PROVIDER_SOCKET, ...(FALLBACK_PROVIDERS || {})],
        50000,
      );
      const _api = new ApiPromise({ provider, rpc: RPC });

      // Set listeners for disconnection and reconnection event.
      _api.on('connected', () => {
        actions.CONNECT(_api);
        // `ready` event is not emitted upon reconnection and is checked explicitly here.
        _api.isReady.then(() => actions.CONNECT_SUCCESS());
      });

      _api.on('ready', () => actions.CONNECT_SUCCESS());
      _api.on('error', () => {
        warning(false, 'Cannot connect to relay chain');
        actions.CONNECT_ERROR('Cannot connect to relay chain');
      });
    } catch (error) {
      warning(false, 'Cannot connect to relay chain');
      actions.CONNECT_ERROR('Cannot connect to relay chain');
    }
  }, [actions, apiState]);

  return (
    <SubstrateApiContext.Provider
      value={{
        ...state,
        actions,
        isActive,
        isError,
        isLoading,
        connect,
      }}
    >
      {children}
    </SubstrateApiContext.Provider>
  );
};

export const useSubstrateApi = (): SubstrateApiContextValue =>
  useContext(SubstrateApiContext);

export const SubstrateApiContextProvider = memo<FC<PropsWithChildren>>(
  ApiContextProviderComponent,
);
