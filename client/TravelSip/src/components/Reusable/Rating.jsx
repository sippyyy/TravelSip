import {View} from 'react-native';
import React from 'react';
import reusable from './reusable.style';
import Icon from 'react-native-vector-icons/Ionicons';
import ReusableText from './ReusableText';

const Rating = ({rating}) => {
  return (
    <View style={reusable.rowWithSpace('flex-start')}>
      <Icon name="star" size={20} color={'#FD9942'} />
      <ReusableText text={rating} family="medium" size={15} color={'#FD9942'} />
    </View>
  );
};

export default Rating;
