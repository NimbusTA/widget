import { ApiPromise } from '@polkadot/api';
import { WalletAccount as WalletAccountBase } from '@talismn/connect-wallets';
import React from 'react';

export type GenericFn = () => unknown;

export type WalletAccount = WalletAccountBase & {
  type?: string;
};

export type SetStateType<TAction> = React.Dispatch<
  React.SetStateAction<TAction>
>;

export enum API_STATES {
  INIT,
  LOADING,
  READY,
  ERROR,
}

export type State = {
  api: ApiPromise | null;
  apiError?: string;
  apiState: API_STATES;
};

export enum ActionKind {
  CONNECT_INIT = 'CONNECT_INIT',
  CONNECT = 'CONNECT',
  CONNECT_SUCCESS = 'CONNECT_SUCCESS',
  CONNECT_ERROR = 'CONNECT_ERROR',
}

export type ConnectActionPayload = ApiPromise;
export type ErrorActionPayload = string;

export type Action =
  | { type: ActionKind.CONNECT_INIT }
  | { type: ActionKind.CONNECT; payload: ConnectActionPayload }
  | { type: ActionKind.CONNECT_SUCCESS }
  | { type: ActionKind.CONNECT_ERROR; payload: ErrorActionPayload };

export type ActionFunction = {
  [ActionKind.CONNECT_INIT]: () => void;
  [ActionKind.CONNECT]: (payload: ConnectActionPayload) => void;
  [ActionKind.CONNECT_SUCCESS]: () => void;
  [ActionKind.CONNECT_ERROR]: (payload: ErrorActionPayload) => void;
};

export type SubstrateApiContextValue = State & {
  isActive: boolean;
  isError: boolean;
  isLoading: boolean;
  actions: ActionFunction;
  connect: () => void;
};
