import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AssetImage = ({height, radius, mode, width, data}) => {
  return (
    <Image source={data} style={styles.image(height, radius, mode, width)} />
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  image: (height, radius, mode, width) => ({
    height: height,
    width: width,
    borderRadius: radius,
    resizeMode: mode,
  }),
});
