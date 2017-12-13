// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import Styles from './Styles';
import TouchableItem from './TouchableItem';

const TouchableIcon = ({
  onPress,
  iconName,
  iconType,
  iconColor,
  iconDisabledColor,
  disabled,
  iconSize,
  iconContainerStyle,
  pressColor,
}) => (
  <View style={Styles.container}>
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityTraits="button"
      delayPressIn={0}
      onPress={onPress}
      pressColor={pressColor}
      style={Styles.touchableContainer}
      borderless
      disabled={disabled || false}
    >
      <Icon
        size={iconSize || 28}
        color={disabled ? iconDisabledColor : iconColor}
        name={iconName}
        type={iconType}
        containerStyle={iconContainerStyle || Styles.iconContainerStyle}
      />
    </TouchableItem>
  </View>
);

TouchableIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  onPress: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconDisabledColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  iconSize: PropTypes.number,
  iconContainerStyle: PropTypes.object,
  pressColor: PropTypes.string.isRequired,
};

export default TouchableIcon;
