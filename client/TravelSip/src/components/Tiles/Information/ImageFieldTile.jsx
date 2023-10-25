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
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <NetworkImage
        source={source}
        width="100%"
        height="100%"
        radius={100}
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
  container: (width, height) => ({
    width: width ? width : 80,
    height: height ? height : 80,
    borderRadius: 100,
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
