import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import reusable from './reusable.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, TEXT} from '../../constants/theme';
import ReusableText from './ReusableText';

const AppBar = ({
  color,
  color1,
  title,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
  noBack,
}) => {
  return (
    <View style={styles.overlay(top, left, right)}>
      <View style={reusable.rowWithSpace(noBack ? 'center' : 'space-between')}>
        {!noBack ? (
          <TouchableOpacity style={styles.box(color)} onPress={onPress}>
            <Icon name="chevron-back" color={COLORS.black} size={26} />
          </TouchableOpacity>
        ) : null}
        <ReusableText
          text={title}
          family="medium"
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity style={styles.box1(color1)} onPress={onPress1}>
          <Icon name={icon} color={COLORS.black} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  overlay: (top, left, right) => ({
    position: 'absolute',
    top: top,
    left: left,
    right: right,
    justifyContent: 'center',
  }),
  box: color => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
  }),
  box1: color1 => ({
    backgroundColor: color1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
  }),
});
