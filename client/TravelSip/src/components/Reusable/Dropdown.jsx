import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../../constants/theme';
const Dropdown = ({data = [], schema, value, setValue}) => {
  const [open, setOpen] = useState(false);

  return data.length > 0 ? (
    <DropDownPicker
      style={{borderWidth: 0, backgroundColor: COLORS.white}}
      open={open}
      value={value}
      schema={schema}
      items={data ? data : ''}
      setOpen={setOpen}
      setValue={setValue}
      default
      disableBorderRadius={true}
      dropDownContainerStyle={{
        backgroundColor: COLORS.white,
        borderWidth: 0,
      }}
    />
  ) : null;
};

export default Dropdown;

const styles = StyleSheet.create({});
