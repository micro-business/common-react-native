// @flow

import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { View } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies
import { Icon } from 'react-native-elements';
import { TouchableItem } from '.';
import Styles from './Styles';

const TouchableIcon = ({ onPress, iconName, iconType, iconColor, iconDisabledColor, disabled, iconSize, iconContainerStyle, pressColor }) => (
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
  iconColor: PropTypes.string.isRequired,
  iconDisabledColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  iconSize: PropTypes.number,
  iconContainerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  pressColor: PropTypes.string.isRequired,
};

TouchableIcon.defaultProps = {
  disabled: false,
  iconSize: 28,
  iconContainerStyle: null,
};

export default TouchableIcon;
