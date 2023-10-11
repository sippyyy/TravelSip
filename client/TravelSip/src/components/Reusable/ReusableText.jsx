import {StyleSheet, Text} from 'react-native';
import React from 'react';

const ReusableText = ({text, family, size, color, align, lines = 1}) => {
  return (
    <Text
      numberOfLines={lines}
      ellipsizeMode="tail"
      style={styles.textStyle(family, size, color, align)}>
      {text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
  }),
});
