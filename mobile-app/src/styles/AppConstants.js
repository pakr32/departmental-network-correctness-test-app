import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get ('window');

export const COLORS = {
  basics: {
    font: '#000000',
    fontFocused: '#B0B0B0',
  },
  important: {
    default: 'red',
  },
  primary: {
    50: '#ffffff',
    100: '#ffffff',
    200: '#ffffff',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  },
  secondary: {
    50: '#D3D3D3',
    100: '#fdb5b5',
    200: '#f98585',
    300: '#f65656',
    400: '#f32826',
    500: '#da120d',
    600: '#a90b09',
    700: '#7a0606',
    800: '#4a0202',
    900: '#1e0000',
  },
  tertiary: {
    50: '#d9fdff',
    100: '#aff2fd',
    200: '#83e8f7',
    300: '#55def3',
    400: '#2ad5ef',
    500: '#10bbd5',
    600: '#0091a7',
    700: '#006977',
    800: '#003f4a',
    900: '#00171d',
  },
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  borderRadius: 15,
  elevation: 5,
  menuIcon: 30,
  smallIcon: 15,
  bigIcon: 100,
  menuHeight: 115,
  margin: 15,
  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  h1: {fontFamily: 'Roboto_900Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto_700Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto_700Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto_700Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto_400Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const AppConstants = {COLORS, SIZES, FONTS};

export default AppConstants;
