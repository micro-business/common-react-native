// @flow

import { Map } from 'immutable';
import Status from './Status';

export default Map({
  status: Status.NOT_STARTED,
  errorMessage: '',
  downloadProgress: 0,
});
