// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default function (state = initialState, action) {
  switch (action.type) {
  case ActionTypes.MESSAGE_BAR_ADD_MESSAGE:
    return state.update('messages', messages => messages.push(action.payload));

  case ActionTypes.MESSAGE_BAR_REMOVE_MESSAGE:
    return state.update('messages', messages => messages.filterNot(_ => _.get('messageId') === action.payload.get('messageId')));

  default:
    return state;
  }
}
