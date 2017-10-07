// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import ActionTypes from './ActionTypes';

export function add(message, messageType) {
  return {
    type: ActionTypes.MESSAGE_BAR_ADD_MESSAGE,
    payload: Map({
      message,
      messageType,
      messageId: uuid(),
    }),
  };
}

export function remove(messageId) {
  return {
    type: ActionTypes.MESSAGE_BAR_REMOVE_MESSAGE,
    payload: Map({
      messageId,
    }),
  };
}
