// @flow

import { AsyncStorageActionTypes } from '@microbusiness/common-react';
import * as Actions from '@microbusiness/common-react/src/asyncStorage/Actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

function* readValueAsync(action) {
  try {
    yield put(Actions.readValueInProgress(action.payload));

    const value = yield call(AsyncStorage.getItem, action.payload.get('key'));

    yield put(Actions.readValueSucceeded(action.payload.set('value', value)));
  } catch (exception) {
    yield put(Actions.readValueFailed(action.payload.set('errorMessage', exception.message)));
  }
}

export default function* watchReadValue() {
  yield takeEvery(AsyncStorageActionTypes.ASYNC_STORAGE_READ_VALUE, readValueAsync);
}
