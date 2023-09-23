import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import reusable from './reusable.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZES} from '../../constants/theme';
import WidthSpacer from './WidthSpacer';
import ReusableText from './ReusableText';

const ProfileTile = ({icon, onPress, title}) => {
  return (
    <TouchableOpacity style={styles.profileTile} onPress={onPress}>
      <View style={reusable.rowWithSpace('space-between')}>
        <View style={reusable.rowWithSpace('space-between')}>
          <Icon name={icon} size={20} color={COLORS.black} />
          <WidthSpacer width={15} />
          <ReusableText
            text={title}
            family={'regular'}
            size={SIZES.medium}
            color={COLORS.gray}
          />
        </View>
        <View>
          <Icon name="navigate-next" size={20} color={COLORS.black} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileTile;

const styles = StyleSheet.create({
  profileTile: {
    backgroundColor: COLORS.lightWhite,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
});
