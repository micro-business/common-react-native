import { Dimensions, Platform } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
const screen = Dimensions.get('window');

const Sizes = {
  pageHeaderWidth: screen.width - 10,
  pageHeaderHeight: HEIGHT,
  screenWidth: screen.width,
};

export default Sizes;
