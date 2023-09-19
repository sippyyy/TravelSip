import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {SIZES} from '../../constants/theme';

const ReusableBtn = ({
  onPress,
  btnText,
  width,
  backGroundColor,
  borderWidth,
  borderColor,
  textColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(width, backGroundColor, borderWidth, borderColor)}>
      <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnText: textColor => ({
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color: textColor,
  }),
  btnStyle: (width, backGroundColor, borderWidth, borderColor) => ({
    width: width,
    backgroundColor: backGroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: SIZES.small,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }),
});
