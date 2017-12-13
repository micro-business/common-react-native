import {
  Dimensions
} from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
const screen = Dimensions.get('window');

export const Sizes = {
  pageHeaderWidth: screen.width - 10,
  pageHeaderHeight: HEIGHT,
  screenWidth: screen.width,
};
