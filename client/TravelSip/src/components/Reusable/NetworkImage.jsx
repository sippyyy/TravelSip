import {Image, StyleSheet} from 'react-native';
import React from 'react';

const NetworkImage = ({
  source,
  width,
  height,
  radius,
  topLeftRadius,
  topRightRadius,
}) => {
  return (
    <Image
      source={{uri: source}}
      style={styles.image(width, height, radius, topLeftRadius, topRightRadius)}
    />
  );
};

export default NetworkImage;

const styles = StyleSheet.create({
  image: (width, height, radius, topLeftRadius, topRightRadius) => ({
    width: width,
    height: height,
    borderRadius: radius,
    borderTopLeftRadius: topLeftRadius,
    borderTopRightRadius: topRightRadius,
    resizeMode: 'cover',
  }),
});
