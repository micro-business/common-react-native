// @flow

import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { View } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies
import { Button, Text } from 'react-native-elements';
import Styles from './Styles';

const ErrorMessageWithRetry = ({ onRetryPressed, errorMessage, retryButtonColor }) => (
  <View style={Styles.container}>
    <Text>{errorMessage}</Text>
    <Button raised style={Styles.retryButton} onPress={onRetryPressed} title="Retry" icon={{ name: 'cached' }} backgroundColor={retryButtonColor} />
  </View>
);

ErrorMessageWithRetry.propTypes = {
  onRetryPressed: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  retryButtonColor: PropTypes.string,
};

ErrorMessageWithRetry.defaultProps = {
  retryButtonColor: '#2891F2',
};

export default ErrorMessageWithRetry;
