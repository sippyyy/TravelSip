import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const COLORS = {
  blue: '#4267b2',
  red: '#eb6A58',
  green: '#339282',
  white: '#fbfbfb',
  lightWhite: '#fff',
  lightBlue: '#6885c1',
  lightRed: '#eb9c98',
  lightGreen: '#73ada1',
  black: '#121212',
  dark: '#3D3A45',
  gray: '#8c8896',
  lightGrey: '#d1cfd5',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const TEXT = {
  xxSmall: 11,
  xSmall: 13,
  small: 15,
  medium: 17,
  large: 21,
  xLarge: 27,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
  },
};

export {COLORS, SIZES, TEXT, SHADOWS};
