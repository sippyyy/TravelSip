import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppBar} from '../../components';

const AddFacility = ({navigation}) => {
  return (
    <View>
      <AppBar
        title={'Add Facilily'}
        left={20}
        right={20}
        top={10}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default AddFacility;

const styles = StyleSheet.create({});
