import {View} from 'react-native';
import React from 'react';
import {ReusableText} from '../index';
import CheckBox from '@react-native-community/checkbox';
import reusable from './reusable.style';

const ReusableCheckbox = ({
  space,
  color,
  size,
  text,
  family,
  values,
  setValues,
  boxColor,
  name,
}) => {
  return (
    <View style={reusable.rowWithSpace(space)}>
      <ReusableText text={text} color={color} size={size} family={family} />
      <CheckBox
        disabled={false}
        value={values.air_conditioner}
        onValueChange={newValue => setValues({...values, [name]: newValue})}
        tintColors={{true: boxColor, false: boxColor}}
      />
    </View>
  );
};

export default ReusableCheckbox;
