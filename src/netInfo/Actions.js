// @flow

import ActionTypes from './ActionTypes';

export function refreshState() {
  return {
    type: ActionTypes.NETINFO_REFRESH_STATE,
  };
}

export function stateChanged(payload) {
  return {
    type: ActionTypes.NETINFO_STATE_CHANGED,
    payload,
  };
}
