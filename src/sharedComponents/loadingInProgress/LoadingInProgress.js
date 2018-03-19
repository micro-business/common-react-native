// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import Styles from './Styles';

const LoadingInProgress = ({ messageToDisplay, activityIndicatorColor }) => (
  <View style={Styles.container}>
    <Text>
      {messageToDisplay}
    </Text>
    <ActivityIndicator size="large" color={activityIndicatorColor} style={Styles.activityIndicator} />
  </View>
);

LoadingInProgress.propTypes = {
  messageToDisplay: PropTypes.string,
  activityIndicatorColor: PropTypes.string,
};

LoadingInProgress.defaultProps = {
  messageToDisplay: '',
  activityIndicatorColor: '#53A12C',
};

export default LoadingInProgress;
