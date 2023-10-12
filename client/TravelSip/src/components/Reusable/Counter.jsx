import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import reusable from './reusable.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../constants/theme';
import ReusableText from './ReusableText';

const Counter = ({bigger = 1, smaller, count,setCount}) => {

  const increment = () => {
    if (smaller) {
      if (count < smaller) {
        setCount(count + 1);
      }
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > bigger) {
      setCount(count - 1);
    }
  };
  return (
    <View style={reusable.rowWithSpace('flex-start')}>
      <Icon
        onPress={decrement}
        name="remove-circle-outline"
        size={25}
        color={COLORS.gray}
      />
      <View style={{marginHorizontal: 10}}>
        <ReusableText
          text={count}
          family="regular"
          size={SIZES.medium}
          color={COLORS.black}
        />
      </View>
      <Icon
        onPress={increment}
        name="add-circle-outline"
        size={25}
        color={COLORS.gray}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
