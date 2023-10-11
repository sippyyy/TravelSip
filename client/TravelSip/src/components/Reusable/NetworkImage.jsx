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
      source={{uri: source?source : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAAD/CAMAAAB2B+IJAAAAGFBMVEX////a2toLCwsAAAC7u7vh4eHc3Nz8/Pxvd4PuAAABx0lEQVR4nO3Sy2rjQBBA0Zb80P//8diJhYK9CcwiR809C1MYk6Zya1zW87uM9Xpbzu12Xcd6H2d3f2yxjG1s27Z/Po23cZ/fxtcXx/xzPH6yj9/DOMZfvPbx5sdrj7+0fG1xdsurxbnVwlELRy0ctXDUwlELRy0ctXDM1OLsuihHLRy1cNTCUQtHLRy1cNTCUQtHLRwzbdFFCWrhqIWjFo5aOGrhqIWjFo5aOGrhqIVjpi26KEEtHLVw1MJRC0ctHLVw1MJRC0ctHDNt0UUJauGohaMWjlo4auGohaMWjlo4auGohWOmLbooQS0ctXDUwlELRy0ctXDUwlELRy0ctXDMtEUXJaiFoxaOWjhq4aiFoxaOWjhq4aiFoxaOmbboogS1cNTCUQtHLRy1cNTCUQtHLRy1cNTCUQvHTFt0UYJaOGrhqIWjFo5aOGrhqIWjFo5aOGrhqIVjpi26KEEtHLVw1MJRC0ctHLVw1MJRC0ctHLVwzLRFFyWohaMWjlo4auGohaMWjlo4auGohWNvsW3b/vk03sZ9fhtfXxzzz/H4yT5+D+MYf/Hax5sfrz3+0nOL+1//K//b/bHF9bac2+26jst6fpd/418V0znkYvMAAAAASUVORK5CYII="}}
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
