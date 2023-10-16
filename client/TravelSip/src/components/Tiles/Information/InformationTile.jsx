import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import ReusableText from '../../Reusable/ReusableText';
import {COLORS, SIZES, TEXT} from '../../../constants/theme';
import HeightSpacer from '../../Reusable/HeightSpacer';

const InformationTile = ({
  field,
  value,
  input = false,
  placeholder = '',
  valueInput = '',
  setFieldTouched,
  handleChange,
  fieldname,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}>
      <ReusableText
        text={field}
        size={SIZES.small}
        color={COLORS.gray}
        family={'medium'}
      />
      <HeightSpacer height={5} />
      {!input ? (
        <ReusableText
          text={value}
          size={TEXT.small}
          color={COLORS.black}
          family={'regular'}
        />
      ) : (
        <TextInput
          style={{
            padding: 0,
          }}
          placeholder={placeholder}
          value={valueInput}
          onFocus={() => setFieldTouched(fieldname)}
          onBlur={() => setFieldTouched(fieldname, '')}
          autoCapitalize="none"
          onChangeText={handleChange(fieldname)}
          autoCorrect={false}
        />
      )}
    </View>
  );
};

export default InformationTile;

const styles = StyleSheet.create({});
