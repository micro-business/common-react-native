// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.NETINFO_STATE_CHANGED:
    return action.payload;

  default:
    return state;
  }
};
