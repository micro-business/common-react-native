// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Styles from './Styles';

const ErrorMessageWithRetry = ({ onRetryPressed, errorMessage }) => (
  <View style={Styles.container}>
    <Text>{errorMessage}</Text>
    <Button
      raised
      style={Styles.retryButton}
      onPress={onRetryPressed}
      title="Retry"
      icon={{ name: 'cached' }}
      backgroundColor={this.props.retryButtonColor}
    />
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
