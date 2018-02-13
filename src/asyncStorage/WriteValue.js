// @flow

import { AsyncStorageActionTypes } from '@microbusiness/common-react';
import * as Actions from '@microbusiness/common-react/src/asyncStorage/Actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies

function* writeValueAsync(action) {
  try {
    yield put(Actions.writeValueInProgress(action.payload));
    yield call(AsyncStorage.setItem, action.payload.get('key'), action.payload.get('value'));
    yield put(Actions.writeValueSucceeded(action.payload));
  } catch (exception) {
    yield put(Actions.writeValueFailed(action.payload.set('errorMessage', exception.message)));
  }
}

export default function* watchWriteValue() {
  yield takeEvery(AsyncStorageActionTypes.ASYNC_STORAGE_WRITE_VALUE, writeValueAsync);
}
