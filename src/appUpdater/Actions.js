// @flow

import { Map } from 'immutable';
import ActionTypes from './ActionTypes';

export function notStarted() {
  return {
    type: ActionTypes.APP_UPDATER_NOT_STARTED,
  };
}

export function checkingForUpdate() {
  return {
    type: ActionTypes.APP_UPDATER_CHECKING_FOR_UPDATE,
  };
}

export function downloadingUpdate(downloadProgress) {
  return {
    type: ActionTypes.APP_UPDATER_DOWNLOADING_UPDATE,
    payload: Map({
      downloadProgress,
    }),
  };
}

export function installingUpdate() {
  return {
    type: ActionTypes.APP_UPDATER_INSTALLING_UPDATE,
  };
}

export function succeeded() {
  return {
    type: ActionTypes.APP_UPDATER_SUCCEEDED,
  };
}

export function failed(errorMessage) {
  return {
    type: ActionTypes.APP_UPDATER_FAILED,
    payload: Map({
      errorMessage,
    }),
  };
}

export function clearError() {
  return {
    type: ActionTypes.APP_UPDATER_CLEAR_ERROR,
  };
}
