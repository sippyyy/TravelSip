import {COLORS} from '../constants/theme';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profile: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 110,
    alignItems: 'center',
  },
  image: {
    width: 100,
    resizeMode: 'cover',
    height: 100,
    borderColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 90,
  },
  name: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 12,
    padding: 5,
  },
});

export default styles;
