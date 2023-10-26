import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import NetworkImage from '../../Reusable/NetworkImage';
import {COLORS} from '../../../constants/theme';
import AssetImage from '../../Reusable/AssetImage';

const ImageFieldTile = ({
  source,
  onPress,
  width,
  height,
  borderWidth,
  borderColor,
  radius,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container(width, height, radius)}>
      <NetworkImage
        source={source}
        width="100%"
        height="100%"
        radius={radius ? radius : 100}
        border={borderWidth ? borderWidth : 2}
        borderColor={borderColor ? borderColor : COLORS.lightRed}
      />
      <View style={styles.imageCover}>
        <AssetImage
          height={50}
          width={50}
          data={require('../../../assets/images/camera.png')}
          mode="cover"
        />
      </View>
    </Pressable>
  );
};

export default ImageFieldTile;

const styles = StyleSheet.create({
  container: (width, height, radius) => ({
    width: width ? width : 80,
    height: height ? height : 80,
    borderRadius: radius ? radius : 100,
    overflow: 'hidden',
    position: 'relative',
  }),
  imageCover: {
    opacity: 0.6,
    position: 'absolute',
    backgroundColor: COLORS.lightGrey,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
