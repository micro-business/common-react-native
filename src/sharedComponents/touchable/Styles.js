// @flow

import { StyleSheet } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies
import Sizes from '../../styles/DefaultStyles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  iconContainerStyle: {
    height: Sizes.pageHeaderHeight,
    width: Sizes.pageHeaderHeight,
  },
});
