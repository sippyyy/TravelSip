import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Successful = () => {
  return (
    <View>
      <View style={{marginTop: '40%'}}>
        <Image
          style={{width: '100%', height: 200}}
          source={require('../../assets/images/check.png')}
        />
      </View>
    </View>
  );
};

export default Successful;

const styles = StyleSheet.create({});
