import { Dispatch, Reducer } from 'react';

import {
  Action,
  ActionFunction,
  ActionKind,
  API_STATES,
  ConnectActionPayload,
  ErrorActionPayload,
  State,
} from './types';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionKind.CONNECT_INIT:
      return { ...state, apiState: API_STATES.INIT };

    case ActionKind.CONNECT:
      return { ...state, api: action.payload, apiState: API_STATES.LOADING };

    case ActionKind.CONNECT_SUCCESS:
      return { ...state, apiState: API_STATES.READY };

    case ActionKind.CONNECT_ERROR:
      return { ...state, apiState: API_STATES.ERROR, apiError: action.payload };

    default:
      throw new Error('Unknown type');
  }
};

export const getActions = (dispatch: Dispatch<Action>): ActionFunction => ({
  [ActionKind.CONNECT_INIT]: () => dispatch({ type: ActionKind.CONNECT_INIT }),
  [ActionKind.CONNECT]: (payload: ConnectActionPayload) =>
    dispatch({ type: ActionKind.CONNECT, payload }),
  [ActionKind.CONNECT_SUCCESS]: () =>
    dispatch({ type: ActionKind.CONNECT_SUCCESS }),
  [ActionKind.CONNECT_ERROR]: (payload: ErrorActionPayload) =>
    dispatch({ type: ActionKind.CONNECT_ERROR, payload }),
});
