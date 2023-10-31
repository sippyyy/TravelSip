import {StyleSheet, View} from 'react-native';
import React from 'react';
import AssetImage from './AssetImage';
import ReusableText from './ReusableText';
import {COLORS} from '../../constants/theme';

const Empty = ({text}) => {
  return (
    <View style={styles.container}>
      <AssetImage
        data={require('../../assets/images/empty_box.png')}
        width={130}
        height={130}
      />
      <ReusableText text={text ? text : 'This topic is empty'} />
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
