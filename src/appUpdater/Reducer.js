// @flow

import { Map } from 'immutable';
import ActionTypes from './ActionTypes';
import initialState from './InitialState';
import Status from './Status';

export default function (state = initialState, action) {
  switch (action.type) {
  case ActionTypes.APP_UPDATER_NOT_STARTED:
    return Map({
      status: Status.NOT_STARTED,
      errorMessage: '',
      downloadProgress: 0,
    });

  case ActionTypes.APP_UPDATER_CHECKING_FOR_UPDATE:
    return Map({
      status: Status.CHECKING_FOR_UPDATE,
      errorMessage: '',
      downloadProgress: 0,
    });

  case ActionTypes.APP_UPDATER_DOWNLOADING_UPDATE:
    return Map({
      status: Status.DOWNLOADING_UPDATE,
      errorMessage: '',
      downloadProgress: action.payload.get('downloadProgress'),
    });

  case ActionTypes.APP_UPDATER_INSTALLING_UPDATE:
    return Map({
      status: Status.INSTALLING_UPDATE,
      errorMessage: '',
      downloadProgress: 0,
    });

  case ActionTypes.APP_UPDATER_SUCCEEDED:
    return Map({
      status: Status.SUCCEEDED,
      errorMessage: '',
      downloadProgress: 0,
    });

  case ActionTypes.APP_UPDATER_FAILED:
    return Map({
      status: Status.FAILED,
      errorMessage: action.payload.get('errorMessage'),
      downloadProgress: 0,
    });

  case ActionTypes.APP_UPDATER_CLEAR_ERROR:
    return state.set('errorMessage', '');

  default:
    return state;
  }
}
