import {StyleSheet, Text} from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/theme';

const ReusableText = ({
  text,
  family,
  size,
  color,
  align,
  lineheight,
  lines = 1,
}) => {
  return (
    <Text
      numberOfLines={lines}
      ellipsizeMode="tail"
      style={styles.textStyle(family, size, color, align, lineheight)}>
      {text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align, lineheight) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    lineHeight: lineheight,
  }),
});
